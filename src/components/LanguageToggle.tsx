"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: string) {
    if (next !== locale) {
      router.replace(pathname, { locale: next });
    }
  }

  return (
    <div className="flex text-xs border border-white/20 rounded-lg overflow-hidden font-medium">
      <button
        onClick={() => switchTo("en")}
        className={`px-2.5 py-1.5 cursor-pointer transition-colors ${
          locale === "en"
            ? "bg-white text-navy-darker"
            : "text-white/50 hover:text-white/80"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchTo("es")}
        className={`px-2.5 py-1.5 cursor-pointer transition-colors ${
          locale === "es"
            ? "bg-white text-navy-darker"
            : "text-white/50 hover:text-white/80"
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}
