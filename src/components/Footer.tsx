import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DEFAULT_WHATSAPP_URL } from "@/lib/site";

const LINK_CLASS = "text-[14.5px] text-mut transition-colors hover:text-ink";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tContact = useTranslations("Contact");
  const year = new Date().getFullYear();

  const links = [
    { href: "/#servicios", label: tNav("services") },
    { href: "/#nosotros", label: tNav("about") },
    { href: "/resources", label: tNav("resources") },
    { href: "/#contacto", label: tNav("contact") },
  ];

  return (
    <footer className="surface-deep">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-[minmax(0,4fr)_repeat(3,minmax(0,2fr))] lg:gap-[72px] lg:py-20">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-deep">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-alt.svg" alt="LAV PHARMA" width={106} height={59} className="h-[76px] w-auto lg:h-[88px]" />
          </Link>
          <p className="mt-5 max-w-[300px] text-[14.5px] leading-relaxed text-mut">{t("tagline")}</p>
        </div>

        <nav aria-label={t("links")}>
          <h2 className="eyebrow mb-4">{t("links")}</h2>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK_CLASS}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4">{tContact("info.title")}</h2>
          <ul className="space-y-3">
            <li>
              <a href="mailto:info@lavpharma.com" className={`${LINK_CLASS} break-all`}>
                info@lavpharma.com
              </a>
            </li>
            <li>
              <a href="tel:+50372384539" className={LINK_CLASS}>
                +503 7238 4539
              </a>
            </li>
            <li>
              <a href="tel:+50231859189" className={LINK_CLASS}>
                +502 3185 9189
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <h2 className="eyebrow mb-4">WhatsApp</h2>
          <a href={DEFAULT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            <MessageCircle size={16} aria-hidden="true" className="text-whatsapp-deep" />
            {t("chat")}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-[11px]">
            &copy; {year} LAV PHARMA. {t("rights")}
          </p>
          <p className="eyebrow text-[11px]">lavpharma.com</p>
        </div>
      </div>
    </footer>
  );
}
