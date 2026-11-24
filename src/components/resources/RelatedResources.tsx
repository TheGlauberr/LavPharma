import { getTranslations } from "next-intl/server";
import { getResource, getResourceSlugs } from "@/lib/resources/content";
import ResourceRow from "./ResourceRow";

interface RelatedResourcesProps {
  slugs: string[];
  locale: string;
}

/** Lists related articles that exist; unknown slugs (planned articles) are skipped. */
export default async function RelatedResources({ slugs, locale }: RelatedResourcesProps) {
  const known = new Set(getResourceSlugs());
  const articles = slugs.filter((slug) => known.has(slug)).map((slug) => getResource(slug, locale));
  if (articles.length === 0) return null;

  const t = await getTranslations("Resources");
  return (
    <section aria-labelledby="related-heading" className="mt-16">
      <h2
        id="related-heading"
        className="text-[11px] tracking-[0.18em] uppercase font-semibold text-accent-deep mb-2"
      >
        {t("relatedTitle")}
      </h2>
      <ul className="border-b border-card-border">
        {articles.map((article) => (
          <ResourceRow key={article.slug} article={article} locale={locale} />
        ))}
      </ul>
    </section>
  );
}
