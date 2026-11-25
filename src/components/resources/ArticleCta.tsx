import { getTranslations } from "next-intl/server";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { whatsappUrl } from "@/lib/site";

interface ArticleCtaProps {
  country?: string;
}

export default async function ArticleCta({ country }: ArticleCtaProps) {
  const t = await getTranslations("Resources");
  const place = country ?? t("ctaDefaultCountry");

  return (
    <section aria-labelledby="cta-heading" className="surface-navy relative mt-10 overflow-hidden rounded-2xl p-6 sm:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(420px_260px_at_100%_0%,#000,transparent_75%)]"
      />
      <h2 id="cta-heading" className="relative max-w-xl text-[26px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[30px]">
        {t("ctaTitle", { country: place })}
      </h2>
      <p className="relative mt-3 max-w-xl text-[16px] leading-relaxed text-mut">{t("ctaBody")}</p>
      <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
        <Link href="/#contacto" className="btn">
          {t("ctaButton")}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <a
          href={whatsappUrl(t("ctaWhatsappMessage"))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          <MessageCircle size={16} aria-hidden="true" className="text-whatsapp" />
          {t("ctaWhatsapp")}
        </a>
      </div>
    </section>
  );
}
