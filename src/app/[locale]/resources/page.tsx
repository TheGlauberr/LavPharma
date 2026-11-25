import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import FeaturedResource from "@/components/resources/FeaturedResource";
import ResourceRow from "@/components/resources/ResourceRow";
import Reveal from "@/components/ui/Reveal";
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
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="hairline-grid pointer-events-none absolute inset-0" />
        <div className="wrap relative grid gap-6 py-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-[72px] lg:py-[104px]">
          <div>
            <p className="eyebrow">{t("badge")}</p>
            <h1 className="mt-6 text-[clamp(38px,5vw,68px)] font-semibold leading-[1.0] tracking-[-0.045em] text-balance">
              {t.rich("title", { em: (chunks) => <em className="not-italic text-accent-deep">{chunks}</em> })}
            </h1>
          </div>
          <p className="lead max-w-[460px]">{t("lead")}</p>
        </div>
      </section>

      <section className="border-t border-line pt-10 pb-[72px] lg:pt-14 lg:pb-[120px]">
        <div className="wrap">
          {featured ? (
            <Reveal>
              <FeaturedResource article={featured} locale={locale} />
            </Reveal>
          ) : (
            <p className="py-16 text-lg text-mut">{t("empty")}</p>
          )}

          {rest.length > 0 ? (
            <div className="mt-20 grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-[72px]">
              <h2 className="eyebrow lg:pt-8">{t("all")}</h2>
              <ul className="border-b border-line">
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
