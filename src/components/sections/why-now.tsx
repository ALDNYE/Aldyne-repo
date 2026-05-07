"use client";

export function WhyNowSection() {
  return (
    <section className="bg-white py-24 px-6 md:px-12 border-t border-slate-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE: TEXT CONTENT */}
        <div className="space-y-8 order-2 lg:order-1 max-w-xl">
          <p className="text-lg md:text-xl text-slate-800 leading-relaxed font-light">
            Portfolio Management investing has never been more timely or important
            given the significant capital needed for essential services that
            enable modern life. It is estimated that nearly $100¹ trillion of
            investment is required to replace or modernize the world’s
            Portfolio Management including across the digital, transport, and energy
            sectors.
          </p>

          {/* Static Branding Element (No Button) */}
          <div className="pt-4 border-t border-slate-100 mt-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
              Global Insights Series
            </span>
          </div>
        </div>

        {/* RIGHT SIDE: DIRECT AUTOPLAY EMBED */}
        <div className="relative overflow-hidden shadow-2xl order-1 lg:order-2 aspect-video bg-black">
          {/* Parameters used:
            - autoplay=1: Starts immediately
            - mute=1: Required by browsers to allow autoplay
            - loop=1 & playlist: Keeps the video looping
            - controls=0: Hides UI for a cinematic look
          */}
          <iframe
            className="absolute inset-0 w-full h-full pointer-events-none scale-105"
            src="https://www.youtube.com/embed/EEX0EHTTePE?autoplay=1&mute=1&loop=1&playlist=EEX0EHTTePE&controls=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1"
            title="Portfolio Management Insights Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none p-8 flex flex-col justify-end">
            <div className="flex items-center gap-3">
              <span className="text-4xl text-[#e63946] font-light leading-none">
                +
              </span>
              <h3 className="text-white text-xl font-medium tracking-tight">
                Why now
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
