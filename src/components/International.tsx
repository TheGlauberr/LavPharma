"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Factory, Globe } from "lucide-react";
import LatamMap from "./LatamMap";

const ORIGIN_COUNTRIES = [
  { name: "India", region: "Asia" },
  { name: "España", region: "Europa" },
  { name: "Corea del Sur", region: "Asia" },
  { name: "Francia", region: "Europa" },
  { name: "Alemania", region: "Europa" },
  { name: "Brasil", region: "América" },
];

const REGISTRATION_COUNTRIES = [
  "Guatemala", "El Salvador", "Honduras", "Costa Rica", "Panamá",
  "Paraguay", "Uruguay", "Ecuador", "Bolivia",
];

export default function International() {
  const t = useTranslations("International");
  const originRef = useRef<HTMLDivElement>(null);
  const [originVisible, setOriginVisible] = useState(false);

  useEffect(() => {
    const el = originRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOriginVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="internacional">
      {/* ─── Origin Countries Block ─── */}
      <div className="bg-card-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent-blue/10 rounded-full px-4 py-1.5 mb-6">
              <Globe size={16} className="text-accent-blue" />
              <span className="text-accent-blue text-sm font-semibold tracking-wide">
                {t("origin.badge")}
              </span>
            </div>
            <h2 className="text-navy text-3xl sm:text-4xl font-bold mb-4">
              {t("title")}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t("origin.subtitle")}
            </p>
          </div>

          <div ref={originRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {ORIGIN_COUNTRIES.map((country, i) => (
              <div
                key={country.name}
                className={`bg-white rounded-xl p-5 shadow-sm border border-card-border text-center hover:shadow-md hover:border-accent-blue/30 transition-all duration-300 ${
                  originVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Factory size={16} className="text-accent-blue" />
                </div>
                <span className="text-navy font-semibold text-sm block">{country.name}</span>
                <span className="text-gray-400 text-xs">{country.region}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Registration Countries Block (Dark) ─── */}
      <div className="bg-navy-dark pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/20 rounded-full px-4 py-1.5 mb-4">
              <MapPin size={16} className="text-accent-blue" />
              <span className="text-accent-blue text-sm font-semibold">
                LATAM
              </span>
            </div>
            <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3">
              {t("registration.title")}
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              {t("registration.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:-ml-16">
            {/* Animated network map */}
            <div className="order-2 lg:order-1">
              <LatamMap />
            </div>

            {/* Country grid */}
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REGISTRATION_COUNTRIES.map((country) => (
                  <div
                    key={country}
                    className="group bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-center gap-3 hover:bg-accent-blue/10 hover:border-accent-blue/30 transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-accent-blue/15 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent-blue/25 transition-colors duration-200">
                      <MapPin size={14} className="text-accent-blue" />
                    </div>
                    <span className="text-white font-medium text-sm">{country}</span>
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
