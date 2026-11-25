"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/resources/toc";

interface ArticleTocProps {
  label: string;
  entries: TocEntry[];
}

/** "On this page" list. Highlights the section currently being read. */
export default function ArticleToc({ label, entries }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(entries[0]?.id);

  useEffect(() => {
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed.filter((o) => o.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav aria-label={label}>
      <p className="eyebrow mb-3">{label}</p>
      <ul>
        {entries.map((entry) => {
          const isActive = entry.id === activeId;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`block border-l py-[7px] pl-3.5 text-[14px] leading-snug transition-colors ${
                  isActive ? "border-accent-deep text-ink" : "border-line text-mut hover:text-ink"
                }`}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
