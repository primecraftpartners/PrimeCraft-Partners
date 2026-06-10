import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { ProductGridClient } from "@/components/ProductGridClient";
import { SectionHeader } from "@/components/SectionHeader";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Filter PrimeCraft Partners leather vests, jackets, gloves, pants and women's leather vest designs for OEM manufacturing quotation requests."
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <>
      <section className="bg-ink py-16 text-white">
        <div className="container-pad">
          <p className="eyebrow mb-4 text-brass">Product Catalogue</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">Leather apparel products for OEM inquiry</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
            Browse selected catalogue products, search by SKU or category, then request a custom manufacturing quotation. No public pricing, cart or checkout.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact#quote" className="btn-gold">Request Quote</Link>
            <Link href="/contact#catalogue" className="btn-secondary border-white/20 bg-transparent text-white hover:border-brass hover:text-brass">Request Catalogue</Link>
          </div>
        </div>
      </section>
      <section className="bg-parchment py-16">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Search & Filter"
            title="Filter by product type, keyword or SKU"
            text="Use this as a B2B product reference, then contact us for custom colors, branding, quantities and export details."
          />
          <div className="mt-9">
            <ProductGridClient products={products} />
          </div>
        </div>
      </section>
      <CTA title="Need the full manufacturing catalogue?" text="100+ Additional Designs Available Upon Request. Share your market and product focus to receive relevant styles." />
    </>
  );
}
