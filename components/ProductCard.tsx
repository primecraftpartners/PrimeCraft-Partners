import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-md border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] bg-parchment">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : null}
          <div className="absolute left-3 top-3 rounded-sm bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            MOQ {product.moq} pcs
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-leather">{product.category}</p>
          <h3 className="mt-2 min-h-12 text-base font-black leading-snug text-ink">{product.name}</h3>
          <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4 text-sm font-bold text-leather">
            <span>View manufacturing details</span>
            <ArrowUpRight size={17} />
          </div>
        </div>
      </Link>
    </article>
  );
}
