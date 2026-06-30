import Image from "next/image";
import Link from "next/link";

import AddToCartButton from "../cart/AddToCartButton";
import WishlistButton from "../wishlist/WishlistButton";

export default function ProductCard({ product }) {
  return (
    <div
      className="
      group
      flex
      flex-col
      rounded-3xl
      border
      bg-white
      overflow-hidden
      shadow-sm
      transition
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      {/* IMAGE */}

      <Link href={`/products/${product.slug}`}>
        <div
          className="
          relative
          h-56
          w-full
          overflow-hidden
          "
        >
          <Image
            src={
              product.image_url ||
              "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
            }
            alt={product.name}
            fill
            sizes="300px"
            className="
            object-cover
            transition
            duration-500
            group-hover:scale-105
            "
          />

          {product.featured && (
            <span
              className="
              absolute
              top-3
              left-3
              rounded-full
              bg-yellow-400
              px-3
              py-1
              text-xs
              font-bold
              "
            >
              ⭐ Featured
            </span>
          )}
        </div>
      </Link>

      {/* CONTENT */}

      <div
        className="
        flex
        flex-col
        p-5
        "
      >
        <Link href={`/products/${product.slug}`}>
          <h3
            className="
            text-lg
            font-bold
            line-clamp-1
            "
          >
            {product.name}
          </h3>
        </Link>

        <p
          className="
          mt-2
          h-10
          text-sm
          text-gray-500
          line-clamp-2
          "
        >
          {product.description || "Premium quality product"}
        </p>

        {/* PRICE */}

        <div
          className="
          mt-5
          flex
          items-center
          justify-between
          "
        >
          <p
            className="
            text-2xl
            font-bold
            "
          >
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>

          <span
            className="
            rounded-full
            bg-green-100
            px-3
            py-1
            text-xs
            font-semibold
            text-green-700
            "
          >
            In Stock
          </span>
        </div>

        {/* BUTTONS */}

        <div
          className="
          mt-6
          grid
          grid-cols-2
          gap-3
          "
        >
          <AddToCartButton product={product} />

          <WishlistButton product={product} />
        </div>
      </div>
    </div>
  );
}
