import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import FeaturedResource from "@/components/resources/FeaturedResource";
import ResourceRow from "@/components/resources/ResourceRow";
import { getResources, resourcePath } from "@/lib/resources/content";
import { resourcesMetadata } from "@/lib/resources/metadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Resources" });
  return resourcesMetadata({
    locale,
    path: resourcePath(),
    title: t("metaTitle"),
    description: t("metaDescription"),
    type: "website",
  });
}

export default async function ResourcesIndex({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Resources");
  const [featured, ...rest] = getResources(locale);

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F0F6FF] to-[#E4EEFB] pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="pointer-events-none absolute top-[-10%] right-[5%] h-[420px] w-[420px] rounded-full bg-accent-blue/[0.07] blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-accent-blue/10 rounded-full px-3.5 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_0_3px_rgba(43,108,223,0.18)]" />
            <span className="text-accent-deep text-[11px] tracking-[0.18em] uppercase font-semibold">
              {t("badge")}
            </span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h1 className="text-navy-darker text-4xl sm:text-5xl lg:text-6xl font-display font-medium leading-[1.05] tracking-tight">
              {t.rich("title", {
                em: (chunks) => <em className="italic font-normal text-accent-deep">{chunks}</em>,
              })}
            </h1>
            <p className="text-gray-500 text-base lg:text-[17px] leading-relaxed max-w-md lg:justify-self-end">
              {t("lead")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
          {featured ? (
            <FeaturedResource article={featured} locale={locale} />
          ) : (
            <p className="py-16 text-muted text-lg">{t("empty")}</p>
          )}

          {rest.length > 0 ? (
            <div className="mt-20 grid gap-8 lg:grid-cols-[14rem_1fr]">
              <h2 className="text-[11px] tracking-[0.18em] uppercase font-semibold text-accent-deep lg:pt-8">
                {t("all")}
              </h2>
              <ul className="border-b border-card-border">
                {rest.map((article) => (
                  <ResourceRow key={article.slug} article={article} locale={locale} />
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
      <Footer />
    </main>
  );
}
