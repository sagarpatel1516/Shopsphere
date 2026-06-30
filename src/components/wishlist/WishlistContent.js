"use client";

import Image from "next/image";
import Link from "next/link";

import { Trash2 } from "lucide-react";

import useWishlistStore from "@/store/wishlistStore";

import AddToCartButton from "../cart/AddToCartButton";

export default function WishlistContent() {
  const items = useWishlistStore((state) => state.items);

  const removeItem = useWishlistStore((state) => state.removeItem);

  if (items.length === 0) {
    return (
      <div
        className="
rounded-3xl
border
bg-white
p-12
text-center
"
      >
        <h2
          className="
text-2xl
font-bold
"
        >
          Wishlist is empty ❤️
        </h2>

        <p
          className="
mt-3
text-gray-500
"
        >
          Save your favorite products here
        </p>

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
font-semibold
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
sm:grid-cols-2
lg:grid-cols-3
gap-6
"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="
group
rounded-3xl
border
bg-white
overflow-hidden
shadow-sm
transition
hover:shadow-xl
"
        >
          {/* IMAGE */}

          <Link href={`/products/${item.slug}`}>
            <div
              className="
relative
h-60
overflow-hidden
"
            >
              <Image
                src={
                  item.image_url ||
                  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
                }
                alt={item.name}
                fill
                sizes="300px"
                className="
object-cover
transition
duration-500
group-hover:scale-105
"
              />
            </div>
          </Link>

          {/* CONTENT */}

          <div className="p-5">
            <h2
              className="
text-lg
font-bold
line-clamp-1
"
            >
              {item.name}
            </h2>

            <p
              className="
mt-2
text-2xl
font-bold
"
            >
              ₹{Number(item.price).toLocaleString("en-IN")}
            </p>

            <div
              className="
mt-5
space-y-3
"
            >
              <AddToCartButton product={item} />

              <button
                onClick={() => removeItem(item.id)}
                className="
w-full
h-12
rounded-xl
bg-red-600
text-white
font-semibold
flex
items-center
justify-center
gap-2
transition
hover:bg-red-700
active:scale-95
"
              >
                <Trash2 size={18} />
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
