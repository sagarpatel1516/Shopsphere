"use client";

import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";

export default function GoogleLogin() {
  async function login() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",

      options: {
        redirectTo: `${window.location.origin}`,
      },
    });

    if (error) {
      toast.error(error.message);
    }
  }

  return (
    <button
      onClick={login}
      className="
w-full
rounded-xl
bg-red-600
py-3
font-semibold
text-white
transition
hover:bg-red-700
"
    >
      Continue with Google
    </button>
  );
}
