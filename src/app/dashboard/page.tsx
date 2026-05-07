import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { ShieldCheck, Calculator } from "lucide-react";

export default async function OverviewPage() {
  const { userId } = await auth();
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  console.log("Current Logged In ID:", userId);

  const MASTER_IDS = [
    // "user_3AYuN7sMwNBznIoceq9c7psqbeT", // veltra
    "user_3BTsg6kSbYZtxfN2v95I3mUEnyj", // Alphadyne
  ];

  const isMaster = userId ? MASTER_IDS.includes(userId) : false;

  // Fetching data using the shared singleton
  // We grab amount and pl_percentage to calculate the real profit
  let query = supabase.from("investments_Alpha_Dine").select("amount, pl_percentage");
  if (!isMaster && userEmail) {
    query = query.eq("assigned_email", userEmail);
  }

  const { data: investments } = await query;

  // 1. Summing up all of the amounts for Total Capital
  const totalValue =
    investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;

  // 2. NEW FORMULA: Calculate total profit based on the saved P&L percentages
  const totalProfit =
    investments?.reduce((total, inv) => {
      const pl = Number(inv.pl_percentage || 0);
      const principal = Number(inv.amount || 0);

      // Calculate cash profit from percentage: (Principal * Percentage) / 100
      const cashProfit = (principal * pl) / 100;
      return total + cashProfit;
    }, 0) || 0;

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-background min-h-screen">
      <header className="flex justify-between items-end border-b border-border pb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-light tracking-tight text-foreground">
            Welcome, <span className="font-bold italic">{user?.firstName}</span>
          </h1>
        </div>
      </header>

      {/* Hero Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label={isMaster ? "Total Managed Capital" : "Portfolio Management Value"}
          value={`£${totalValue.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          isPrimary
        />
        <StatCard
          label="Active Assets"
          value={investments?.length || 0}
        />
        <StatCard
          label="Total Accrued Profit"
          value={`£${totalProfit.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          // Highlight green if positive, red if negative
          className={totalProfit >= 0 ? "text-emerald-600" : "text-red-600"}
        />
      </div>

      {/* Financial Ledger Methodology */}
      <section className="border border-border bg-white">
        <div className="bg-primary p-3 flex items-center gap-3">
          <ShieldCheck className="size-3.5 text-white" />
          <h2 className="text-[9px] font-bold uppercase tracking-[0.25em] text-white">
            Portfolio Management Calculation Methodology
          </h2>
        </div>

        <div className="p-10 space-y-6">
          <div className="max-w-3xl space-y-3">
            <h3 className="text-[10px] font-bold uppercase text-primary tracking-widest flex items-center gap-2">
              <Calculator className="size-3" /> Ledger Valuation
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              Total managed capital reflects the current net balance of all
              active asset accounts. Any registered partial sales or full
              liquidations are automatically subtracted from the total principal
              value to output a real-time Portfolio Management balance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-1">
              <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-wider">
                Total Value Formula
              </p>
              <p className="text-xs font-mono text-primary font-bold">
                Σ (Total Invested - Amount Sold)
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-wider">
                Performance Formula
              </p>
              <p className="text-xs font-mono text-primary font-bold">
                ((Current Value - Total Invested) / Total Invested) × 100
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  isPrimary,
  className = "",
}: {
  label: string;
  value: string | number;
  isPrimary?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`p-8 border ${isPrimary ? "border-primary bg-primary/[0.01]" : "border-border bg-card"} space-y-3`}
    >
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
        {label}
      </p>
      <p
        className={`text-4xl font-bold tracking-tighter ${isPrimary ? "text-primary" : className || "text-foreground"
          }`}
      >
        {value}
      </p>
    </div>
  );
}
