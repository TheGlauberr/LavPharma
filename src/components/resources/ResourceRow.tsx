import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatDate, resourcePath, type Resource } from "@/lib/resources/content";
import ResourceChips from "./ResourceChips";

interface ResourceRowProps {
  article: Resource;
  locale: string;
}

/** One ruled row in the index and related lists: date rail, title, summary, chips. */
export default function ResourceRow({ article, locale }: ResourceRowProps) {
  return (
    <li className="group relative grid gap-3 border-t border-line py-7 transition-colors hover:bg-soft md:-mx-3 md:grid-cols-[150px_minmax(0,1fr)_20px] md:gap-6 md:px-3">
      <p className="eyebrow pt-1">
        <time dateTime={article.published}>{formatDate(article.published, locale)}</time>
      </p>
      <div className="min-w-0">
        <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.02em] sm:text-[22px]">
          <Link
            href={resourcePath(article.slug)}
            className="transition-colors after:absolute after:inset-0 group-hover:text-accent-deep focus-visible:underline focus-visible:outline-none"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-mut">{article.description}</p>
        <div className="mt-4">
          <ResourceChips type={article.type} countries={article.countries} />
        </div>
      </div>
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="hidden self-center text-line-strong transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-accent-deep md:block"
      />
    </li>
  );
}
