import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe2, MessageSquareText } from "lucide-react";
import { CTA } from "@/components/CTA";
import { FactoryMedia } from "@/components/FactoryMedia";
import { FinishGrid } from "@/components/FinishGrid";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { capabilities, whyChooseUs } from "@/lib/site";
import { getCollections, getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const collections = getCollections();
  const featuredProducts = getFeaturedProducts(16);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,149,60,0.18),transparent_32%),linear-gradient(135deg,#0e0e0d_0%,#1f1a16_55%,#34251a_100%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <Image src="/assets/factory/stitching-floor.jpg" alt="" fill priority sizes="50vw" className="object-cover opacity-42" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-ink/20" />
        </div>
        <div className="container-pad relative grid min-h-[660px] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,680px)_minmax(320px,420px)] lg:justify-between lg:gap-20">
          <div className="max-w-[680px]">
            <p className="eyebrow mb-4 text-brass">OEM Leather Manufacturer in Sialkot, Pakistan</p>
            <h1 className="max-w-[650px] text-4xl font-black leading-[1.08] sm:text-5xl lg:text-6xl">
              Premium Leather Manufacturing & Private Label Solutions
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/76 sm:text-lg">
              OEM Manufacturing, Private Label Production and Custom Leather Apparel for Global Brands.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/products" className="btn-gold">
                View Collection
                <ArrowRight size={17} />
              </Link>
              {/* <Link href="/contact#catalogue" className="btn-secondary border-white/20 bg-white text-ink">
                <FileText size={17} />
                Request Catalogue
              </Link> */}
              <Link href="/contact#quote" className="btn-secondary border-white/20 bg-transparent text-white hover:border-brass hover:text-brass">
                <MessageSquareText size={17} />
                Request Quote
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[420px] lg:mx-0">
            <div className="rounded-md border border-white/15 bg-white/10 p-4 shadow-soft backdrop-blur">
              <Image src="/assets/brand/logo.png" alt="PrimeCraft Partners" width={420} height={180} className="w-full rounded-sm bg-white p-5" />
              <div className="mt-5 rounded-md border border-brass/40 bg-ink/60 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brass">Private Label Promise</p>
                <p className="mt-3 text-2xl font-black leading-tight">Your Brand. Our Craftsmanship.</p>
                <p className="mt-3 text-sm leading-6 text-white/68">Custom leather apparel manufactured with your labels, trims and packaging.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-ink/45 py-5 backdrop-blur">
          <div className="container-pad grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["OEM & Private Label", "Premium Quality", "Low MOQ", "Global Shipping"].map((item) => (
              <div key={item} className="rounded-md border border-white/12 px-4 py-3 text-center">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white/78">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-pad">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="max-w-xl">
              <p className="eyebrow mb-3">Brand-Ready Production</p>
              <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                Put Your Logo Where It Belongs. On Everything.
              </h2>
              <p className="mt-4 text-base leading-7 text-ink/65">
                Neck labels, hang tags, custom packaging, trims and leather garments produced as one complete private label manufacturing program.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/oem-private-label" className="btn-primary">Private Label Options</Link>
                <Link href="/contact#quote" className="btn-secondary">Start an Inquiry</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-md border border-ink/10 bg-ink shadow-soft">
              <Image src="/assets/brand/banner.png" alt="PrimeCraft Partners private label manufacturing banner" width={1776} height={891} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Featured Categories"
            title="Leather apparel collections built for wholesale and brand programs"
            text="Explore core manufacturing categories without browsing an overloaded public catalogue."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {collections.map((collection) => (
              <Link key={collection.slug} href={`/collections/${collection.slug}`} className="group overflow-hidden rounded-md border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <div className="relative aspect-[16/11] bg-parchment">
                  <Image src={collection.image} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute left-3 top-3 rounded-sm bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    {collection.productCount} products
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-leather">{collection.category}</p>
                  <h3 className="mt-3 text-xl font-black text-ink">{collection.shortTitle}</h3>
                  <p className="mt-4 text-sm leading-6 text-ink/60">{collection.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-leather">
                    View collection <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-16">
        <div className="container-pad">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Trending Products"
              title="Selected products for B2B manufacturing inquiries"
              text="A curated selection from our catalogue. 170+ Vest Designs Available and 100+ Additional Designs Available Upon Request."
            />
            <Link href="/products" className="btn-primary">
              View Products
            </Link>
          </div>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Manufacturing Capabilities"
            title="From sample direction to private label production"
            text="PrimeCraft Partners supports brands, importers, wholesalers and distributors with flexible leather product manufacturing."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-md border border-ink/10 bg-white p-6 shadow-sm">
                  <Icon className="text-leather" size={30} />
                  <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/60">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FactoryMedia />

      <section className="bg-ink py-16 text-white">
        <div className="container-pad">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow="Why Choose Us" title="Built for international B2B buyers" light />
            <div className="flex items-center gap-3 text-white/70">
              <Globe2 className="text-brass" size={24} />
              United States, Canada, Europe, United Kingdom and Australia
            </div>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-md border border-white/10 bg-white/5 p-6">
                  <Icon className="text-brass" size={30} />
                  <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FinishGrid />
      <CTA />
    </>
  );
}
