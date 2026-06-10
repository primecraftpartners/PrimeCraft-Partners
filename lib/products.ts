import fs from "fs";
import path from "path";
import { parseCsv } from "@/lib/csv";
import { sizeCharts } from "@/lib/site";

export type Product = {
  sku: string;
  slug: string;
  name: string;
  category: string;
  collection: CollectionSlug;
  description: string;
  material: string;
  moq: string;
  colors: string[];
  sizes: string[];
  tags: string[];
  images: string[];
  featured: boolean;
};

export type CollectionSlug =
  | "mens-leather-vests"
  | "leather-jackets"
  | "leather-gloves"
  | "leather-pants"
  | "womens-leather-vests";

export const collections: Record<
  CollectionSlug,
  {
    title: string;
    shortTitle: string;
    category: string;
    description: string;
    image: string;
    seo: string;
  }
> = {
  "mens-leather-vests": {
    title: "Men's Leather Vests",
    shortTitle: "Leather Vests",
    category: "Leather Vests",
    description:
      "OEM motorcycle vests, club vests, braided vests and private label leather vest production for brands and wholesalers.",
    image: "/assets/brand/banner.png",
    seo: "Leather vest manufacturer and motorcycle vest supplier for private label brands."
  },
  "leather-jackets": {
    title: "Leather Jackets",
    shortTitle: "Leather Jackets",
    category: "Leather Jackets",
    description:
      "Custom leather jackets manufactured for apparel brands, retailers and importers with flexible branding options.",
    image: "/assets/brand/custom-labeling.png",
    seo: "Leather jacket manufacturer for OEM and private label leather clothing."
  },
  "leather-gloves": {
    title: "Leather Gloves",
    shortTitle: "Leather Gloves",
    category: "Leather Gloves",
    description:
      "Motorcycle leather gloves, tactical gloves and padded glove production for global wholesale buyers.",
    image: "/assets/factory/stitching-floor.jpg",
    seo: "Leather gloves manufacturer for motorcycle and custom leather apparel suppliers."
  },
  "leather-pants": {
    title: "Leather Pants",
    shortTitle: "Leather Pants",
    category: "Leather Pants",
    description:
      "Biker leather pants, leather trousers and custom leather bottoms produced for private label programs.",
    image: "/assets/factory/production-sorting.jpeg",
    seo: "Leather pants manufacturer for custom leather garments and wholesale importers."
  },
  "womens-leather-vests": {
    title: "Women's Leather Vests",
    shortTitle: "Women's Collection",
    category: "Women's Leather Vests",
    description:
      "Fitted women's leather vests, fashion vests and custom private label women's leather apparel.",
    image: "/assets/brand/custom-labeling.png",
    seo: "Women's leather vest manufacturer with OEM and private label production."
  }
};

export const collectionOrder = Object.keys(collections) as CollectionSlug[];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitList(value: string) {
  return value
    .split(/[,|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function resolveCollection(category: string, name: string): CollectionSlug {
  const normalized = `${category} ${name}`.toLowerCase();

  if (normalized.includes("women") && normalized.includes("vest")) {
    return "womens-leather-vests";
  }
  if (normalized.includes("jacket")) {
    return "leather-jackets";
  }
  if (normalized.includes("glove") || normalized.includes("protector")) {
    return "leather-gloves";
  }
  if (normalized.includes("pant") || normalized.includes("trouser") || normalized.includes("jeans")) {
    return "leather-pants";
  }
  return "mens-leather-vests";
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

export function getProducts(): Product[] {
  if (cache) return cache;

  const csvPath = path.join(process.cwd(), "catalogue.csv");
  const rows = parseCsv(fs.readFileSync(csvPath, "utf8"));

  const products = rows.map((row, index) => {
    const name = row["Product Name"] || "Custom Leather Product";
    const collection = resolveCollection(row.Category || "", name);
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
      category: collections[collection].category,
      collection,
      description: row.Description || collections[collection].description,
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

export function getFeaturedProducts(limit = 16) {
  return getProducts()
    .filter((product) => product.images.length > 0)
    .slice(0, limit);
}

export function getProductBySlug(slug: string) {
  return getProducts().find((product) => product.slug === slug || product.sku.toLowerCase() === slug.toLowerCase());
}

export function getProductsByCollection(collection: CollectionSlug) {
  return getProducts().filter((product) => product.collection === collection);
}

export function getSizeChart(product: Product) {
  const key =
    product.collection === "womens-leather-vests"
      ? "Women's Leather Vests"
      : product.collection === "mens-leather-vests"
        ? "Men's Leather Vests"
        : product.collection === "leather-jackets"
          ? "Leather Jackets"
          : product.collection === "leather-gloves"
            ? "Leather Gloves"
            : "Leather Pants";

  return sizeCharts[key];
}
