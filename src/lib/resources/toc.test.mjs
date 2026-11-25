// Run with: npm test (Node strips the TypeScript types of toc.ts).
import { test } from "node:test";
import assert from "node:assert/strict";
import { extractHeadings } from "./toc.ts";

test("returns h2 ids and plain text in document order", () => {
  const html = '<h2 id="key-facts">Key facts</h2><p>x</p><h3 id="sub">Sub</h3><h2 id="fees">Fees</h2>';
  assert.deepEqual(extractHeadings(html), [
    { id: "key-facts", text: "Key facts" },
    { id: "fees", text: "Fees" },
  ]);
});

test("strips inline markup, footnotes and decodes entities", () => {
  const html = '<h2 id="a">Rules &amp; <em>law</em><sup><a href="#source-1">1</a></sup></h2>';
  assert.deepEqual(extractHeadings(html), [{ id: "a", text: "Rules & law" }]);
});

test("returns an empty list when there are no h2 headings", () => {
  assert.deepEqual(extractHeadings("<p>No headings</p>"), []);
});
