"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import MolecularBg from "./MolecularBg";
import HeroMolecule from "./HeroMolecule";

const WHATSAPP_NUMBER = "50372384539";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, los contacto desde lavpharma.com"
)}`;

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Multi-layer background for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a3040] via-navy to-navy-darker" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/[0.08] via-transparent to-transparent" />

      {/* Prominent gradient orbs */}
      <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-accent-blue/[0.12] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-accent-blue/[0.08] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-[30%] right-[30%] w-[250px] h-[250px] bg-[#5BA0E8]/[0.06] rounded-full blur-[60px] pointer-events-none" />

      {/* Background molecular network */}
      <MolecularBg className="absolute inset-0 w-full h-full text-accent-blue pointer-events-none" />

      {/* Grid pattern - slightly more visible */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,144,217,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,217,0.6) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Accent light strip at top for nav contrast */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-36 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <div
              className="inline-block bg-accent-blue/10 border border-accent-blue/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up"
            >
              <span className="text-accent-blue text-xs tracking-[2px] uppercase font-semibold">
                {t("label")}
              </span>
            </div>
            <h1
              className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              {t("title")}
            </h1>
            <p
              className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {t("subtitle")}
            </p>
            <div
              className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: "0.45s" }}
            >
              <a
                href="#contacto"
                className="bg-accent-blue hover:bg-accent-blue-hover text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-accent-blue/25 cursor-pointer"
              >
                {t("cta")}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-whatsapp/60 text-whatsapp hover:bg-whatsapp/10 px-8 py-3.5 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2 hover:shadow-lg hover:shadow-whatsapp/15 cursor-pointer"
              >
                <MessageCircle size={18} />
                {t("whatsapp")}
              </a>
            </div>
          </div>

          {/* Molecule visual */}
          <div
            className="flex-1 hidden md:flex items-center justify-center animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <HeroMolecule />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-navy-darker/90 backdrop-blur-md border-t border-accent-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 flex justify-center gap-12 sm:gap-24">
          <div className="text-center">
            <div className="text-accent-blue text-3xl sm:text-4xl font-extrabold">15+</div>
            <div className="text-gray-400 text-sm mt-1">{t("stats.countries")}</div>
          </div>
          <div className="text-center">
            <div className="text-accent-blue text-3xl sm:text-4xl font-extrabold">500+</div>
            <div className="text-gray-400 text-sm mt-1">{t("stats.registrations")}</div>
          </div>
          <div className="text-center">
            <div className="text-accent-blue text-3xl sm:text-4xl font-extrabold">100%</div>
            <div className="text-gray-400 text-sm mt-1">{t("stats.commitment")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
