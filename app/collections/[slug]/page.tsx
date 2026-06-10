import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { ProductGridClient } from "@/components/ProductGridClient";
import { collections, collectionOrder, getProductsByCollection, type CollectionSlug } from "@/lib/products";

type CollectionPageProps = {
  params: { slug: CollectionSlug };
};

export function generateStaticParams() {
  return collectionOrder.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: CollectionPageProps): Metadata {
  const collection = collections[params.slug];
  if (!collection) return {};

  return {
    title: collection.title,
    description: collection.seo
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const collection = collections[params.slug];
  if (!collection) notFound();

  const products = getProductsByCollection(params.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 opacity-35">
          <Image src={collection.image} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45" />
        <div className="container-pad relative py-20">
          <p className="eyebrow mb-4 text-brass">Collection</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">{collection.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">{collection.description}</p>
          <p className="mt-4 text-base font-black text-brass">100+ Additional Designs Available Upon Request.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact#quote" className="btn-gold">Request Quote</Link>
            <Link href="/contact#catalogue" className="btn-secondary border-white/20 bg-transparent text-white hover:border-brass hover:text-brass">Request Catalogue</Link>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-16">
        <div className="container-pad">
          <ProductGridClient products={products} fixedCollection={params.slug} />
        </div>
      </section>

      <CTA title={`Develop your ${collection.shortTitle.toLowerCase()} line with PrimeCraft Partners`} />
    </>
  );
}
