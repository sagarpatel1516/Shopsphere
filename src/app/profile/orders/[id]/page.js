import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import OrderTimeline from "@/components/profile/OrderTimeline";

export default async function ProfileOrderDetailPage({ params }) {
  const { id } = params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      total_price,
      status,
      created_at,

      addresses(
        full_name,
        phone,
        address_line,
        city,
        state,
        pincode
      ),

      order_items(
        id,
        name,
        price,
        quantity
      ),

      payments(
        razorpay_payment_id,
        status,
        created_at
      )
    `,
    )
    .eq("id", id)
    .eq("user_email", user.email)
    .maybeSingle();

  if (error || !order) notFound();

  const payment = order.payments?.[0];

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <Link href="/profile" className="text-gray-500">
        ← Back
      </Link>

      <div className="mt-6 rounded-3xl border bg-white p-8 shadow-sm">
        {/* HEADER */}
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500">Order ID</p>
            <h1 className="text-4xl font-bold">#{order.id}</h1>
          </div>

          <span className="px-4 py-2 rounded-full font-semibold bg-yellow-100 text-yellow-700">
            {order.status}
          </span>
        </div>

        {/* ADDRESS */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Delivery Address</h2>

          <div className="rounded-xl border p-5 bg-gray-50">
            <p className="font-bold">{order.addresses?.full_name}</p>
            <p>{order.addresses?.phone}</p>
            <p>{order.addresses?.address_line}</p>
            <p>
              {order.addresses?.city}, {order.addresses?.state} -{" "}
              {order.addresses?.pincode}
            </p>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Products</h2>

          <div className="space-y-4">
            {order.order_items?.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border rounded-xl p-5"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p className="font-bold">
                  ₹{Number(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PAYMENT */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Payment</h2>

          {payment ? (
            <div className="border rounded-xl p-5">
              <p className="break-all">{payment.razorpay_payment_id}</p>

              <p className="text-green-600 font-bold mt-2">{payment.status}</p>
            </div>
          ) : (
            <p className="text-gray-500">Payment not found</p>
          )}
        </section>

        {/* TIMELINE */}
        <OrderTimeline status={order.status} />

        {/* TOTAL */}
        <div className="mt-10 border-t pt-6 flex justify-between">
          <span className="text-xl">Total</span>

          <span className="text-3xl font-bold">
            ₹{Number(order.total_price).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </main>
  );
}
