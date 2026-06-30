"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";

export default function AuthStatus() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsAdmin(false);

        return;
      }

      const { data: profile } = await supabase

        .from("profiles")

        .select("role")

        .eq("id", user.id)

        .single();

      setIsAdmin(profile?.role === "admin");
    }

    checkAdmin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!isAdmin) return null;

  return (
    <Link
      href="/admin"
      className="
font-semibold
text-red-600
hover:text-red-700
"
    >
      Admin
    </Link>
  );
}
