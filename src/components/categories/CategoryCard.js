import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="
      group
      overflow-hidden
      rounded-3xl
      border
      bg-white
      shadow-sm
      transition
      duration-300
      hover:-translate-y-2
      hover:shadow-xl
      "
    >
      {/* IMAGE */}

      <div
        className="
        h-48
        overflow-hidden
        bg-gray-100
        "
      >
        <img
          src={category.image_url}
          alt={category.name}
          className="
          h-full
          w-full
          object-cover
          transition
          duration-500
          group-hover:scale-110
          "
        />
      </div>

      {/* CONTENT */}

      <div
        className="
        p-6
        "
      >
        <h3
          className="
          text-xl
          font-bold
          text-gray-900
          "
        >
          {category.name}
        </h3>

        <p
          className="
          mt-2
          line-clamp-2
          text-sm
          text-gray-500
          "
        >
          {category.description}
        </p>

        <div
          className="
          mt-5
          flex
          items-center
          justify-between
          "
        >
          <span
            className="
            text-sm
            font-medium
            text-gray-600
            "
          >
            View Products
          </span>

          <div
            className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-gray-100
            transition
            group-hover:bg-black
            group-hover:text-white
            "
          >
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}
