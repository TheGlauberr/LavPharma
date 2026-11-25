import type { Metadata } from "next";
import { SITE_NAME, languageAlternates, localizedUrl, rssAlternates } from "@/lib/site";

interface PageMetadataInput {
  locale: string;
  path: string;
  title: string;
  description: string;
  type: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/** Self canonical, hreflang en/es/x-default, RSS link and Open Graph for a Resources page. */
export function resourcesMetadata(input: PageMetadataInput): Metadata {
  const url = localizedUrl(input.locale, input.path);
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: languageAlternates(input.path),
      types: rssAlternates(input.locale),
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      locale: input.locale === "es" ? "es_ES" : "en_US",
      type: input.type,
      ...(input.type === "article"
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}
