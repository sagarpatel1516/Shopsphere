import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function OrderDetailsPage({ params }) {
  const { id } = params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: orderDetails, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items(*),
      addresses(*)
      `,
    )
    .eq("id", id)
    .eq("user_email", user.email)
    .single();

  if (error || !orderDetails) {
    console.error("ORDER DETAILS ERROR", error);
    notFound();
  }

  function statusStyle(status = "") {
    const value = status.toLowerCase();

    if (["paid", "success", "processing"].includes(value)) {
      return "bg-yellow-100 text-yellow-700";
    }

    if (value === "delivered") {
      return "bg-green-100 text-green-700";
    }

    if (["cancelled", "failed"].includes(value)) {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-700";
  }

  const address = orderDetails.addresses;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <Link href="/orders" className="text-sm text-gray-500 hover:text-black">
          ← Back to Orders
        </Link>

        <div className="mt-6 rounded-3xl bg-white border shadow-sm overflow-hidden">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-5 p-6 sm:p-8 border-b">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <h1 className="text-3xl font-bold mt-1">#{orderDetails.id}</h1>

              <p className="mt-2 text-sm text-gray-500">
                {new Date(orderDetails.created_at).toLocaleDateString("en-IN")}
              </p>
            </div>

            <span
              className={`h-fit rounded-full px-4 py-2 text-sm font-semibold ${statusStyle(
                orderDetails.status,
              )}`}
            >
              {orderDetails.status}
            </span>
          </div>

          {/* ADDRESS */}
          <section className="p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>

            <div className="rounded-2xl border bg-gray-50 p-5">
              <p className="font-semibold text-lg">{address?.full_name}</p>
              <p className="mt-1 text-gray-600">{address?.phone}</p>
              <p className="mt-1 text-gray-600">{address?.address_line}</p>
              <p className="text-gray-600">
                {address?.city}, {address?.state}
              </p>
              <p className="text-gray-600">{address?.pincode}</p>
            </div>
          </section>

          {/* PRODUCTS */}
          <section className="px-6 sm:px-8 pb-8">
            <h2 className="text-xl font-bold mb-5">Products</h2>

            <div className="space-y-4">
              {orderDetails.order_items?.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:justify-between gap-3 rounded-2xl border p-5"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-lg">
                    ₹
                    {Number(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* TOTAL */}
          <div className="border-t p-6 sm:p-8 flex justify-between items-center">
            <span className="text-xl">Total</span>

            <span className="text-3xl font-bold">
              ₹{Number(orderDetails.total_price).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
