export const dynamic = "force-dynamic";

import AddressForm from "@/components/checkout/AddressForm";

export default function CheckoutPage() {
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
            Checkout
          </h1>

          <p
            className="
mt-2
text-gray-500
"
          >
            Add your delivery details before payment
          </p>
        </div>

        <section
          className="
rounded-3xl
border
bg-white
p-8
shadow-sm
"
        >
          <h2
            className="
mb-6
text-2xl
font-bold
"
          >
            Delivery Address
          </h2>

          <AddressForm />
        </section>
      </div>
    </main>
  );
}
