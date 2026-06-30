import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-32">
        {/* Badge */}

        <span
          className="
          inline-block
          rounded-full
          bg-white/10
          px-4
          py-2
          text-sm
          backdrop-blur-md
          "
        >
          New Collection 2026
        </span>

        {/* Heading */}

        <h1
          className="
          mt-6
          max-w-3xl
          text-5xl
          font-bold
          leading-tight
          md:text-6xl
          "
        >
          Premium Electronics For Modern Life
        </h1>

        {/* Description */}

        <p
          className="
          mt-6
          max-w-xl
          text-lg
          text-gray-300
          "
        >
          Discover the latest laptops, smartphones, accessories and smart
          devices.
        </p>

        {/* Buttons */}

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/products"
            className="
            group
            rounded-xl
            bg-white
            px-8
            py-4
            font-semibold
            text-black
            shadow-xl
            transition
            duration-300
            hover:-translate-y-1
            hover:scale-105
            hover:bg-gray-100
            "
          >
            <span className="flex items-center gap-2">
              Shop Now
              <span
                className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                "
              >
                →
              </span>
            </span>
          </Link>

          <Link
            href="/categories"
            className="
            rounded-xl
            border
            border-white/40
            bg-white/10
            px-8
            py-4
            font-semibold
            text-white
            backdrop-blur-md
            transition
            duration-300
            hover:-translate-y-1
            hover:scale-105
            hover:bg-white/20
            "
          >
            View Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
