"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Absolute hrefs so the section links also work from /resources pages.
  const links = [
    { href: "/#servicios", label: t("services") },
    { href: "/#nosotros", label: t("about") },
    { href: "/resources", label: t("resources") },
    { href: "/#contacto", label: t("contact") },
  ];
  const isCurrent = (href: string) => href === "/resources" && pathname.startsWith("/resources");

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ${
        scrolled ? "border-line shadow-[0_8px_24px_-20px_rgba(19,24,38,0.35)]" : "border-line"
      }`}
    >
      <nav aria-label="Main" className="wrap flex h-16 items-center gap-3 md:h-[76px] md:gap-10">
        <Link
          href="/"
          className="-my-1 flex-shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-deep"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="LAV PHARMA" width={106} height={59} className="h-[46px] w-auto md:h-[56px]" />
        </Link>

        <ul className="ml-auto hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                className="text-[14.5px] text-mut transition-colors hover:text-ink aria-[current=page]:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3 lg:ml-0 lg:gap-6">
          <LanguageToggle />
          <Link href="/#contacto" className="btn btn-sm hidden min-[370px]:inline-flex">
            {t("contact")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="-mr-2 grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-soft lg:hidden"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
          <ul className="wrap py-2">
            {links.map((link, i) => (
              <li key={link.href} className={i > 0 ? "border-t border-line" : ""}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 text-[16px] font-medium text-ink"
                >
                  {link.label}
                  <ArrowRight size={16} aria-hidden="true" className="text-faint" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
