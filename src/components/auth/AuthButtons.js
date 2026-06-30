"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";

export default function AuthButtons() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (user) {
    return null;
  }

  return (
    <div
      className="
flex
items-center
gap-3
"
    >
      <Link
        href="/login"
        className="
rounded-xl
border
px-4
py-2
text-sm
font-medium
hover:bg-gray-100
"
      >
        Login
      </Link>

      <Link
        href="/register"
        className="
rounded-xl
bg-black
px-4
py-2
text-sm
font-medium
text-white
"
      >
        Register
      </Link>
    </div>
  );
}
