import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { AddAssetModal } from "@/components/add-asset-modal";
import { TrashActions } from "@/components/trash-actions";
import { Inbox, Calendar } from "lucide-react";

export default async function RecordsPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { userId } = await auth();
  const user = await currentUser();
  const params = await searchParams;

  const { sessionClaims } = await auth();
  const isAdmin = sessionClaims?.metadata?.role === "admin";

  const MASTER_USER_IDS = [
    "user_3BTsg6kSbYZtxfN2v95I3mUEnyj",
    "user_3DZ2kNO4aJttcHWOCvEVLGetvDg",
    "user_3DZ2dDCPdOnudmhX2MyuM8uPAnC",
    "user_3DZ2TDJjPROri8pIXILJByTdONg",
    "user_3DZ274PkqLpOkYZPkEOdI9xumPX",
  ];

  const isMaster = (userId && MASTER_USER_IDS.includes(userId)) || isAdmin;

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const targetEmail = params.email || userEmail;

  // Fetching data
  let query = supabase.from("investments_Alpha_Dine").select("*");

  if (targetEmail) {
    query = query.eq("assigned_email", targetEmail);
  }

  const { data: records } = await query.order("transaction_date", {
    ascending: false,
  });

  const isEmpty = !records || records.length === 0;

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-background min-h-screen">
      <header className="flex justify-between items-end border-b border-border pb-8">
        <div className="space-y-2">
          <p className="text-primary text-[10px] uppercase tracking-widest font-bold">
            {isMaster && params.email
              ? `Administering Client: ${targetEmail}`
              : isMaster
                ? "Master Ledger (Global)"
                : "Institutional Ledger"}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Investment{" "}
            <span className="italic font-medium text-primary">Records</span>
          </h1>
        </div>

        {isMaster && (
          <AddAssetModal
            userId={userId!}
            initialEmail={targetEmail || ""}
          />
        )}
      </header>

      <div className="border border-border bg-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                Asset & Class
              </th>
              <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                Date
              </th>
              <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                Invested / Sold
              </th>
              <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                Current Balance & P&L
              </th>
              <th className="p-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground text-right pr-8">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty ? (
              records.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors group"
                >
                  <td className="p-4">
                    <div className="font-bold text-primary italic">
                      {item.asset_name}
                    </div>
                    <div className="text-[10px] uppercase text-muted-foreground font-medium">
                      {item.asset_type}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                      <Calendar className="size-3" />
                      {new Date(item.transaction_date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-xs">
                      <span className="text-muted-foreground">Inv:</span> £
                      {Number(item.buy_price || 0).toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                    {item.sell_price > 0 && (
                      <div className="text-xs">
                        <span className="text-muted-foreground">Sold:</span> £
                        {Number(item.sell_price).toLocaleString("en-GB", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-sm">
                      £
                      {Number(item.amount).toLocaleString("en-GB", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                    {item.pl_percentage !== undefined &&
                      item.pl_percentage !== null && (
                        <div
                          className={`text-xs font-bold ${Number(item.pl_percentage) >= 0 ? "text-emerald-600" : "text-red-600"}`}
                        >
                          {Number(item.pl_percentage) >= 0 ? "+" : ""}
                          {Number(item.pl_percentage).toFixed(2)}%
                        </div>
                      )}
                  </td>
                  <td className="p-4 text-right pr-8 flex items-center justify-end gap-2">
                    {isMaster ? (
                      <>
                        <AddAssetModal
                          userId={userId!}
                          initialEmail={item.assigned_email}
                          editData={item}
                        />
                        <TrashActions
                          id={item.id}
                          assetName={item.asset_name}
                        />
                      </>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter bg-emerald-50 px-2 py-1 border border-emerald-100">
                        {item.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-32 text-center"
                >
                  <Inbox className="size-8 mx-auto text-muted-foreground/40 mb-4" />
                  <p className="text-sm font-bold uppercase">
                    No Assets Detected for {targetEmail}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
