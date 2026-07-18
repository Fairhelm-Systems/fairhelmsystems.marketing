"use strict";

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

// Required: idempotencyKey, schoolName, and at least one of contactEmail /
// contactPhone. Everything else is optional. Returns the missing requirements
// (empty === valid). Callers must NOT leak field-level detail to the public
// response — this list is for internal branching only.
function validateIntake(input) {
  if (!input || typeof input !== "object") {
    return { valid: false, missing: ["payload"] };
  }
  const missing = [];
  if (!isNonEmptyString(input.idempotencyKey)) missing.push("idempotencyKey");
  if (!isNonEmptyString(input.schoolName)) missing.push("schoolName");
  if (
    !isNonEmptyString(input.contactEmail) &&
    !isNonEmptyString(input.contactPhone)
  ) {
    missing.push("contact");
  }
  return { valid: missing.length === 0, missing };
}

module.exports = { validateIntake, isNonEmptyString };
