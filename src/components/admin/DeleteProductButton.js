"use client";

import { supabase } from "@/lib/supabase-client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { toast } from "sonner";

export default function DeleteProductButton({ id }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this product?");

    if (!confirmed) return;

    try {
      setLoading(true);

      const { error } = await supabase

        .from("products")

        .delete()

        .eq("id", id);

      if (error) {
        throw error;
      }

      toast.success("Product deleted successfully");

      router.refresh();
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);

      toast.error(error.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="
rounded-lg
bg-red-600
px-4
py-2
text-sm
font-medium
text-white
hover:bg-red-700
disabled:opacity-50
"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
