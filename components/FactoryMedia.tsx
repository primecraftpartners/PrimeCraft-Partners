import Image from "next/image";
import { factoryPhotos, factoryVideos } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";

export function FactoryMedia({ showVideos = true }: { showVideos?: boolean }) {
  return (
    <section className="bg-white py-16">
      <div className="container-pad">
        <SectionHeader
          eyebrow="Factory Showcase"
          title="Real production assets from our leather manufacturing workflow"
          text="Workshop, stitching, sorting, material storage, packaging and production footage help buyers assess our manufacturing capability before requesting a quote."
        />
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {factoryPhotos.map((photo) => (
            <div key={photo.src} className="relative aspect-[4/5] overflow-hidden rounded-md bg-parchment">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
        {showVideos ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {factoryVideos.map((src, index) => (
              <video
                key={src}
                className="aspect-video w-full rounded-md bg-ink object-cover"
                controls
                muted
                preload="metadata"
                aria-label={`Factory production video ${index + 1}`}
              >
                <source src={src} type="video/mp4" />
              </video>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
