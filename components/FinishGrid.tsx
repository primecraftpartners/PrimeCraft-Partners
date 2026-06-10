import Image from "next/image";
import { finishes } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";

export function FinishGrid() {
  return (
    <section className="bg-parchment py-16">
      <div className="container-pad">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Colors & Finishes"
            title="Available Colors & Finishes"
            text="Most products can be manufactured in custom colors, finishes, textures and leather types."
          />
        </div>
        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {finishes.map((finish) => (
            <div key={finish.name} className="overflow-hidden rounded-md border border-ink/10 bg-white">
              <div className="relative aspect-square">
                <Image src={finish.src} alt={finish.name} fill sizes="20vw" className="object-cover" />
              </div>
              <p className="min-h-12 px-3 py-3 text-sm font-bold text-ink">{finish.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
