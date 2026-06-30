export const dynamic = "force-dynamic";

import CheckoutContent from "@/components/checkout/CheckoutContent";

export default function PaymentPage() {
  return (
    <main
      className="
min-h-screen
bg-gray-50
"
    >
      <div
        className="
mx-auto
max-w-5xl
px-6
py-12
"
      >
        <div className="mb-10">
          <h1
            className="
text-4xl
font-bold
"
          >
            Payment
          </h1>

          <p
            className="
mt-2
text-gray-500
"
          >
            Complete your secure payment
          </p>
        </div>

        <div
          className="
rounded-3xl
border
bg-white
p-8
shadow-sm
"
        >
          <CheckoutContent />
        </div>
      </div>
    </main>
  );
}
