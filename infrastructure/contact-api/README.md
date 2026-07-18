# Contact-inquiry API

Persists contact-form submissions from the marketing site to DynamoDB, with
layered abuse protection. Built with AWS SAM.

```
browser ──POST /inquiries──▶ API Gateway (throttled) ──▶ Lambda ──▶ DynamoDB
                              └─ optional AWS WAF in front ─┘
```

## Abuse protection (all on by default, free-tier)

Enforced in the Lambda ([src/index.js](src/index.js)):

- **Origin allowlist** — only `AllowedOrigins` may submit; others get `403`.
- **Honeypot** — a hidden `company_website` field; if filled, the request is
  silently dropped (returns `200` so bots can't detect the drop).
- **Submit-timing** — submissions faster than `MinSubmitMs` (default 3s) are
  dropped the same way.
- **Strict schema** — work type must be known; every field is length-bounded;
  body capped at 8 KB (`413` otherwise).
- **Per-IP rate limit** — max `RateLimitPerHour` accepted submissions per IP
  (default 5), via an atomic, TTL-expiring DynamoDB counter (`429` otherwise).
  IPs are stored only as a salted SHA-256 hash.

Enforced by infrastructure:

- **API Gateway throttling** — 5 req/s, burst 10 (tunable).
- **Reserved Lambda concurrency** — hard cap of 5 (a blast-radius/cost ceiling).
- **Optional AWS WAF** (`EnableWaf=true`) — edge rate-based rule + AWS managed
  IP-reputation / common / known-bad-input rule groups.

## Cost

At contact-form volume the default (WAF **off**) stack is effectively **$0** —
it stays inside the AWS Always-Free tier:

| Service           | Free tier                          | This stack at low volume |
| ----------------- | ---------------------------------- | ------------------------ |
| DynamoDB          | 25 GB + 25 WCU/RCU (on-demand ok)  | ~$0                      |
| Lambda            | 1M requests + 400k GB-s / month    | ~$0                      |
| API Gateway (REST)| 1M requests / month (first 12 mo)  | ~$0, then $3.50 / 1M     |

The reserved concurrency + API throttling bound the worst case even under a
flood. Enabling WAF adds a **fixed ~$8–10/month** (WebACL $5 + ~$1/rule +
$0.60/1M requests) — that's the one line item that isn't near-zero, which is why
it's opt-in. WAF managed rule groups here are the *free* ones (no Bot Control /
Fraud Control subscription). Recommended regardless: set an **AWS Budgets** alert
so nothing can ever surprise you.

## Deploy

Requires the AWS SAM CLI and credentials for the target account/region.

```bash
cd infrastructure/contact-api
sam build
sam deploy --guided        # first time: pick region, confirm params, save config
# subsequent deploys:
sam deploy
```

Grab the endpoint from the stack outputs:

```bash
aws cloudformation describe-stacks --stack-name <your-stack-name> \
  --query "Stacks[0].Outputs[?OutputKey=='InquiryEndpoint'].OutputValue" --output text
```

## Wire the site to it

Paste that URL into [`src/lib/site-config.ts`](../../src/lib/site-config.ts):

```ts
contactEndpoint: "https://xxxx.execute-api.<region>.amazonaws.com/prod/inquiries",
```

While `contactEndpoint` is empty the form falls back to opening the visitor's
mail client (`mailto:`), so the site is never broken mid-rollout. Once set, the
form POSTs and shows in-page submitting / success / error states.

## Turn on WAF later (optional)

```bash
sam deploy --parameter-overrides EnableWaf=true
```

Deploy WAF-off first so the API stage exists; enabling it on a later deploy
associates the WebACL cleanly.

## Read the inquiries

```bash
aws dynamodb scan --table-name <stack-name>-inquiries \
  --filter-expression "#t = :inq" \
  --expression-attribute-names '{"#t":"type"}' \
  --expression-attribute-values '{":inq":{"S":"inquiry"}}'
```

Inquiry items use `pk = INQUIRY#<uuid>`; rate-limit counters use
`pk = RATE#<ipHash>#<hourBucket>` and auto-expire via TTL.

## Request contract

`POST /inquiries`, `Content-Type: application/json`:

```json
{
  "workType": "school-os",
  "workTypeLabel": "School OS",
  "problem": "...(20-1200 chars)...",
  "name": "...",
  "organization": "...",
  "email": "you@org.com",
  "source": "fairhelmsystems.com/contact",
  "company_website": "",
  "elapsedMs": 8421
}
```

Response: `{ "ok": true }` on success; `{ "ok": false, "error": "..." }` with a
`4xx/5xx` status otherwise.
