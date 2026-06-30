import CategoryCard from "./CategoryCard";

export default function Categories({ categories = [] }) {
  if (!categories.length) {
    return null;
  }

  return (
    <section
      className="
      mx-auto
      max-w-7xl
      px-6
      py-20
      "
    >
      {/* HEADER */}

      <div
        className="
        mb-14
        text-center
        "
      >
        <h2
          className="
          text-3xl
          md:text-4xl
          font-extrabold
          tracking-tight
          text-gray-900
          "
        >
          Shop By Category
        </h2>

        <p
          className="
          mt-3
          text-gray-500
          text-sm
          md:text-base
          "
        >
          Explore our latest electronics collections
        </p>
      </div>

      {/* CATEGORY GRID */}

      <div
        className="
        grid
        gap-6

        sm:grid-cols-2

        md:grid-cols-3

        lg:grid-cols-4

        xl:grid-cols-5
        "
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
