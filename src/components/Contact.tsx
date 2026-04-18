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
    <section id="contacto" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-400 text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              required
              placeholder={t("form.name")}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 transition-colors duration-200"
            />
            <input
              type="email"
              name="email"
              required
              placeholder={t("form.email")}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 transition-colors duration-200"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="tel"
                name="phone"
                placeholder={t("form.phone")}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 transition-colors duration-200"
              />
              <input
                type="text"
                name="company"
                placeholder={t("form.company")}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 transition-colors duration-200"
              />
            </div>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t("form.message")}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 transition-colors duration-200 resize-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-accent-blue hover:bg-accent-blue-hover disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
            >
              {status === "sending" ? "..." : t("form.submit")}
            </button>

            {status === "success" && (
              <p className="text-green-400 text-sm text-center">{t("form.success")}</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">{t("form.error")}</p>
            )}
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-white text-xl font-bold">{t("info.title")}</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="text-accent-blue mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-gray-400 text-sm mb-1">{t("info.email")}</p>
                  <a href="mailto:lavpharmacam@gmail.com" className="text-white hover:text-accent-blue transition-colors block">
                    lavpharmacam@gmail.com
                  </a>
                  <a href="mailto:administracionlavpharma@gmail.com" className="text-white hover:text-accent-blue transition-colors block">
                    administracionlavpharma@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-accent-blue mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-gray-400 text-sm mb-1">{t("info.phone")}</p>
                  <a href="tel:+50372384539" className="text-white hover:text-accent-blue transition-colors block">
                    +503 7238 4539
                  </a>
                  <a href="tel:+50231859189" className="text-white hover:text-accent-blue transition-colors block">
                    +502 3185 9189
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-accent-blue mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-gray-400 text-sm mb-1">{t("info.location")}</p>
                  <p className="text-white">{t("info.address")}</p>
                </div>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-whatsapp hover:bg-whatsapp/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
