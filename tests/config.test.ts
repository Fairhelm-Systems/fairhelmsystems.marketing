import { siteConfig, squareCampusUrl } from "../src/lib/site-config";
import { assert, suite, test } from "./harness";
import { findStaleClaims } from "./stale-claims";

suite("canonical company facts (lib/site-config.ts)");

test("legal identity is the registered form", () => {
  assert.equal(siteConfig.legalName, "FAIRHELM SYSTEMS (OPC) PRIVATE LIMITED");
  assert.match(siteConfig.cin, /^[LU]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/);
  assert.equal(siteConfig.incorporationDate, "2026-08-05");
  assert.ok(siteConfig.address.full.includes("Karnataka"));
});

test("positioning is product-first and names the flagship product", () => {
  assert.match(siteConfig.description, /SquareCampus/);
  assert.match(siteConfig.descriptionLong, /product-first technology company/);
  assert.match(siteConfig.descriptionLong, /School Operating System/);
  assert.ok(siteConfig.positioning.isNot.length >= 3);
});

test("SquareCampus is canonical at squarecampus.com with a stable entity id", () => {
  assert.equal(siteConfig.product.url, "https://squarecampus.com/");
  assert.equal(squareCampusUrl, siteConfig.product.url);
  assert.equal(
    siteConfig.product.schemaId,
    "https://squarecampus.com/#software",
  );
  assert.equal(siteConfig.product.category, "School Operating System");
  assert.match(
    siteConfig.product.relationship,
    /develops and operates SquareCampus/,
  );
});

test("the services surface is bounded and the exclusions are explicit", () => {
  assert.equal(siteConfig.services.lanes.length, 2);
  for (const lane of siteConfig.services.lanes) {
    assert.ok(
      siteConfig.publicPages.includes(lane.href),
      `${lane.href} is not a public page`,
    );
  }
  assert.ok(siteConfig.services.outOfScope.length >= 5);
  assert.ok(
    siteConfig.services.outOfScope.some((s) => /custom software/i.test(s)),
  );
  assert.ok(
    siteConfig.services.outOfScope.some((s) => /staff augmentation/i.test(s)),
  );
});

test("no unverified sameAs profile and no recognition is published", () => {
  assert.deepEqual([...siteConfig.sameAs], []);
  assert.deepEqual([...siteConfig.recognitions], []);
});

test("the config itself carries no stale claim", () => {
  const text = JSON.stringify(siteConfig);
  assert.deepEqual(
    findStaleClaims(text).map((h) => String(h.pattern)),
    [],
  );
  assert.doesNotMatch(text, /DPIIT|Startup India/i);
});
