import React from "react";

export default function StatsPage() {
  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-background min-h-screen">
      <header className="space-y-2 border-b border-zinc-100 pb-8">
        <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold">
          Performance Analytics
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground italic">
          Portfolio Management{" "}
          <span className="not-italic font-black text-primary">
            Intelligence
          </span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Simple SVG Pie/Donut Chart Placeholder */}
        <div className="lg:col-span-1 border border-zinc-200 p-8 bg-white flex flex-col items-center justify-center space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Asset Distribution
          </p>
          <div className="relative size-48">
            <svg
              viewBox="0 0 36 36"
              className="size-full transform -rotate-90"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="transparent"
                stroke="#f4f4f5"
                strokeWidth="4"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="transparent"
                stroke="#2563eb"
                strokeWidth="4"
                strokeDasharray="70 100"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="4"
                strokeDasharray="20 100"
                strokeDashoffset="-70"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-black">100%</span>
              <span className="text-[8px] uppercase font-bold text-zinc-400">
                Deployed
              </span>
            </div>
          </div>
          <div className="w-full space-y-2">
            <LegendItem
              color="bg-primary"
              label="Equity"
              value="70%"
            />
            <LegendItem
              color="bg-emerald-500"
              label="Real Estate"
              value="20%"
            />
            <LegendItem
              color="bg-zinc-200"
              label="Cash"
              value="10%"
            />
          </div>
        </div>

        {/* Growth Statistics */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-zinc-200 p-6 bg-white">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Projected Annual Yield
              </p>
              <p className="text-4xl font-black text-emerald-600 mt-2">8.4%</p>
            </div>
            <div className="border border-zinc-200 p-6 bg-white">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Risk Factor
              </p>
              <p className="text-4xl font-black text-primary mt-2 italic">
                Low
              </p>
            </div>
          </div>

          {/* Simple CSS Bar Chart */}
          <div className="border border-zinc-200 p-8 bg-white space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Growth Projection (6 Months)
            </p>
            <div className="h-40 flex items-end justify-between gap-2 border-b border-zinc-100 pb-2">
              <div
                className="w-full bg-zinc-100 h-[30%] hover:bg-primary transition-colors cursor-help"
                title="Jan"
              />
              <div
                className="w-full bg-zinc-100 h-[45%] hover:bg-primary transition-colors cursor-help"
                title="Feb"
              />
              <div
                className="w-full bg-zinc-100 h-[40%] hover:bg-primary transition-colors cursor-help"
                title="Mar"
              />
              <div
                className="w-full bg-zinc-100 h-[65%] hover:bg-primary transition-colors cursor-help"
                title="Apr"
              />
              <div
                className="w-full bg-zinc-100 h-[85%] hover:bg-primary transition-colors cursor-help"
                title="May"
              />
              <div
                className="w-full bg-primary h-[100%]"
                title="Jun"
              />
            </div>
            <div className="flex justify-between text-[8px] font-bold text-zinc-400 uppercase tracking-tighter px-1">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendItem({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-tight">
      <div className="flex items-center gap-2">
        <div className={`size-2 ${color}`} />
        <span className="text-zinc-600">{label}</span>
      </div>
      <span className="text-zinc-900">{value}</span>
    </div>
  );
}
