export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase-server";

import AdminOrdersList from "@/components/admin/AdminOrdersList";

import OrdersPagination from "@/components/admin/OrdersPagination";

export default async function AdminOrdersPage({ searchParams }) {
  const supabase = await createClient();

  const params = await searchParams;

  const page = Number(params?.page) || 1;

  const limit = 10;

  const from = (page - 1) * limit;

  const to = from + limit - 1;

  const {
    data: orders = [],

    error,

    count,
  } = await supabase

    .from("orders")

    .select(
      `

id,

user_email,

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

)

`,

      {
        count: "exact",
      },
    )

    .order("created_at", {
      ascending: false,
    })

    .range(from, to);

  if (error) {
    return (
      <main
        className="
mx-auto
max-w-6xl
px-6
py-10
"
      >
        <div
          className="
rounded-3xl
border
bg-white
p-10
text-center
text-red-600
font-semibold
"
        >
          Failed to load orders
        </div>
      </main>
    );
  }

  const totalPages = Math.ceil((count || 0) / limit);

  return (
    <main
      className="
mx-auto
max-w-7xl
px-6
py-10
"
    >
      {/* HEADER */}

      <div className="mb-8">
        <h1
          className="
text-4xl
font-bold
"
        >
          Orders Management
        </h1>

        <p
          className="
mt-2
text-gray-500
"
        >
          Manage customer orders, delivery and status
        </p>
      </div>

      {/* CONTENT */}

      <div
        className="
rounded-3xl
border
bg-white
p-6
shadow-sm
"
      >
        {orders.length === 0 ? (
          <div
            className="
py-10
text-center
text-gray-500
"
          >
            No orders found
          </div>
        ) : (
          <AdminOrdersList orders={orders} />
        )}
      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div className="mt-8">
          <OrdersPagination page={page} totalPages={totalPages} />
        </div>
      )}
    </main>
  );
}
