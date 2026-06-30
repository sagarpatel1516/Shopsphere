"use client";

import Image from "next/image";
import Link from "next/link";
import useCartStore from "@/store/cartStore";

export default function CartContent() {
  const items = useCartStore((state) => state.items || []);

  const increaseQty = useCartStore((state) => state.increaseQty);

  const decreaseQty = useCartStore((state) => state.decreaseQty);

  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div
        className="
      rounded-2xl
      border
      bg-white
      p-12
      text-center
      "
      >
        <h2 className="text-2xl font-bold">Your cart is empty</h2>

        <p className="mt-3 text-gray-500">Add products to continue shopping</p>

        <Link
          href="/products"
          className="
        inline-block
        mt-6
        rounded-xl
        bg-black
        px-6
        py-3
        text-white
        "
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div
      className="
    grid
    grid-cols-1
    lg:grid-cols-3
    gap-8
    "
    >
      {/* ITEMS */}

      <div
        className="
      lg:col-span-2
      space-y-5
      "
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="
        flex
        gap-5
        rounded-2xl
        border
        bg-white
        p-5
        "
          >
            <div
              className="
          relative
          h-28
          w-28
          overflow-hidden
          rounded-xl
          bg-gray-100
          "
            >
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="flex-1">
              <h2
                className="
            font-bold
            text-lg
            "
              >
                {item.name}
              </h2>

              <p className="mt-2 text-gray-600">
                ₹{Number(item.price).toLocaleString("en-IN")}
              </p>

              <div
                className="
            flex
            items-center
            gap-4
            mt-5
            "
              >
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="
              h-8
              w-8
              rounded-lg
              border
              "
                >
                  -
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="
              h-8
              w-8
              rounded-lg
              border
              "
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <p
                className="
            font-bold
            text-lg
            "
              >
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                className="
            mt-4
            text-sm
            text-red-600
            "
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY */}

      <div
        className="
      h-fit
      rounded-2xl
      border
      bg-white
      p-6
      "
      >
        <h2
          className="
        text-xl
        font-bold
        "
        >
          Order Summary
        </h2>

        <div
          className="
        mt-6
        flex
        justify-between
        text-gray-600
        "
        >
          <span>Subtotal</span>

          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>

        <div
          className="
        mt-3
        flex
        justify-between
        text-gray-600
        "
        >
          <span>Delivery</span>

          <span>Free</span>
        </div>

        <hr className="my-5" />

        <div
          className="
        flex
        justify-between
        text-xl
        font-bold
        "
        >
          <span>Total</span>

          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>

        <Link
          href="/checkout"
          className="
        mt-6
        block
        rounded-xl
        bg-black
        py-3
        text-center
        font-semibold
        text-white
        hover:bg-gray-800
        "
        >
          Proceed To Checkout
        </Link>
      </div>
    </div>
  );
}
