import { getTranslations } from "next-intl/server";
import type { ResourceFaq } from "@/lib/resources/validate";

interface FaqListProps {
  items: ResourceFaq[];
}

export default async function FaqList({ items }: FaqListProps) {
  const t = await getTranslations("Resources");

  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      <h2
        id="faq-heading"
        className="font-display text-navy-darker text-2xl sm:text-3xl font-medium tracking-tight mb-6"
      >
        {t("faqTitle")}
      </h2>
      <div className="divide-y divide-card-border border-y border-card-border">
        {items.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-navy-darker font-semibold text-[17px] leading-snug focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40 rounded">
              <span>{item.q}</span>
              <span
                aria-hidden="true"
                className="mt-1 text-accent-blue text-xl leading-none transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-muted leading-relaxed text-[16px]">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
