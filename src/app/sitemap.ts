import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { languageAlternates, localizedUrl } from "@/lib/site";
import { getResources, resourcePath } from "@/lib/resources/content";

type Entry = MetadataRoute.Sitemap[number];

function localizedEntries(path: string, extra: Omit<Entry, "url" | "alternates">): Entry[] {
  return routing.locales.map((locale) => ({
    url: localizedUrl(locale, path),
    alternates: { languages: languageAlternates(path) },
    ...extra,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getResources(routing.defaultLocale);
  const latest = articles.reduce<string | undefined>(
    (max, a) => (max && max > a.updated ? max : a.updated),
    undefined,
  );

  return [
    ...localizedEntries("", { lastModified: new Date(), changeFrequency: "weekly", priority: 1 }),
    ...localizedEntries(resourcePath(), {
      lastModified: latest ? new Date(latest) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    ...articles.flatMap((article) =>
      localizedEntries(resourcePath(article.slug), {
        lastModified: new Date(article.updated),
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),
  ];
}
