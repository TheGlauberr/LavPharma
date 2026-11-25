"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_URL } from "@/lib/site";
import Reveal from "./ui/Reveal";
import SplitSection from "./ui/SplitSection";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mojywqwp";

type Status = "idle" | "sending" | "success" | "error";

interface FieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

function Field({ id, name, label, placeholder, type = "text", required = false }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-[11px]">
        {label}
      </label>
      <input id={id} type={type} name={name} required={required} placeholder={placeholder} className="field" />
    </div>
  );
}

function ContactDetails() {
  const t = useTranslations("Contact.info");
  const rows = [
    {
      label: t("email"),
      content: (
        <a href="mailto:info@lavpharma.com" className="hover:text-accent-deep">
          info@lavpharma.com
        </a>
      ),
    },
    {
      label: t("phone"),
      content: (
        <>
          <a href="tel:+50372384539" className="block hover:text-accent-deep">
            +503 7238 4539
          </a>
          <a href="tel:+50231859189" className="block hover:text-accent-deep">
            +502 3185 9189
          </a>
        </>
      ),
    },
    { label: t("location"), content: t("address") },
  ];

  return (
    <div className="mt-10">
      <dl className="border-b border-line">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-t border-line py-4">
            <dt className="eyebrow pt-0.5 text-[11px]">{row.label}</dt>
            <dd className="text-[15px] leading-relaxed">{row.content}</dd>
          </div>
        ))}
      </dl>
      <a
        href={DEFAULT_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost mt-6 w-full sm:w-auto"
      >
        <MessageCircle size={16} aria-hidden="true" className="text-whatsapp-deep" />
        WhatsApp
      </a>
    </div>
  );
}

export default function Contact() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <SplitSection
      id="contacto"
      surface="band"
      eyebrow={t("badge")}
      title={t("title")}
      lead={t("subtitle")}
      asideExtra={<ContactDetails />}
    >
      <Reveal>
        <form onSubmit={handleSubmit} className="card grid gap-4 p-5 sm:p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="contact-name" name="name" required label={t("form.name")} placeholder={t("form.namePlaceholder")} />
            <Field id="contact-company" name="company" label={t("form.company")} placeholder={t("form.companyPlaceholder")} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              id="contact-email"
              name="email"
              type="email"
              required
              label={t("form.email")}
              placeholder={t("form.emailPlaceholder")}
            />
            <Field
              id="contact-phone"
              name="phone"
              type="tel"
              label={t("form.phone")}
              placeholder={t("form.phonePlaceholder")}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="eyebrow mb-2 block text-[11px]">
              {t("form.product")}
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder={t("form.productPlaceholder")}
              className="field resize-none"
            />
          </div>
          <button type="submit" disabled={status === "sending"} className="btn mt-2 w-full">
            {status === "sending" ? "..." : t("form.submit")}
            {status !== "sending" ? <ArrowRight size={16} aria-hidden="true" /> : null}
          </button>
          <p role="status" aria-live="polite" className="text-center text-sm empty:hidden">
            {status === "success" ? <span className="text-ok">{t("form.success")}</span> : null}
            {status === "error" ? <span className="text-red-600 dark:text-red-400">{t("form.error")}</span> : null}
          </p>
        </form>
      </Reveal>
    </SplitSection>
  );
}
