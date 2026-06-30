"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddressForm({ userId }) {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
  });

  async function submit(e) {
    e.preventDefault();

    const { error } = await supabase.from("addresses").insert({
      ...form,

      user_id: userId,

      is_default: false,
    });

    if (error) {
      toast.error(error.message);

      return;
    }

    toast.success("Address saved");

    router.refresh();
  }

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  return (
    <form
      onSubmit={submit}
      className="
rounded-3xl
border
bg-white
p-8
shadow-sm
space-y-5
"
    >
      <h2 className="text-2xl font-bold">Add New Address</h2>

      <div>
        <label className="text-sm font-medium">Full Name</label>

        <input
          name="full_name"
          placeholder="Enter your full name"
          value={form.full_name}
          onChange={handleChange}
          className="
mt-2
w-full
border
rounded-xl
p-3
outline-none
"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Phone Number</label>

        <input
          name="phone"
          placeholder="Enter phone number"
          value={form.phone}
          onChange={handleChange}
          className="
mt-2
w-full
border
rounded-xl
p-3
outline-none
"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Address</label>

        <input
          name="address_line"
          placeholder="House no, Street, Area"
          value={form.address_line}
          onChange={handleChange}
          className="
mt-2
w-full
border
rounded-xl
p-3
outline-none
"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">City</label>

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="
mt-2
w-full
border
rounded-xl
p-3
outline-none
"
          />
        </div>

        <div>
          <label className="text-sm font-medium">State</label>

          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="
mt-2
w-full
border
rounded-xl
p-3
outline-none
"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Pincode</label>

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="
mt-2
w-full
border
rounded-xl
p-3
outline-none
"
          />
        </div>
      </div>

      <button
        className="
bg-black
text-white
px-6
py-3
rounded-xl
font-semibold
hover:opacity-90
"
      >
        Save Address
      </button>
    </form>
  );
}
