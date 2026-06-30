export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase-server";

export default async function PaymentsPage() {
  const supabase = await createClient();

  const { data: payments = [], error } = await supabase

    .from("payments")

    .select(
      `

id,

status,

razorpay_payment_id,

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

  if (error) {
    return (
      <main
        className="
mx-auto
max-w-7xl
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
          Failed loading payments
        </div>
      </main>
    );
  }

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
          Payments
        </h1>

        <p
          className="
mt-2
text-gray-500
"
        >
          Razorpay transactions
        </p>
      </div>

      <div
        className="
rounded-3xl
border
bg-white
shadow-sm
overflow-hidden
"
      >
        {payments.length === 0 ? (
          <div
            className="
p-10
text-center
text-gray-500
"
          >
            No payments found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table
              className="
w-full
min-w-[700px]
"
            >
              <thead
                className="
bg-gray-100
"
              >
                <tr>
                  <th className="p-4 text-left">ID</th>

                  <th className="p-4 text-left">Customer</th>

                  <th className="p-4 text-left">Order</th>

                  <th className="p-4 text-left">Amount</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((p) => (
                  <tr
                    key={p.id}
                    className="
border-t
hover:bg-gray-50
transition
"
                  >
                    <td className="p-4">
                      <p className="font-semibold">#{p.id}</p>

                      <p
                        className="
text-xs
text-gray-500
break-all
"
                      >
                        {p.razorpay_payment_id}
                      </p>
                    </td>

                    <td className="p-4">{p.orders?.user_email || "N/A"}</td>

                    <td className="p-4">#{p.order_id}</td>

                    <td
                      className="
p-4
font-bold
"
                    >
                      ₹
                      {Number(p.orders?.total_price || 0).toLocaleString(
                        "en-IN",
                      )}
                    </td>

                    <td className="p-4">
                      <span
                        className={`

rounded-full

px-3

py-1

text-sm

font-medium

${
  p.status?.toLowerCase() === "success"
    ? "bg-green-100 text-green-700"
    : p.status?.toLowerCase() === "failed"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700"
}

`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td
                      className="
p-4
text-sm
text-gray-500
"
                    >
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
