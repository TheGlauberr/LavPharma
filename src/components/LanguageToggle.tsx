"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const next = locale === "es" ? "en" : "es";
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      onClick={switchLocale}
      className="text-sm font-medium px-3 py-1 rounded-full border border-white/30 text-white/85 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer"
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
