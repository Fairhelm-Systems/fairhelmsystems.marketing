"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { validateIntake } = require("../src/lib/validate");
const { buildCrmPayload } = require("../src/lib/map-payload");
const { createHandler } = require("../src/handler");

const ORIGINS = ["https://fairhelmsystems.com"];

function makeEvent(body, opts = {}) {
  return {
    httpMethod: opts.method || "POST",
    headers: {
      origin: opts.origin ?? "https://fairhelmsystems.com",
      "user-agent": opts.userAgent ?? "RealBrowser/1.0",
      ...(opts.headers || {}),
    },
    requestContext: { identity: { sourceIp: opts.sourceIp ?? "9.9.9.9" } },
    body: typeof body === "string" ? body : JSON.stringify(body),
  };
}

function validBody(overrides = {}) {
  return {
    idempotencyKey: "idem-123",
    contactName: "Asha Rao",
    contactEmail: "asha@example.edu",
    schoolName: "Green Valley School",
    message: "We want to evaluate SquareCampus for our trust.",
    consentContact: true,
    consentMarketing: false,
    honeypotField: "",
    ...overrides,
  };
}

function fakePlatform(result) {
  return {
    calls: [],
    result: result ?? { ok: true, status: 200 },
    throwErr: null,
    async submitMarketingIntake(payload) {
      this.calls.push(payload);
      if (this.throwErr) throw this.throwErr;
      return this.result;
    },
  };
}

const passLimiter = {
  async check() {
    return true;
  },
};
const blockLimiter = {
  async check() {
    return false;
  },
};

function fakeLogger() {
  const entries = [];
  const record =
    (level) =>
    (...args) =>
      entries.push({ level, args });
  return {
    entries,
    info: record("info"),
    warn: record("warn"),
    error: record("error"),
  };
}

function build(platform, opts = {}) {
  return createHandler({
    platformClient: platform,
    rateLimiter: opts.rateLimiter || passLimiter,
    allowedOrigins: ORIGINS,
    logger: opts.logger || fakeLogger(),
    uuid: () => "req-fixed",
    rateSalt: "test-salt",
  });
}

test("validation: idempotencyKey, schoolName, and one contact are required", () => {
  assert.equal(validateIntake(validBody()).valid, true);
  assert.equal(validateIntake(validBody({ idempotencyKey: "" })).valid, false);
  assert.equal(validateIntake(validBody({ schoolName: "" })).valid, false);
  assert.equal(
    validateIntake(validBody({ contactEmail: "", contactPhone: "" })).valid,
    false,
  );
  assert.equal(
    validateIntake(validBody({ contactEmail: "", contactPhone: "+91 900000" }))
      .valid,
    true,
  );
});

test("payload mapping: camelCase, country default, server context wins", () => {
  const payload = buildCrmPayload(
    validBody({
      country: "",
      sourceIp: "1.1.1.1",
      userAgent: "spoof",
      requestId: "spoof",
    }),
    {
      source: "marketing_contact_form",
      requestId: "req-x",
      sourceIp: "9.9.9.9",
      userAgent: "real",
    },
  );
  assert.equal(payload.source, "marketing_contact_form");
  assert.equal(payload.country, "India");
  assert.equal(payload.requestId, "req-x");
  assert.equal(payload.sourceIp, "9.9.9.9");
  assert.equal(payload.userAgent, "real");
  assert.equal(payload.honeypotField, "");
});

test("handler: happy path returns only { ok: true }", async () => {
  const platform = fakePlatform();
  const res = await build(platform)(makeEvent(validBody()));
  assert.equal(res.statusCode, 200);
  assert.deepEqual(JSON.parse(res.body), { ok: true });
  assert.equal(platform.calls.length, 1);
  assert.equal(platform.calls[0].source, "marketing_contact_form");
});

