"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "50372384539";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, los contacto desde lavpharma.com"
)}`;

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tContact = useTranslations("Contact");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-darker">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src="/logo-alt.svg" alt="LAV PHARMA" className="h-14 sm:h-16 w-auto mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#servicios" className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm cursor-pointer">
                  {tNav("services")}
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm cursor-pointer">
                  {tNav("about")}
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm cursor-pointer">
                  {tNav("contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {tContact("info.title")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@lavpharma.com" className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm flex items-center gap-2 cursor-pointer">
                  <Mail size={14} className="flex-shrink-0" />
                  info@lavpharma.com
                </a>
              </li>
              <li>
                <a href="tel:+50372384539" className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm flex items-center gap-2 cursor-pointer">
                  <Phone size={14} className="flex-shrink-0" />
                  +503 7238 4539
                </a>
              </li>
              <li>
                <a href="tel:+50231859189" className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm flex items-center gap-2 cursor-pointer">
                  <Phone size={14} className="flex-shrink-0" />
                  +502 3185 9189
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              WhatsApp
            </h4>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp/10 border border-whatsapp/30 text-whatsapp hover:bg-whatsapp/20 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              <MessageCircle size={16} />
              Chat with us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            &copy; {year} LAV PHARMA. {t("rights")}
          </p>
          <p className="text-gray-600 text-xs">
            Regulatory Pharmaceutical Services
          </p>
        </div>
      </div>
    </footer>
  );
}
