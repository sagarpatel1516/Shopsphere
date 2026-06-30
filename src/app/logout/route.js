export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("LOGOUT ERROR:", error);
  }

  return NextResponse.redirect(new URL("/login", request.url));
}