test("handler: IP/user-agent are server-derived, never trusted from body", async () => {
  const platform = fakePlatform();
  await build(platform)(
    makeEvent(
      validBody({ sourceIp: "6.6.6.6", userAgent: "evil", requestId: "evil" }),
    ),
  );
  const p = platform.calls[0];
  assert.equal(p.sourceIp, "9.9.9.9");
  assert.equal(p.userAgent, "RealBrowser/1.0");
  assert.equal(p.requestId, "req-fixed");
  assert.notEqual(p.requestId, "evil");
});

test("handler: idempotent retries forward the same key unchanged", async () => {
  const platform = fakePlatform();
  const handler = build(platform);
  const body = validBody({ idempotencyKey: "stable-key-9" });
  await handler(makeEvent(body));
  await handler(makeEvent(body));
  assert.equal(platform.calls.length, 2);
  assert.equal(platform.calls[0].idempotencyKey, "stable-key-9");
  assert.equal(platform.calls[1].idempotencyKey, "stable-key-9");
});

test("handler: marketing consent preserved, never coerced to true", async () => {
  const platform = fakePlatform();
  const handler = build(platform);
  await handler(makeEvent(validBody({ consentMarketing: false })));
  await handler(makeEvent(validBody({ consentMarketing: true })));
  await handler(makeEvent(validBody({ consentMarketing: undefined })));
  await handler(makeEvent(validBody({ consentMarketing: "true" })));
  assert.equal(platform.calls[0].consentMarketing, false);
  assert.equal(platform.calls[1].consentMarketing, true);
  assert.equal(platform.calls[2].consentMarketing, false);
  assert.equal(platform.calls[3].consentMarketing, false); // string is not true
});

test("handler: populated honeypot is dropped, upstream never called", async () => {
  const platform = fakePlatform();
  const res = await build(platform)(
    makeEvent(validBody({ honeypotField: "http://spam" })),
  );
  assert.equal(res.statusCode, 200);
  assert.deepEqual(JSON.parse(res.body), { ok: true });
  assert.equal(platform.calls.length, 0);
});

test("handler: rate limit returns 429, upstream not called", async () => {
  const platform = fakePlatform();
  const res = await build(platform, { rateLimiter: blockLimiter })(
    makeEvent(validBody()),
  );
  assert.equal(res.statusCode, 429);
  assert.equal(platform.calls.length, 0);
});

test("handler: upstream non-2xx -> 502 with no upstream detail", async () => {
  const platform = fakePlatform({ ok: false, status: 409 });
  const res = await build(platform)(makeEvent(validBody()));
  assert.equal(res.statusCode, 502);
  assert.deepEqual(JSON.parse(res.body), {
    ok: false,
    error: "upstream_error",
  });
});

test("handler: upstream throw -> 502, no secret leaks into response", async () => {
  const platform = fakePlatform();
  platform.throwErr = new Error("ECONNREFUSED 10.0.0.1 token=SUPERSECRET");
  const res = await build(platform)(makeEvent(validBody()));
  assert.equal(res.statusCode, 502);
  assert.ok(!res.body.includes("SUPERSECRET"));
  assert.ok(!res.body.includes("ECONNREFUSED"));
});

test("handler: disallowed origin -> 403, upstream not called", async () => {
  const platform = fakePlatform();
  const res = await build(platform)(
    makeEvent(validBody(), { origin: "https://evil.example" }),
  );
  assert.equal(res.statusCode, 403);
  assert.equal(platform.calls.length, 0);
});

test("no PII, credentials, or upstream body appear in logs or response", async () => {
  const logger = fakeLogger();
  const platform = fakePlatform({ ok: true, status: 200 });
  const body = validBody({
    contactEmail: "secret.person@example.edu",
    contactPhone: "+91 98765 43210",
    message: "highly confidential operational detail",
  });
  const res = await build(platform, { logger })(makeEvent(body));
  const logDump = JSON.stringify(logger.entries);
  for (const secret of [
    "secret.person@example.edu",
    "98765 43210",
    "highly confidential",
  ]) {
    assert.ok(!logDump.includes(secret), `log leaked: ${secret}`);
  }
  // Public response is only { ok: true } — no lead object / dedup details.
  assert.deepEqual(JSON.parse(res.body), { ok: true });
});
