import fs from "fs";
import path from "path";
import { parseCsv } from "@/lib/csv";
import { sizeCharts } from "@/lib/site";

export type Product = {
  sku: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  material: string;
  moq: string;
  colors: string[];
  sizes: string[];
  tags: string[];
  images: string[];
  featured: boolean;
};

export type CollectionSlug = string;

export type ProductCollection = {
  slug: CollectionSlug;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  image: string;
  seo: string;
  productCount: number;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (!word) return word;
      if (word.includes("'")) {
        return word
          .split("'")
          .map((part, index) => (index === 0 ? `${part.charAt(0).toUpperCase()}${part.slice(1)}` : part))
          .join("'");
      }
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    })
    .join(" ");
}

function splitList(value: string) {
  return value
    .split(/[,|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function cleanCategory(value: string) {
  return titleCase(value.trim() || "Uncategorized");
}

function describeCategory(category: string) {
  const normalized = category.toLowerCase();

  if (normalized.includes("jacket")) {
    return `${category} styles manufactured for OEM, wholesale and private label leather apparel programs.`;
  }
  if (normalized.includes("vest")) {
    return `${category} designs for motorcycle, fashion, club and custom private label collections.`;
  }
  if (normalized.includes("glove")) {
    return `${category} production for motorcycle, tactical and custom leather accessory lines.`;
  }
  if (normalized.includes("protector")) {
    return `${category} options for protective leather apparel and riding accessory programs.`;
  }
  if (normalized.includes("pant") || normalized.includes("trouser") || normalized.includes("jeans")) {
    return `${category} manufactured for biker, fashion and wholesale leather clothing buyers.`;
  }

  return `${category} products available for OEM manufacturing, private label branding and wholesale inquiry.`;
}

function materialFallback(name: string, description: string) {
  const source = `${name} ${description}`.toLowerCase();
  if (source.includes("lamb")) return "Genuine lamb nappa leather";
  if (source.includes("suede")) return "Genuine suede leather";
  if (source.includes("cowhide")) return "Genuine cowhide leather";
  if (source.includes("goat")) return "Genuine goat leather";
  return "Genuine leather";
}

let cache: Product[] | null = null;
let collectionsCache: ProductCollection[] | null = null;

export function getProducts(): Product[] {
  if (cache) return cache;

  const csvPath = path.join(process.cwd(), "catalogue.csv");
  const rows = parseCsv(fs.readFileSync(csvPath, "utf8"));

  const products = rows.map((row, index) => {
    const name = row["Product Name"] || "Custom Leather Product";
    const category = cleanCategory(row.Category || "");
    const categorySlug = slugify(category);
    const images = [
      row["Main Image"],
      row["Image 2"],
      row["Image 3"],
      row["Image 4"],
      row["Image 5"]
    ].filter(Boolean);

    return {
      sku: row.SKU,
      slug: `${slugify(name)}-${row.SKU.toLowerCase()}`,
      name,
      category,
      categorySlug,
      description: row.Description || describeCategory(category),
      material: row.Material || materialFallback(name, row.Description || ""),
      moq: row.MOQ || "50",
      colors: splitList(row["Colors Available"] || "Black, Brown, Tan, Custom Colors"),
      sizes: splitList(row["Sizes Available"] || "S, M, L, XL, 2XL, 3XL"),
      tags: splitList(row.Tags || ""),
      images,
      featured: index < 18 || row.Status?.toLowerCase().includes("featured")
    };
  });

  cache = products;
  return products;
}

export function getCollections(): ProductCollection[] {
  if (collectionsCache) return collectionsCache;

  const grouped = getProducts().reduce<Map<string, Product[]>>((map, product) => {
    const existing = map.get(product.categorySlug) ?? [];
    existing.push(product);
    map.set(product.categorySlug, existing);
    return map;
  }, new Map());

  collectionsCache = Array.from(grouped.entries())
    .map(([slug, products]: [string, Product[]]) => {
      const category = products[0]?.category ?? "Uncategorized";
      const image = products.find((product) => product.images[0])?.images[0] ?? "/assets/brand/banner.png";

      return {
        slug,
        title: category,
        shortTitle: category.replace(/^Leather\s+/i, ""),
        category,
        description: describeCategory(category),
        image,
        seo: `${category} manufacturer for OEM, wholesale and private label leather production.`,
        productCount: products.length
      };
    })
    .sort((a, b) => a.category.localeCompare(b.category));

  return collectionsCache;
}

export const collectionOrder: CollectionSlug[] = getCollections().map((collection) => collection.slug);

export function getCollectionsRecord() {
  return getCollections().reduce<Record<string, ProductCollection>>((record, collection) => {
    record[collection.slug] = collection;
    return record;
  }, {});
}

export function getCollectionBySlug(slug: string) {
  return getCollections().find((collection) => collection.slug === slug);
}

export function getFeaturedProducts(limit = 16) {
  return getProducts()
    .filter((product) => product.images.length > 0)
    .slice(0, limit);
}

export function getProductBySlug(slug: string) {
  return getProducts().find((product) => product.slug === slug || product.sku.toLowerCase() === slug.toLowerCase());
}

export function getProductsByCollection(collection: CollectionSlug) {
  return getProducts().filter((product) => product.categorySlug === collection);
}

export function getSizeChart(product: Product) {
  const normalized = `${product.category} ${product.name}`.toLowerCase();
  const key = normalized.includes("women") && normalized.includes("vest")
    ? "Women's Leather Vests"
    : normalized.includes("vest")
      ? "Men's Leather Vests"
      : normalized.includes("jacket")
        ? "Leather Jackets"
        : normalized.includes("glove") || normalized.includes("protector")
          ? "Leather Gloves"
          : "Leather Pants";

  return sizeCharts[key];
}
