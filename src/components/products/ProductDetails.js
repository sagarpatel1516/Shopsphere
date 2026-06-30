"use client";

import Image from "next/image";

import AddToCartButton from "../cart/AddToCartButton";
import WishlistButton from "../wishlist/WishlistButton";

export default function ProductDetails({ product }) {
  return (
    <div
      className="
mx-auto
max-w-7xl
px-4
py-10
sm:px-6
lg:px-8
"
    >
      <div
        className="
grid
gap-12
lg:grid-cols-2
items-start
"
      >
        {/* IMAGE */}

        <div
          className="
rounded-3xl
border
bg-white
p-4
shadow-sm
"
        >
          <div
            className="
relative
aspect-square
max-h-[600px]
overflow-hidden
rounded-2xl
bg-gray-50
"
          >
            <Image
              src={
                product.image_url ||
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
              }
              alt={product.name}
              fill
              priority
              sizes="
(max-width:768px)100vw,
50vw
"
              className="
object-contain
transition
duration-500
hover:scale-105
"
            />
          </div>
        </div>

        {/* DETAILS */}

        <div
          className="
flex
flex-col
"
        >
          {product.featured && (
            <span
              className="
w-fit
rounded-full
bg-yellow-100
px-4
py-1
text-xs
font-semibold
text-yellow-700
"
            >
              ⭐ Featured Product
            </span>
          )}

          <h1
            className="
mt-5
text-3xl
font-bold
leading-tight
text-gray-900
md:text-5xl
"
          >
            {product.name}
          </h1>

          <div
            className="
mt-5
flex
items-center
gap-4
flex-wrap
"
          >
            <p
              className="
text-3xl
font-bold
"
            >
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>

            {product.category && (
              <span
                className="
rounded-full
bg-gray-100
px-4
py-1
text-sm
text-gray-600
"
              >
                {product.category}
              </span>
            )}
          </div>

          <p
            className="
mt-6
leading-7
text-gray-600
"
          >
            {product.description || "No description available."}
          </p>

          <div className="mt-6">
            {product.stock > 0 ? (
              <span
                className="
inline-flex
rounded-full
bg-green-100
px-4
py-2
text-sm
font-medium
text-green-700
"
              >
                ✓ In Stock ({product.stock})
              </span>
            ) : (
              <span
                className="
inline-flex
rounded-full
bg-red-100
px-4
py-2
text-sm
font-medium
text-red-700
"
              >
                ✕ Out of Stock
              </span>
            )}
          </div>

          {/* BUTTONS */}

          <div
            className="
mt-8
grid
grid-cols-1
sm:grid-cols-2
gap-4
"
          >
            <div className="w-full">
              <AddToCartButton product={product} />
            </div>

            <div className="w-full">
              <WishlistButton product={product} />
            </div>
          </div>

          {/* TRUST */}

          <div
            className="
mt-10
grid
grid-cols-3
gap-4
"
          >
            <div
              className="
rounded-2xl
border
p-4
text-center
"
            >
              <div className="text-xl">🚚</div>

              <p
                className="
mt-2
text-xs
font-semibold
"
              >
                Fast Delivery
              </p>
            </div>

            <div
              className="
rounded-2xl
border
p-4
text-center
"
            >
              <div className="text-xl">🔒</div>

              <p
                className="
mt-2
text-xs
font-semibold
"
              >
                Secure Payment
              </p>
            </div>

            <div
              className="
rounded-2xl
border
p-4
text-center
"
            >
              <div className="text-xl">↩️</div>

              <p
                className="
mt-2
text-xs
font-semibold
"
              >
                Easy Returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
