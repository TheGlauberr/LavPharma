import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { validateFrontmatter, type ResourceFrontmatter } from "./validate";
import { renderMarkdown } from "./render";
import { findAuthor } from "./authors";

const CONTENT_DIR = path.join(process.cwd(), "content", "resources");

export interface Resource extends ResourceFrontmatter {
  slug: string;
  locale: string;
  html: string;
}

/** Article folders: every directory not starting with "_" (ledgers, backlog). */
export function getResourceSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .sort();
}

const cache = new Map<string, Resource>();

/** Loads and validates one article. Throws so a bad article fails the build. */
export function getResource(slug: string, locale: string): Resource {
  const key = `${locale}/${slug}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const file = path.join(CONTENT_DIR, slug, `${locale}.md`);
  if (!fs.existsSync(file)) {
    throw new Error(`[resources] ${key}: missing file ${file}`);
  }
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const frontmatter = validateFrontmatter(data, key);
  if (frontmatter.reviewedBy && !findAuthor(frontmatter.reviewedBy)) {
    throw new Error(`[resources] ${key}: reviewedBy "${frontmatter.reviewedBy}" is not in AUTHORS`);
  }
  const resource: Resource = {
    ...frontmatter,
    slug,
    locale,
    html: renderMarkdown(content),
  };
  cache.set(key, resource);
  return resource;
}

/** All articles for a locale, newest first. */
export function getResources(locale: string): Resource[] {
  return getResourceSlugs()
    .map((slug) => getResource(slug, locale))
    .sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title));
}

export function getResourceParams(): { slug: string }[] {
  return getResourceSlugs().map((slug) => ({ slug }));
}

export function resourcePath(slug?: string): string {
  return slug ? `/resources/${slug}` : "/resources";
}


/** Formats a YYYY-MM-DD date for display, independent of the server time zone. */
export function formatDate(date: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-SV" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
