import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { getCollections } from "@/lib/products";
import { navItems, site } from "@/lib/site";

export function Footer() {
  const collections = getCollections();

  return (
    <footer className="bg-ink text-white">
      <div className="container-pad grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Image src="/assets/brand/logo.png" alt="PrimeCraft Partners" width={260} height={110} className="h-auto w-64 bg-white p-4" />
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
            Premium OEM leather manufacturing, private label production and custom leather apparel for brands, distributors, wholesalers and importers worldwide.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-brass">Company</h3>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            {navItems.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brass">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-brass">Collections</h3>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            {collections.map((collection) => (
              <Link key={collection.slug} href={`/collections/${collection.slug}`} className="hover:text-brass">
                {collection.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-brass">Contact</h3>
          <div className="mt-5 grid gap-4 text-sm text-white/70">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 shrink-0 text-brass" size={18} />
              {site.location}
            </p>
            <a href={`mailto:${site.email}`} className="flex gap-3 hover:text-brass">
              <Mail className="mt-0.5 shrink-0 text-brass" size={18} />
              {site.email}
            </a>
            <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} className="flex gap-3 hover:text-brass">
              <MessageCircle className="mt-0.5 shrink-0 text-brass" size={18} />
              {site.whatsapp}
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-brass">
              <Linkedin className="mt-0.5 shrink-0 text-brass" size={18} />
              LinkedIn Company Page
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-pad flex flex-col gap-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>(c) 2026 PrimeCraft Partners. OEM leather manufacturer.</p>
          <p>No public pricing, cart or checkout. B2B quotation requests only.</p>
        </div>
      </div>
    </footer>
  );
}
