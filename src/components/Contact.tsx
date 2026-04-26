"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "50372384539";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, los contacto desde lavpharma.com"
)}`;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mojywqwp";

export default function Contact() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent-blue/[0.18] rounded-full px-3.5 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_0_3px_rgba(43,108,223,0.18)]" />
              <span className="text-[#9DBEFF] text-[11px] tracking-[0.18em] uppercase font-semibold">
                {t("badge")}
              </span>
            </div>
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {t("title")}
            </h2>
          </div>
          <p className="text-gray-400 text-base lg:text-lg max-w-md leading-relaxed lg:text-right">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/[0.04] border border-white/10 rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label htmlFor="contact-name" className="block font-mono text-[10.5px] text-white/55 tracking-[0.08em] uppercase mb-1.5">
                  {t("form.name")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  placeholder={t("form.namePlaceholder")}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-accent-blue transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-company" className="block font-mono text-[10.5px] text-white/55 tracking-[0.08em] uppercase mb-1.5">
                  {t("form.company")}
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  placeholder={t("form.companyPlaceholder")}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-accent-blue transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label htmlFor="contact-email" className="block font-mono text-[10.5px] text-white/55 tracking-[0.08em] uppercase mb-1.5">
                  {t("form.email")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  placeholder={t("form.emailPlaceholder")}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-accent-blue transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block font-mono text-[10.5px] text-white/55 tracking-[0.08em] uppercase mb-1.5">
                  {t("form.phone")}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder={t("form.phonePlaceholder")}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-accent-blue transition-colors"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="contact-message" className="block font-mono text-[10.5px] text-white/55 tracking-[0.08em] uppercase mb-1.5">
                {t("form.product")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder={t("form.productPlaceholder")}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-accent-blue transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-accent-blue hover:bg-accent-blue-hover disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold text-sm transition-colors duration-200 cursor-pointer inline-flex items-center justify-center gap-2"
            >
              {status === "sending" ? "..." : t("form.submit")}
              {status !== "sending" && (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>

            {status === "success" && (
              <p className="text-green-400 text-sm text-center mt-3">{t("form.success")}</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm text-center mt-3">{t("form.error")}</p>
            )}
          </form>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-accent-blue/15 text-[#9DBEFF] grid place-items-center flex-shrink-0">
                <Mail size={16} />
              </div>
              <div>
                <div className="font-mono text-[10.5px] text-white/50 tracking-[0.08em] uppercase">{t("info.email")}</div>
                <div className="text-white text-sm mt-1 leading-relaxed">
                  <a href="mailto:info@lavpharma.com" className="hover:text-accent-blue transition-colors block">info@lavpharma.com</a>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-accent-blue/15 text-[#9DBEFF] grid place-items-center flex-shrink-0">
                <Phone size={16} />
              </div>
              <div>
                <div className="font-mono text-[10.5px] text-white/50 tracking-[0.08em] uppercase">{t("info.phone")}</div>
                <div className="text-white text-sm mt-1 leading-relaxed">
                  <a href="tel:+50372384539" className="hover:text-accent-blue transition-colors block">+503 7238 4539</a>
                  <a href="tel:+50231859189" className="hover:text-accent-blue transition-colors block">+502 3185 9189</a>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-accent-blue/15 text-[#9DBEFF] grid place-items-center flex-shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <div className="font-mono text-[10.5px] text-white/50 tracking-[0.08em] uppercase">{t("info.location")}</div>
                <div className="text-white text-sm mt-1 leading-relaxed">{t("info.address")}</div>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 w-full bg-[#1A8754] hover:bg-[#15703f] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
