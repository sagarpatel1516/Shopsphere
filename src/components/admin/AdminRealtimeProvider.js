"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";

export default function AdminRealtimeProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    const channel = supabase

      .channel("admin-orders-realtime")

      .on(
        "postgres_changes",

        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },

        (payload) => {
          console.log("NEW ORDER:", payload);

          toast.success("New order received");

          router.refresh();
        },
      )

      .on(
        "postgres_changes",

        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
        },

        () => {
          toast.success("Order status updated");

          router.refresh();
        },
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return children;
}
