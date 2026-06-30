import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        {/* BRAND */}

        <div>
          <h3 className="text-2xl font-bold">ShopSphere</h3>

          <p className="mt-3 text-gray-500">
            Premium ecommerce platform built with Next.js and Supabase.
          </p>
        </div>

        {/* SHOP */}

        <div>
          <h4 className="font-semibold">Shop</h4>

          <ul className="mt-4 space-y-2 text-gray-500">
            <li>
              <Link href="/products">Products</Link>
            </li>

            <li>
              <Link href="/categories">Categories</Link>
            </li>

            <li>
              <Link href="/products?featured=true">Featured</Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}

        <div>
          <h4 className="font-semibold">Company</h4>

          <ul className="mt-4 space-y-2 text-gray-500">
            <li>
              <Link href="/about">About</Link>
            </li>

            <li>
              <Link href="/contact">Contact</Link>
            </li>

            <li>
              <Link href="/support">Support</Link>
            </li>
          </ul>
        </div>

        {/* ACCOUNT */}

        <div>
          <h4 className="font-semibold">Account</h4>

          <ul className="mt-4 space-y-2 text-gray-500">
            <li>
              <Link href="/orders">Orders</Link>
            </li>

            <li>
              <Link href="/wishlist">Wishlist</Link>
            </li>

            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
