"use client";

import { Send } from "lucide-react";
import { site } from "@/lib/site";

type InquiryFormProps = {
  productName?: string;
  dark?: boolean;
  title?: string;
};

export function InquiryForm({ productName, dark = false, title = "Request a Manufacturing Quote" }: InquiryFormProps) {
  const fieldClass = dark ? "dark-field" : "field";

  return (
    <form
      id="quote"
      className={`rounded-md border p-5 ${dark ? "border-white/10 bg-white/5" : "border-ink/10 bg-white shadow-sm"}`}
      action={`mailto:${site.email}`}
      method="post"
      encType="text/plain"
    >
      <h3 className={`text-xl font-black ${dark ? "text-white" : "text-ink"}`}>{title}</h3>
      <p className={`mt-2 text-sm leading-6 ${dark ? "text-white/65" : "text-ink/60"}`}>
        Tell us your product interest, target quantity, branding needs and destination country.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input className={fieldClass} name="Name" placeholder="Name" required />
        <input className={fieldClass} name="Company Name" placeholder="Company Name" />
        <input className={fieldClass} name="Country" placeholder="Country" required />
        <input className={fieldClass} type="email" name="Email" placeholder="Email" required />
        <input className={fieldClass} name="WhatsApp" placeholder="WhatsApp" />
        <input className={fieldClass} name="Product Interest" placeholder="Product Interest" defaultValue={productName ?? ""} />
        <textarea className={`${fieldClass} min-h-32 sm:col-span-2`} name="Message" placeholder="Message" />
      </div>
      <button type="submit" className={dark ? "btn-gold mt-4 w-full" : "btn-primary mt-4 w-full"}>
        <Send size={17} />
        Send Quote Request
      </button>
    </form>
  );
}
