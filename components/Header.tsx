"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageSquareText, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <div className="container-pad flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="PrimeCraft Partners home">
          <Image src="/assets/brand/icon-logo.png" alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
          <span className="hidden min-w-0 text-sm font-black uppercase tracking-[0.22em] sm:block">
            PrimeCraft <span className="text-brass">Partners</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wide text-white/80 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-brass">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/contact#catalogue" className="btn-gold">
            Request Catalogue
          </Link>
          <Link href="/contact#quote" className="btn-secondary border-white/20 bg-transparent text-white hover:border-brass hover:text-brass">
            <MessageSquareText size={16} />
            Request Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-ink lg:hidden">
          <nav className="container-pad grid gap-1 py-4 text-sm font-bold uppercase tracking-wide text-white/80">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 hover:bg-white/10">
                {item.label}
              </Link>
            ))}
            <Link href="/contact#quote" onClick={() => setOpen(false)} className="btn-gold mt-3">
              Request Quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
