import { useTranslations } from "next-intl";
import { MARKET_KEYS, ORIGIN_KEYS } from "@/lib/markets";
import LatamMap from "./LatamMap";
import GroupHeading, { padNumber } from "./ui/GroupHeading";
import Reveal from "./ui/Reveal";
import SplitSection from "./ui/SplitSection";

export default function International() {
  const t = useTranslations("International");

  return (
    <SplitSection id="internacional" eyebrow={t("origin.badge")} title={t("title")} lead={t("subtitle")}>
      <div>
        <GroupHeading title={t("origin.label")} count={ORIGIN_KEYS.length} />
        <p className="max-w-[560px] border-t border-line pt-5 pb-6 text-[15px] leading-relaxed text-mut">
          {t("origin.subtitle")}
        </p>
        <ul className="grid grid-cols-2 border-b border-line md:grid-cols-3">
          {ORIGIN_KEYS.map((key, i) => (
            <Reveal
              as="li"
              key={key}
              delay={i * 0.04}
              className="flex items-baseline gap-3 border-t border-line py-5 pr-3"
            >
              <span className="font-mono text-[12px] text-faint">{padNumber(i + 1)}</span>
              <span className="min-w-0">
                <span className="block text-[16.5px] font-medium tracking-[-0.015em]">
                  {t(`origin.countries.${key}.name`)}
                </span>
                <span className="eyebrow mt-1 block text-[11px]">{t(`origin.countries.${key}.region`)}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <GroupHeading title={t("registration.title")} count={MARKET_KEYS.length} />
        <p className="max-w-[560px] border-t border-line pt-5 pb-6 text-[15px] leading-relaxed text-mut">
          {t("registration.subtitle")}
        </p>
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
          <Reveal>
            <LatamMap />
          </Reveal>
          <ol className="grid grid-cols-2 border-b border-line">
            {MARKET_KEYS.map((key, i) => (
              <li key={key} className="flex items-baseline gap-3 border-t border-line py-4 pr-2">
                <span className="font-mono text-[12px] text-faint">{padNumber(i + 1)}</span>
                <span className="text-[15.5px] font-medium tracking-[-0.01em]">
                  {t(`registration.countries.${key}`)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SplitSection>
  );
}
