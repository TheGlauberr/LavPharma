import { MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_URL } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a
      href={DEFAULT_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-40 grid h-[52px] w-[52px] place-items-center rounded-full border border-white/60 bg-whatsapp text-white shadow-[0_16px_32px_-14px_rgba(19,24,38,0.55),0_0_0_4px_rgba(37,211,102,0.14)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-deep sm:right-6 sm:bottom-6 sm:h-14 sm:w-14"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
