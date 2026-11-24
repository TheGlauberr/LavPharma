import { getTranslations } from "next-intl/server";
import { MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { whatsappUrl } from "@/lib/site";

interface ArticleCtaProps {
  country?: string;
}

export default async function ArticleCta({ country }: ArticleCtaProps) {
  const t = await getTranslations("Resources");
  const place = country ?? t("ctaDefaultCountry");

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative mt-16 overflow-hidden rounded-2xl bg-navy-darker p-7 sm:p-10"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-[0.12]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="40" stroke="#4A90D9" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="28" stroke="#4A90D9" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="16" stroke="#4A90D9" strokeWidth="0.6" />
      </svg>
      <h2
        id="cta-heading"
        className="relative font-display text-white text-2xl sm:text-3xl font-medium tracking-tight max-w-xl"
      >
        {t("ctaTitle", { country: place })}
      </h2>
      <p className="relative mt-3 text-gray-400 text-base leading-relaxed max-w-xl">{t("ctaBody")}</p>
      <div className="relative mt-7 flex flex-col sm:flex-row gap-3">
        <Link
          href="/#contacto"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-blue-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          {t("ctaButton")} →
        </Link>
        <a
          href={whatsappUrl(t("ctaWhatsappMessage"))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-whatsapp/30 bg-whatsapp/10 px-5 py-3 text-sm font-medium text-whatsapp transition-colors hover:bg-whatsapp/20"
        >
          <MessageCircle size={16} />
          {t("ctaWhatsapp")}
        </a>
      </div>
    </section>
  );
}
