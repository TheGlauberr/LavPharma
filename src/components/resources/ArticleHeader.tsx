import { getTranslations } from "next-intl/server";
import { findAuthor } from "@/lib/resources/authors";
import { formatDate, resourcePath, type Resource } from "@/lib/resources/content";
import Breadcrumb from "./Breadcrumb";
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
    <header className="relative overflow-hidden bg-gradient-to-br from-white via-[#F0F6FF] to-[#E4EEFB] pt-28 sm:pt-36 pb-12">
      <div className="pointer-events-none absolute top-[-10%] right-[0%] h-[380px] w-[380px] rounded-full bg-accent-blue/[0.07] blur-[110px]" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: tNav("resources"), href: resourcePath() },
            { label: article.title },
          ]}
        />
        <div className="mt-8">
          <ResourceChips type={article.type} countries={article.countries} />
        </div>
        <h1 className="mt-5 text-navy-darker text-[2rem] sm:text-5xl font-display font-medium leading-[1.1] tracking-tight">
          {article.title}
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted">
          <span className="font-semibold text-navy">
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
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 border border-card-border px-3 py-1 text-[12px] font-medium text-accent-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2E9E6A]" aria-hidden="true" />
          {t("lastVerified")}: <time dateTime={article.lastVerified}>{date(article.lastVerified)}</time>
        </p>

        <aside
          aria-label={t("answerLabel")}
          className="mt-8 rounded-2xl border border-card-border border-l-4 border-l-accent-blue bg-white p-5 sm:p-7 shadow-[0_20px_40px_-30px_rgba(26,31,46,0.35)]"
        >
          <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-accent-deep mb-2">
            {t("answerLabel")}
          </p>
          <p className="text-navy-darker text-[17px] sm:text-lg leading-relaxed">{article.answer}</p>
        </aside>
      </div>
    </header>
  );
}
