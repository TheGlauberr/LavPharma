import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Section background; each surface re-points the color tokens for its content. */
export type SectionSurface = "page" | "band" | "tint" | "navy";

const SURFACE_CLASS: Record<SectionSurface, string> = {
  page: "",
  band: "surface-band",
  tint: "surface-tint",
  navy: "surface-navy",
};

interface SplitSectionProps {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Extra content under the lead in the sticky column (contact details, links). */
  asideExtra?: ReactNode;
  children: ReactNode;
  surface?: SectionSurface;
  className?: string;
}

/**
 * The shared Precision section: sticky heading on the left, ruled content on the
 * right. Every home section uses it so container, rhythm and type stay identical.
 */
export default function SplitSection({
  id,
  eyebrow,
  title,
  lead,
  asideExtra,
  children,
  surface = "page",
  className = "",
}: SplitSectionProps) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`section ${SURFACE_CLASS[surface]} ${className}`}>
      <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-[72px]">
        <aside className="lg:sticky lg:top-[104px] lg:self-start">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={headingId} className="title mt-4 mb-4">
              {title}
            </h2>
            {lead ? <p className="text-[17px] leading-relaxed text-mut lg:max-w-[340px]">{lead}</p> : null}
            {asideExtra}
          </Reveal>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
