"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "50372384539";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, los contacto desde lavpharma.com"
)}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-whatsapp hover:bg-whatsapp/90 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
