import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export function getSupabaseConfigStatus() {
  let host = "";

  try {
    host = supabaseUrl ? new URL(supabaseUrl).host : "";
  } catch {
    host = "URL invalida";
  }

  return {
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
    hasSupabaseConfig,
    host,
    anonKeyPreview: supabaseAnonKey
      ? `${supabaseAnonKey.slice(0, 8)}...${supabaseAnonKey.slice(-6)}`
      : "",
    mode: import.meta.env.MODE,
  };
}
