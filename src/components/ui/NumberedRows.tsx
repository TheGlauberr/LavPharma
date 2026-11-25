import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import GroupHeading, { padNumber as pad } from "./GroupHeading";
import Reveal from "./Reveal";

export interface NumberedRow {
  key: string;
  title: string;
  text: string;
}

interface GroupProps {
  title: string;
  rows: NumberedRow[];
  /** When set, every row links here and shows the arrow affordance. */
  href?: string;
  className?: string;
}

const ROW_GRID =
  "grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 gap-y-1 py-5 border-t border-line md:grid-cols-[44px_200px_minmax(0,1fr)_20px] md:gap-5 md:items-baseline";

function RowBody({ row, index, linked }: { row: NumberedRow; index: number; linked: boolean }) {
  return (
    <>
      <span className="font-mono text-[12px] text-faint">{pad(index + 1)}</span>
      <h4 className="text-[16.5px] font-medium tracking-[-0.015em] text-ink">{row.title}</h4>
      <p className="col-start-2 text-[14.5px] leading-[1.55] text-mut md:col-start-auto">{row.text}</p>
      {linked ? (
        <ArrowRight
          aria-hidden="true"
          size={16}
          className="hidden self-center text-line-strong transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-accent-deep md:block"
        />
      ) : (
        <span className="hidden md:block" />
      )}
    </>
  );
}

/** A titled group of numbered, ruled rows (services, values). */
export default function NumberedRows({ title, rows, href, className = "" }: GroupProps) {
  return (
    <div className={className}>
      <GroupHeading title={title} count={rows.length} />
      <ul className="border-b border-line">
        {rows.map((row, i) => (
          <Reveal as="li" key={row.key} delay={Math.min(i, 5) * 0.04}>
            {href ? (
              <Link
                href={href}
                className={`group ${ROW_GRID} pr-3 transition-[background-color,padding] duration-200 hover:bg-soft md:hover:pl-3 focus-visible:outline-2 focus-visible:outline-accent-deep`}
              >
                <RowBody row={row} index={i} linked />
              </Link>
            ) : (
              <div className={ROW_GRID}>
                <RowBody row={row} index={i} linked={false} />
              </div>
            )}
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
