"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const OPTIONS = [
  { locale: "en", label: "EN", aria: "Switch to English" },
  { locale: "es", label: "ES", aria: "Cambiar a Español" },
] as const;

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
    <div className="eyebrow flex items-center gap-1.5">
      {OPTIONS.map((option, i) => (
        <span key={option.locale} className="flex items-center gap-1.5">
          {i > 0 ? <span aria-hidden="true">/</span> : null}
          <button
            type="button"
            onClick={() => switchTo(option.locale)}
            aria-label={option.aria}
            aria-pressed={locale === option.locale}
            className={`cursor-pointer rounded px-0.5 py-1 uppercase transition-colors focus-visible:outline-2 focus-visible:outline-accent-deep ${
              locale === option.locale ? "text-ink" : "text-faint hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
