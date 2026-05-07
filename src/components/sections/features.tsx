"use client";

import { Handshake, Fence, TrendingUp } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="bg-white py-24 px-8 text-center border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-slate-950 tracking-tight leading-tight max-w-xl mx-auto">
            What makes Portfolio Management an attractive asset class?
          </h2>
        </div>

        {/* 3-Column Grid matching the design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {/* Essential services */}
          <div className="space-y-6">
            <div className="w-20 h-20 bg-slate-900 flex items-center justify-center rounded-full mx-auto shadow-md">
              <Handshake className="h-9 w-9 text-white" />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
              Essential services
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
              Portfolio Management businesses are typically backed by hard assets and
              perform critical functions that individuals and businesses depend
              on.
            </p>
          </div>

          {/* High barriers to entry */}
          <div className="space-y-6">
            <div className="w-20 h-20 bg-slate-900 flex items-center justify-center rounded-full mx-auto shadow-md">
              <Fence className="h-9 w-9 text-white" />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
              High barriers to entry
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
              Portfolio Management assets tend to be hard to replicate, providing
              significant intrinsic value protection.
            </p>
          </div>

          {/* Strong pricing power */}
          <div className="space-y-6">
            <div className="w-20 h-20 bg-slate-900 flex items-center justify-center rounded-full mx-auto shadow-md">
              <TrendingUp className="h-9 w-9 text-white" />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
              Strong pricing power
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
              Pricing power generally allows Portfolio Management investments to
              perform relatively well in a variety of macroeconomic
              environments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
