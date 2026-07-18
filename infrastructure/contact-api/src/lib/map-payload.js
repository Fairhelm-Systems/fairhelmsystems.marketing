"use strict";

const MAX = {
  idempotencyKey: 64,
  contactName: 200,
  contactEmail: 254,
  contactPhone: 40,
  contactRole: 120,
  schoolName: 200,
  schoolWebsite: 300,
  city: 120,
  state: 120,
  country: 80,
  boardAffiliation: 120,
  studentCountRange: 60,
  message: 4000,
  campaignSource: 200,
  campaignMedium: 200,
  campaignName: 200,
  referrer: 500,
  landingPage: 500,
};

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Build the upstream CRM payload from the browser input plus server-derived
// context. Server context (source, requestId, sourceIp, userAgent) ALWAYS wins
// over anything the browser supplied. Consent flags are read strictly and never
// coerced to true. honeypotField is always sent empty (populated ones are
// rejected before mapping).
function buildCrmPayload(input, ctx) {
  return {
    source: ctx.source,
    idempotencyKey: clean(input.idempotencyKey, MAX.idempotencyKey),
    contactName: clean(input.contactName, MAX.contactName),
    contactEmail: clean(input.contactEmail, MAX.contactEmail),
    contactPhone: clean(input.contactPhone, MAX.contactPhone),
    contactRole: clean(input.contactRole, MAX.contactRole),
    schoolName: clean(input.schoolName, MAX.schoolName),
    schoolWebsite: clean(input.schoolWebsite, MAX.schoolWebsite),
    city: clean(input.city, MAX.city),
    state: clean(input.state, MAX.state),
    country: clean(input.country, MAX.country) || "India",
    boardAffiliation: clean(input.boardAffiliation, MAX.boardAffiliation),
    studentCountRange: clean(input.studentCountRange, MAX.studentCountRange),
    message: clean(input.message, MAX.message),
    consentContact: input.consentContact === true,
    consentMarketing: input.consentMarketing === true,
    campaignSource: clean(input.campaignSource, MAX.campaignSource),
    campaignMedium: clean(input.campaignMedium, MAX.campaignMedium),
    campaignName: clean(input.campaignName, MAX.campaignName),
    referrer: clean(input.referrer, MAX.referrer),
    landingPage: clean(input.landingPage, MAX.landingPage),
    requestId: ctx.requestId,
    sourceIp: ctx.sourceIp,
    userAgent: ctx.userAgent,
    honeypotField: "",
  };
}

module.exports = { buildCrmPayload };
