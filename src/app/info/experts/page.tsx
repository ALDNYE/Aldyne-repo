import Image from "next/image";

const TEAM = [
  {
    name: "Marcus Stone",
    role: "Managing Partner & Founder",
    bio: "With over 25 years in infrastructure investment, Marcus leads the firm's strategic vision and global expansion.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Global Markets",
    bio: "Elena oversees our 170+ market integrations, focusing on SmartRouting efficiency and execution quality.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
  },
  {
    name: "David Chen",
    role: "Chief Investment Officer",
    bio: "David manages our core portfolios, consistently outperforming benchmarks through rigorous data-driven strategies.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
  },
  {
    name: "Sarah Jenkins",
    role: "Director of ESG Strategy",
    bio: "Sarah ensures that sustainable investing remains at the core of our long-term value creation for institutional clients.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
  },
];

export default function ExpertsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="py-24 px-8 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-5xl font-light tracking-tighter text-black uppercase italic mb-6">
            Meet the{" "}
            <span className="text-[#0070f3] not-italic font-bold">Experts</span>
          </h1>
          <p className="max-w-2xl text-slate-500 text-lg leading-relaxed">
            Our team brings together decades of experience from the world&apos;s
            leading financial institutions to deliver the performance edge
            Alphadyne Asset Management is known for.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="group cursor-default"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Description */}
              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-black">
                  {member.name}
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#0070f3]">
                  {member.role}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed pt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
