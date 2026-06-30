"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddressForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
  });

  function change(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  async function saveAddress(e) {
    e.preventDefault();

    if (
      !form.full_name ||
      !form.phone ||
      !form.address_line ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      toast.error("Please fill all fields");

      return;
    }

    if (form.phone.length !== 10) {
      toast.error("Enter valid phone number");

      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");

        return;
      }

      const { data, error } = await supabase

        .from("addresses")

        .insert({
          user_id: user.id,

          ...form,
        })

        .select()

        .single();

      if (error) throw error;

      toast.success("Address saved");

      router.replace(`/checkout/payment?address=${data.id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={saveAddress} className="space-y-5">
      {[
        ["full_name", "Full Name"],

        ["phone", "Phone Number"],

        ["city", "City"],

        ["state", "State"],

        ["pincode", "Pincode"],
      ].map(([name, label]) => (
        <div key={name}>
          <label className="block mb-2 font-medium">{label}</label>

          <input
            name={name}
            value={form[name]}
            onChange={change}
            className="
w-full
rounded-xl
border
p-3
outline-none
focus:ring-2
focus:ring-black
"
            placeholder={label}
          />
        </div>
      ))}

      <div>
        <label className="block mb-2 font-medium">Address</label>

        <textarea
          name="address_line"
          value={form.address_line}
          onChange={change}
          className="
w-full
rounded-xl
border
p-3
outline-none
focus:ring-2
focus:ring-black
"
          placeholder="House no, street area"
        />
      </div>

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
        {loading ? "Saving..." : "Continue Payment"}
      </button>
    </form>
  );
}
