"use client";

export function StatsSection() {
  return (
    <section className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* HEADER: Large Serif Heading */}
        <div className="mb-20 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-serif text-[#001f3f] leading-[1.1] tracking-tight">
            Why is Alphadyne well placed to capitalize on this opportunity?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* LEFT: BODY TEXT */}
          <div className="space-y-8 max-w-xl">
            <p className="text-lg md:text-xl text-slate-700 font-light leading-relaxed">
              Alphadyne Asset Management is a leading alternative investment
              specialist. We invest in energy, transport and logistics, and
              digital Portfolio around the world – in the assets that
              underpin these global megatrends.
            </p>
            <p className="text-lg md:text-xl text-slate-700 font-light leading-relaxed">
              We are value-focused, disciplined investors with a differentiated
              approach.
            </p>
          </div>

          {/* RIGHT: THE STAT */}
          <div className="flex flex-col items-center lg:items-end lg:text-right">
            <div className="relative">
              {/* Huge '20+' in signature brand red */}
              <span className="block text-[140px] md:text-[220px] font-light leading-none text-[#e63946] tracking-tighter">
                20+
              </span>

              <div className="mt-4 max-w-[280px] lg:max-w-none">
                <p className="text-xl md:text-2xl text-slate-900 font-serif leading-tight">
                  Years average Portfolio{" "}
                  <br className="hidden md:block" /> investing experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
