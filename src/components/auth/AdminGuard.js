"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export default function AdminGuard({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.replace("/login");

          return;
        }

        const { data: profile, error } = await supabase

          .from("profiles")

          .select("role")

          .eq("id", user.id)

          .single();

        if (error || profile?.role !== "admin") {
          router.replace("/");

          return;
        }

        setLoading(false);
      } catch (error) {
        console.log("ADMIN CHECK ERROR", error);

        router.replace("/");
      }
    }

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div
        className="
min-h-screen
bg-gray-50
p-10
"
      >
        <div
          className="
h-10
w-64
rounded-xl
bg-gray-200
animate-pulse
mb-8
"
        />

        <div
          className="
grid
grid-cols-1
md:grid-cols-4
gap-5
"
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="
h-32
rounded-3xl
bg-gray-200
animate-pulse
"
            />
          ))}
        </div>
      </div>
    );
  }

  return children;
}
