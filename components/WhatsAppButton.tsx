import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=Hello%20PrimeCraft%20Partners%2C%20I%20would%20like%20to%20request%20a%20manufacturing%20quote.`}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-soft transition hover:scale-105"
      aria-label="Contact PrimeCraft Partners on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
