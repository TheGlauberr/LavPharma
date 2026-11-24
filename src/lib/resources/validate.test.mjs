// Run with: npm test (Node strips the TypeScript types of validate.ts).
import { test } from "node:test";
import assert from "node:assert/strict";
import { validateFrontmatter } from "./validate.ts";

const DESCRIPTION =
  "Step by step guide to registering a human medicine with the regulator, with the documents a foreign manufacturer must provide and who can hold it.";

function validRaw(overrides = {}) {
  return {
    title: "Example",
    description: DESCRIPTION,
    answer: "Short answer.",
    targetQuery: "example query",
    type: "guide",
    countries: ["El Salvador"],
    sector: "human",
    published: "2026-11-24",
    updated: "2026-11-24",
    lastVerified: new Date("2026-11-24T00:00:00Z"),
    faq: [{ q: "Question?", a: "Answer." }],
    sources: [
      { title: "Law", publisher: "Agency", url: "https://example.gov/law.pdf", accessed: "2026-11-24" },
    ],
    related: [],
    ...overrides,
  };
}

test("accepts valid frontmatter and normalizes YAML dates", () => {
  const result = validateFrontmatter(validRaw(), "fixture");
  assert.equal(result.lastVerified, "2026-11-24");
  assert.equal(result.reviewedBy, undefined);
  assert.equal(result.sources.length, 1);
});

test("rejects a description outside 140 to 160 characters", () => {
  assert.throws(() => validateFrontmatter(validRaw({ description: "Too short." }), "fixture"), /description/);
});

test("rejects a missing answer", () => {
  assert.throws(() => validateFrontmatter(validRaw({ answer: undefined }), "fixture"), /answer/);
});

test("rejects an unknown article type", () => {
  assert.throws(() => validateFrontmatter(validRaw({ type: "blog" }), "fixture"), /"type"/);
});

test("rejects a malformed date", () => {
  assert.throws(() => validateFrontmatter(validRaw({ published: "24/11/2026" }), "fixture"), /published/);
});

test("rejects an empty FAQ list", () => {
  assert.throws(() => validateFrontmatter(validRaw({ faq: [] }), "fixture"), /faq/);
});

test("rejects a source without an http url", () => {
  const sources = [{ title: "Law", publisher: "Agency", url: "ftp://x", accessed: "2026-11-24" }];
  assert.throws(() => validateFrontmatter(validRaw({ sources }), "fixture"), /url/);
});

test("rejects an empty reviewedBy", () => {
  assert.throws(() => validateFrontmatter(validRaw({ reviewedBy: " " }), "fixture"), /reviewedBy/);
});

test("rejects missing frontmatter", () => {
  assert.throws(() => validateFrontmatter(null, "fixture"), /missing/);
});
