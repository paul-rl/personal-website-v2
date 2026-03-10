import { supabase } from "@/app/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("albums").select("*");
  
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true, data });
}