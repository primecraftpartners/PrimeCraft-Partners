import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://primecraftpartners.com"),
  title: {
    default: "PrimeCraft Partners | OEM Leather Manufacturer",
    template: "%s | PrimeCraft Partners"
  },
  description:
    "Premium OEM leather manufacturing, private label production and custom leather apparel from Sialkot, Pakistan for brands, wholesalers, importers and distributors worldwide.",
  keywords: [
    "Leather Vest Manufacturer",
    "Leather Jacket Manufacturer",
    "OEM Leather Manufacturer",
    "Private Label Leather Clothing",
    "Motorcycle Vest Manufacturer",
    "Leather Gloves Manufacturer",
    "Leather Apparel Supplier",
    "Custom Leather Garments"
  ],
  openGraph: {
    title: "PrimeCraft Partners",
    description:
      "OEM manufacturing, private label production and custom leather apparel for global brands.",
    images: ["/assets/brand/banner.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
