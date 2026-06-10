"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/products";

const filters = [
  { label: "All Products", value: "all" },
  { label: "Vests", value: "mens-leather-vests" },
  { label: "Jackets", value: "leather-jackets" },
  { label: "Gloves", value: "leather-gloves" },
  { label: "Pants", value: "leather-pants" },
  { label: "Women's Collection", value: "womens-leather-vests" }
];

export function ProductGridClient({ products, fixedCollection }: { products: Product[]; fixedCollection?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(fixedCollection ?? "all");
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCollection = category === "all" || product.collection === category;
      const matchesQuery =
        !normalizedQuery ||
        [product.name, product.sku, product.category, product.material, product.description].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        );
      return matchesCollection && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "category") return a.category.localeCompare(b.category);
      return Number(b.featured) - Number(a.featured);
    });
  }, [category, products, query, sort]);

  return (
    <div>
      <div className="rounded-md border border-ink/10 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product, SKU, material or category"
              className="field pl-10"
            />
          </label>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="field">
            <option value="featured">Sort: Featured</option>
            <option value="name">Sort: Product Name</option>
            <option value="category">Sort: Category</option>
          </select>
        </div>
        {!fixedCollection ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setCategory(filter.value)}
                className={`rounded-md border px-3 py-2 text-xs font-black uppercase tracking-wide transition ${
                  category === filter.value
                    ? "border-ink bg-ink text-white"
                    : "border-ink/15 bg-white text-ink/65 hover:border-leather hover:text-leather"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <p className="mt-5 text-sm font-bold text-ink/55">{visible.length} products shown for quotation inquiry.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
    </div>
  );
}
