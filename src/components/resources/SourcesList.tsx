import { getTranslations } from "next-intl/server";
import { formatDate } from "@/lib/resources/content";
import type { ResourceSource } from "@/lib/resources/validate";

interface SourcesListProps {
  sources: ResourceSource[];
  locale: string;
}

export default async function SourcesList({ sources, locale }: SourcesListProps) {
  const t = await getTranslations("Resources");

  return (
    <section aria-labelledby="sources-heading" className="mt-16">
      <h2
        id="sources-heading"
        className="font-display text-navy-darker text-2xl sm:text-3xl font-medium tracking-tight mb-6"
      >
        {t("sourcesTitle")}
      </h2>
      <ol className="space-y-4">
        {sources.map((source, i) => (
          <li key={source.url} id={`source-${i + 1}`} className="flex gap-4 text-[15px] leading-relaxed">
            <span className="font-mono text-[12px] text-accent-deep pt-1 w-6 flex-shrink-0">
              [{i + 1}]
            </span>
            <span className="min-w-0">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-darker font-medium underline decoration-card-border underline-offset-4 hover:decoration-accent-blue break-words"
              >
                {source.title}
              </a>
              <span className="text-muted">
                {" "}
                {source.publisher}, {t("accessed", { date: formatDate(source.accessed, locale) })}.
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
