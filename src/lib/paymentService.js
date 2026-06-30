import { supabase } from "./supabase-client";

export async function savePayment({
  order_id,
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
}) {
  const { data, error } = await supabase

    .from("payments")

    .insert({
      order_id,

      razorpay_payment_id,

      razorpay_order_id,

      razorpay_signature,

      status: "success",
    })

    .select()

    .single();

  if (error) {
    console.error("SAVE PAYMENT ERROR:", error);

    throw error;
  }

  return data;
}
