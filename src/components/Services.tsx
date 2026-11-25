import { useTranslations } from "next-intl";
import NumberedRows from "./ui/NumberedRows";
import SplitSection from "./ui/SplitSection";

const REGISTRATION_KEYS = ["genericos", "marca", "vacunas", "biotecnologicos", "bioequivalentes"] as const;
const LOGISTICS_KEYS = ["holding", "almacenamiento", "permisos", "distribucion", "asesoria", "cumplimiento"] as const;

export default function Services() {
  const t = useTranslations("Services");
  const tNav = useTranslations("Nav");

  const rows = (group: "registration" | "logistics", keys: readonly string[]) =>
    keys.map((key) => ({
      key,
      title: t(`${group}.items.${key}.title`),
      text: t(`${group}.items.${key}.description`),
    }));

  return (
    <SplitSection id="servicios" eyebrow={tNav("services")} title={t("title")} lead={t("subtitle")}>
      <NumberedRows title={t("registration.title")} rows={rows("registration", REGISTRATION_KEYS)} href="/#contacto" />
      <NumberedRows
        title={t("logistics.title")}
        rows={rows("logistics", LOGISTICS_KEYS)}
        href="/#contacto"
        className="mt-16"
      />
    </SplitSection>
  );
}
