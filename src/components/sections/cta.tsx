"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link"; // Import Link for routing

export function CTASection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 bg-[#001f3f]"
        style={{
          background:
            "radial-gradient(circle at center, #003366 0%, #001122 100%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight leading-tight">
            <span className="font-bold text-white/90">Alphadyne+</span> provides
            access to high-quality Portfolio Management assets through Alphadyne Asset Management’s
            global investment platform.
          </h2>

          <p className="text-lg md:text-xl text-slate-300 font-light">
            Find out more about how your clients can access investments with
            these compelling characteristics.
          </p>
        </div>

        <div className="pt-4">
          <Button
            variant="outline"
            className="rounded-none border-white text-white bg-transparent hover:bg-white hover:text-slate-900 px-10 py-6 text-sm font-bold uppercase tracking-widest transition-all"
            asChild
          >
            <Link href="/sign-in">Connect with us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
