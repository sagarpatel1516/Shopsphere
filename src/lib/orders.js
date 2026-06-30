import { supabase } from "./supabase-client";

// DELETE ORDER

export async function deleteOrder(id) {
  const { error } = await supabase.from("orders").delete().eq("id", id);

  if (error) {
    console.error("DELETE ORDER ERROR:", error);

    throw error;
  }

  return true;
}

// UPDATE ORDER STATUS

export async function updateOrderStatus(id, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({
      status,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error("UPDATE STATUS ERROR:", error);

    throw error;
  }

  return data;
}
