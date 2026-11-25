// Frontmatter schema for Resources articles. Kept free of runtime imports so
// the Node test runner can load it directly (node --test strips the types).

export const RESOURCE_TYPES = ["guide", "explainer", "hub", "digest"] as const;
export const RESOURCE_SECTORS = ["human", "vet"] as const;
export const DESCRIPTION_MIN = 140;
export const DESCRIPTION_MAX = 160;

export type ResourceType = (typeof RESOURCE_TYPES)[number];
export type ResourceSector = (typeof RESOURCE_SECTORS)[number];

export interface ResourceFaq {
  q: string;
  a: string;
}

export interface ResourceSource {
  title: string;
  publisher: string;
  url: string;
  accessed: string;
}

export interface ResourceFrontmatter {
  title: string;
  description: string;
  /** 2 to 4 sentence direct answer shown in a box under the H1. */
  answer: string;
  targetQuery: string;
  type: ResourceType;
  countries: string[];
  sector: ResourceSector;
  published: string;
  updated: string;
  lastVerified: string;
  reviewedBy?: string;
  faq: ResourceFaq[];
  sources: ResourceSource[];
  related: string[];
}

type Raw = Record<string, unknown>;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function fail(where: string, message: string): never {
  throw new Error(`[resources] ${where}: ${message}`);
}

function readString(raw: Raw, key: string, where: string): string {
  const value = raw[key];
  if (typeof value !== "string" || value.trim() === "") {
    fail(where, `"${key}" must be a non-empty string`);
  }
  return value.trim();
}

// YAML parses bare dates into Date objects; accept both and normalize.
function readDate(raw: Raw, key: string, where: string): string {
  const value = raw[key];
  const text = value instanceof Date ? value.toISOString().slice(0, 10) : value;
  if (typeof text !== "string" || !ISO_DATE.test(text)) {
    fail(where, `"${key}" must be a date in YYYY-MM-DD format`);
  }
  return text;
}

function readStringList(raw: Raw, key: string, where: string, allowEmpty: boolean): string[] {
  const value = raw[key] ?? [];
  if (!Array.isArray(value) || value.some((v) => typeof v !== "string" || v.trim() === "")) {
    fail(where, `"${key}" must be a list of non-empty strings`);
  }
  if (!allowEmpty && value.length === 0) {
    fail(where, `"${key}" must not be empty`);
  }
  return value.map((v: string) => v.trim());
}

function readEnum<T extends string>(raw: Raw, key: string, allowed: readonly T[], where: string): T {
  const value = readString(raw, key, where);
  if (!allowed.includes(value as T)) {
    fail(where, `"${key}" must be one of ${allowed.join(", ")}`);
  }
  return value as T;
}

function readFaq(raw: Raw, where: string): ResourceFaq[] {
  const value = raw.faq;
  if (!Array.isArray(value) || value.length === 0) {
    fail(where, `"faq" must be a non-empty list`);
  }
  return value.map((item, i) => {
    const entry = (item ?? {}) as Raw;
    const at = `${where} faq[${i}]`;
    return { q: readString(entry, "q", at), a: readString(entry, "a", at) };
  });
}

function readSources(raw: Raw, where: string): ResourceSource[] {
  const value = raw.sources;
  if (!Array.isArray(value) || value.length === 0) {
    fail(where, `"sources" must be a non-empty list`);
  }
  return value.map((item, i) => {
    const entry = (item ?? {}) as Raw;
    const at = `${where} sources[${i}]`;
    const url = readString(entry, "url", at);
    if (!/^https?:\/\//.test(url)) {
      fail(at, `"url" must start with http:// or https://`);
    }
    return {
      title: readString(entry, "title", at),
      publisher: readString(entry, "publisher", at),
      url,
      accessed: readDate(entry, "accessed", at),
    };
  });
}

export function validateFrontmatter(raw: unknown, where: string): ResourceFrontmatter {
  if (raw === null || typeof raw !== "object") {
    fail(where, "frontmatter is missing");
  }
  const data = raw as Raw;
  const description = readString(data, "description", where);
  if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) {
    fail(
      where,
      `"description" must be ${DESCRIPTION_MIN} to ${DESCRIPTION_MAX} characters (got ${description.length})`,
    );
  }
  const reviewedBy = data.reviewedBy;
  if (reviewedBy !== undefined && (typeof reviewedBy !== "string" || reviewedBy.trim() === "")) {
    fail(where, `"reviewedBy" must be a non-empty string when set`);
  }

  return {
    title: readString(data, "title", where),
    description,
    answer: readString(data, "answer", where),
    targetQuery: readString(data, "targetQuery", where),
    type: readEnum(data, "type", RESOURCE_TYPES, where),
    countries: readStringList(data, "countries", where, false),
    sector: readEnum(data, "sector", RESOURCE_SECTORS, where),
    published: readDate(data, "published", where),
    updated: readDate(data, "updated", where),
    lastVerified: readDate(data, "lastVerified", where),
    reviewedBy: typeof reviewedBy === "string" ? reviewedBy.trim() : undefined,
    faq: readFaq(data, where),
    sources: readSources(data, where),
    related: readStringList(data, "related", where, true),
  };
}
