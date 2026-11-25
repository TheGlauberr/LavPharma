import { useTranslations } from "next-intl";
import { ArrowRight, MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_URL } from "@/lib/site";
import { MARKET_KEYS } from "@/lib/markets";
import HeroTracker from "./HeroTracker";
import CountUp from "./ui/CountUp";
import Reveal from "./ui/Reveal";

const STAGE_NUMBERS = [1, 2, 3, 4, 5] as const;

const STATS = [
  { to: 10, suffix: "+", labelKey: "countries" },
  { to: 540, suffix: "+", labelKey: "registrations" },
  { to: 96, suffix: "%", labelKey: "approval" },
  { to: 10, suffix: null, labelKey: "practice" },
] as const;

function Stats() {
  const t = useTranslations("Hero.stats");
  return (
    <div className="border-y border-line">
      <dl className="wrap grid grid-cols-2 !px-0 lg:grid-cols-4 lg:!px-8">
        {STATS.map((stat, i) => (
          <div
            key={stat.labelKey}
            className={`flex flex-col-reverse gap-3 px-5 py-6 md:px-8 lg:py-9 ${
              i % 2 === 1 ? "border-l border-line" : ""
            } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${
              i === 2 ? "lg:border-l" : ""
            } ${i === 0 ? "lg:!pl-0" : ""}`}
          >
            <dt className="eyebrow">{t(stat.labelKey)}</dt>
            <dd className="text-[40px] font-semibold leading-none tracking-[-0.05em] lg:text-[52px]">
              <CountUp to={stat.to} suffix={stat.suffix ?? t("yearsSuffix")} delay={i * 0.08} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Markets() {
  const t = useTranslations("Hero");
  const tc = useTranslations("International.registration.countries");
  return (
    <section aria-label={t("dossiers")} className="border-b border-line">
      <div className="wrap flex flex-col gap-3 py-[26px] lg:flex-row lg:items-baseline lg:justify-between">
        <p className="eyebrow whitespace-nowrap text-ink">{t("dossiers")}</p>
        <ul className="flex flex-wrap items-baseline gap-x-3.5 gap-y-2 lg:justify-end lg:gap-x-4">
          {MARKET_KEYS.map((key) => (
            <li key={key} className="flex items-center gap-2 whitespace-nowrap text-[14.5px]">
              <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-accent-blue" />
              {tc(key)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Hero() {
  const t = useTranslations("Hero");
  const stages = STAGE_NUMBERS.map((n) => ({
    label: t(`journey.stage${n}`),
    days: t(`journey.days${n}`),
    note: t(`journey.note${n}`),
  }));
  const metrics = [
    { value: t("journey.avgTimeValue"), label: t("journey.avgTime") },
    { value: "96%", label: t("journey.approvalRate") },
    { value: t("journey.countriesCount"), label: t("journey.localAgents") },
  ];

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="hairline-grid pointer-events-none absolute inset-0" />
        <div className="wrap relative grid grid-cols-1 items-center gap-12 py-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-[72px] lg:py-[104px]">
          <div>
            <p className="eyebrow">{t("label")}</p>
            <h1 className="display mt-6 mb-7">
              {t.rich("title", { em: (chunks) => <em>{chunks}</em> })}
            </h1>
            <p className="lead max-w-[540px]">{t("subtitle")}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#contacto" className="btn flex-auto sm:flex-none">
                {t("cta")}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href={DEFAULT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost flex-auto sm:flex-none"
              >
                <MessageCircle size={16} aria-hidden="true" className="text-whatsapp-deep" />
                {t("whatsapp")}
              </a>
            </div>
          </div>
          <Reveal delay={0.1}>
            <HeroTracker
              live={t("journey.live")}
              project={t("journey.project")}
              status={t("journey.onTrack")}
              stages={stages}
              metrics={metrics}
            />
          </Reveal>
        </div>
      </section>
      <Stats />
      <Markets />
    </>
  );
}
