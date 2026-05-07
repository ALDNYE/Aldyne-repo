// Supabase Client Configuration - Version 1.0.1
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase Keys - Check Vercel Environment Variables");
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
