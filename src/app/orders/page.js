import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function OrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_email", user.email)
    .order("created_at", { ascending: false });

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

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-10 text-4xl font-bold">Order History</h1>

      {!orders?.length ? (
        <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
          <div className="text-5xl">📦</div>

          <h2 className="mt-4 text-xl font-semibold">No Orders Yet</h2>

          <p className="mt-2 text-gray-500">
            Start shopping and your orders will appear here.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-white"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-xl font-bold hover:underline"
                  >
                    Order #{order.id}
                  </Link>

                  <p className="mt-2 text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-2xl font-bold">
                    ₹{Number(order.total_price).toLocaleString("en-IN")}
                  </p>

                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${statusStyle(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
