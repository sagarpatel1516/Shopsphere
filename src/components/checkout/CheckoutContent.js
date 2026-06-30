"use client";

import { useEffect, useState } from "react";

import useCartStore from "@/store/cartStore";

import { createOrder } from "@/lib/orderService";

import { savePayment } from "@/lib/paymentService";

import PaymentButton from "@/components/payment/PaymentButton";

import { toast } from "sonner";

import { supabase } from "@/lib/supabase-client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CheckoutContent() {
  const items = useCartStore((state) => state.items);

  const clearCart = useCartStore((state) => state.clearCart);

  const router = useRouter();

  const params = useSearchParams();

  const addressId = params.get("address");

  const [email, setEmail] = useState("");

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email);
      }
    }

    loadUser();
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,

    0,
  );

  async function handleSuccess(response) {
    if (processing) return;

    try {
      setProcessing(true);

      if (items.length === 0) {
        toast.error("Cart is empty");

        return;
      }

      if (!addressId) {
        toast.error("Add address first");

        return;
      }

      const order = await createOrder({
        user_email: email,

        items,

        total_price: total,

        address_id: addressId,
      });

      await savePayment({
        order_id: order.id,

        razorpay_payment_id: response.razorpay_payment_id,

        razorpay_order_id: response.razorpay_order_id,

        razorpay_signature: response.razorpay_signature,
      });

      clearCart();

      toast.success("Order placed successfully 🎉");

      router.push("/profile");
    } catch (error) {
      console.log(error);

      toast.error("Payment failed");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div
      className="
max-w-2xl
mx-auto
px-6
py-12
"
    >
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <input
        value={email}
        readOnly
        className="
w-full
border
rounded-xl
p-3
mb-8
bg-gray-100
"
      />

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="
rounded-2xl
border
bg-white
p-5
flex
justify-between
"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>

              <p className="text-gray-500">Qty {item.quantity}</p>
            </div>

            <p className="font-bold">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div
        className="
mt-8
flex
justify-between
items-center
border-t
pt-6
"
      >
        <span className="text-xl">Total</span>

        <span className="text-3xl font-bold">₹{total}</span>
      </div>

      <div className="mt-8">
        <PaymentButton
          amount={total}
          onSuccess={handleSuccess}
          disabled={processing}
        />
      </div>
    </div>
  );
}
