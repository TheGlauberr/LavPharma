import { RSS_PATHS, SITE_NAME, SITE_URL, localizedUrl } from "@/lib/site";
import { getResources, resourcePath } from "./content";

const FEED_COPY: Record<string, { title: string; description: string; language: string }> = {
  en: {
    title: `${SITE_NAME} Resources`,
    description: "Regulatory guides for pharmaceutical and veterinary registration in Latin America.",
    language: "en",
  },
  es: {
    title: `${SITE_NAME} Recursos`,
    description: "Guías regulatorias de registro farmacéutico y veterinario en Latinoamérica.",
    language: "es",
  },
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: string): string {
  return new Date(`${date}T12:00:00Z`).toUTCString();
}

export function buildRssFeed(locale: string): string {
  const copy = FEED_COPY[locale];
  const items = getResources(locale)
    .map((resource) => {
      const url = localizedUrl(locale, resourcePath(resource.slug));
      return [
        "    <item>",
        `      <title>${escapeXml(resource.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(resource.description)}</description>`,
        `      <pubDate>${rfc822(resource.published)}</pubDate>`,
        ...resource.countries.map((c) => `      <category>${escapeXml(c)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(copy.title)}</title>`,
    `    <link>${localizedUrl(locale, resourcePath())}</link>`,
    `    <description>${escapeXml(copy.description)}</description>`,
    `    <language>${copy.language}</language>`,
    `    <atom:link href="${SITE_URL}${RSS_PATHS[locale]}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

export function rssResponse(locale: string): Response {
  return new Response(buildRssFeed(locale), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
