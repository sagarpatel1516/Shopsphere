import { supabase } from "@/lib/supabase-client";

import Hero from "@/components/home/Hero";
import Categories from "@/components/categories/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProductCard from "@/components/products/ProductCard";
import TrustSection from "@/components/home/TrustSection";

export default async function Home() {
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .limit(8);

  const { data: bestSellers } = await supabase
    .from("products")
    .select("*")
    .limit(4);

  return (
    <main className="bg-gray-50 overflow-hidden">
      {/* HERO */}

      <Hero />

      {/* CATEGORY */}

      <section
        className="
      max-w-7xl
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      py-12
      sm:py-16
      "
      >
        <Categories categories={categories || []} />
      </section>

      {/* FEATURED PRODUCTS */}

      <section
        className="
      max-w-7xl
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      py-12
      sm:py-16
      "
      >
        <FeaturedProducts products={featuredProducts || []} />
      </section>

      {/* TRUST */}

      <section
        className="
      max-w-7xl
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      "
      >
        <TrustSection />
      </section>

      {/* BEST SELLERS */}

      <section
        className="
  max-w-7xl
  mx-auto
  px-4
  sm:px-6
  lg:px-8
  py-16
  sm:py-20
  "
      >
        <div
          className="
    flex
    flex-col
    sm:flex-row
    sm:items-end
    sm:justify-between
    gap-4
    mb-10
    "
        >
          <div>
            <h2
              className="
        text-3xl
        sm:text-4xl
        font-bold
        tracking-tight
        "
            >
              Best Sellers
            </h2>

            <p
              className="
        mt-2
        text-gray-500
        "
            >
              Most loved products from our store
            </p>
          </div>

          <button
            className="
      px-5
      py-2.5
      rounded-xl
      bg-black
      text-white
      text-sm
      hover:bg-gray-800
      transition
      "
          >
            View All
          </button>
        </div>

        <div
          className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-6
    "
        >
          {bestSellers?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* WHY SHOP WITH US */}

      <section
        className="
      max-w-7xl
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      py-16
      "
      >
        <div
          className="
        text-center
        mb-12
        "
        >
          <h2
            className="
          text-3xl
          sm:text-4xl
          font-bold
          "
          >
            Why Shop With Us?
          </h2>

          <p
            className="
          mt-3
          text-gray-500
          "
          >
            Premium shopping experience from start to finish
          </p>
        </div>

        <div
          className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        "
        >
          {[
            {
              icon: "🚚",
              title: "Fast Delivery",
              text: "Get your orders delivered quickly and safely.",
            },

            {
              icon: "🔒",
              title: "Secure Payments",
              text: "Industry-standard encryption for safe transactions.",
            },

            {
              icon: "⭐",
              title: "Quality Products",
              text: "Carefully selected products from trusted brands.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
              bg-white
              rounded-3xl
              p-8
              border
              shadow-sm
              hover:shadow-lg
              transition
              "
            >
              <div
                className="
                text-5xl
                "
              >
                {item.icon}
              </div>

              <h3
                className="
                mt-5
                text-xl
                font-semibold
                "
              >
                {item.title}
              </h3>

              <p
                className="
                mt-3
                text-gray-600
                "
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}

      <section
        className="
      px-4
      sm:px-6
      lg:px-8
      py-16
      "
      >
        <div
          className="
        max-w-7xl
        mx-auto
        bg-black
        rounded-3xl
        px-6
        sm:px-12
        py-14
        text-center
        "
        >
          <h2
            className="
          text-3xl
          sm:text-5xl
          font-bold
          text-white
          "
          >
            Stay Updated
          </h2>

          <p
            className="
          mt-4
          max-w-2xl
          mx-auto
          text-gray-300
          "
          >
            Subscribe to receive updates on new arrivals, promotions, and
            exclusive deals.
          </p>

          <form
            className="
          mt-8
          max-w-xl
          mx-auto
          flex
          flex-col
          sm:flex-row
          gap-3
          "
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="
            flex-1
            px-5
            py-4
            rounded-xl
            outline-none
            bg-white
            text-black
            "
            />

            <button
              className="
            px-8
            py-4
            rounded-xl
            bg-white
            text-black
            font-semibold
            hover:bg-gray-200
            transition
            "
            >
              Subscribe
            </button>
          </form>

          <p
            className="
          mt-5
          text-xs
          text-gray-400
          "
          >
            No spam. Only latest products and offers.
          </p>
        </div>
      </section>
    </main>
  );
}
