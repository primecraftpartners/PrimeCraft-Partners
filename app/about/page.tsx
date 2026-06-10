import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Globe2, ShieldCheck, Target } from "lucide-react";
import { CTA } from "@/components/CTA";
import { FactoryMedia } from "@/components/FactoryMedia";
import { SectionHeader } from "@/components/SectionHeader";
import { factoryPhotos } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about PrimeCraft Partners, an OEM leather manufacturer and private label leather apparel supplier in Sialkot, Pakistan."
};

const process = [
  "Design and specification review",
  "Material and trim sourcing",
  "Pattern and sample development",
  "Bulk stitching and assembly",
  "Quality control and measurement checks",
  "Packing and worldwide export preparation"
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            <Image src={factoryPhotos[0].src} alt={factoryPhotos[0].alt} fill priority sizes="45vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow mb-4 text-brass">Company Overview</p>
            <h1 className="text-4xl font-black leading-tight sm:text-6xl">Professional leather manufacturing for global B2B buyers</h1>
            <p className="mt-6 text-lg leading-8 text-white/72">
              PrimeCraft Partners is a Sialkot-based OEM leather manufacturer specializing in leather vests, leather jackets, leather gloves, leather pants and custom leather apparel for brands, distributors, wholesalers, retailers and importers worldwide.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/oem-private-label" className="btn-gold">OEM Services</Link>
              <Link href="/contact#quote" className="btn-secondary border-white/20 bg-transparent text-white hover:border-brass hover:text-brass">Request Quote</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-pad grid gap-8 lg:grid-cols-4">
          {[
            { title: "Mission", text: "Help brands manufacture dependable leather products with clean execution, flexible MOQ and export-ready finishing.", icon: Target },
            { title: "Experience", text: "Production knowledge across vests, jackets, gloves, pants, labels, trims and specialty leather finishes.", icon: BadgeCheck },
            { title: "Quality Control", text: "Material review, stitching checks, measurement control and packing checks before dispatch.", icon: ShieldCheck },
            { title: "Export Capability", text: "Serving buyers in the United States, Canada, Europe, United Kingdom and Australia.", icon: Globe2 }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-md border border-ink/10 bg-white p-6 shadow-sm">
                <Icon className="text-leather" size={30} />
                <h2 className="mt-5 text-xl font-black">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-parchment py-16">
        <div className="container-pad">
          <SectionHeader eyebrow="Production Process" title="Structured manufacturing from inquiry to export" />
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {process.map((step, index) => (
              <div key={step} className="rounded-md border border-ink/10 bg-white p-5">
                <p className="text-sm font-black text-leather">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-black">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FactoryMedia showVideos={false} />
      <CTA />
    </>
  );
}
