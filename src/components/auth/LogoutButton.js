"use client";

import { createClient } from "@/lib/supabase-client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);

      const supabase = createClient();

      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error(error.message);

        return;
      }

      toast.success("Logged out successfully");

      router.replace("/login");

      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      disabled={loading}
      onClick={handleLogout}
      className="
rounded-xl
bg-black
px-5
py-2.5
text-white
font-medium
disabled:opacity-50
"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
