import { getTranslations } from "next-intl/server";
import { Plus } from "lucide-react";
import type { ResourceFaq } from "@/lib/resources/validate";

interface FaqListProps {
  items: ResourceFaq[];
}

/** Accessible accordion built on native <details>, so it works without JS. */
export default async function FaqList({ items }: FaqListProps) {
  const t = await getTranslations("Resources");

  return (
    <section aria-labelledby="faq-heading" className="mt-[72px]">
      <h2 id="faq-heading" className="mb-5 text-[clamp(26px,1.4rem+0.8vw,30px)] font-semibold leading-[1.15] tracking-[-0.035em] scroll-mt-24">
        {t("faqTitle")}
      </h2>
      <div className="border-b border-line">
        {items.map((item) => (
          <details key={item.q} className="faq group border-t border-line">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[16.5px] font-medium leading-snug tracking-[-0.015em] transition-colors hover:text-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-deep">
              <span>{item.q}</span>
              <Plus
                size={18}
                aria-hidden="true"
                className="mt-0.5 flex-none text-faint transition-transform duration-200 group-open:rotate-45 group-open:text-accent-deep"
              />
            </summary>
            <p className="pb-6 pr-10 text-[15.5px] leading-relaxed text-mut">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
