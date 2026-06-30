import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase-server";

import Link from "next/link";

import UpdateOrderStatus from "@/components/admin/UpdateOrderStatus";

import OrderStatusBadge from "@/components/admin/OrderStatusBadge";

export default async function AdminOrderDetailsPage({ params }) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: order, error } = await supabase

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

),



payments(

razorpay_payment_id,

razorpay_order_id,

status,

created_at

)

`,
    )

    .eq("id", id)

    .single();

  if (error || !order) {
    notFound();
  }

  const address = order.addresses;

  const payment = order.payments?.[0];

  return (
    <main
      className="
mx-auto
max-w-6xl
px-6
py-10
"
    >
      <Link
        href="/admin/orders"
        className="
text-sm
text-gray-500
hover:text-black
"
      >
        ← Back to Orders
      </Link>

      <div
        className="
mt-6
rounded-3xl
border
bg-white
p-8
shadow-sm
"
      >
        {/* HEADER */}

        <div
          className="
flex
flex-col
gap-6
md:flex-row
md:justify-between
"
        >
          <div>
            <p
              className="
text-sm
text-gray-500
"
            >
              Order ID
            </p>

            <h1
              className="
text-4xl
font-bold
"
            >
              #{order.id}
            </h1>

            <p
              className="
mt-2
text-gray-500
"
            >
              {order.user_email}
            </p>

            <p
              className="
text-sm
text-gray-400
"
            >
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>

          <div
            className="
flex
items-center
gap-3
"
          >
            <OrderStatusBadge status={order.status} />

            <UpdateOrderStatus order={order} />
          </div>
        </div>

        {/* ADDRESS */}

        <section className="mt-10">
          <h2
            className="
mb-4
text-xl
font-bold
"
          >
            Delivery Address
          </h2>

          <div
            className="
rounded-2xl
border
bg-gray-50
p-5
"
          >
            {address ? (
              <>
                <p className="font-semibold">{address.full_name}</p>

                <p>{address.phone}</p>

                <p>{address.address_line}</p>

                <p>
                  {address.city},{address.state}- {address.pincode}
                </p>
              </>
            ) : (
              <p className="text-gray-500">Address not found</p>
            )}
          </div>
        </section>

        {/* PAYMENT */}

        <section className="mt-10">
          <h2
            className="
mb-4
text-xl
font-bold
"
          >
            Payment Details
          </h2>

          <div
            className="
rounded-2xl
border
bg-gray-50
p-5
"
          >
            {payment ? (
              <>
                <p>
                  Status:
                  <span
                    className="
ml-2
font-semibold
text-green-600
"
                  >
                    {payment.status}
                  </span>
                </p>

                <p className="mt-4">Payment ID</p>

                <p
                  className="
text-sm
text-gray-500
break-all
"
                >
                  {payment.razorpay_payment_id}
                </p>

                <p className="mt-4">Razorpay Order ID</p>

                <p
                  className="
text-sm
text-gray-500
break-all
"
                >
                  {payment.razorpay_order_id}
                </p>

                <p
                  className="
mt-4
text-sm
text-gray-400
"
                >
                  {new Date(payment.created_at).toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-gray-500">Payment not found</p>
            )}
          </div>
        </section>

        {/* PRODUCTS */}

        <section className="mt-10">
          <h2
            className="
mb-4
text-xl
font-bold
"
          >
            Products
          </h2>

          <div className="space-y-4">
            {order.order_items?.length ? (
              order.order_items.map((item) => (
                <div
                  key={item.id}
                  className="
flex
justify-between
rounded-2xl
border
p-5
"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>

                    <p
                      className="
text-sm
text-gray-500
"
                    >
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No products found</p>
            )}
          </div>
        </section>

        {/* TOTAL */}

        <div
          className="
mt-10
flex
justify-between
border-t
pt-6
"
        >
          <span
            className="
text-lg
"
          >
            Total
          </span>

          <span
            className="
text-3xl
font-bold
"
          >
            ₹{Number(order.total_price).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </main>
  );
}
