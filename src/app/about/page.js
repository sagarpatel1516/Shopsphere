export default function AboutPage() {
  return (
    <main className="bg-gray-50">
      {/* HERO */}

      <section
        className="
        mx-auto
        max-w-7xl
        px-6
        py-20
        text-center
        "
      >
        <h1
          className="
          text-4xl
          md:text-5xl
          font-bold
          text-gray-900
          "
        >
          About ShopSphere
        </h1>

        <p
          className="
          mx-auto
          mt-6
          max-w-3xl
          text-lg
          leading-8
          text-gray-600
          "
        >
          ShopSphere is a modern ecommerce platform built with Next.js and
          Supabase. We bring premium electronics, secure payments and a smooth
          online shopping experience together in one place.
        </p>
      </section>

      {/* FEATURES */}

      <section
        className="
        mx-auto
        grid
        max-w-7xl
        gap-6
        px-6
        pb-20
        md:grid-cols-3
        "
      >
        <div
          className="
          rounded-3xl
          border
          bg-white
          p-8
          shadow-sm
          "
        >
          <div className="text-4xl">🚀</div>

          <h2 className="mt-4 text-xl font-bold">Modern Shopping</h2>

          <p className="mt-3 text-gray-500">
            Fast browsing, smart search and a clean shopping experience.
          </p>
        </div>

        <div
          className="
          rounded-3xl
          border
          bg-white
          p-8
          shadow-sm
          "
        >
          <div className="text-4xl">🔒</div>

          <h2 className="mt-4 text-xl font-bold">Secure Payments</h2>

          <p className="mt-3 text-gray-500">
            Safe checkout with trusted payment solutions.
          </p>
        </div>

        <div
          className="
          rounded-3xl
          border
          bg-white
          p-8
          shadow-sm
          "
        >
          <div className="text-4xl">⭐</div>

          <h2 className="mt-4 text-xl font-bold">Quality Products</h2>

          <p className="mt-3 text-gray-500">
            Carefully selected electronics for modern lifestyles.
          </p>
        </div>
      </section>

      {/* STORY */}

      <section
        className="
        bg-white
        border-t
        "
      >
        <div
          className="
          mx-auto
          max-w-5xl
          px-6
          py-16
          "
        >
          <h2 className="text-3xl font-bold">Our Mission</h2>

          <p
            className="
            mt-5
            text-gray-600
            leading-8
            "
          >
            Our mission is to make online shopping simple, reliable and
            enjoyable. ShopSphere focuses on combining modern technology with
            customer-first ecommerce solutions.
          </p>
        </div>
      </section>
    </main>
  );
}
