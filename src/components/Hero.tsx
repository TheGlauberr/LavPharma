"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, Check } from "lucide-react";
import MolecularBg from "./MolecularBg";

const WHATSAPP_NUMBER = "50372384539";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, los contacto desde lavpharma.com"
)}`;

function Counter({ to, suffix = "", delay = 0 }: { to: number; suffix?: string; delay?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf: number;
    let start: number;
    const t = setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / 1600);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [to, delay]);
  return <span>{val}{suffix}</span>;
}

export default function Hero() {
  const t = useTranslations("Hero");
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    { id: 1, labelKey: "journey.stage1", daysKey: "journey.days1", noteKey: "journey.note1" },
    { id: 2, labelKey: "journey.stage2", daysKey: "journey.days2", noteKey: "journey.note2" },
    { id: 3, labelKey: "journey.stage3", daysKey: "journey.days3", noteKey: "journey.note3" },
    { id: 4, labelKey: "journey.stage4", daysKey: "journey.days4", noteKey: "journey.note4" },
    { id: 5, labelKey: "journey.stage5", daysKey: "journey.days5", noteKey: "journey.note5" },
  ];

  useEffect(() => {
    const interval = setInterval(() => setActiveStage(a => (a + 1) % stages.length), 2400);
    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F0F6FF] to-[#E4EEFB]" />

      {/* Accent orbs for depth */}
      <div className="absolute top-[-8%] right-[5%] w-[500px] h-[500px] bg-accent-blue/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-accent-blue/[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#C7D9F0]/[0.25] rounded-full blur-[80px] pointer-events-none" />

      {/* Molecular network texture */}
      <MolecularBg className="absolute inset-0 w-full h-full text-navy/40 pointer-events-none" />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, #3D4456 0.8px, transparent 0.8px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 pt-14 sm:pt-20 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
          {/* Text content */}
          <div className="text-left">
            <div className="hidden sm:inline-flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_0_3px_rgba(43,108,223,0.18)]" />
              <span className="text-accent-blue text-xs tracking-[2px] uppercase font-semibold">
                {t("label")}
              </span>
            </div>
            <h1
              className="text-navy-darker text-[44px] sm:text-5xl lg:text-[72px] font-display font-medium leading-[1.06] sm:leading-[0.97] tracking-tight mb-5 sm:mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              {t.rich("title", {
                em: (chunks) => <em className="italic font-normal text-accent-deep">{chunks}</em>,
              })}
            </h1>
            <p
              className="text-gray-600 text-[15px] sm:text-lg leading-[1.7] sm:leading-relaxed mb-10 sm:mb-8 max-w-xl animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {t("subtitle")}
            </p>
            <div
              className="flex flex-col sm:flex-row gap-3 animate-fade-in-up"
              style={{ animationDelay: "0.45s" }}
            >
              <a
                href="#contacto"
                className="bg-navy-darker hover:bg-navy text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {t("cta")}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#C9E5D6] text-[#1A8754] px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={16} />
                {t("whatsapp")}
              </a>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-4 gap-4 sm:gap-8 mt-10 sm:mt-10 pt-8 sm:pt-7 border-t border-gray-200/60 max-w-xl mb-16 sm:mb-0 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              {[
                { num: 10, suffix: "+", labelKey: "stats.countries" },
                { num: 540, suffix: "+", labelKey: "stats.registrations" },
                { num: 96, suffix: "%", labelKey: "stats.approval" },
                { num: 10, suffix: " yr", labelKey: "stats.practice" },
              ].map((s, i) => (
                <div key={i} className="text-left">
                  <div className="text-navy-darker text-2xl sm:text-4xl font-display font-medium leading-none tracking-tight">
                    <Counter to={s.num} suffix={s.suffix} delay={700 + i * 120} />
                  </div>
                  <div className="text-gray-500 text-[9px] sm:text-[10.5px] tracking-[0.08em] sm:tracking-[0.1em] uppercase font-medium mt-1 sm:mt-1.5">
                    {t(s.labelKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Journey Card */}
          <div
            className="hidden lg:block animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-[0_30px_60px_-40px_rgba(11,18,32,0.20)]">
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[11px] tracking-[0.12em] uppercase text-gray-500 font-medium">
                    {t("journey.live")}
                  </div>
                  <div className="text-xl font-display font-medium text-navy-darker mt-1 tracking-tight">
                    {t("journey.project")}
                  </div>
                </div>
                <div className="text-xs px-3 py-1.5 border border-accent-blue/25 text-accent-blue bg-accent-blue/[0.08] rounded-full font-semibold whitespace-nowrap">
                  {t("journey.onTrack")}
                </div>
              </div>

              {/* Timeline */}
              <div className="relative pl-2">
                {/* Progress line */}
                <div className="absolute left-[19px] top-3.5 bottom-3.5 w-0.5 bg-gray-200 rounded">
                  <div
                    className="absolute top-0 left-0 right-0 bg-accent-blue rounded transition-all duration-700 ease-in-out"
                    style={{ height: `${((activeStage + 0.5) / stages.length) * 100}%` }}
                  />
                </div>

                {stages.map((s, i) => {
                  const done = i < activeStage;
                  const live = i === activeStage;
                  return (
                    <div key={s.id} className="flex items-start gap-4 py-2 relative z-10">
                      <div
                        className={`w-7 h-7 rounded-full border-2 grid place-items-center text-[11px] font-bold flex-shrink-0 transition-all duration-300 ${
                          done
                            ? "bg-accent-blue border-accent-blue text-white"
                            : live
                            ? "bg-white border-accent-blue text-accent-blue shadow-[0_0_0_5px_rgba(43,108,223,0.12)]"
                            : "bg-[#F5F8FC] border-gray-200 text-gray-400"
                        }`}
                      >
                        {done ? <Check size={12} /> : s.id}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className={`text-sm whitespace-nowrap ${done || live ? "font-semibold text-navy-darker" : "font-medium text-gray-400"} transition-colors`}>
                            {t(s.labelKey)}
                          </span>
                          <span className="font-mono text-[10.5px] text-gray-400 tracking-wide whitespace-nowrap">
                            {t(s.daysKey)}
                          </span>
                        </div>
                        <div
                          className="text-[12.5px] text-gray-500 mt-1.5 leading-snug overflow-hidden transition-all duration-300"
                          style={{ maxHeight: live ? 40 : 0, opacity: live ? 1 : 0 }}
                        >
                          {t(s.noteKey)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card footer stats */}
              <div className="mt-6 pt-4 border-t border-dashed border-gray-200 grid grid-cols-3 gap-4">
                {[
                  { k: "journey.avgTime", v: "90 days" },
                  { k: "journey.approvalRate", v: "96%" },
                  { k: "journey.localAgents", v: t("journey.countriesCount") },
                ].map((m, i) => (
                  <div key={i}>
                    <div className="text-lg font-display font-medium text-navy-darker tracking-tight">{m.v}</div>
                    <div className="text-[10.5px] text-gray-400 uppercase tracking-[0.1em] mt-0.5">{t(m.k)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
