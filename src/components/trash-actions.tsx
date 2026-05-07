"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function TrashActions({
  id,
  assetName,
}: {
  id: string;
  assetName: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Permanently remove ${assetName} from the audit trail?`))
      return;

    setIsDeleting(true);

    //  Uses the single global supabase instance
    const { error } = await supabase.from("investments_Alpha_Dine").delete().eq("id", id);

    if (!error) {
      toast.success("Entry Purged");
      router.refresh();
    } else {
      console.error("Delete Error:", error);
      toast.error("Delete Failed");
    }

    setIsDeleting(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-muted-foreground hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 flex ml-auto disabled:opacity-30"
      title="Delete Record"
    >
      <Trash2 className={isDeleting ? "animate-pulse size-4" : "size-4"} />
    </button>
  );
}
