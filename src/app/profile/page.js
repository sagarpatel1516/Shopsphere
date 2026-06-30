import { redirect } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase-server";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  // USER ORDERS ONLY

  const { data: orders = [] } = await supabase
    .from("orders")
    .select(
      `
    id,
    total_price,
    status,
    created_at
    `,
    )
    .eq("user_email", user.email)
    .order("created_at", {
      ascending: false,
    });

  // GET USER ORDER IDS

  const orderIds = orders.map((order) => order.id);

  // USER PAYMENTS ONLY

  const { data: payments = [] } = await supabase
    .from("payments")
    .select(
      `
    id,
    razorpay_payment_id,
    status,
    created_at,
    order_id
    `,
    )
    .in("order_id", orderIds.length ? orderIds : [0])
    .order("created_at", {
      ascending: false,
    });

  const userName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email.split("@")[0];

  const totalSpent = orders.reduce(
    (sum, item) => sum + Number(item.total_price || 0),
    0,
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      {/* PROFILE */}

      <section
        className="
bg-white
border
rounded-3xl
p-8
shadow-sm
"
      >
        <div
          className="
flex
items-center
gap-5
"
        >
          <div
            className="
h-20
w-20
rounded-full
bg-black
text-white
flex
items-center
justify-center
text-3xl
font-bold
"
          >
            {userName[0].toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{userName}</h1>

            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">Orders</p>

          <h2 className="text-4xl font-bold mt-3">{orders.length}</h2>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">Spent</p>

          <h2 className="text-4xl font-bold mt-3">
            ₹{totalSpent.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">Wishlist</p>

          <Link href="/wishlist" className="text-4xl">
            ❤️
          </Link>
        </div>
      </section>

      {/* ORDER + PAYMENT SECTION */}

      <section
        className="
grid
lg:grid-cols-2
gap-8
"
      >
        {/* ORDERS */}

        <div
          className="
bg-white
border
rounded-3xl
p-8
"
        >
          <h2
            className="
text-2xl
font-bold
mb-6
"
          >
            My Orders
          </h2>

          {orders.length === 0 ? (
            <div
              className="
rounded-2xl
bg-gray-50
p-8
text-center
text-gray-500
"
            >
              No orders yet
            </div>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="
border
rounded-2xl
p-5
flex
justify-between
items-center
"
                >
                  <div>
                    <p className="font-bold">Order #{order.id}</p>

                    <p
                      className="
text-sm
text-gray-500
mt-1
"
                    >
                      {new Date(order.created_at).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">₹{order.total_price}</p>

                    <span
                      className="
inline-block
mt-2
text-xs
px-3
py-1
rounded-full
bg-green-100
text-green-700
"
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAYMENTS */}

        <div
          className="
bg-white
border
rounded-3xl
p-8
"
        >
          <h2
            className="
text-2xl
font-bold
mb-6
"
          >
            My Payments
          </h2>

          {payments.length === 0 ? (
            <div
              className="
rounded-2xl
bg-gray-50
p-8
text-center
text-gray-500
"
            >
              No payments found
            </div>
          ) : (
            <div className="space-y-4">
              {payments.slice(0, 5).map((payment) => (
                <div
                  key={payment.id}
                  className="
border
rounded-2xl
p-5
flex
justify-between
items-center
"
                >
                  <div>
                    <p className="font-bold">Payment #{payment.id}</p>

                    <p
                      className="
text-sm
text-gray-500
mt-1
"
                    >
                      {payment.razorpay_payment_id || "Online Payment"}
                    </p>
                  </div>

                  <span
                    className="
text-xs
px-3
py-1
rounded-full
bg-blue-100
text-blue-700
"
                  >
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
