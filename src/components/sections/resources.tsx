"use client";

import { Download } from "lucide-react";
import Link from "next/link";

export function ResourcesSection() {
  const documents = [
    {
      title: "Why Portfolio Management",
      subtitle:
        "This report is the dedicated wealth solutions platform from Alphadyne Asset Management, a leading alternative investment specialist.",
      file: "/pdf-1.pdf",
      bgClass: "bg-[#020d1a]",
    },
    {
      title: 'What makes Portfolio Management "Portfolio Management"?',
      subtitle:
        "A deeper look into the characteristics, investment attributes, and performance of the asset class.",
      file: "/pdf-2.pdf",
      bgClass: "bg-[#051c33]",
    },
  ];

  return (
    <section className="bg-white py-24 px-6 md:px-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* PDF CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:w-2/3">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="flex flex-col space-y-4"
            >
              {/* PDF Preview Card */}
              <div
                className={`relative aspect-[3/4] p-8 flex flex-col justify-between text-white shadow-xl ${doc.bgClass} transition-transform hover:-translate-y-1 duration-300`}
              >
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold tracking-tight">
                    Alphadyne<span className="text-[#0070f3]">+</span>
                  </h3>
                  <div className="h-[1px] w-full bg-white/20" />
                </div>

                <div className="space-y-4">
                  <h4 className="text-2xl font-semibold leading-tight">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {doc.subtitle}
                  </p>
                </div>
              </div>

              {/* Download Link */}
              <Link
                href={doc.file}
                download
                className="group inline-flex items-center gap-2 text-[#0070f3] text-sm font-bold uppercase tracking-[0.2em] transition-colors"
              >
                <span>Download</span>
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE HEADLINE */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-[1.1] tracking-tight">
            Find out more about the compelling case for Portfolio Management
            investment today
          </h2>
        </div>
      </div>
    </section>
  );
}
