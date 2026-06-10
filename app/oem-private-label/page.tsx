import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Boxes, PackageCheck, PenTool, Scissors, Shirt, Tag } from "lucide-react";
import { CTA } from "@/components/CTA";
import { InquiryForm } from "@/components/InquiryForm";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "OEM & Private Label",
  description:
    "OEM leather manufacturing, private label leather apparel, custom labels, hang tags, packaging and branding by PrimeCraft Partners."
};

const services = [
  { title: "OEM Manufacturing", text: "Production based on your patterns, tech packs, reference samples or target product direction.", icon: Shirt },
  { title: "Private Label Manufacturing", text: "Leather apparel made for your brand with your identity and retail presentation.", icon: Tag },
  { title: "Custom Labels", text: "Neck labels, woven labels, printed care labels and custom inside branding.", icon: Scissors },
  { title: "Custom Hang Tags", text: "Hang tags and branded finishing details prepared for wholesale programs.", icon: PenTool },
  { title: "Custom Packaging", text: "Poly bag, carton and shipment-ready packaging support for bulk export orders.", icon: PackageCheck },
  { title: "MOQ Requirements", text: "Minimum order quantity starts at 50 pieces per order with flexible production planning.", icon: Boxes }
];

export default function OemPrivateLabelPage() {
  return (
    <>
      <section className="bg-parchment py-16">
        <div className="container-pad grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4">OEM & Private Label</p>
            <h1 className="text-4xl font-black leading-tight sm:text-6xl">Your brand, our leather manufacturing expertise</h1>
            <p className="mt-6 text-lg leading-8 text-ink/68">
              PrimeCraft Partners manufactures custom leather apparel for brands, distributors, wholesalers and importers that need OEM production, private label branding and export-ready packaging.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact#quote" className="btn-primary">Request Quote</Link>
              <Link href="/contact#catalogue" className="btn-secondary">Request Catalogue</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-white shadow-soft">
            <Image src="/assets/brand/custom-labeling.png" alt="Custom branding options for leather apparel" fill priority sizes="45vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Services"
            title="Private label production details buyers expect"
            text="From sample development to labels, tags and shipment-ready packing, we help you build a complete leather apparel supply program."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="rounded-md border border-ink/10 bg-white p-6 shadow-sm">
                  <Icon className="text-leather" size={30} />
                  <h2 className="mt-5 text-xl font-black">{service.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/62">{service.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader eyebrow="Production Process" title="How OEM orders move through the factory" light />
            <div className="mt-8 grid gap-4">
              {["Inquiry and specification review", "Sampling and material confirmation", "Bulk production planning", "Stitching, trimming and finishing", "Quality control and packing", "Worldwide export dispatch"].map((step, index) => (
                <div key={step} className="flex gap-4 rounded-md border border-white/10 bg-white/5 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass text-sm font-black text-ink">{index + 1}</span>
                  <p className="font-bold text-white/78">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <InquiryForm dark title="Start an OEM Inquiry" />
        </div>
      </section>

      <CTA />
    </>
  );
}
