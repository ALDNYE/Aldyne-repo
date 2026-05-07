"use client";

export function IntroPlusSection() {
  return (
    <section className="bg-white py-24 px-6 md:px-12 text-center border-t border-slate-50">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* LARGE LOGO (Strictly following the provided screenshot) */}
        <div>
          <h2 className="text-[64px] md:text-[88px] font-serif text-[#001f3f] leading-none tracking-tight">
            Alphadyne<span className="text-[#0070f3] font-light">+</span>
          </h2>
        </div>

        {/* DESCRIPTION TEXT */}
        <div className="space-y-6">
          <p className="text-xl md:text-2xl text-slate-800 font-light leading-relaxed max-w-3xl mx-auto">
            Help your clients access high-quality Portfolio Management assets through
            Alphadyne’s global investment platform.
          </p>
        </div>

        {/* CONNECT BUTTON (Styled with signature brand blue) */}
        <div className="pt-4">
          <button className="rounded-none border border-[#0070f3] text-[#0070f3] bg-transparent hover:bg-[#0070f3] hover:text-white px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300">
            Connect with us
          </button>
        </div>
      </div>
    </section>
  );
}
