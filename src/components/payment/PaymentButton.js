"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function PaymentButton({ amount, onSuccess }) {
  const [loading, setLoading] = useState(false);

  async function startPayment() {
    if (!amount || amount <= 0) {
      toast.error("Invalid payment amount");

      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/payment/create", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount,
        }),
      });

      const order = await res.json();

      if (!order?.id) {
        toast.error("Unable to create payment");

        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: "INR",

        name: "ShopSphere",

        description: "Order Payment",

        order_id: order.id,

        handler: async function (response) {
          try {
            await onSuccess(response);
          } catch (error) {
            console.error(error);

            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: "ShopSphere Customer",
        },

        theme: {
          color: "#000000",
        },
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function () {
        toast.error("Payment failed");
      });

      razor.open();
    } catch (error) {
      console.error("PAYMENT ERROR:", error);

      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={startPayment}
      disabled={loading}
      className="
w-full
rounded-xl
bg-black
py-3
font-semibold
text-white
transition
hover:bg-gray-800
disabled:opacity-50
"
    >
      {loading ? "Processing Payment..." : `Pay ₹${amount}`}
    </button>
  );
}
