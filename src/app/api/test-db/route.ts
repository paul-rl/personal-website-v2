import { getSupabase } from "@/app/lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase:SupabaseClient = getSupabase()
  const { data, error } = await supabase.from("albums").select("*");
  
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true, data });
}