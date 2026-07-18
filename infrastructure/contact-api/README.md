# Contact-inquiry API

A **credential-isolating proxy** between the public marketing form and the
SquareCampus platform CRM. The browser posts the form here; this Lambda
validates it and forwards to the platform CRM using a server-to-server auth
client. Platform credentials and the bearer token never reach the browser.
Built with AWS SAM.

```text
browser ──POST /inquiries──▶ API Gateway (throttled) ──▶ Lambda ──▶ POST /api/platform/v1/crm/marketing-intake
                              └─ optional AWS WAF ─┘         │            (Authorization: Bearer <server-only token>)
                                                             └─▶ DynamoDB (rate-limit counters only)
```

## What the Lambda does

1. **Origin allowlist** — only `AllowedOrigins` may submit (`403` otherwise).
2. **Honeypot** — a populated `honeypotField` is dropped silently (`200`, no
   forward), so bots can't tell a drop from a success.
3. **Validation** — `idempotencyKey`, `schoolName`, and at least one of
   `contactEmail` / `contactPhone` are required; body capped at 16 KB.
4. **Per-IP rate limit** — atomic hourly counter in DynamoDB (TTL-expiring);
   IPs stored only as salted SHA-256 hashes.
5. **Server-derived context** — `requestId`, `sourceIp`, and `userAgent` are set
   from the request, never trusted from the body. Consent flags pass through
   strictly; marketing consent is never coerced to `true`.
6. **Forward** — `POST /api/platform/v1/crm/marketing-intake` with a
   `Bearer` token from the platform auth client (permission `platform_crm:intake`),
   passing `idempotencyKey` through for dedup.
7. **Safe response** — returns only `{ "ok": true }`; the upstream lead object and
   duplicate-detection details are discarded. Logs carry only `requestId` + status —
   never email, phone, message, tokens, or the upstream body.

## Auth: Cognito M2M (required before this can go live)

The Lambda is a **platform-plane machine identity** — a separate actor type from
tenant-user auth and human Platform Admin auth. It uses **AWS Cognito M2M
client-credentials** with one custom scope, which the core API maps to the
internal `platform_crm:intake` permission (the core API validates token issuer,
audience, expiry, and scope itself).

Configure via stack parameters (leave everything unset until the pieces exist):

- `PlatformBaseUrl` — the platform gRPC-relay base URL. **Leave unset until the
  production relay is deployed.**
- `PlatformTokenUrl` — Cognito `/oauth2/token` endpoint (a stack output).
- `PlatformClientId` — Cognito app-client ID (a stack output).
- `PlatformClientSecretArn` — Secrets Manager ARN of the app-client secret.
- `PlatformScope` — `squarecampus-platform/crm.intake` (default).

The client secret is **fetched at runtime** from Secrets Manager via the Lambda
execution role, which is granted `secretsmanager:GetSecretValue` on **only that
ARN**. The secret is never stored in source, a plaintext CloudFormation
parameter, or ordinary Lambda config. The Lambda **fails closed** if the relay
or auth is unavailable — it never falls back to a local store; the site's
`mailto:` path is the availability fallback.

## Tests

Dependency-free, via Node's built-in runner:

```bash
cd infrastructure/contact-api
npm test        # node --test test/*.test.js
```

Covers validation, payload mapping, idempotent retries, consent preservation,
honeypot rejection, rate limiting, upstream-failure handling, and
credential/PII non-disclosure.

## Deploy (AWS SAM)

```bash
cd infrastructure/contact-api
sam build
sam deploy --guided \
  --parameter-overrides \
    PlatformBaseUrl=https://relay.example \
    PlatformTokenUrl=https://<domain>.auth.<region>.amazoncognito.com/oauth2/token \
    PlatformClientId=<cognito-app-client-id> \
    PlatformClientSecretArn=arn:aws:secretsmanager:...:secret:...
```

No SAM CLI? Use the AWS CLI equivalent (the SAM transform runs server-side):

```bash
aws cloudformation package --template-file template.yaml \
  --s3-bucket <artifacts-bucket> --output-template-file packaged.yaml --region ap-south-1
aws cloudformation deploy --template-file packaged.yaml --stack-name fairhelm-contact-api \
  --region ap-south-1 --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND \
  --parameter-overrides PlatformBaseUrl=... PlatformTokenUrl=... PlatformClientId=... PlatformClientSecretArn=...
```

Do **not** deploy or set `contactEndpoint` until the M2M auth, the production
relay, and an end-to-end smoke test are all green.

## Custom domain

The stack serves the API at `api.fairhelmsystems.com` (Route53 alias +
same-region ACM cert, both stack-managed via `ApiDomainName` / `HostedZoneId`).
The raw `execute-api` URL also works (`InquiryEndpointDirect` output).

## Wire the site to it

Once deployed **with platform credentials**, set the endpoint in
[`src/lib/site-config.ts`](../../src/lib/site-config.ts):

```ts
contactEndpoint: "https://api.fairhelmsystems.com/inquiries",
```

While `contactEndpoint` is empty the form falls back to `mailto:`, so the site
is never broken mid-rollout.

## Cost

DynamoDB (rate-limit counters), Lambda, and API Gateway sit inside the free
tier at contact-form volume (~$0). Reserved concurrency + API throttling bound
the worst case. WAF is the only fixed cost (~$8–10/mo) and is **off by default**
(`EnableWaf=true` to enable). Set an AWS Budgets alert regardless.

## Cost / cleanup

If this stack is ever abandoned: `aws cloudformation delete-stack
--stack-name fairhelm-contact-api --region ap-south-1` removes everything
(table, Lambda, API, cert, DNS record).
