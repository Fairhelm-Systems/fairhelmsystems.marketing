"use strict";

// Contact-inquiry handler: validates, rate-limits, and persists inquiries to
// DynamoDB. Layered abuse protection (honeypot + submit-timing + strict schema
// + per-IP throttle + origin allowlist) runs here; WAF (optional) sits in front.
// Uses the AWS SDK v3 that ships preinstalled in the nodejs20.x runtime — no
// bundling step required.

const {
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const { randomUUID, createHash } = require("node:crypto");

const ddb = new DynamoDBClient({});

const TABLE_NAME = process.env.TABLE_NAME;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const RATE_LIMIT_PER_HOUR = Number(process.env.RATE_LIMIT_PER_HOUR || "5");
const MIN_SUBMIT_MS = Number(process.env.MIN_SUBMIT_MS || "3000");
const MAX_BODY_BYTES = Number(process.env.MAX_BODY_BYTES || "8192");
const RATE_SALT = process.env.RATE_SALT || "fairhelm";

// Mirror of the frontend's work types (src/components/site/contact-inquiry.tsx).
const WORK_TYPES = new Set([
  "school-os",
  "data-pipeline",
  "dashboard",
  "internal-system",
  "existing-product",
  "governed-ai",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-field length bounds. min > 0 means the field is required.
const FIELD_LIMITS = {
  problem: { min: 20, max: 1200 },
  name: { min: 1, max: 120 },
  organization: { min: 1, max: 160 },
  email: { min: 3, max: 254 },
  workTypeLabel: { min: 0, max: 80 },
  source: { min: 0, max: 120 },
};

function corsHeaders(origin) {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
  if (ALLOWED_ORIGINS.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST,OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "600";
  }
  return headers;
}

function respond(statusCode, origin, body) {
  return { statusCode, headers: corsHeaders(origin), body: JSON.stringify(body) };
}

function validate(input) {
  if (!input || typeof input !== "object") return "Malformed payload.";
  if (!WORK_TYPES.has(input.workType)) return "Invalid work type.";

  for (const [field, { min, max }] of Object.entries(FIELD_LIMITS)) {
    const value = input[field];
    if (value === undefined || value === null || value === "") {
      if (min > 0) return `Missing field: ${field}.`;
      continue;
    }
    if (typeof value !== "string") return `Invalid field: ${field}.`;
    const length = value.trim().length;
    if (length < min || length > max) return `Invalid length: ${field}.`;
  }

  if (!EMAIL_RE.test(String(input.email).trim())) return "Invalid email.";
  return null;
}

// Atomic per-IP counter in a rolling hourly window, self-expiring via TTL.
async function withinRateLimit(ipHash) {
  const bucket = Math.floor(Date.now() / 3_600_000);
  const expireAt = (bucket + 1) * 3600; // epoch seconds, for DynamoDB TTL
  const result = await ddb.send(
    new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: marshall({ pk: `RATE#${ipHash}#${bucket}` }),
      UpdateExpression:
        "ADD reqcount :one SET expireAt = if_not_exists(expireAt, :exp)",
      ExpressionAttributeValues: marshall({ ":one": 1, ":exp": expireAt }),
      ReturnValues: "UPDATED_NEW",
    }),
  );
  const count = Number(result.Attributes?.reqcount?.N || "0");
  return count <= RATE_LIMIT_PER_HOUR;
}

exports.handler = async (event) => {
  const headers = event.headers || {};
  const origin = headers.origin || headers.Origin || "";
  const method =
    event.httpMethod || event.requestContext?.http?.method || "POST";

  if (method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(origin), body: "" };
  }
  if (method !== "POST") {
    return respond(405, origin, { ok: false, error: "Method not allowed." });
  }

  // Only accept submissions from known site origins.
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return respond(403, origin, { ok: false, error: "Origin not allowed." });
  }

  const raw = event.body || "";
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return respond(413, origin, { ok: false, error: "Payload too large." });
  }

  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return respond(400, origin, { ok: false, error: "Invalid JSON." });
  }

  // Silent bot drops: return 200 with no persistence so a bot cannot tell a
  // drop from a real success. Honeypot must be empty; humans can't submit in
  // under MIN_SUBMIT_MS.
  const honeypotTripped =
    typeof input.company_website === "string" &&
    input.company_website.trim() !== "";
  const tooFast =
    typeof input.elapsedMs === "number" && input.elapsedMs < MIN_SUBMIT_MS;
  if (honeypotTripped || tooFast) {
    return respond(200, origin, { ok: true });
  }

  const invalid = validate(input);
  if (invalid) {
    return respond(400, origin, { ok: false, error: invalid });
  }

  const sourceIp =
    event.requestContext?.identity?.sourceIp ||
    event.requestContext?.http?.sourceIp ||
    "0.0.0.0";
  const ipHash = createHash("sha256")
    .update(`${RATE_SALT}:${sourceIp}`)
    .digest("hex")
    .slice(0, 32);

  try {
    if (!(await withinRateLimit(ipHash))) {
      return respond(429, origin, {
        ok: false,
        error: "Too many submissions. Please try again later.",
      });
    }

    const item = {
      pk: `INQUIRY#${randomUUID()}`,
      type: "inquiry",
      workType: input.workType,
      workTypeLabel: String(input.workTypeLabel || "").slice(0, 80),
      problem: String(input.problem).trim().slice(0, 1200),
      name: String(input.name).trim().slice(0, 120),
      organization: String(input.organization).trim().slice(0, 160),
      email: String(input.email).trim().slice(0, 254),
      source: String(input.source || "").slice(0, 120),
      createdAt: new Date().toISOString(),
      ipHash,
      userAgent: String(headers["user-agent"] || headers["User-Agent"] || "").slice(
        0,
        400,
      ),
    };

    await ddb.send(
      new PutItemCommand({
        TableName: TABLE_NAME,
        Item: marshall(item, { removeUndefinedValues: true }),
      }),
    );

    return respond(200, origin, { ok: true });
  } catch (error) {
    console.error("inquiry_error", error);
    return respond(500, origin, { ok: false, error: "Server error." });
  }
};
