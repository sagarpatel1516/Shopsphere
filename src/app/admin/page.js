import Link from "next/link";

import { createClient } from "@/lib/supabase-server";

import RevenueChart from "@/components/admin/charts/RevenueChart";
import OrdersChart from "@/components/admin/charts/OrdersChart";
import PaymentChart from "@/components/admin/charts/PaymentChart";
import StockChart from "@/components/admin/charts/StockChart";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  // PRODUCTS

  const { count: productsCount } = await supabase.from("products").select("*", {
    count: "exact",
    head: true,
  });

  const { data: products = [] } = await supabase
    .from("products")
    .select("id,name,stock");

  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;

  const outStock = products.filter((p) => p.stock === 0).length;

  // ORDERS

  const { count: ordersCount } = await supabase.from("orders").select("*", {
    count: "exact",
    head: true,
  });

  const { data: orders = [] } = await supabase
    .from("orders")
    .select(
      `
      id,
      total_price,
      status,
      created_at,
      user_email
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  // PAYMENTS

  const { data: payments = [] } = await supabase
    .from("payments")
    .select(
      `
      id,
      status,
      created_at,
      order_id,

      orders!payments_order_id_fkey(
        user_email,
        total_price
      )
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  // KPI

  const revenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + Number(o.total_price || 0), 0);

  const customers = new Set(orders.map((o) => o.user_email)).size;

  // REVENUE CHART

  const revenueMap = {};

  orders
    .filter((o) => o.status !== "Cancelled")
    .forEach((o) => {
      const date = new Date(o.created_at).toLocaleDateString("en-IN");

      revenueMap[date] = (revenueMap[date] || 0) + Number(o.total_price || 0);
    });

  const revenueData = Object.entries(revenueMap)
    .map(([date, revenue]) => ({
      date,
      revenue,
    }))
    .reverse();

  // ORDER CHART

  const statusMap = {
    Pending: 0,
    Paid: 0,
    Processing: 0,
    Shipped: 0,
    Delivered: 0,
    Cancelled: 0,
  };

  orders.forEach((o) => {
    statusMap[o.status] = (statusMap[o.status] || 0) + 1;
  });

  const statusData = Object.entries(statusMap).map(([status, value]) => ({
    status,
    value,
  }));

  // PAYMENT CHART

  const paymentData = [
    {
      status: "success",
      value: payments.filter((p) => p.status?.toLowerCase() === "success")
        .length,
    },

    {
      status: "failed",
      value: payments.filter((p) => p.status?.toLowerCase() === "failed")
        .length,
    },

    {
      status: "pending",
      value: payments.filter((p) => p.status?.toLowerCase() === "pending")
        .length,
    },
  ];

  // STOCK

  const stockData = products
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 10)
    .map((p) => ({
      name: p.name.length > 15 ? p.name.slice(0, 15) + "..." : p.name,

      stock: p.stock,
    }));

  return (
    <main
      className="
min-h-screen
bg-gray-50
max-w-7xl
mx-auto
px-6
py-10
space-y-10
"
    >
      {/* HEADER */}

      <div>
        <h1
          className="
text-4xl
font-bold
"
        >
          Admin Dashboard
        </h1>

        <p
          className="
mt-2
text-gray-500
"
        >
          Monitor sales, orders, payments and inventory
        </p>
      </div>

      {/* KPI */}

      <section
        className="
grid
grid-cols-2
md:grid-cols-3
lg:grid-cols-6
gap-5
"
      >
        {[
          ["Products", productsCount || 0],
          ["Low Stock", lowStock],
          ["Out Stock", outStock],
          ["Orders", ordersCount || 0],
          ["Revenue", `₹${revenue.toLocaleString("en-IN")}`],
          ["Customers", customers],
        ].map(([title, value]) => (
          <div
            key={title}
            className="
bg-white
border
rounded-3xl
p-6
shadow-sm
"
          >
            <p className="text-sm text-gray-500">{title}</p>

            <h2
              className="
mt-3
text-3xl
font-bold
"
            >
              {value}
            </h2>
          </div>
        ))}
      </section>

      {/* QUICK ACTIONS */}

      <section
        className="
bg-white
border
rounded-3xl
p-6
shadow-sm
"
      >
        <h2
          className="
text-xl
font-bold
mb-5
"
        >
          Quick Actions
        </h2>

        <div
          className="
flex
flex-wrap
gap-4
"
        >
          <Link
            href="/admin/products"
            className="
px-6
py-3
rounded-xl
bg-black
text-white
"
          >
            Manage Products
          </Link>

          <Link
            href="/admin/orders"
            className="
px-6
py-3
rounded-xl
bg-blue-600
text-white
"
          >
            Manage Orders
          </Link>

          <Link
            href="/admin/payments"
            className="
px-6
py-3
rounded-xl
bg-purple-600
text-white
"
          >
            Manage Payments
          </Link>

          <Link
            href="/admin/categories"
            className="
px-6
py-3
rounded-xl
bg-green-600
text-white
"
          >
            Categories
          </Link>
        </div>
      </section>

      {/* CHARTS */}

      <section
        className="
grid
lg:grid-cols-3
gap-6
"
      >
        <div
          className="
lg:col-span-2
bg-white
border
rounded-3xl
p-6
"
        >
          <h2
            className="
text-xl
font-bold
mb-5
"
          >
            Revenue Overview
          </h2>

          <div className="h-[350px]">
            <RevenueChart data={revenueData} />
          </div>
        </div>

        <div
          className="
bg-white
border
rounded-3xl
p-6
"
        >
          <h2
            className="
text-xl
font-bold
mb-5
"
          >
            Orders
          </h2>

          <div className="h-[350px]">
            <OrdersChart data={statusData} />
          </div>
        </div>
      </section>

      <section
        className="
grid
lg:grid-cols-2
gap-6
"
      >
        <div
          className="
bg-white
border
rounded-3xl
p-6
"
        >
          <h2
            className="
text-xl
font-bold
mb-5
"
          >
            Payment Status
          </h2>

          <div className="h-[350px]">
            <PaymentChart data={paymentData} />
          </div>
        </div>

        <div
          className="
bg-white
border
rounded-3xl
p-6
"
        >
          <h2
            className="
text-xl
font-bold
mb-5
"
          >
            Inventory Overview
          </h2>

          <div className="h-[350px]">
            <StockChart data={stockData} />
          </div>
        </div>
      </section>

      {/* RECENT */}

      <section
        className="
grid
lg:grid-cols-2
gap-6
"
      >
        <div
          className="
bg-white
border
rounded-3xl
p-6
"
        >
          <h2
            className="
text-xl
font-bold
mb-5
"
          >
            Recent Orders
          </h2>

          {orders.slice(0, 5).map((o) => (
            <div
              key={o.id}
              className="
border
rounded-xl
p-4
mb-3
flex
justify-between
"
            >
              <div>
                <p className="font-semibold">Order #{o.id}</p>

                <p className="text-sm text-gray-500">{o.status}</p>
              </div>

              <p className="font-bold">₹{o.total_price}</p>
            </div>
          ))}
        </div>

        <div
          className="
bg-white
border
rounded-3xl
p-6
"
        >
          <h2
            className="
text-xl
font-bold
mb-5
"
          >
            Recent Payments
          </h2>

          {payments.slice(0, 5).map((p) => (
            <div
              key={p.id}
              className="
border
rounded-xl
p-4
mb-3
flex
justify-between
"
            >
              <div>
                <p className="font-semibold">
                  {p.orders?.user_email || "User"}
                </p>

                <p className="text-sm text-gray-500">{p.status}</p>
              </div>

              <p className="font-bold">₹{p.orders?.total_price || 0}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
