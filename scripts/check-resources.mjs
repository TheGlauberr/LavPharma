// Prebuild content gate for content/resources. Full schema validation also runs
// in src/lib/resources/validate.ts during the build; this gives fast, plain errors.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content", "resources");
const LOCALES = ["en", "es"];
const MIN_SOURCES = 3;
const DESCRIPTION = { min: 140, max: 160 };
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const EM_DASH = /\u2014/;

function toDateString(value) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : value;
}

function checkFile(slug, locale) {
  const file = path.join(ROOT, slug, `${locale}.md`);
  if (!fs.existsSync(file)) return [`${slug}: missing ${locale}.md`];

  const raw = fs.readFileSync(file, "utf8");
  const { data } = matter(raw);
  const where = `${slug}/${locale}.md`;
  const errors = [];

  const description = typeof data.description === "string" ? data.description.trim() : "";
  if (description.length < DESCRIPTION.min || description.length > DESCRIPTION.max) {
    errors.push(`${where}: description is ${description.length} chars (want ${DESCRIPTION.min} to ${DESCRIPTION.max})`);
  }
  if (!Array.isArray(data.faq) || data.faq.length === 0) {
    errors.push(`${where}: faq is missing`);
  }
  const sources = Array.isArray(data.sources) ? data.sources : [];
  const dated = sources.filter((s) => s && ISO_DATE.test(String(toDateString(s.accessed))));
  if (dated.length < MIN_SOURCES) {
    errors.push(`${where}: needs at least ${MIN_SOURCES} sources with an accessed date (found ${dated.length})`);
  }
  if (EM_DASH.test(raw)) {
    errors.push(`${where}: contains an em dash; use a comma, colon or period instead`);
  }
  return errors;
}

function main() {
  if (!fs.existsSync(ROOT)) {
    console.log("check-resources: no content/resources folder, nothing to check");
    return;
  }
  const slugs = fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
    .map((d) => d.name);

  const errors = slugs.flatMap((slug) => LOCALES.flatMap((locale) => checkFile(slug, locale)));
  if (errors.length > 0) {
    console.error(`check-resources: ${errors.length} problem(s)\n- ${errors.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`check-resources: ${slugs.length} article(s) OK in ${LOCALES.join(" and ")}`);
}

main();
