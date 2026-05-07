"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface Investment {
  id: string;
  asset_name: string;
  assigned_email: string;
  amount: number;
  asset_type: string;
  status: string;
  buy_price: number;
  sell_price?: number;
  transaction_date: string;
  pl_percentage?: number;
}

export function AddAssetModal({
  userId,
  initialEmail,
  editData,
}: {
  userId: string;
  initialEmail: string;
  editData?: Investment;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isEditing = !!editData;

  // We use "amount" for the flat cash invested
  const [totalInvested, setTotalInvested] = useState<number>(
    editData?.amount || 0,
  );

  // We use "buy_price" and "sell_price" for the stock prices
  const [buyPrice, setBuyPrice] = useState<number>(editData?.buy_price || 0);
  const [sellPrice, setSellPrice] = useState<number>(editData?.sell_price || 0);

  const [plPercentage, setPlPercentage] = useState<number>(
    editData?.pl_percentage || 0,
  );

  // Accurate Profit/Loss calculation based on execution prices
  useEffect(() => {
    if (buyPrice > 0 && sellPrice > 0) {
      const percentage = ((sellPrice - buyPrice) / buyPrice) * 100;
      setPlPercentage(percentage);
    } else {
      setPlPercentage(0);
    }
  }, [buyPrice, sellPrice]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      asset_name: (formData.get("assetName")?.toString() || "").trim(),
      assigned_email: (formData.get("assignedEmail")?.toString() || "").trim(),
      amount: totalInvested, // Flat cash amount
      asset_type: (formData.get("type")?.toString() || "").trim(),
      buy_price: buyPrice, // Stock buy price
      sell_price: sellPrice, // Stock sell price
      pl_percentage: plPercentage,
      transaction_date: formData.get("timestamp")
        ? new Date(formData.get("timestamp") as string).toISOString()
        : new Date().toISOString(),
      status: "Active",
      user_id: userId || "",
    };

    if (!payload.user_id) {
      toast.error("User Identity missing. Please re-login.");
      setLoading(false);
      return;
    }

    try {
      const { error } = isEditing
        ? await supabase
            .from("investments_Alpha_Dine")
            .update(payload)
            .eq("id", editData.id)
        : await supabase.from("investments_Alpha_Dine").insert([payload]);

      if (error) {
        toast.error(error.message || "Database Operation Failed");
      } else {
        toast.success(isEditing ? "Entry Updated" : "Asset Authorized");
        setOpen(false);
        router.refresh();
      }
    } catch (err) {
      toast.error("Failed to execute request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        {isEditing ? (
          <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <Edit2 className="size-4" />
          </button>
        ) : (
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-none font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-900 transition-all active:scale-95">
            <Plus className="size-4" /> Authorize New Entry
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="rounded-none border-none max-w-md bg-white p-0 shadow-2xl">
        <div className="h-2 bg-primary w-full" />

        <form
          onSubmit={onSubmit}
          className="p-8 space-y-6"
        >
          <DialogTitle className="text-2xl font-bold italic tracking-tight">
            {isEditing ? "Edit Asset Details" : "New Asset Entry"}
          </DialogTitle>

          <div className="space-y-4">
            {/* Client Email */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                Client Email
              </label>
              <input
                name="assignedEmail"
                defaultValue={
                  isEditing ? editData.assigned_email : initialEmail
                }
                required
                readOnly={isEditing}
                className={`w-full border-b border-border py-2 text-sm font-medium outline-none bg-transparent ${
                  isEditing
                    ? "opacity-60 cursor-not-allowed border-dashed"
                    : "focus:border-primary"
                }`}
              />
            </div>

            {/* Asset Identity & Class */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  Asset Identity
                </label>
                <input
                  name="assetName"
                  defaultValue={isEditing ? editData.asset_name : ""}
                  required
                  placeholder="e.g. Microsoft"
                  className="w-full border-b border-border py-2 text-sm font-medium outline-none focus:border-primary bg-transparent"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  Asset Class
                </label>
                <input
                  name="type"
                  defaultValue={isEditing ? editData.asset_type : ""}
                  required
                  placeholder="e.g. Equity"
                  className="w-full border-b border-border py-2 text-sm font-medium outline-none focus:border-primary bg-transparent"
                />
              </div>
            </div>

            {/* Total Capital Invested */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                Total Invested (£)
              </label>
              <input
                type="number"
                step="0.01"
                value={totalInvested}
                onChange={(e) => setTotalInvested(Number(e.target.value))}
                required
                placeholder="0.00"
                className="w-full border-b border-border py-2 text-sm font-medium outline-none focus:border-primary bg-transparent"
              />
            </div>

            {/* Execution Prices (Reusing buy_price and sell_price) */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  Buy Price @ (£)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full border-b border-border py-2 text-sm font-medium outline-none focus:border-primary bg-transparent"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  Sell Price @ (£)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full border-b border-border py-2 text-sm font-medium outline-none focus:border-primary bg-transparent"
                />
              </div>
            </div>

            {/* Auto Calculations Box */}
            <div className="grid grid-cols-2 gap-6 bg-slate-50 p-3 border border-slate-100">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                  Total Value
                </label>
                <div className="py-2 text-sm font-bold text-primary">
                  £
                  {totalInvested.toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                  Auto P&L (%)
                </label>
                <div
                  className={`py-2 text-sm font-bold ${plPercentage >= 0 ? "text-emerald-600" : "text-red-600"}`}
                >
                  {plPercentage >= 0 ? "+" : ""}
                  {plPercentage.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-black py-5 uppercase text-[11px] tracking-[0.2em] hover:bg-zinc-900 transition-all disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : isEditing
                  ? "Update Record"
                  : "Confirm & Deploy"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
