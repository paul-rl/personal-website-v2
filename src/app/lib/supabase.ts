import { createClient, SupabaseClient } from "@supabase/supabase-js";

// For public reads (cleint-side)
export const getSupabase = () => {
  const supabase:SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return supabase
}

// For writes (server-side)
export const getSupabaseAdmin = () => {
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}