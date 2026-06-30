import { supabase } from "./supabase-client";

export async function createOrder({
  user_email,

  items,

  total_price,

  address_id,
}) {
  console.log("CREATE ORDER DATA", {
    user_email,
    items,
    total_price,
    address_id,
  });

  const { data: order, error: orderError } = await supabase

    .from("orders")

    .insert({
      user_email,

      total_price,

      address_id,

      status: "Paid",
    })

    .select()

    .single();

  if (orderError) {
    console.error(orderError);

    throw orderError;
  }

  const orderItems = items.map((item) => ({
    order_id: order.id,

    product_id: item.product_id,

    name: item.name,

    quantity: item.quantity,

    price: item.price,
  }));

  const { error: itemError } = await supabase

    .from("order_items")

    .insert(orderItems);

  if (itemError) {
    console.error("ORDER ITEMS ERROR", itemError);

    throw itemError;
  }

  return order;
}
