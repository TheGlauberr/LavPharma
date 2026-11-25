"use client";

import { useEffect, useState } from "react";

export interface TrackerStage {
  label: string;
  days: string;
  note: string;
}

export interface TrackerMetric {
  value: string;
  label: string;
}

interface HeroTrackerProps {
  live: string;
  project: string;
  status: string;
  stages: TrackerStage[];
  metrics: TrackerMetric[];
}

const INITIAL_STAGE = 2;
const STAGE_INTERVAL_MS = 2600;

/** Dossier tracker card. Cycles the live stage unless reduced motion is requested. */
export default function HeroTracker({ live, project, status, stages, metrics }: HeroTrackerProps) {
  const [active, setActive] = useState(INITIAL_STAGE);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % stages.length), STAGE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [stages.length]);

  return (
    <div className="card px-5 py-[22px] sm:p-7">
      <header className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">{live}</p>
          <p className="mt-1.5 text-[18px] font-semibold tracking-[-0.02em]">{project}</p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-tint px-3 py-1.5 text-[12px] font-medium text-accent-deep">
          {status}
        </span>
      </header>

      <ol className="min-h-[268px]" aria-label={project}>
        {stages.map((stage, i) => {
          const done = i < active;
          const isLive = i === active;
          return (
            <li
              key={stage.label}
              aria-current={isLive ? "step" : undefined}
              className="relative flex gap-3.5 py-[9px]"
            >
              {i < stages.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={`absolute left-[13px] top-[38px] -bottom-2 w-px transition-colors duration-300 ${
                    done ? "bg-accent-blue" : "bg-line"
                  }`}
                />
              ) : null}
              <span
                aria-hidden="true"
                className={`grid h-[27px] w-[27px] flex-none place-items-center rounded-full border font-mono text-[11px] font-medium transition-all duration-300 ${
                  done
                    ? "border-accent-deep bg-accent-deep text-white"
                    : isLive
                      ? "border-accent-deep bg-white text-accent-deep shadow-[0_0_0_4px_#e3ecfb]"
                      : "border-line bg-soft text-faint"
                }`}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex justify-between gap-3 text-[14.5px]">
                  <span className={`font-medium transition-colors ${done || isLive ? "text-ink" : "text-faint"}`}>
                    {stage.label}
                  </span>
                  <span className="whitespace-nowrap pt-0.5 font-mono text-[11.5px] text-faint">{stage.days}</span>
                </div>
                {isLive ? <p className="mt-1 text-[13px] leading-snug text-mut">{stage.note}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>

      <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-line pt-[18px]">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex min-w-0 flex-col-reverse gap-1">
            <dt className="eyebrow text-[11px] sm:text-[12px]">{metric.label}</dt>
            <dd className="whitespace-nowrap text-[15.5px] font-semibold tracking-[-0.03em] sm:text-[19px]">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
