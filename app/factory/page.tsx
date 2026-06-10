import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Boxes, PackageCheck, Scissors } from "lucide-react";
import { CTA } from "@/components/CTA";
import { FactoryMedia } from "@/components/FactoryMedia";
import { SectionHeader } from "@/components/SectionHeader";
import { factoryPhotos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Factory",
  description:
    "View PrimeCraft Partners factory photos, production process, quality control, packaging process and leather manufacturing capability."
};

export default function FactoryPage() {
  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="container-pad">
          <p className="eyebrow mb-4 text-brass">Factory</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">Leather production, quality control and packaging capability</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
            Real factory media from our workshop helps global buyers evaluate production capacity, process discipline and export readiness before starting a quote request.
          </p>
        </div>
      </section>

      <FactoryMedia />

      <section className="bg-parchment py-16">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Manufacturing Capability"
            title="Focused leather apparel production"
            text="Our workflow supports vests, jackets, gloves, pants, private label trims, packing and bulk export preparation."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Cutting & Stitching", text: "Leather cutting, stitching, edge work and garment assembly.", icon: Scissors },
              { title: "Quality Control", text: "Material, stitching, measurement and final packing checks.", icon: BadgeCheck },
              { title: "Packaging Process", text: "Packed orders prepared for wholesale and international shipment.", icon: PackageCheck },
              { title: "Bulk Production", text: "MOQ starts from 50 pieces with category-specific planning.", icon: Boxes }
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
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-pad grid gap-5 md:grid-cols-2">
          {factoryPhotos.slice(2).map((photo) => (
            <div key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-md bg-parchment">
              <Image src={photo.src} alt={photo.alt} fill sizes="50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <CTA title="Evaluate PrimeCraft Partners for your next production order" />
    </>
  );
}
