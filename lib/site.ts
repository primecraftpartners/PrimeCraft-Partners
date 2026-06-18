import {
  BadgeCheck,
  Boxes,
  Factory,
  Globe2,
  PackageCheck,
  Scissors,
  ShieldCheck,
  Tag
} from "lucide-react";

export const site = {
  name: "PrimeCraft Partners",
  location: "Sialkot, Pakistan",
  whatsapp: "+923719242006",
  email: "primecraftpartners@gmail.com",
  linkedin: "https://www.linkedin.com/company/primecraftpartners",
  moq: "50 Pieces Per Order"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Collections", href: "/products#categories" },
  { label: "OEM & Private Label", href: "/oem-private-label" },
  { label: "Factory", href: "/factory" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const capabilities = [
  { title: "OEM Manufacturing", text: "Pattern development, material sourcing and production aligned with your specifications.", icon: Factory },
  { title: "Private Label", text: "Neck labels, woven labels, hang tags and brand-ready finishing.", icon: Tag },
  { title: "Custom Branding", text: "Embossing, patches, trims, linings, zipper choices and packaging options.", icon: BadgeCheck },
  { title: "Custom Labels", text: "Inside labels and care labels prepared for wholesale and retail presentation.", icon: Scissors },
  { title: "Custom Packaging", text: "Poly bags, carton packing and shipment preparation for bulk export orders.", icon: PackageCheck },
  { title: "Bulk Production", text: "Flexible production planning for brands, importers and distributors.", icon: Boxes }
];

export const whyChooseUs = [
  { title: "Premium Materials", text: "Cowhide, lamb nappa, suede and specialty leather finishes.", icon: ShieldCheck },
  { title: "Skilled Craftsmanship", text: "Experienced stitching teams with leather apparel production expertise.", icon: Scissors },
  { title: "Quality Control", text: "Material checks, stitching review, measurement checks and final packing control.", icon: BadgeCheck },
  { title: "Competitive Manufacturing", text: "Factory-direct sourcing from Sialkot for global B2B buyers.", icon: Factory },
  { title: "Flexible MOQ", text: "Minimum order quantity starts from 50 pieces per order.", icon: Boxes },
  { title: "Worldwide Shipping", text: "Export support for the United States, Canada, Europe, the UK and Australia.", icon: Globe2 }
];

export const factoryPhotos = [
  { src: "/assets/factory/stitching-floor.jpg", alt: "Leather stitching production floor" },
  { src: "/assets/factory/material-storage.jpeg", alt: "Leather materials and components storage" },
  { src: "/assets/factory/production-sorting.jpeg", alt: "Leather apparel production sorting" },
  { src: "/assets/factory/packed-orders.jpeg", alt: "Packed bulk leather orders" }
];

export const factoryVideos = [
  "/assets/factory/factory-video-1.mp4",
  "/assets/factory/factory-video-2.mp4",
  "/assets/factory/factory-video-3.mp4"
];

export const finishes = [
  { name: "Black", src: "/assets/finishes/black-blue-finish.jpg" },
  { name: "Brown", src: "/assets/finishes/brown-finish.jpg" },
  { name: "Tan", src: "/assets/finishes/antique-finish.jpg" },
  { name: "White Crocodile Embossed", src: "/assets/finishes/white-crocodile.jpg" },
  { name: "Blue", src: "/assets/finishes/black-blue-finish.jpg" },
  { name: "Red Crocodile Embossed", src: "/assets/finishes/red-crocodile.jpg" },
  { name: "Distressed Grey", src: "/assets/finishes/distressed-grey.jpg" },
  { name: "Antique Finish", src: "/assets/finishes/antique-finish.jpg" },
  { name: "Vintage Finish", src: "/assets/finishes/vintage-grey.jpg" }
];

export const sizeCharts = {
  "Leather Jackets": {
    columns: ["Size", "Shoulder Width", "Chest", "Waist", "Back Length", "Sleeve Length"],
    rows: [
      ["S", "48 cm", "110 cm", "98 cm", "63 cm", "65 cm"],
      ["M", "50 cm", "114 cm", "102 cm", "64 cm", "66 cm"],
      ["L", "52 cm", "118 cm", "108 cm", "65 cm", "67 cm"],
      ["XL", "54 cm", "122 cm", "114 cm", "66 cm", "68 cm"],
      ["2XL", "56 cm", "130 cm", "124 cm", "67 cm", "69 cm"],
      ["3XL", "58 cm", "136 cm", "130 cm", "68 cm", "70 cm"],
      ["4XL", "60 cm", "142 cm", "136 cm", "70 cm", "70 cm"],
      ["5XL", "62 cm", "148 cm", "142 cm", "70 cm", "70 cm"]
    ]
  },

  "Men's Leather Vests": {
    columns: ["Size", "Chest Width (A)", "Chest Circumference (A2)", "Waist Width (B)", "Waist Circumference (B2)", "Back Length (C)"],
    rows: [
      ["S", "51 cm", "102 cm", "48 cm", "96 cm", "50 cm"],
      ["M", "54 cm", "108 cm", "51 cm", "102 cm", "52 cm"],
      ["L", "57 cm", "114 cm", "54 cm", "108 cm", "54 cm"],
      ["XL", "60 cm", "120 cm", "57 cm", "114 cm", "56 cm"],
      ["2XL", "63 cm", "126 cm", "60 cm", "120 cm", "58 cm"],
      ["3XL", "66 cm", "132 cm", "63 cm", "126 cm", "60 cm"],
      ["4XL", "69 cm", "138 cm", "66 cm", "132 cm", "62 cm"]
    ]
  },

  "Women's Leather Vests": {
    columns: ["Size", "Waist Circumference", "Chest Circumference", "Back Length"],
    rows: [
      ["S", "86 cm", "86 cm", "52 cm"],
      ["M", "90 cm", "90 cm", "52 cm"],
      ["L", "94 cm", "94 cm", "54 cm"],
      ["XL", "98 cm", "98 cm", "54 cm"],
      ["2XL", "102 cm", "102 cm", "54 cm"],
      ["3XL", "106 cm", "106 cm", "56 cm"],
      ["4XL", "110 cm", "110 cm", "56 cm"]
    ]
  },

  "Leather Gloves": {
    columns: ["Size", "Hand Circumference"],
    rows: [
      ["S", "17 cm"],
      ["M", "18 cm"],
      ["L", "19 cm"],
      ["XL", "21 cm"],
      ["2XL", "23 cm"],
      ["3XL", "25 cm"]
    ]
  },

  "Leather Pants": {
    columns: ["Order Size", "Body Measurement (Waist)", "US Size", "EU Size"],
    rows: [
      ["29", "78 - 82 cm", "XS / 0-2", "34 - 36"],
      ["30", "83 - 87 cm", "S / 4-6", "36 - 38"],
      ["31", "85 - 89 cm", "S / 6", "38"],
      ["32", "86 - 92 cm", "M / 6-8", "38 - 40"],
      ["33", "90 - 94 cm", "M / 8", "40"],
      ["34", "94 - 100 cm", "L / 10-12", "40 - 42"],
      ["36", "102 - 107 cm", "XL / 12-14", "42 - 44"],
      ["38", "108 - 113 cm", "XXL / 14-16", "44 - 46"],
      ["40", "113 - 117 cm", "2XL / 16-18", "46 - 48"],
      ["42", "117 - 122 cm", "3XL / 18-20", "48 - 50"],
      ["44", "122 - 127 cm", "4XL / 20-22", "50 - 52"],
      ["46", "127 - 132 cm", "5XL / 22-24", "52 - 54"]
    ]
  }
};
