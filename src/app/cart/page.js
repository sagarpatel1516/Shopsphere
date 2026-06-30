export const dynamic = "force-dynamic";

import CartContent from "@/components/cart/CartContent";

export default function CartPage() {
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
max-w-7xl
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
            Shopping Cart
          </h1>

          <p
            className="
mt-2
text-gray-500
"
          >
            Review your items and complete your order
          </p>
        </div>

        <CartContent />
      </div>
    </main>
  );
}
