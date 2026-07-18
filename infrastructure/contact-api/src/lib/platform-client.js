"use strict";

// Server-to-server client for the SquareCampus platform CRM. Credentials and the
// bearer token live ONLY here (server-side) and are never returned or logged.
// Fails CLOSED: if the relay isn't configured, it throws rather than falling
// back to any local store.
function createPlatformClient({
  baseUrl,
  getToken,
  fetchImpl,
  timeoutMs = 5000,
}) {
  const doFetch = fetchImpl || fetch;
  return {
    async submitMarketingIntake(payload) {
      if (!baseUrl) throw new Error("platform_not_configured");
      const token = await getToken();
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await doFetch(
          `${baseUrl}/api/platform/v1/crm/marketing-intake`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "X-Request-Id": payload.requestId,
              "Idempotency-Key": payload.idempotencyKey,
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
          },
        );
        // Surface only the status. The upstream lead object and any
        // duplicate-detection details are intentionally discarded here.
        return { ok: response.ok, status: response.status };
      } finally {
        clearTimeout(timer);
      }
    },
  };
}

// Cognito M2M (client-credentials) token provider. Requests one custom scope
// (squarecampus-platform/crm.intake) which the core API maps to the internal
// platform_crm:intake permission. The client secret is fetched at call time via
// getClientSecret (Secrets Manager) — never held in env or source. Fails CLOSED
// when unconfigured. Tokens are cached until shortly before expiry.
function createClientCredentialsTokenProvider({
  tokenUrl,
  clientId,
  getClientSecret,
  scope,
  fetchImpl,
  now = Date.now,
}) {
  const doFetch = fetchImpl || fetch;
  let cached = null;
  return async function getToken() {
    if (!tokenUrl || !clientId || !getClientSecret) {
      throw new Error("platform_auth_not_configured");
    }
    if (cached && cached.expiresAt - 60_000 > now()) return cached.token;

    const clientSecret = await getClientSecret();
    if (!clientSecret) throw new Error("platform_auth_not_configured");

    // Cognito confidential clients authenticate the token request via HTTP Basic.
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const body = new URLSearchParams({ grant_type: "client_credentials" });
    if (scope) body.set("scope", scope);

    const response = await doFetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basic}`,
      },
      body,
    });
    if (!response.ok) throw new Error("platform_token_request_failed");
    const data = await response.json();
    cached = {
      token: data.access_token,
      expiresAt: now() + (Number(data.expires_in) || 300) * 1000,
    };
    return cached.token;
  };
}

module.exports = {
  createPlatformClient,
  createClientCredentialsTokenProvider,
};
