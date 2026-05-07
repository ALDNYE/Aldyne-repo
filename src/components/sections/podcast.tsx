"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PodcastSection() {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <Image
        src="/bg.png"
        alt="Inside Portfolio Management Investing"
        fill
        className="object-cover"
        priority
      />

      {/* OVERLAY FOR TEXT READABILITY */}
      <div className="absolute inset-0 bg-slate-900/60" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
          Alt Goes Mainstream Podcast: <br />
          Inside Portfolio Management Investing
        </h2>

        <div className="pt-6">
          <Button
            variant="outline"
            className="rounded-none border-white text-white bg-transparent hover:bg-white hover:text-slate-900 px-12 py-7 text-xs font-bold uppercase tracking-[0.3em] transition-all duration-300"
            asChild
          >
            <Link
              href="#"
              target="_blank"
            >
              Listen here
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
