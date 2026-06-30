import { createClient } from "@/lib/supabase-server";

export async function getProfile(userId) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", userId)
    .single();

  if (error) return null;

  return data;
}
