import { routing } from "@/i18n/routing";

export const SITE_URL = "https://lavpharma.com";
export const SITE_NAME = "LAV PHARMA";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const WHATSAPP_NUMBER = "50372384539";

export type Locale = (typeof routing.locales)[number];

/** Absolute URL for a locale-relative path. Spanish (default) has no prefix. */
export function localizedUrl(locale: string, path = ""): string {
  const clean = path === "/" ? "" : path;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${clean}` || SITE_URL;
}

/** hreflang map (en, es, x-default) for a locale-relative path. */
export function languageAlternates(path = ""): Record<string, string> {
  return {
    en: localizedUrl("en", path),
    es: localizedUrl("es", path),
    "x-default": localizedUrl(routing.defaultLocale, path),
  };
}

export const RSS_PATHS: Record<string, string> = {
  en: "/rss.xml",
  es: "/rss-es.xml",
};

/** Metadata alternates.types entry pointing to the feed for a locale. */
export function rssAlternates(locale: string): Record<string, string> {
  return { "application/rss+xml": `${SITE_URL}${RSS_PATHS[locale] ?? RSS_PATHS.es}` };
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** WhatsApp link used by the site-wide buttons. */
export const DEFAULT_WHATSAPP_URL = whatsappUrl("Hola, los contacto desde lavpharma.com");
