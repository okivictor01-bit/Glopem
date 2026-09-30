import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side / browser client — safe to use in components.
// Relies on RLS policies to restrict what it can read/write.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
