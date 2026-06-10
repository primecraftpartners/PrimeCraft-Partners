import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Boxes, CheckCircle2, Tag } from "lucide-react";
import { FinishGrid } from "@/components/FinishGrid";
import { InquiryForm } from "@/components/InquiryForm";
import { ProductGallery } from "@/components/ProductGallery";
import { SizeChart } from "@/components/SizeChart";
import { getProductBySlug, getProducts, getSizeChart } from "@/lib/products";

type ProductPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: product.name,
    description: `${product.name} by PrimeCraft Partners. OEM manufacturing, private label branding and custom leather production inquiry.`
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const chart = getSizeChart(product);
  const gallery = product.images.slice(0, 5);

  return (
    <>
      <section className="bg-parchment py-12">
        <div className="container-pad">
          <Link href="/products" className="text-sm font-bold uppercase tracking-wide text-leather">
            Back to products
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <ProductGallery images={gallery} productName={product.name} />

            <div>
              <p className="eyebrow mb-3">{product.category}</p>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl">{product.name}</h1>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                <span className="rounded-sm bg-ink px-3 py-2 text-white">SKU {product.sku}</span>
                <span className="rounded-sm bg-white px-3 py-2 text-ink">MOQ {product.moq} Pieces</span>
                <span className="rounded-sm bg-white px-3 py-2 text-ink">Private Label Ready</span>
              </div>
              <p className="mt-6 whitespace-pre-line text-base leading-8 text-ink/68">{product.description}</p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <InfoBlock title="Material" value={product.material} />
                <InfoBlock title="Sizes" value={product.sizes.join(", ")} />
                <InfoBlock title="Colors" value={product.colors.join(", ")} />
                <InfoBlock title="Category" value={product.category} />
              </div>

              <div className="mt-7 rounded-md border border-ink/10 bg-white p-5">
                <h2 className="text-xl font-black">Custom Manufacturing</h2>
                <div className="mt-4 grid gap-3 text-sm font-bold text-ink/70">
                  {[
                    ["OEM Manufacturing Available", Boxes],
                    ["Private Label Available", Tag],
                    ["Custom Branding Available", BadgeCheck],
                    ["MOQ: 50 Pieces", CheckCircle2]
                  ].map(([label, Icon]) => {
                    const TypedIcon = Icon as typeof Boxes;
                    return (
                      <p key={label as string} className="flex items-center gap-3">
                        <TypedIcon className="text-leather" size={18} />
                        {label as string}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7">
                <InquiryForm productName={`${product.name} (${product.sku})`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-12 text-white">
        <div className="container-pad grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow mb-3 text-brass">Private Label Ready</p>
            <h2 className="text-3xl font-black leading-tight sm:text-4xl">
              Put Your Logo Where It Belongs. On This Product.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              Request custom labels, hang tags, packaging, leather finishes, sizes and trims for {product.name}.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/contact#quote" className="btn-gold">Request Quote</Link>
            <Link href="/oem-private-label" className="btn-secondary border-white/20 bg-transparent text-white hover:border-brass hover:text-brass">
              Branding Options
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-pad">
          <p className="eyebrow mb-3">Size Chart</p>
          <h2 className="mb-6 text-3xl font-black">Category-specific size chart</h2>
          <SizeChart chart={chart} />
        </div>
      </section>

      <FinishGrid />
    </>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-md border border-ink/10 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-leather">{title}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-ink/75">{value || "Available on request"}</p>
    </div>
  );
}
