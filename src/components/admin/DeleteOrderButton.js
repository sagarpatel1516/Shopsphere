"use client";

import { deleteOrder } from "@/lib/orders";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function DeleteOrderButton({ id }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const ok = confirm("Delete this order?");

    if (!ok) return;

    try {
      setLoading(true);

      await deleteOrder(id);

      toast.success("Order deleted successfully");

      router.refresh();
    } catch (error) {
      console.error("DELETE ORDER ERROR:", error);

      toast.error("Failed to delete order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="
bg-red-600
text-white
px-4
py-2
rounded-lg
text-sm
hover:bg-red-700
disabled:opacity-50
"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
