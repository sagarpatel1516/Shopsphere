"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!fullName || !email || !password) {
      toast.error("Please fill all fields");

      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email,

        password,

        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        toast.error(error.message);

        return;
      }

      toast.success("Account created successfully");

      router.replace("/login");

      router.refresh();
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
rounded-3xl
border
bg-white
p-8
space-y-5
"
    >
      <div>
        <label className="block mb-2 font-medium">Full Name</label>

        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your name"
          className="
w-full
rounded-xl
border
p-3
"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="
w-full
rounded-xl
border
p-3
"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="
w-full
rounded-xl
border
p-3
"
          minLength={6}
          required
        />
      </div>

      <button
        disabled={loading}
        className="
w-full
rounded-xl
bg-black
px-6
py-3
text-white
font-semibold
disabled:opacity-50
"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
