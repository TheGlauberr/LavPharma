import { getTranslations } from "next-intl/server";
import { findAuthor } from "@/lib/resources/authors";
import { formatDate, resourcePath, type Resource } from "@/lib/resources/content";
import Breadcrumb from "./Breadcrumb";
import LastVerified from "./LastVerified";
import ResourceChips from "./ResourceChips";

interface ArticleHeaderProps {
  article: Resource;
}

export default async function ArticleHeader({ article }: ArticleHeaderProps) {
  const t = await getTranslations("Resources");
  const tNav = await getTranslations("Nav");
  const reviewer = findAuthor(article.reviewedBy);
  const date = (value: string) => formatDate(value, article.locale);

  return (
    <header>
      <Breadcrumb
        items={[
          { label: t("breadcrumbHome"), href: "/" },
          { label: tNav("resources"), href: resourcePath() },
          { label: article.title },
        ]}
      />
      <div className="mt-8 lg:mt-10">
        <ResourceChips type={article.type} countries={article.countries} sector={article.sector} />
      </div>
      <h1 className="mt-5 mb-6 text-[clamp(32px,4vw,54px)] font-semibold leading-[1.04] tracking-[-0.04em] text-balance">
        {article.title}
      </h1>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] text-mut">
        <span className="font-medium text-ink">
          {reviewer ? t("bylineReviewed", { name: reviewer.name }) : t("byline")}
        </span>
        <span>
          {t("published")} <time dateTime={article.published}>{date(article.published)}</time>
        </span>
        {article.updated !== article.published ? (
          <span>
            {t("updated")} <time dateTime={article.updated}>{date(article.updated)}</time>
          </span>
        ) : null}
      </div>
      <div className="mt-6 lg:hidden">
        <LastVerified date={article.lastVerified} locale={article.locale} />
      </div>
    </header>
  );
}
