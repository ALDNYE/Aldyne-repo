/* eslint-disable @typescript-eslint/no-explicit-any */
import { FOOTER_DATA } from "@/constants/footer-links";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, CheckCircle } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function InfoPage({ params }: any) {
  const { slug } = await params;

  const allLinks = FOOTER_DATA.flatMap((section) => section.links);
  const pageData = allLinks.find((link) => link.slug === slug) as any;

  if (!pageData) notFound();

  const category = FOOTER_DATA.find((s) =>
    s.links.some((l) => l.slug === slug),
  )?.category;

  if (category === "Investments") {
    return <InvestmentsLayout pageData={pageData} />;
  }
  if (category === "About Us") {
    if (slug === "our-process") return <OurProcessLayout pageData={pageData} />;
    if (slug === "careers") return <CareersLayout pageData={pageData} />;
    return <AboutLayout pageData={pageData} />;
  }
  if (category === "Insights") {
    return <InsightsLayout pageData={pageData} />;
  }
  if (category === "Legal") {
    return <LegalLayout pageData={pageData} />;
  }

  return <FallbackLayout pageData={pageData} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
   INVESTMENTS LAYOUT
   Dark, data-driven feel. Full-width hero, rich content with pull-quotes,
   asset class breakdown panel, and a CTA strip.
───────────────────────────────────────────────────────────────────────────── */
function InvestmentsLayout({ pageData }: { pageData: any }) {
  const paragraphs: string[] = (pageData.fullContent ?? pageData.content)
    .split("\n")
    .map((l: string) => l.trim())
    .filter(Boolean);

  const heading = paragraphs[0];
  const bodyParagraphs = paragraphs.slice(1);

  const highlights = [
    "Actively managed & continuously monitored",
    "Tax-efficient structures and allowances",
    "Flexible income and cash-flow planning",
    "Access to a broad investment universe",
  ];

  return (
    <main className="min-h-screen bg-[#060f1e] text-white font-sans">
      {/* ── FULL-BLEED HERO ── */}
      <section
        className="relative w-full"
        style={{ height: "70vh", minHeight: 500 }}
      >
        <Image
          src={pageData.heroImage}
          alt={pageData.name}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,15,30,0.3) 0%, rgba(6,15,30,0.92) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-8 max-w-7xl mx-auto w-full">
          <span
            className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-4"
            style={{ letterSpacing: "0.25em" }}
          >
            Investments
          </span>
          <h1
            className="font-bold leading-none mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", maxWidth: 700 }}
          >
            {pageData.name}
          </h1>
          <p
            className="text-blue-100/70 max-w-xl leading-relaxed"
            style={{ fontSize: 17 }}
          >
            {pageData.content}
          </p>
        </div>
      </section>

      {/* ── PULL STAT BAR ── */}
      <div
        className="border-y border-blue-900/60"
        style={{ background: "#0a1628" }}
      >
        <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-blue-900/40">
          {[
            { val: "£300M+", label: "Assets Under Management" },
            { val: "30+", label: "Years of Experience" },
            { val: "FCA", label: "Regulated & Authorised" },
            { val: "0%", label: "Management Fee" },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="pl-6 first:pl-0"
            >
              <p
                className="font-bold text-blue-400"
                style={{ fontSize: "1.6rem" }}
              >
                {val}
              </p>
              <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Body copy */}
        <div className="lg:col-span-2 space-y-6">
          <h2
            className="font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
          >
            {heading}
          </h2>
          {bodyParagraphs.map((para: string, i: number) => {
            const isSubheading =
              para.length < 60 && !para.endsWith(".") && !para.endsWith(",");
            if (isSubheading && i > 0) {
              return (
                <h3
                  key={i}
                  className="font-bold text-blue-400 uppercase tracking-widest text-xs pt-4"
                >
                  {para}
                </h3>
              );
            }
            if (para.startsWith("—") || para.startsWith("•")) {
              return (
                <div
                  key={i}
                  className="flex gap-3"
                >
                  <span className="text-blue-400 mt-1">—</span>
                  <p className="text-zinc-300 leading-relaxed text-sm">
                    {para.replace(/^—\s*|^•\s*/, "")}
                  </p>
                </div>
              );
            }
            return (
              <p
                key={i}
                className="text-zinc-300 leading-relaxed"
                style={{ fontSize: 16 }}
              >
                {para}
              </p>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Highlights card */}
          <div
            className="p-8"
            style={{
              background: "linear-gradient(135deg, #0f2044 0%, #0a1628 100%)",
              border: "1px solid #1d4ed820",
            }}
          >
            <h4 className="font-bold text-blue-400 text-xs uppercase tracking-widest mb-6">
              Key Benefits
            </h4>
            <ul className="space-y-4">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-3 items-start"
                >
                  <CheckCircle
                    size={15}
                    className="text-blue-500 mt-0.5 shrink-0"
                  />
                  <span className="text-zinc-300 text-sm leading-snug">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline images stacked */}
          {pageData.timelineImages
            ?.slice(0, 2)
            .map((src: string, i: number) => (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{ height: 180 }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(6,15,30,0.4)" }}
                />
              </div>
            ))}

          {/* CTA */}
          <div
            className="p-6"
            style={{ background: "#1d4ed8" }}
          >
            <p className="font-bold text-white text-sm mb-3">
              Ready to get started?
            </p>
            <p className="text-blue-200 text-xs leading-relaxed mb-5">
              Speak with an investment manager about building a bespoke
              Portfolio Management tailored to your goals.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest"
            >
              Get in touch <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>

      <Disclaimer
        name={pageData.name}
      />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT US LAYOUT
   Light, editorial. Large mission statement, two-column content, image mosaic.
───────────────────────────────────────────────────────────────────────────── */
function AboutLayout({ pageData }: { pageData: any }) {
  const paragraphs: string[] = (pageData.fullContent ?? pageData.content)
    .split("\n")
    .map((l: string) => l.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* ── HERO — huge text, image right ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#f5f3ef", minHeight: 560 }}
      >
        <div className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400 mb-6 block">
              About Us
            </span>
            <h1
              className="font-bold text-[#1a1a1a] leading-none mb-8"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {pageData.name}
            </h1>
            <p
              className="text-stone-600 leading-relaxed max-w-lg"
              style={{ fontSize: 18 }}
            >
              {pageData.content}
            </p>
          </div>
          <div
            className="relative"
            style={{ height: 440 }}
          >
            <Image
              src={pageData.heroImage}
              alt={pageData.name}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            {/* Decorative offset border */}
            <div
              className="absolute"
              style={{
                inset: 0,
                border: "3px solid #1a1a1a",
                transform: "translate(12px, 12px)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-5">
            {paragraphs
              .slice(0, Math.ceil(paragraphs.length / 2))
              .map((para: string, i: number) => {
                const isSubheading = para.length < 60 && !para.endsWith(".");
                if (isSubheading && i > 0) {
                  return (
                    <h3
                      key={i}
                      className="font-bold text-[#1a1a1a] text-sm uppercase tracking-widest border-l-4 border-[#1a1a1a] pl-4 mt-8"
                    >
                      {para}
                    </h3>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-stone-600 leading-relaxed"
                    style={{ fontSize: 16 }}
                  >
                    {para}
                  </p>
                );
              })}
          </div>
          <div className="space-y-5">
            {paragraphs
              .slice(Math.ceil(paragraphs.length / 2))
              .map((para: string, i: number) => {
                const isSubheading = para.length < 60 && !para.endsWith(".");
                if (isSubheading) {
                  return (
                    <h3
                      key={i}
                      className="font-bold text-[#1a1a1a] text-sm uppercase tracking-widest border-l-4 border-[#1a1a1a] pl-4 mt-8"
                    >
                      {para}
                    </h3>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-stone-600 leading-relaxed"
                    style={{ fontSize: 16 }}
                  >
                    {para}
                  </p>
                );
              })}
          </div>
        </div>
      </section>

      {/* ── PILLARS STRIP ── */}
      <section
        style={{ background: "#1a1a1a" }}
        className="py-16 px-8"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: "30+", label: "Years Experience" },
            { num: "£300M+", label: "Assets Managed" },
            { num: "FCA", label: "Regulated" },
            { num: "FSCS", label: "Protected" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="text-center"
            >
              <p
                className="font-bold text-white"
                style={{ fontSize: "2.2rem" }}
              >
                {num}
              </p>
              <p className="text-stone-400 text-xs uppercase tracking-widest mt-2">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── IMAGE MOSAIC ── */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div
          className="grid grid-cols-3 gap-4"
          style={{ height: 340 }}
        >
          {pageData.timelineImages?.map((src: string, i: number) => (
            <div
              key={i}
              className="relative overflow-hidden"
            >
              <Image
                src={src}
                alt=""
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </section>

      <Disclaimer
        name={pageData.name}
        light
      />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   OUR PROCESS LAYOUT
   Vertical numbered step-by-step flow. Very structured, functional feel.
───────────────────────────────────────────────────────────────────────────── */
function OurProcessLayout({ pageData }: { pageData: any }) {
  const rawSteps: string[] = (pageData.fullContent ?? pageData.content)
    .split("\n")
    .map((l: string) => l.trim())
    .filter(Boolean);

  // Pull out Step N: lines and their following description
  const steps: { title: string; desc: string }[] = [];
  let currentStep: { title: string; desc: string } | null = null;

  for (const line of rawSteps) {
    if (line.startsWith("Step ")) {
      if (currentStep) steps.push(currentStep);
      const colonIdx = line.indexOf("—");
      currentStep = {
        title: colonIdx > -1 ? line.slice(0, colonIdx).trim() : line,
        desc: colonIdx > -1 ? line.slice(colonIdx + 1).trim() : "",
      };
    } else if (currentStep) {
      currentStep.desc += (currentStep.desc ? " " : "") + line;
    }
  }
  if (currentStep) steps.push(currentStep);

  const intro = rawSteps[0];

  return (
    <main
      className="min-h-screen font-sans"
      style={{ background: "#fafaf8" }}
    >
      {/* ── HERO ── */}
      <section
        style={{ background: "#001a40" }}
        className="py-24 px-8"
      >
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-blue-400 mb-4 block">
            About Us
          </span>
          <h1
            className="font-bold text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Our Process
          </h1>
          <p
            className="text-blue-200/70 max-w-xl leading-relaxed"
            style={{ fontSize: 17 }}
          >
            {intro}
          </p>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="max-w-5xl mx-auto px-8 py-20">
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-7 top-0 bottom-0"
            style={{ width: 2, background: "#e2e2e2", zIndex: 0 }}
          />

          <div className="space-y-0">
            {steps.map(({ title, desc }, i) => (
              <div
                key={i}
                className="relative flex gap-10 pb-16 last:pb-0"
              >
                {/* Step circle */}
                <div
                  className="shrink-0 flex items-center justify-center font-bold text-white relative z-10"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background:
                      i === 0 ? "#001a40" : i < 3 ? "#1d4ed8" : "#6b7280",
                    fontSize: 18,
                    border: "3px solid #fafaf8",
                  }}
                >
                  {i + 1}
                </div>
                {/* Content */}
                <div
                  className="flex-1 p-8"
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderLeft: `4px solid ${i === 0 ? "#001a40" : i < 3 ? "#1d4ed8" : "#9ca3af"}`,
                  }}
                >
                  <h3
                    className="font-bold text-[#001a40] mb-3"
                    style={{ fontSize: "1.1rem" }}
                  >
                    {title}
                  </h3>
                  <p className="text-stone-500 leading-relaxed text-sm">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 px-8"
        style={{ background: "#001a40" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-bold text-white text-2xl mb-2">
              Start your investment journey
            </h2>
            <p className="text-blue-200/70 text-sm">
              Our team is ready to guide you through each step.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 shrink-0"
            style={{ background: "#1d4ed8", color: "white" }}
          >
            Get Started <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <Disclaimer
        name={pageData.name}
        light
      />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CAREERS LAYOUT
   Bold, recruitment-poster energy. Big headline, team grid, roles list.
───────────────────────────────────────────────────────────────────────────── */
function CareersLayout({ pageData }: { pageData: any }) {
  const teams = [
    {
      name: "Investment & Portfolio Management",
      roles: [
        "Portfolio Management Managers",
        "Equity Traders",
        "Analysts",
        "Risk Analysts",
      ],
      color: "#001a40",
    },
    {
      name: "Portfolio Management & Operations",
      roles: [
        "Operations Analysts",
        "Trade Support",
        "Systems & Technology",
        "Compliance & Risk",
      ],
      color: "#1d4ed8",
    },
    {
      name: "Client Services",
      roles: [
        "Client Relationship Managers",
        "Onboarding Specialists",
        "Admin Support",
        "Investor Communications",
      ],
      color: "#0f2d6b",
    },
    {
      name: "Business Development",
      roles: [
        "Business Development Managers",
        "Investor Relations",
        "Strategic Partnerships",
      ],
      color: "#1e3a8a",
    },
  ];

  const perks = [
    "Performance-based compensation",
    "Exposure to live markets from day one",
    "Lean, high-calibre team",
    "West London office",
    "Rapid career progression",
    "Meritocratic culture",
  ];

  return (
    <main className="min-h-screen font-sans bg-white">
      {/* ── HERO — full dark with big type ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#060f1e", minHeight: 600 }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.15) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.15) 40px)",
          }}
        />
        <div className="max-w-7xl mx-auto px-8 py-24 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-blue-400 mb-6 block">
              Careers
            </span>
            <h1
              className="font-bold text-white leading-none mb-6"
              style={{
                fontSize: "clamp(3rem, 7vw, 5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Build Your Career at Alphadyne Asset Management
            </h1>
            <p
              className="text-blue-100/60 max-w-md leading-relaxed mb-10"
              style={{ fontSize: 17 }}
            >
              {pageData.content}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 font-bold text-sm px-8 py-4"
              style={{ background: "#1d4ed8", color: "white" }}
            >
              Apply Now <ArrowUpRight size={16} />
            </a>
          </div>
          {/* Face grid */}
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(5,1fr)", gap: 4 }}
          >
            {[
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
              "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
              "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=200&q=80",
            ].map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{ height: 90 }}
              >
                <Image
                  src={src}
                  alt="Team member"
                  fill
                  style={{ objectFit: "cover", filter: "grayscale(100%)" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(29,78,216,0.35)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY JOIN — perks ── */}
      <section
        className="py-20 px-8"
        style={{ background: "#f5f3ef" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold text-[#001a40] mb-12"
            style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)" }}
          >
            Why Alphadyne Asset Management?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {perks.map((perk, i) => (
              <div
                key={perk}
                className="p-6 flex gap-4 items-center"
                style={{ background: "white", border: "1px solid #e5e7eb" }}
              >
                <span
                  className="font-bold text-blue-600"
                  style={{ fontSize: "1.4rem", lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium text-[#001a40] text-sm">
                  {perk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAMS GRID ── */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold text-[#001a40] mb-12"
            style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)" }}
          >
            Our Teams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teams.map(({ name, roles, color }) => (
              <div
                key={name}
                className="p-8"
                style={{
                  borderTop: `4px solid ${color}`,
                  background: "#f8fafc",
                  border: `1px solid #e5e7eb`,
                  borderTopColor: color,
                  borderTopWidth: 4,
                }}
              >
                <h3 className="font-bold text-[#001a40] mb-5">{name}</h3>
                <ul className="space-y-2">
                  {roles.map((role) => (
                    <li
                      key={role}
                      className="flex items-center gap-2 text-sm text-stone-600"
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: color,
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 px-8"
        style={{ background: "#001a40" }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-bold text-white text-3xl mb-4">
            Ready to apply?
          </h2>
          <p className="text-blue-200/60 mb-8 max-w-md mx-auto">
            If you are driven, disciplined, and motivated to succeed in
            financial markets, we would like to hear from you.
          </p>
          {/* <a
            href="#"
            className="inline-flex items-center gap-2 font-bold text-sm px-10 py-4"
            style={{ background: "#1d4ed8", color: "white" }}
          >
            Submit Application <ArrowUpRight size={15} />
          </a> */}
        </div>
      </section>

      <Disclaimer
        name={pageData.name}
        light
      />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   INSIGHTS LAYOUT
   Editorial magazine look. Full-width image, article typography, sidebar TOC.
───────────────────────────────────────────────────────────────────────────── */
function InsightsLayout({ pageData }: { pageData: any }) {
  const allInsights =
    FOOTER_DATA.find((s) => s.category === "Insights")?.links ?? [];
  const related = allInsights.filter((l) => l.slug !== pageData.slug);

  const paragraphs: string[] = (pageData.fullContent ?? pageData.content)
    .split("\n")
    .map((l: string) => l.trim())
    .filter(Boolean);

  const heading = paragraphs[0];
  const body = paragraphs.slice(1);

  // Collect subheadings for sidebar TOC
  const subheadings = body.filter(
    (p: string) =>
      p.length < 60 && !p.endsWith(".") && !p.endsWith(",") && !p.endsWith(";"),
  );

  return (
    <main className="min-h-screen font-sans bg-white">
      {/* ── FULL HERO IMAGE ── */}
      <div
        className="relative w-full"
        style={{ height: "55vh", minHeight: 420 }}
      >
        <Image
          src={pageData.heroImage}
          alt={pageData.name}
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 max-w-5xl mx-auto">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-amber-400 mb-4 block">
            Insights
          </span>
          <h1
            className="font-bold text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {pageData.name}
          </h1>
        </div>
      </div>

      {/* ── ARTICLE BODY + SIDEBAR ── */}
      <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Article */}
        <article className="lg:col-span-2">
          {/* Deck */}
          <p
            className="text-stone-700 leading-relaxed mb-10 border-l-4 border-amber-400 pl-6"
            style={{ fontSize: 19, fontStyle: "italic" }}
          >
            {pageData.content}
          </p>
          <div className="space-y-5">
            {body.map((para: string, i: number) => {
              const isSubheading =
                para.length < 60 && !para.endsWith(".") && !para.endsWith(",");
              if (isSubheading && i > 0) {
                return (
                  <h2
                    key={i}
                    id={para.toLowerCase().replace(/\s+/g, "-")}
                    className="font-bold text-[#1a1a1a] mt-10 mb-2"
                    style={{ fontSize: "1.25rem", scrollMarginTop: 80 }}
                  >
                    {para}
                  </h2>
                );
              }
              return (
                <p
                  key={i}
                  className="text-stone-600 leading-relaxed"
                  style={{ fontSize: 16.5, lineHeight: 1.8 }}
                >
                  {para}
                </p>
              );
            })}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-10">
          {/* TOC */}
          {subheadings.length > 0 && (
            <div
              className="p-6"
              style={{ background: "#fafaf8", border: "1px solid #e5e7eb" }}
            >
              <h4 className="font-bold text-[#1a1a1a] text-xs uppercase tracking-widest mb-4">
                In this article
              </h4>
              <ul className="space-y-3">
                {subheadings.map((h: string) => (
                  <li key={h}>
                    <a
                      href={`#${h.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-stone-500 hover:text-[#1a1a1a] transition-colors leading-snug block"
                    >
                      {h}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related */}
          <div>
            <h4 className="font-bold text-[#1a1a1a] text-xs uppercase tracking-widest mb-5">
              Related Insights
            </h4>
            <div className="space-y-4">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/info/${item.slug}`}
                  className="flex gap-4 group"
                >
                  <div
                    className="relative shrink-0 overflow-hidden"
                    style={{ width: 72, height: 72 }}
                  >
                    <Image
                      src={item.heroImage}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a] text-sm group-hover:text-amber-600 transition-colors leading-snug">
                      {item.name}
                    </p>
                    <p className="text-xs text-stone-400 mt-1 leading-snug line-clamp-2">
                      {item.content.slice(0, 80)}…
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA card */}
          <div
            className="p-6"
            style={{ background: "#001a40" }}
          >
            <p className="font-bold text-white text-sm mb-2">
              Speak to an expert
            </p>
            <p className="text-blue-300/70 text-xs leading-relaxed mb-5">
              Our investment managers can help you navigate today's market
              landscape.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest"
            >
              Get in touch <ArrowRight size={12} />
            </a>
          </div>
        </aside>
      </div>

      <Disclaimer
        name={pageData.name}
        light
      />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   LEGAL LAYOUT
   Clean document. No images, serif typography, sticky sidebar TOC.
───────────────────────────────────────────────────────────────────────────── */
function LegalLayout({ pageData }: { pageData: any }) {
  const legalLinks =
    FOOTER_DATA.find((s) => s.category === "Legal")?.links ?? [];

  const paragraphs: string[] = (pageData.fullContent ?? pageData.content)
    .split("\n")
    .map((l: string) => l.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen font-sans bg-white">
      {/* ── SLIM HEADER ── */}
      <div
        style={{ background: "#001a40" }}
        className="py-16 px-8"
      >
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-blue-400 mb-4 block">
            Legal
          </span>
          <h1
            className="font-bold text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {pageData.name}
          </h1>
          <p className="text-blue-200/50 text-xs mt-4">
            Last updated: April 2026
          </p>
        </div>
      </div>

      {/* ── CONTENT + NAV ── */}
      <div className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-4 gap-16">
        {/* Sidebar nav */}
        <aside className="lg:col-span-1">
          <div
            className="sticky top-8 p-5"
            style={{ background: "#f8fafc", border: "1px solid #e5e7eb" }}
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
              Legal Documents
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/info/${item.slug}`}
                    className={`block text-sm py-1.5 px-3 transition-colors ${item.slug === pageData.slug
                      ? "font-bold text-[#001a40] bg-white border-l-2 border-[#001a40]"
                      : "text-stone-500 hover:text-[#001a40]"
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Document body */}
        <div className="lg:col-span-3 space-y-5 max-w-2xl">
          {paragraphs.map((para: string, i: number) => {
            const isSubheading =
              para.length < 80 && !para.endsWith(".") && !para.endsWith(",");
            if (isSubheading && i > 0) {
              return (
                <h2
                  key={i}
                  className="font-bold text-[#001a40] mt-8"
                  style={{ fontSize: "1.05rem" }}
                >
                  {para}
                </h2>
              );
            }
            return (
              <p
                key={i}
                className="text-stone-600 leading-relaxed"
                style={{ fontSize: 15.5, lineHeight: 1.85 }}
              >
                {para}
              </p>
            );
          })}

          <div
            className="mt-12 p-6 text-xs text-stone-500 leading-relaxed"
            style={{ background: "#f8fafc", border: "1px solid #e5e7eb" }}
          >
            <strong className="text-[#001a40]">Regulatory Notice:</strong>{" "}
            Alphadyne Asset Management (UK) LLP is authorised and regulated by the
            Financial Conduct Authority (FCA firm reference number: 603570).
            Registered in England and Wales, company number OC371435. Client
            funds are protected under the FSCS up to £120,000.
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FALLBACK
───────────────────────────────────────────────────────────────────────────── */
function FallbackLayout({ pageData }: { pageData: any }) {
  return (
    <main className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-8 py-24">
        <h1 className="font-bold text-[#001a40] text-4xl mb-6">
          {pageData.name}
        </h1>
        <p className="text-stone-600 leading-relaxed">{pageData.content}</p>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED DISCLAIMER
───────────────────────────────────────────────────────────────────────────── */
function Disclaimer({ name, light }: { name: string; light?: boolean }) {
  return (
    <section
      className="py-10 px-8 border-t"
      style={{ borderColor: light ? "#e5e7eb" : "#1e3a5f" }}
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
          Professional Investors Only
        </p>
        <p className="text-xs text-zinc-400 max-w-4xl leading-relaxed">
          This information regarding <strong>{name}</strong> is for professional
          investors only. Past performance is not a guarantee of future results.
          Alphadyne Asset Management is authorised and regulated by the FCA. Client
          funds protected under the FSCS up to £120,000.
        </p>
      </div>
    </section>
  );
}
