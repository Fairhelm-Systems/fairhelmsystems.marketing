"use strict";

// Fetches and caches a secret from AWS Secrets Manager at RUNTIME, using the
// Lambda execution role (scoped to just this one ARN). The AWS SDK is required
// lazily so unit tests never load it. The secret is never stored in source, a
// plaintext CloudFormation parameter, or ordinary Lambda configuration.
//
// If the secret value is JSON with a `clientSecret` field, that field is
// returned; otherwise the raw string is used.
function createSecretsManagerSecretProvider({ secretArn }) {
  let client;
  let GetSecretValueCommand;
  let cachedValue;

  function ensureClient() {
    if (client) return;
    const {
      SecretsManagerClient,
      GetSecretValueCommand: Cmd,
    } = require("@aws-sdk/client-secrets-manager");
    client = new SecretsManagerClient({});
    GetSecretValueCommand = Cmd;
  }

  return async function getSecret() {
    if (cachedValue !== undefined) return cachedValue;
    if (!secretArn) return "";
    ensureClient();
    const result = await client.send(
      new GetSecretValueCommand({ SecretId: secretArn }),
    );
    const raw = result.SecretString || "";
    let value = raw;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.clientSecret === "string") {
        value = parsed.clientSecret;
      }
    } catch {
      // Not JSON — use the raw string as the secret.
    }
    cachedValue = value;
    return value;
  };
}

module.exports = { createSecretsManagerSecretProvider };
