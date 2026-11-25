import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getTranslations, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import { localizedUrl, languageAlternates, rssAlternates, SITE_NAME } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://lavpharma.com"),
    keywords: locale === "en"
      ? "pharmaceutical registration Latin America, sanitary registration LATAM, veterinary product registration, regulatory affairs Central America, drug registration El Salvador Guatemala Honduras, dossier management, regulatory compliance, import permits pharmaceutical"
      : "registro sanitario Latinoamérica, registro farmacéutico LATAM, registro productos veterinarios, asuntos regulatorios Centroamérica, registro medicamentos El Salvador Guatemala Honduras, gestión de dossiers, cumplimiento regulatorio, permisos de importación farmacéuticos",
    alternates: {
      canonical: localizedUrl(locale),
      languages: languageAlternates(),
      types: rssAlternates(locale),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: localizedUrl(locale),
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`scroll-smooth ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <WhatsAppButton />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
