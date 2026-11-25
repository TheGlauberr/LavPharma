import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatDate, resourcePath, type Resource } from "@/lib/resources/content";
import ResourceChips from "./ResourceChips";

interface FeaturedResourceProps {
  article: Resource;
  locale: string;
}

export default async function FeaturedResource({ article, locale }: FeaturedResourceProps) {
  const t = await getTranslations("Resources");

  return (
    <article className="card group relative p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong sm:p-10 lg:p-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="eyebrow flex items-center gap-2 text-accent-deep">
          <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-accent-blue" />
          {t("latest")}
        </p>
        <time dateTime={article.published} className="eyebrow">
          {formatDate(article.published, locale)}
        </time>
      </div>
      <h2 className="mt-6 max-w-3xl text-[clamp(28px,3vw,42px)] font-semibold leading-[1.08] tracking-[-0.04em] text-balance">
        <Link
          href={resourcePath(article.slug)}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:underline focus-visible:outline-none"
        >
          {article.title}
        </Link>
      </h2>
      <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-mut sm:text-[17px]">{article.description}</p>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-6">
        <ResourceChips type={article.type} countries={article.countries} sector={article.sector} />
        <span className="inline-flex items-center gap-2 text-[15px] font-medium text-ink">
          {t("readArticle")}
          <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
