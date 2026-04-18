"use client";

import { useTranslations } from "next-intl";
import {
  ClipboardCheck,
  Truck,
  Globe,
  ShieldCheck,
  FileText,
} from "lucide-react";

const SERVICE_KEYS = [
  { key: "registros", icon: ClipboardCheck },
  { key: "distribucion", icon: Truck },
  { key: "asesoria", icon: Globe },
  { key: "cumplimiento", icon: ShieldCheck },
  { key: "permisos", icon: FileText },
] as const;

export default function Services() {
  const t = useTranslations("Services");

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-navy text-3xl sm:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_KEYS.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="bg-gradient-to-br from-card-bg to-card-bg-alt border border-card-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Icon className="text-accent-blue" size={24} />
              </div>
              <h3 className="text-navy font-bold text-lg mb-2">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
