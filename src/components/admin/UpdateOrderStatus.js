"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateOrderStatus } from "@/lib/orders";

export default function UpdateOrderStatus({ order }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    const newStatus = e.target.value;

    try {
      setLoading(true);

      await updateOrderStatus(order.id, newStatus);

      toast.success("Order status updated");

      router.refresh();
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);

      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      value={order.status}
      onChange={handleChange}
      disabled={loading}
      className="
      rounded-lg
      border
      bg-white
      px-3
      py-2
      text-sm
      font-medium
      outline-none
      transition
      disabled:opacity-50
      "
    >
      <option value="Pending">Pending</option>

      <option value="Paid">Paid</option>

      <option value="Processing">Processing</option>

      <option value="Shipped">Shipped</option>

      <option value="Delivered">Delivered</option>

      <option value="Cancelled">Cancelled</option>
    </select>
  );
}
