"use strict";

// DynamoDB-backed per-IP rate limiter: an atomic hourly counter that self-expires
// via TTL. The AWS SDK is required lazily inside the factory so unit tests (which
// inject a fake limiter) never load it.
function createDynamoRateLimiter({ tableName, limitPerHour, now = Date.now }) {
  let client;
  let marshall;
  let UpdateItemCommand;

  function ensureClient() {
    if (client) return;
    const {
      DynamoDBClient,
      UpdateItemCommand: Cmd,
    } = require("@aws-sdk/client-dynamodb");
    client = new DynamoDBClient({});
    marshall = require("@aws-sdk/util-dynamodb").marshall;
    UpdateItemCommand = Cmd;
  }

  return {
    async check(ipHash) {
      ensureClient();
      const bucket = Math.floor(now() / 3_600_000);
      const expireAt = (bucket + 1) * 3600; // epoch seconds, DynamoDB TTL
      const result = await client.send(
        new UpdateItemCommand({
          TableName: tableName,
          Key: marshall({ pk: `RATE#${ipHash}#${bucket}` }),
          UpdateExpression:
            "ADD reqcount :one SET expireAt = if_not_exists(expireAt, :exp)",
          ExpressionAttributeValues: marshall({ ":one": 1, ":exp": expireAt }),
          ReturnValues: "UPDATED_NEW",
        }),
      );
      const count = Number(result.Attributes?.reqcount?.N || "0");
      return count <= limitPerHour;
    },
  };
}

module.exports = { createDynamoRateLimiter };
