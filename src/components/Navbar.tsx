"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#servicios", label: t("services") },
    { href: "#nosotros", label: t("about") },
    { href: "#contacto", label: t("contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[72px] ${
        scrolled
          ? "bg-navy-darker/95 backdrop-blur-xl shadow-lg border-b border-white/5"
          : "bg-navy-darker/90 backdrop-blur-xl border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <a href="#" className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-accent-blue/40 rounded-lg">
            <img
              src="/logo-alt.svg"
              alt="LAV PHARMA"
              className="h-10 sm:h-11 w-auto"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/75 text-[13.5px] font-medium px-3.5 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-150 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <a
              href="#contacto"
              className="bg-accent-blue hover:bg-accent-blue-hover text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              {t("contact")} →
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white cursor-pointer hover:text-white/80 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-darker/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-white/75 font-medium text-base px-3 py-2.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
