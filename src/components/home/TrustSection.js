export default function TrustSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">
        <div className="text-center">
          <div className="text-4xl">🚚</div>

          <h3 className="mt-3 font-semibold">Free Shipping</h3>

          <p className="mt-2 text-sm text-gray-500">On all orders over $99</p>
        </div>

        <div className="text-center">
          <div className="text-4xl">🔒</div>

          <h3 className="mt-3 font-semibold">Secure Payments</h3>

          <p className="mt-2 text-sm text-gray-500">100% protected checkout</p>
        </div>

        <div className="text-center">
          <div className="text-4xl">↩️</div>

          <h3 className="mt-3 font-semibold">Easy Returns</h3>

          <p className="mt-2 text-sm text-gray-500">30-day return policy</p>
        </div>

        <div className="text-center">
          <div className="text-4xl">⭐</div>

          <h3 className="mt-3 font-semibold">Top Rated</h3>

          <p className="mt-2 text-sm text-gray-500">Trusted by customers</p>
        </div>
      </div>
    </section>
  );
}
