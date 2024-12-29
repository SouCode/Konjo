import { createClient } from "@supabase/supabase-js";

// Environment variables (add these in your .env.local file)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Debugging log (optional for testing purposes)
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn("Supabase credentials are missing. Check your .env.local file.");
}
