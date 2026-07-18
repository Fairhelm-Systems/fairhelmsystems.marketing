"use strict";

const { createHash, randomUUID } = require("node:crypto");
const { validateIntake } = require("./lib/validate");
const { buildCrmPayload } = require("./lib/map-payload");

const MAX_BODY_BYTES = 16_384;

function corsHeaders(origin, allowedOrigins) {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
  if (allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST,OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "600";
  }
  return headers;
}

function reply(statusCode, origin, allowedOrigins, body) {
  return {
    statusCode,
    headers: corsHeaders(origin, allowedOrigins),
    body: JSON.stringify(body),
  };
}

function headerValue(headers, name) {
  if (!headers) return "";
  const lower = name.toLowerCase();
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === lower) return headers[key] || "";
  }
  return "";
}

// Factory so tests can inject fakes; index.js wires the real dependencies.
// The handler never sees platform credentials/tokens — those live entirely in
// platformClient. It logs only a requestId + status, never PII or upstream
// bodies, and returns only a safe public shape.
function createHandler({
  platformClient,
  rateLimiter,
  allowedOrigins,
  rateSalt = "",
  logger = console,
  uuid = randomUUID,
}) {
  return async function handler(event) {
    const headers = event.headers || {};
    const origin = headerValue(headers, "origin");
    const method =
      event.httpMethod || event.requestContext?.http?.method || "POST";

    if (method === "OPTIONS") {
      return {
        statusCode: 204,
        headers: corsHeaders(origin, allowedOrigins),
        body: "",
      };
    }
    if (method !== "POST") {
      return reply(405, origin, allowedOrigins, {
        ok: false,
        error: "method_not_allowed",
      });
    }
    if (!allowedOrigins.includes(origin)) {
      return reply(403, origin, allowedOrigins, {
        ok: false,
        error: "forbidden",
      });
    }

    const raw = event.body || "";
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
      return reply(413, origin, allowedOrigins, {
        ok: false,
        error: "payload_too_large",
      });
    }

    let input;
    try {
      input = JSON.parse(raw);
    } catch {
      return reply(400, origin, allowedOrigins, {
        ok: false,
        error: "invalid_request",
      });
    }

    // Populated honeypot: accept silently (bots see success) and forward nothing.
    if (
      typeof input.honeypotField === "string" &&
      input.honeypotField.trim() !== ""
    ) {
      return reply(200, origin, allowedOrigins, { ok: true });
    }

    if (!validateIntake(input).valid) {
      return reply(400, origin, allowedOrigins, {
        ok: false,
        error: "invalid_request",
      });
    }

    // IP + user-agent are derived from the request, never trusted from the body.
    const sourceIp =
      event.requestContext?.identity?.sourceIp ||
      event.requestContext?.http?.sourceIp ||
      "0.0.0.0";
    const userAgent = headerValue(headers, "user-agent");
    const ipHash = createHash("sha256")
      .update(`${rateSalt}:${sourceIp}`)
      .digest("hex")
      .slice(0, 32);
    const requestId = uuid();

    try {
      if (!(await rateLimiter.check(ipHash))) {
        return reply(429, origin, allowedOrigins, {
          ok: false,
          error: "rate_limited",
        });
      }

      const payload = buildCrmPayload(input, {
        source: "marketing_contact_form",
        requestId,
        sourceIp,
        userAgent,
      });

      const result = await platformClient.submitMarketingIntake(payload);
      if (!result || !result.ok) {
        logger.warn?.("intake_upstream_rejected", {
          requestId,
          status: result?.status ?? null,
        });
        return reply(502, origin, allowedOrigins, {
          ok: false,
          error: "upstream_error",
        });
      }

      logger.info?.("intake_accepted", { requestId, status: result.status });
      return reply(200, origin, allowedOrigins, { ok: true });
    } catch (error) {
      // Log only the error NAME + requestId — never the message/stack (may carry
      // upstream detail or a token), PII, or the upstream response body.
      logger.error?.("intake_failed", {
        requestId,
        error: error?.name || "Error",
      });
      return reply(502, origin, allowedOrigins, {
        ok: false,
        error: "upstream_error",
      });
    }
  };
}

module.exports = { createHandler };
