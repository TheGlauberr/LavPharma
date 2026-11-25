import { getTranslations } from "next-intl/server";
import type { ResourceSector, ResourceType } from "@/lib/resources/validate";

interface ResourceChipsProps {
  type: ResourceType;
  countries: string[];
  sector?: ResourceSector;
}

const CHIP = "rounded-md border px-2.5 py-1.5 font-mono text-[11.5px] font-medium uppercase tracking-[0.05em]";

export default async function ResourceChips({ type, countries, sector }: ResourceChipsProps) {
  const t = await getTranslations("Resources");
  const rest = [...countries, ...(sector ? [t(`sectors.${sector}`)] : [])];

  return (
    <ul className="flex flex-wrap items-center gap-2">
      <li className={`${CHIP} border-ink bg-ink text-white`}>{t(`types.${type}`)}</li>
      {rest.map((label) => (
        <li key={label} className={`${CHIP} border-line text-mut`}>
          {label}
        </li>
      ))}
    </ul>
  );
}
