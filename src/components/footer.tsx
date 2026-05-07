import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { FOOTER_DATA } from "@/constants/footer-links";

export function Footer() {
  const mainSections = FOOTER_DATA.filter(
    (section) => section.category !== "Legal",
  );
  const legalSection = FOOTER_DATA.find(
    (section) => section.category === "Legal",
  );

  return (
    <footer className="bg-[#020d1a] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* MAIN NAVIGATION GRID (3 Columns) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 border-b border-white/10 pb-16">
          {mainSections.map((section) => (
            <div
              key={section.category}
              className="space-y-6"
            >
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                {section.category}
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                {section.links.map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={`/info/${link.slug}`}
                      className="hover:underline underline-offset-4 opacity-80 hover:opacity-100 transition-all flex items-center"
                    >
                      {link.name}
                      {link.slug === "careers" && (
                        <ArrowUpRight className="inline h-3 w-3 ml-1 opacity-50" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* LOGO AND REGIONAL SELECTOR */}
        <div className="py-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="p-1 rounded-sm">
              <Image
                src="/logo.jpeg"
                alt="Alphadyne Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="font-bold tracking-tighter text-2xl uppercase">
              Alphadyne Asset Management
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <MapPin className="h-4 w-4" />
            <span>50 Broadway, London SW1H 4AH</span>
          </div>
        </div>

        {/* LEGAL DISCLOSURES & BOTTOM LINKS */}
        <div className="space-y-6 text-[11px] leading-relaxed text-zinc-500 max-w-5xl">
          <p>
            © 2026 All rights reserved.{" "}
            <span className="text-zinc-200 font-semibold">
              Alphadyne Asset Management (UK) LLP
            </span>{" "}
            is a limited liability partnership registered in England and Wales
            with company number{" "}
            <span className="text-zinc-200 font-semibold">OC371435</span>.
            Alphadyne Asset Management (UK) LLP is authorised and regulated by the
            Financial Conduct Authority (FCA firm reference number:{" "}
            <span className="text-zinc-200 font-semibold">603570</span>).
          </p>
          <p>
            <b className="text-zinc-400">Professional Investors Only.</b> This
            website is intended for professional investors as defined by local
            jurisdiction. Past performance is not a guarantee of future results.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 font-bold uppercase tracking-widest pt-4">
            {legalSection?.links.map((item) => (
              <Link
                key={item.slug}
                href={`/info/${item.slug}`}
                className="hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
