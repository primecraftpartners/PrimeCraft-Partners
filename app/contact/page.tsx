import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact PrimeCraft Partners for leather manufacturing quotes, catalogue requests and private label leather apparel inquiries."
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow mb-4 text-brass">Contact</p>
            <h1 className="text-4xl font-black leading-tight sm:text-6xl">Request a quote or catalogue</h1>
            <p className="mt-6 text-lg leading-8 text-white/72">
              Share your product interest, expected quantity, target market and branding requirements. PrimeCraft Partners will respond with manufacturing guidance.
            </p>
            <div className="mt-8 grid gap-4 text-white/75">
              <p className="flex gap-3"><MapPin className="text-brass" size={21} /> {site.location}</p>
              <a href={`mailto:${site.email}`} className="flex gap-3 hover:text-brass"><Mail className="text-brass" size={21} /> {site.email}</a>
              <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} className="flex gap-3 hover:text-brass"><MessageCircle className="text-brass" size={21} /> {site.whatsapp}</a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-brass"><Linkedin className="text-brass" size={21} /> LinkedIn Company Page</a>
            </div>
            <div id="catalogue" className="mt-8 rounded-md border border-white/10 bg-white/5 p-5">
              <FileText className="text-brass" size={28} />
              <h2 className="mt-4 text-xl font-black">Catalogue Strategy</h2>
              <p className="mt-3 text-sm leading-6 text-white/68">
                We show selected products online to keep browsing focused. 170+ Vest Designs Available and 100+ Additional Designs Available Upon Request.
              </p>
              <Link href="#quote" className="btn-gold mt-5">Request Catalogue</Link>
            </div>
          </div>
          <InquiryForm dark title="Quote Request" />
        </div>
      </section>
    </>
  );
}
