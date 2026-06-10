import Link from "next/link";
import { FileText, MessageSquareText } from "lucide-react";

type CTAProps = {
  title?: string;
  text?: string;
};

export function CTA({
  title = "Put Your Logo Where It Belongs. On Everything.",
  text = "From neck labels and hang tags to custom packaging and production-ready leather apparel, PrimeCraft Partners helps turn your brand into a complete private label line."
}: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[linear-gradient(135deg,rgba(201,149,60,0.28),rgba(138,90,51,0.08))] lg:block" />
      <div className="container-pad relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3 text-brass">Private Label Manufacturing</p>
          <h2 className="text-3xl font-black leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/72">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-col">
          <Link href="/contact#quote" className="btn-gold">
            <MessageSquareText size={17} />
            Request Quote
          </Link>
          <Link href="/contact#catalogue" className="btn-secondary border-white/20 bg-transparent text-white hover:border-brass hover:text-brass">
            <FileText size={17} />
            Request Catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
