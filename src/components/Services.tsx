"use client";

import { useTranslations } from "next-intl";
import {
  ClipboardCheck,
  Truck,
  Globe,
  ShieldCheck,
  FileText,
  Warehouse,
  Package,
  BadgeCheck,
  Syringe,
  Dna,
  Scale,
} from "lucide-react";

const REGISTRATION_SERVICES = [
  { key: "genericos", icon: ClipboardCheck },
  { key: "marca", icon: BadgeCheck },
  { key: "vacunas", icon: Syringe },
  { key: "biotecnologicos", icon: Dna },
  { key: "bioequivalentes", icon: Scale },
] as const;

const LOGISTICS_SERVICES = [
  { key: "holding", icon: Package },
  { key: "almacenamiento", icon: Warehouse },
  { key: "permisos", icon: FileText },
  { key: "distribucion", icon: Truck },
  { key: "asesoria", icon: Globe },
  { key: "cumplimiento", icon: ShieldCheck },
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

        {/* Registration Services */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent-blue/10 rounded-lg flex items-center justify-center">
              <ClipboardCheck size={20} className="text-accent-blue" />
            </div>
            <h3 className="text-navy text-xl font-bold">
              {t("registration.title")}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGISTRATION_SERVICES.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="group bg-white border border-card-border rounded-xl p-6 hover:shadow-lg hover:border-accent-blue/30 transition-all duration-200 cursor-pointer"
              >
                <div className="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-blue/15 transition-colors duration-200">
                  <Icon className="text-accent-blue" size={24} />
                </div>
                <h4 className="text-navy font-bold text-lg mb-2">
                  {t(`registration.items.${key}.title`)}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`registration.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Logistics & Compliance Services */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center">
              <Warehouse size={20} className="text-navy" />
            </div>
            <h3 className="text-navy text-xl font-bold">
              {t("logistics.title")}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOGISTICS_SERVICES.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="group bg-card-bg border border-card-border rounded-xl p-6 hover:shadow-lg hover:border-navy/20 transition-all duration-200 cursor-pointer"
              >
                <div className="w-12 h-12 bg-navy/8 rounded-lg flex items-center justify-center mb-4 group-hover:bg-navy/12 transition-colors duration-200">
                  <Icon className="text-navy" size={24} />
                </div>
                <h4 className="text-navy font-bold text-lg mb-2">
                  {t(`logistics.items.${key}.title`)}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`logistics.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
