"use client";

import { useTranslations } from "next-intl";
import { MapPin, Globe } from "lucide-react";

const REGIONS = [
  { key: "centralAmerica", countries: ["Guatemala", "El Salvador", "Honduras", "Costa Rica", "Panamá"] },
  { key: "southAmerica", countries: ["Colombia", "Ecuador", "Perú"] },
  { key: "asia", countries: ["India", "China"] },
  { key: "europe", countries: ["España"] },
] as const;

export default function International() {
  const t = useTranslations("International");

  return (
    <section className="py-20 bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-navy text-3xl sm:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REGIONS.map(({ key, countries }) => (
            <div
              key={key}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="text-accent-blue" size={24} />
              </div>
              <h3 className="text-navy font-bold text-lg mb-3">
                {t(`regions.${key}`)}
              </h3>
              <ul className="space-y-1.5">
                {countries.map((country) => (
                  <li
                    key={country}
                    className="text-muted text-sm flex items-center gap-2"
                  >
                    <MapPin size={14} className="text-accent-blue flex-shrink-0" />
                    {country}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
