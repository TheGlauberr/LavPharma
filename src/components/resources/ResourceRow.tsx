import { Link } from "@/i18n/navigation";
import { formatDate, resourcePath, type Resource } from "@/lib/resources/content";
import ResourceChips from "./ResourceChips";

interface ResourceRowProps {
  article: Resource;
  locale: string;
}

/** One editorial row in the index and related lists: date rail, title, summary, chips. */
export default function ResourceRow({ article, locale }: ResourceRowProps) {
  return (
    <li className="group relative grid gap-3 border-t border-card-border py-7 sm:grid-cols-[9rem_1fr] sm:gap-8">
      <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted pt-1">
        <time dateTime={article.published}>{formatDate(article.published, locale)}</time>
      </p>
      <div className="min-w-0">
        <h3 className="font-display text-navy-darker text-xl sm:text-2xl font-medium leading-snug tracking-tight">
          <Link
            href={resourcePath(article.slug)}
            className="after:absolute after:inset-0 group-hover:text-accent-deep transition-colors focus:outline-none focus-visible:underline"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-muted text-[15px] leading-relaxed max-w-2xl">{article.description}</p>
        <div className="mt-4">
          <ResourceChips type={article.type} countries={article.countries} />
        </div>
      </div>
    </li>
  );
}
