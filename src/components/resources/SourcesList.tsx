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
    <section aria-labelledby="sources-heading" className="mt-[72px]">
      <h2 id="sources-heading" className="mb-5 text-[clamp(26px,1.4rem+0.8vw,30px)] font-semibold leading-[1.15] tracking-[-0.035em] scroll-mt-24">
        {t("sourcesTitle")}
      </h2>
      <ol className="border-b border-line">
        {sources.map((source, i) => (
          <li
            key={source.url}
            id={`source-${i + 1}`}
            className="grid scroll-mt-24 grid-cols-[32px_minmax(0,1fr)] gap-3 border-t border-line py-4 text-[15px] leading-relaxed target:bg-soft"
          >
            <span className="pt-0.5 font-mono text-[12px] font-medium text-accent-deep">{i + 1}</span>
            <span className="min-w-0">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-words font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent-deep"
              >
                {source.title}
              </a>
              <span className="text-mut">
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
