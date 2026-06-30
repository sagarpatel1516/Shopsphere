"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");

      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);

        return;
      }

      toast.success("Welcome back 👋");

      router.replace("/");

      router.refresh();
    } catch (error) {
      console.log(error);

      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        className="
border
p-3
w-full
rounded-xl
outline-none
focus:ring-2
focus:ring-black
"
        placeholder="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="
border
p-3
w-full
rounded-xl
outline-none
focus:ring-2
focus:ring-black
"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={loading}
        className="
w-full
rounded-xl
bg-black
py-3
text-white
font-semibold
disabled:opacity-50
"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
