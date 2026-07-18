"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  createPlatformClient,
  createClientCredentialsTokenProvider,
} = require("../src/lib/platform-client");

test("token provider: Cognito client-credentials with custom scope, cached", async () => {
  let calls = 0;
  const fetchImpl = async (url, opts) => {
    calls += 1;
    assert.equal(url, "https://cognito.example/oauth2/token");
    assert.match(opts.headers.Authorization, /^Basic /);
    const body = opts.body.toString();
    assert.ok(body.includes("grant_type=client_credentials"));
    assert.ok(body.includes("squarecampus-platform")); // custom scope, url-encoded
    return {
      ok: true,
      json: async () => ({ access_token: "tok-1", expires_in: 3600 }),
    };
  };
  const getToken = createClientCredentialsTokenProvider({
    tokenUrl: "https://cognito.example/oauth2/token",
    clientId: "client-abc",
    getClientSecret: async () => "shh",
    scope: "squarecampus-platform/crm.intake",
    fetchImpl,
    now: () => 1000,
  });
  assert.equal(await getToken(), "tok-1");
  assert.equal(await getToken(), "tok-1"); // served from cache
  assert.equal(calls, 1);
});

test("token provider: fails closed when unconfigured", async () => {
  const getToken = createClientCredentialsTokenProvider({
    tokenUrl: "",
    clientId: "",
    getClientSecret: null,
  });
  await assert.rejects(() => getToken(), /platform_auth_not_configured/);
});

test("token provider: fails closed when the secret is empty", async () => {
  const getToken = createClientCredentialsTokenProvider({
    tokenUrl: "https://cognito.example/oauth2/token",
    clientId: "client-abc",
    getClientSecret: async () => "",
    fetchImpl: async () => {
      throw new Error("should not be reached");
    },
  });
  await assert.rejects(() => getToken(), /platform_auth_not_configured/);
});

test("platform client: posts to marketing-intake with bearer, returns status only", async () => {
  let captured;
  const fetchImpl = async (url, opts) => {
    captured = { url, opts };
    return {
      ok: true,
      status: 200,
      json: async () => ({ leadId: "SECRET-LEAD", duplicate: true }),
    };
  };
  const client = createPlatformClient({
    baseUrl: "https://platform.example",
    getToken: async () => "tok-xyz",
    fetchImpl,
  });
  const result = await client.submitMarketingIntake({
    requestId: "r1",
    idempotencyKey: "k1",
  });
  assert.equal(
    captured.url,
    "https://platform.example/api/platform/v1/crm/marketing-intake",
  );
  assert.equal(captured.opts.headers.Authorization, "Bearer tok-xyz");
  assert.equal(captured.opts.headers["Idempotency-Key"], "k1");
  // Only status is surfaced; the upstream lead object never leaks out.
  assert.deepEqual(result, { ok: true, status: 200 });
  assert.equal(result.leadId, undefined);
});

test("platform client: fails closed when baseUrl unset", async () => {
  const client = createPlatformClient({
    baseUrl: "",
    getToken: async () => "t",
  });
  await assert.rejects(
    () => client.submitMarketingIntake({ requestId: "r", idempotencyKey: "k" }),
    /platform_not_configured/,
  );
});
