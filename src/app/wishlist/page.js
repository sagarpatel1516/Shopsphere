import WishlistContent from "@/components/wishlist/WishlistContent";
import Link from "next/link";

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">My Wishlist</h1>

          <p className="mt-2 text-gray-500">Your saved products for later</p>
        </div>

        {/* CONTENT */}
        <WishlistContent />
      </section>
    </main>
  );
}
