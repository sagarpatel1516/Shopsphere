"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddressCard({ address }) {
  const router = useRouter();

  const [edit, setEdit] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: address.full_name,

    phone: address.phone,

    address_line: address.address_line,

    city: address.city,

    state: address.state,

    pincode: address.pincode,
  });

  async function updateAddress(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await supabase

        .from("addresses")

        .update(form)

        .eq("id", address.id);

      if (error) throw error;

      toast.success("Address updated");

      setEdit(false);

      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!confirm("Delete this address?")) return;

    const { error } = await supabase

      .from("addresses")

      .delete()

      .eq("id", address.id);

    if (error) {
      toast.error(error.message);

      return;
    }

    toast.success("Address deleted");

    router.refresh();
  }

  return (
    <div
      className="
rounded-3xl
border
bg-white
p-6
shadow-sm
"
    >
      {edit ? (
        <form onSubmit={updateAddress} className="space-y-4">
          <h2 className="text-xl font-bold">Edit Address</h2>

          {Object.keys(form).map((key) => (
            <input
              key={key}
              value={form[key]}
              onChange={(e) =>
                setForm({
                  ...form,
                  [key]: e.target.value,
                })
              }
              className="
w-full
border
rounded-xl
p-3
"
              placeholder={key.replace("_", " ")}
            />
          ))}

          <div className="flex gap-3">
            <button
              disabled={loading}
              className="
bg-black
text-white
px-5
py-2
rounded-xl
"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={() => setEdit(false)}
              className="
border
px-5
py-2
rounded-xl
"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-bold">{address.full_name}</h2>

              <p className="text-gray-500">{address.phone}</p>
            </div>

            {address.is_default && (
              <span
                className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
text-sm
"
              >
                Default
              </span>
            )}
          </div>

          <div className="mt-5 text-gray-600 space-y-1">
            <p>{address.address_line}</p>

            <p>
              {address.city}, {address.state}
            </p>

            <p>{address.pincode}</p>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setEdit(true)}
              className="
bg-blue-600
text-white
px-5
py-2
rounded-xl
"
            >
              Edit
            </button>

            <button
              onClick={remove}
              className="
bg-red-600
text-white
px-5
py-2
rounded-xl
"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
