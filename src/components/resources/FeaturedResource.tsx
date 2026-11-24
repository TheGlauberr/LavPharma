import { getTranslations } from "next-intl/server";
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
    <article className="group relative overflow-hidden rounded-2xl bg-navy-darker p-7 sm:p-10 lg:p-12 shadow-[0_30px_60px_-30px_rgba(26,31,46,0.55)]">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 opacity-[0.1] transition-transform duration-700 group-hover:rotate-12"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="44" stroke="#4A90D9" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="32" stroke="#4A90D9" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="20" stroke="#4A90D9" strokeWidth="0.5" />
      </svg>
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <span className="text-[11px] tracking-[0.18em] uppercase font-semibold text-[#9DBEFF]">
          {t("latest")}
        </span>
        <time dateTime={article.published} className="font-mono text-[12px] text-white/50">
          {formatDate(article.published, locale)}
        </time>
      </div>
      <h2 className="relative mt-6 font-display text-white text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.12] tracking-tight max-w-3xl">
        <Link
          href={resourcePath(article.slug)}
          className="after:absolute after:inset-0 focus:outline-none focus-visible:underline"
        >
          {article.title}
        </Link>
      </h2>
      <p className="relative mt-5 text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl">
        {article.description}
      </p>
      <div className="relative mt-8 flex flex-wrap items-center justify-between gap-5">
        <ResourceChips type={article.type} countries={article.countries} tone="dark" />
        <span className="text-accent-blue text-sm font-semibold group-hover:translate-x-1 transition-transform">
          {t("readArticle")} →
        </span>
      </div>
    </article>
  );
}
