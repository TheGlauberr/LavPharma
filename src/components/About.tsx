"use client";

import { useTranslations } from "next-intl";
import {
  Shield,
  CheckCircle,
  Zap,
  Award,
  Lock,
  Users,
  Lightbulb,
} from "lucide-react";

const VALUE_KEYS = [
  { key: "integrity", icon: Shield },
  { key: "responsibility", icon: CheckCircle },
  { key: "efficiency", icon: Zap },
  { key: "quality", icon: Award },
  { key: "confidentiality", icon: Lock },
  { key: "clientFocus", icon: Users },
  { key: "innovation", icon: Lightbulb },
] as const;

export default function About() {
  const t = useTranslations("About");

  return (
    <section id="nosotros" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent-blue/10 rounded-full px-3.5 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_0_3px_rgba(43,108,223,0.18)]" />
              <span className="text-accent-deep text-[11px] tracking-[0.18em] uppercase font-semibold">
                {t("badge")}
              </span>
            </div>
            <h2 className="text-navy-darker text-3xl sm:text-4xl lg:text-5xl font-display font-medium leading-tight tracking-tight">
              {t.rich("heading", {
                em: (chunks) => <em className="italic font-normal text-accent-deep">{chunks}</em>,
              })}
            </h2>
          </div>
          <p className="text-gray-500 text-base lg:text-[16.5px] max-w-md leading-relaxed lg:text-right">
            {t("lead")}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div className="bg-white rounded-2xl p-9 border border-gray-200 relative overflow-hidden">
            {/* Decorative circles */}
            <svg className="absolute -right-10 -top-10 w-48 h-48 opacity-[0.06]" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="#2B6CDF" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="30" stroke="#2B6CDF" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="20" stroke="#2B6CDF" strokeWidth="0.5"/>
            </svg>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-gray-500">{t("mission.title")}</span>
            </div>
            <h3 className="text-navy-darker font-display font-medium text-2xl lg:text-[28px] tracking-tight leading-snug mb-3">
              {t("mission.headline")}
            </h3>
            <p className="text-gray-500 text-[15px] leading-relaxed">{t("mission.text")}</p>
          </div>
          <div className="bg-navy-darker rounded-2xl p-9 relative overflow-hidden">
            {/* Decorative waves */}
            <svg className="absolute -right-10 -top-10 w-48 h-48 opacity-[0.06]" viewBox="0 0 100 100" fill="none">
              <path d="M0 50 Q 25 20, 50 50 T 100 50" stroke="#fff" strokeWidth="0.5"/>
              <path d="M0 60 Q 25 30, 50 60 T 100 60" stroke="#fff" strokeWidth="0.5"/>
              <path d="M0 70 Q 25 40, 50 70 T 100 70" stroke="#fff" strokeWidth="0.5"/>
            </svg>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/55">{t("vision.title")}</span>
            </div>
            <h3 className="text-white font-display font-medium text-2xl lg:text-[28px] tracking-tight leading-snug mb-3">
              {t("vision.headline")}
            </h3>
            <p className="text-white/70 text-[15px] leading-relaxed">{t("vision.text")}</p>
          </div>
        </div>

        {/* Values header */}
        <div className="pb-4 border-b border-gray-200 mb-0">
          <h3 className="font-display font-medium text-2xl lg:text-[28px] tracking-tight text-navy-darker">{t("valuesTitle")}</h3>
        </div>

        {/* Values grid — 7 columns on desktop */}
        <div className="hidden lg:grid grid-cols-7 border border-gray-200 border-t-0 rounded-b-2xl overflow-hidden bg-white">
          {VALUE_KEYS.map(({ key, icon: Icon }, i) => (
            <div
              key={key}
              className={`p-5 ${i < VALUE_KEYS.length - 1 ? "border-r border-gray-200" : ""}`}
            >
              <div className="w-8 h-8 rounded-lg bg-accent-blue/10 text-accent-deep grid place-items-center">
                <Icon size={16} />
              </div>
              <h4 className="font-display font-medium text-lg tracking-tight text-navy-darker mt-5 mb-2">
                {t(`values.${key}.title`)}
              </h4>
              <p className="text-[12.5px] leading-snug text-gray-500">
                {t(`values.${key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Values grid — mobile/tablet fallback */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200 border-t-0 rounded-b-2xl overflow-hidden">
          {VALUE_KEYS.map(({ key, icon: Icon }, i) => (
            <div
              key={key}
              className={`bg-white p-5 ${i === VALUE_KEYS.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div className="w-8 h-8 rounded-lg bg-accent-blue/10 text-accent-deep grid place-items-center">
                <Icon size={16} />
              </div>
              <h4 className="font-display font-medium text-base tracking-tight text-navy-darker mt-4 mb-1.5">
                {t(`values.${key}.title`)}
              </h4>
              <p className="text-[12.5px] leading-snug text-gray-500">
                {t(`values.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
