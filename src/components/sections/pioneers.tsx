"use client";

export function PioneersSection() {
  return (
    <section className="bg-white pt-24 text-center">
      <div className="max-w-4xl mx-auto space-y-6 mb-16 px-6">
        <h2 className="text-3xl md:text-5xl font-serif text-slate-900 tracking-tight">
          Portfolio Management Pioneers
        </h2>

        <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-light uppercase tracking-[0.2em]">
          Since Alphadyne’s founding we have been focused on creating and
          preserving wealth through high-standard Portfolio Management investing.
        </p>
      </div>

      {/* FULL WIDTH YOUTUBE EMBED */}
      <div className="relative w-full aspect-video bg-black overflow-hidden shadow-2xl">
        <iframe
          className="absolute inset-0 w-full h-full pointer-events-none"
          src="https://www.youtube.com/embed/koPkElMab4U?autoplay=1&mute=1&loop=1&playlist=koPkElMab4U&controls=0&rel=0&showinfo=0&iv_load_policy=3"
          title="Alphadyne Asset Management Cinematic Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>
    </section>
  );
}
