import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Show a clear message instead of a white screen when .env is missing
export const configured = Boolean(url && key);
export const supabase = createClient(url || "http://invalid.local", key || "missing");