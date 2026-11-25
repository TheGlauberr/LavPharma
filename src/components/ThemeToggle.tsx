"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import { applyTheme, DARK_QUERY, readStoredTheme, storeTheme } from "@/lib/theme";

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const isDarkNow = () => document.documentElement.getAttribute("data-theme") === "dark";
const isDarkOnServer = () => false;

/** Sun/moon button. Follows the system until the visitor picks a theme, then remembers it. */
export default function ThemeToggle() {
  const t = useTranslations("Nav");
  const isDark = useSyncExternalStore(subscribe, isDarkNow, isDarkOnServer);

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const onSystemChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme() === null) applyTheme(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  function toggle() {
    const next = isDarkNow() ? "light" : "dark";
    applyTheme(next);
    storeTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t("themeLight") : t("themeDark")}
      title={isDark ? t("themeLight") : t("themeDark")}
      className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-mut transition-colors hover:bg-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-accent-deep"
    >
      <Moon size={18} aria-hidden="true" className="dark:hidden" />
      <Sun size={18} aria-hidden="true" className="hidden dark:block" />
    </button>
  );
}
