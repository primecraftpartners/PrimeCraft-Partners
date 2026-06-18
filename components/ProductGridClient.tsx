"use client";

import { Grid2X2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export function ProductGridClient({ products, fixedCollection }: { products: Product[]; fixedCollection?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(fixedCollection ?? "all");
  const [sort, setSort] = useState(fixedCollection ? "featured" : "category");

  const categories = useMemo(() => {
    const grouped = products.reduce<Map<string, { label: string; value: string; count: number }>>((map, product) => {
      const existing = map.get(product.categorySlug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(product.categorySlug, { label: product.category, value: product.categorySlug, count: 1 });
      }
      return map;
    }, new Map());

    return Array.from(grouped.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, [products]);

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCollection = category === "all" || product.categorySlug === category;
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

  const groupedVisible = useMemo(() => {
    return visible.reduce<Array<{ category: string; slug: string; products: Product[] }>>((groups, product) => {
      const existing = groups.find((group) => group.slug === product.categorySlug);
      if (existing) {
        existing.products.push(product);
      } else {
        groups.push({ category: product.category, slug: product.categorySlug, products: [product] });
      }
      return groups;
    }, []);
  }, [visible]);

  const showGrouped = !fixedCollection && category === "all" && sort === "category" && !query.trim();

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
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-black uppercase tracking-wide transition ${
                category === "all"
                  ? "border-ink bg-ink text-white"
                  : "border-ink/15 bg-white text-ink/65 hover:border-leather hover:text-leather"
              }`}
            >
              <Grid2X2 size={14} />
              All Products
              <span className="rounded-sm bg-current/10 px-1.5 py-0.5 text-[10px]">{products.length}</span>
            </button>
            {categories.map((filter) => (
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
                <span className="ml-2 rounded-sm bg-current/10 px-1.5 py-0.5 text-[10px]">{filter.count}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <p className="mt-5 text-sm font-bold text-ink/55">{visible.length} products shown for quotation inquiry.</p>
      {showGrouped ? (
        <div className="mt-7 grid gap-10">
          {groupedVisible.map((group) => (
            <section key={group.slug}>
              <div className="mb-4 flex items-end justify-between gap-4 border-b border-ink/10 pb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-leather">Category</p>
                  <h2 className="mt-1 text-2xl font-black text-ink">{group.category}</h2>
                </div>
                <p className="text-sm font-bold text-ink/50">{group.products.length} products</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.products.map((product) => (
                  <ProductCard key={product.sku} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
