import { useTranslations } from "next-intl";
import NumberedRows from "./ui/NumberedRows";
import Reveal from "./ui/Reveal";
import SplitSection from "./ui/SplitSection";

const VALUE_KEYS = [
  "integrity",
  "responsibility",
  "efficiency",
  "quality",
  "confidentiality",
  "clientFocus",
  "innovation",
] as const;

const STATEMENTS = ["mission", "vision"] as const;

export default function About() {
  const t = useTranslations("About");

  return (
    <SplitSection
      id="nosotros"
      surface="navy"
      eyebrow={t("badge")}
      title={t.rich("heading", { em: (chunks) => <em>{chunks}</em> })}
      lead={t("lead")}
    >
      <div className="grid grid-cols-1 border-y border-line md:grid-cols-2">
        {STATEMENTS.map((key, i) => (
          <Reveal
            key={key}
            delay={i * 0.06}
            className={`py-8 md:py-10 ${i === 1 ? "border-t border-line md:border-t-0 md:border-l md:pl-10" : "md:pr-10"}`}
          >
            <p className="eyebrow flex items-center gap-2">
              <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-accent-blue" />
              {t(`${key}.title`)}
            </p>
            <h3 className="mt-4 text-[22px] font-semibold leading-[1.2] tracking-[-0.025em] lg:text-[26px]">
              {t(`${key}.headline`)}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-mut">{t(`${key}.text`)}</p>
          </Reveal>
        ))}
      </div>

      <NumberedRows
        title={t("valuesTitle")}
        className="mt-16"
        rows={VALUE_KEYS.map((key) => ({
          key,
          title: t(`values.${key}.title`),
          text: t(`values.${key}.description`),
        }))}
      />
    </SplitSection>
  );
}
