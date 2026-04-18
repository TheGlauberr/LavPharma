"use client";

import { useTranslations } from "next-intl";
import {
  Shield,
  CheckCircle,
  Zap,
  Award,
  Lock,
  Users,
  Lightbulb,
} from "lucide-react";

const VALUE_KEYS = [
  { key: "integrity", icon: Shield },
  { key: "responsibility", icon: CheckCircle },
  { key: "efficiency", icon: Zap },
  { key: "quality", icon: Award },
  { key: "confidentiality", icon: Lock },
  { key: "clientFocus", icon: Users },
  { key: "innovation", icon: Lightbulb },
] as const;

export default function About() {
  const t = useTranslations("About");

  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-navy text-3xl sm:text-4xl font-bold text-center mb-16">
          {t("title")}
        </h2>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-card-bg rounded-xl p-8 border border-card-border">
            <h3 className="text-accent-blue font-bold text-xl mb-4">
              {t("mission.title")}
            </h3>
            <p className="text-muted leading-relaxed">{t("mission.text")}</p>
          </div>
          <div className="bg-card-bg rounded-xl p-8 border border-card-border">
            <h3 className="text-accent-blue font-bold text-xl mb-4">
              {t("vision.title")}
            </h3>
            <p className="text-muted leading-relaxed">{t("vision.text")}</p>
          </div>
        </div>

        {/* Values */}
        <h3 className="text-navy text-2xl font-bold text-center mb-10">
          {t("valuesTitle")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_KEYS.map(({ key, icon: Icon }) => (
            <div key={key} className="text-center p-6">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="text-accent-blue" size={22} />
              </div>
              <h4 className="text-navy font-bold mb-2">
                {t(`values.${key}.title`)}
              </h4>
              <p className="text-muted text-sm">
                {t(`values.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
