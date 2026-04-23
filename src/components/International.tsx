"use client";

import { useTranslations } from "next-intl";
import { MapPin, Factory } from "lucide-react";
import LatamMap from "./LatamMap";

const ORIGIN_COUNTRIES = [
  "India", "España", "Corea del Sur", "Francia", "Alemania", "Brasil",
];

const REGISTRATION_COUNTRIES = [
  "Guatemala", "El Salvador", "Honduras", "Costa Rica", "Panamá",
  "Paraguay", "Uruguay", "Ecuador", "Bolivia",
];

export default function International() {
  const t = useTranslations("International");

  return (
    <section className="py-20 bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-navy text-3xl sm:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Origin countries */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-accent-blue/10 rounded-full px-4 py-1.5 mb-4">
              <Factory size={16} className="text-accent-blue" />
              <span className="text-accent-blue text-sm font-semibold">
                {t("origin.badge")}
              </span>
            </div>
            <h3 className="text-navy text-2xl font-bold mb-2">
              {t("origin.title")}
            </h3>
            <p className="text-muted max-w-xl mx-auto">
              {t("origin.subtitle")}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {ORIGIN_COUNTRIES.map((country) => (
              <div
                key={country}
                className="bg-white rounded-lg px-5 py-3 shadow-sm border border-card-border flex items-center gap-2"
              >
                <MapPin size={14} className="text-accent-blue flex-shrink-0" />
                <span className="text-navy font-medium text-sm">{country}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Registration countries — Latin America */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-accent-blue/10 rounded-full px-4 py-1.5 mb-4">
              <MapPin size={16} className="text-accent-blue" />
              <span className="text-accent-blue text-sm font-semibold">
                {t("registration.badge")}
              </span>
            </div>
            <h3 className="text-navy text-2xl sm:text-3xl font-bold mb-2">
              {t("registration.title")}
            </h3>
            <p className="text-muted max-w-xl mx-auto">
              {t("registration.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Map */}
            <div className="order-2 lg:order-1">
              <LatamMap />
            </div>

            {/* Country list */}
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REGISTRATION_COUNTRIES.map((country) => (
                  <div
                    key={country}
                    className="bg-white rounded-lg px-4 py-3 shadow-sm border border-card-border flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-accent-blue rounded-full flex-shrink-0" />
                    <span className="text-navy font-medium text-sm">{country}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
