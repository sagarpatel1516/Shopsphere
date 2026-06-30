export const dynamic = "force-dynamic";

import Razorpay from "razorpay";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const amount = Number(body.amount);

    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          error: "Invalid amount",
        },

        {
          status: 400,
        },
      );
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        {
          error: "Razorpay keys missing",
        },

        {
          status: 500,
        },
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,

      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),

      currency: "INR",

      receipt: `shopsphere_${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("RAZORPAY CREATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        error: "Payment order creation failed",
      },

      {
        status: 500,
      },
    );
  }
}
