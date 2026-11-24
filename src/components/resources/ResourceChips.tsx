import { getTranslations } from "next-intl/server";
import type { ResourceType } from "@/lib/resources/validate";

interface ResourceChipsProps {
  type: ResourceType;
  countries: string[];
  tone?: "light" | "dark";
}

export default async function ResourceChips({ type, countries, tone = "light" }: ResourceChipsProps) {
  const t = await getTranslations("Resources");
  const typeClass =
    tone === "dark"
      ? "bg-accent-blue/[0.18] text-[#9DBEFF]"
      : "bg-accent-blue/10 text-accent-deep";
  const countryClass =
    tone === "dark"
      ? "border-white/15 text-white/70"
      : "border-card-border text-navy";

  return (
    <ul className="flex flex-wrap items-center gap-2">
      <li
        className={`${typeClass} rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]`}
      >
        {t(`types.${type}`)}
      </li>
      {countries.map((country) => (
        <li
          key={country}
          className={`${countryClass} rounded-full border px-3 py-1 text-[12px] font-medium`}
        >
          {country}
        </li>
      ))}
    </ul>
  );
}
