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
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F0F6FF] to-[#E4EEFB]" />

      {/* Accent orbs for depth */}
      <div className="absolute top-[-8%] right-[5%] w-[500px] h-[500px] bg-accent-blue/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-accent-blue/[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#C7D9F0]/[0.25] rounded-full blur-[80px] pointer-events-none" />

      {/* Molecular network texture */}
      <MolecularBg className="absolute inset-0 w-full h-full text-navy/40 pointer-events-none" />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, #3D4456 0.8px, transparent 0.8px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
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
              className="text-navy-darker text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              {t("title")}
            </h1>
            <p
              className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up"
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
                className="border border-navy/20 text-navy hover:bg-navy/5 px-8 py-3.5 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle size={18} className="text-whatsapp" />
                {t("whatsapp")}
              </a>
            </div>

            {/* Stats inline */}
            <div
              className="flex gap-8 sm:gap-12 mt-10 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-center lg:text-left">
                <div className="text-accent-blue text-2xl sm:text-3xl font-extrabold">15+</div>
                <div className="text-gray-500 text-xs sm:text-sm mt-0.5">{t("stats.countries")}</div>
              </div>
              <div className="w-px bg-gray-300/50" />
              <div className="text-center lg:text-left">
                <div className="text-accent-blue text-2xl sm:text-3xl font-extrabold">500+</div>
                <div className="text-gray-500 text-xs sm:text-sm mt-0.5">{t("stats.registrations")}</div>
              </div>
              <div className="w-px bg-gray-300/50" />
              <div className="text-center lg:text-left">
                <div className="text-accent-blue text-2xl sm:text-3xl font-extrabold">100%</div>
                <div className="text-gray-500 text-xs sm:text-sm mt-0.5">{t("stats.commitment")}</div>
              </div>
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
    </section>
  );
}
