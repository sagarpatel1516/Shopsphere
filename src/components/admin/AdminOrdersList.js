"use client";

import { useState } from "react";
import Link from "next/link";

import OrderStatusBadge from "./OrderStatusBadge";
import UpdateOrderStatus from "./UpdateOrderStatus";
import DeleteOrderButton from "./DeleteOrderButton";

export default function AdminOrdersList({ orders }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const email = order.user_email?.toLowerCase() || "";

    const matchesSearch =
      email.includes(search.toLowerCase()) ||
      order.id.toString().includes(search);

    const matchesFilter = filter === "All" || order.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search email or order id..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
        mb-5
        w-full
        rounded-xl
        border
        px-4
        py-3
        outline-none
        "
      />

      {/* FILTER */}

      <div
        className="
        flex
        gap-3
        mb-6
        flex-wrap
        "
      >
        {[
          "All",
          "Pending",
          "Paid",
          "Processing",
          "Shipped",
          "Delivered",
          "Cancelled",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`
          rounded-full
          px-4
          py-2
          text-sm
          border

          ${filter === item ? "bg-black text-white" : "bg-white"}

          `}
          >
            {item}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}

      {filteredOrders.length === 0 && (
        <div
          className="
          rounded-2xl
          border
          bg-white
          p-10
          text-center
          text-gray-500
          "
        >
          No orders found
        </div>
      )}

      {/* ORDERS */}

      <div className="space-y-6">
        {filteredOrders.map((order) => {
          const address = order.addresses;

          return (
            <div
              key={order.id}
              className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
        "
            >
              {/* HEADER */}

              <div
                className="
        flex
        flex-col
        gap-4
        md:flex-row
        md:items-center
        md:justify-between
        "
              >
                <div>
                  <h2 className="text-xl font-bold">Order #{order.id}</h2>

                  <p className="text-sm text-gray-500">{order.user_email}</p>

                  <p className="font-semibold mt-1">₹{order.total_price}</p>

                  <p className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div
                  className="
          flex
          gap-3
          items-center
          flex-wrap
          "
                >
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="
            rounded-lg
            bg-black
            px-4
            py-2
            text-sm
            text-white
            "
                  >
                    View
                  </Link>

                  <OrderStatusBadge status={order.status} />

                  <UpdateOrderStatus order={order} />

                  <DeleteOrderButton id={order.id} />
                </div>
              </div>

              {/* ADDRESS */}

              <div
                className="
        mt-5
        rounded-xl
        bg-gray-50
        p-4
        "
              >
                <h3 className="font-semibold mb-2">Delivery Address</h3>

                {address && (
                  <>
                    <p>{address.full_name}</p>

                    <p>{address.phone}</p>

                    <p>{address.address_line}</p>

                    <p>
                      {address.city}, {address.state}
                      {" - "}
                      {address.pincode}
                    </p>
                  </>
                )}
              </div>

              {/* PRODUCTS */}

              <div className="mt-5">
                <h3 className="font-semibold mb-3">Products</h3>

                <div className="space-y-2">
                  {order.order_items?.map((item) => (
                    <div
                      key={item.id}
                      className="
            flex
            justify-between
            rounded-lg
            bg-gray-50
            p-3
            "
                    >
                      <span>
                        {item.name}

                        {" × "}

                        {item.quantity}
                      </span>

                      <span className="font-semibold">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
