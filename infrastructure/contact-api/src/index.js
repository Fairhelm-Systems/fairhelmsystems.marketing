"use strict";

// Lambda entry point: wires the real dependencies and delegates to the testable
// handler factory. This proxies the public marketing form to the SquareCampus
// platform CRM; the browser never sees platform credentials. There is NO local
// lead store and NO fallback — it fails closed if the relay/auth is unavailable.

const { createHandler } = require("./handler");
const { createDynamoRateLimiter } = require("./lib/rate-limit");
const { createSecretsManagerSecretProvider } = require("./lib/secret");
const {
  createPlatformClient,
  createClientCredentialsTokenProvider,
} = require("./lib/platform-client");

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// DynamoDB is used ONLY for abuse rate-limit counters — never for lead storage.
const rateLimiter = createDynamoRateLimiter({
  tableName: process.env.TABLE_NAME,
  limitPerHour: Number(process.env.RATE_LIMIT_PER_HOUR || "5"),
});

// Cognito M2M machine identity restricted to platform_crm:intake. The client
// secret is fetched at runtime from Secrets Manager via the execution role
// (scoped to just this ARN) — never in env or source.
const getClientSecret = createSecretsManagerSecretProvider({
  secretArn: process.env.PLATFORM_CLIENT_SECRET_ARN,
});

const getToken = createClientCredentialsTokenProvider({
  tokenUrl: process.env.PLATFORM_TOKEN_URL,
  clientId: process.env.PLATFORM_CLIENT_ID,
  getClientSecret,
  scope: process.env.PLATFORM_SCOPE || "squarecampus-platform/crm.intake",
});

const platformClient = createPlatformClient({
  baseUrl: process.env.PLATFORM_BASE_URL,
  getToken,
});

exports.handler = createHandler({
  platformClient,
  rateLimiter,
  allowedOrigins,
  rateSalt: process.env.RATE_SALT || "",
});
