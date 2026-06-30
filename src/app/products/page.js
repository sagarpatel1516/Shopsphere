import { createClient } from "@/lib/supabase-server";

import ProductCard from "@/components/products/ProductCard";
import ProductsFilter from "@/components/products/ProductsFilter";

export default async function ProductsPage({ searchParams }) {
  const supabase = await createClient();

  const params = await searchParams;

  const search = params?.search || "";

  const category = params?.category || "";

  const sort = params?.sort || "";

  const { data: products = [] } = await supabase.from("products").select(
    `
      *,
      categories(
        name,
        slug
      )
      `,
  );

  const { data: categories = [] } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  let filteredProducts = [...products];

  // SEARCH

  if (search) {
    const text = search.toLowerCase();

    filteredProducts = filteredProducts.filter((product) =>
      product.name?.toLowerCase().includes(text),
    );
  }

  // CATEGORY

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => String(product.category_id) === String(category),
    );
  }

  // SORT

  if (sort === "price-asc") {
    filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sort === "price-desc") {
    filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }

  return (
    <main
      className="
min-h-screen
bg-gray-50
"
    >
      <div
        className="
max-w-7xl
mx-auto
px-6
py-14
"
      >
        {/* HEADER */}

        <div
          className="
mb-12
"
        >
          <h1
            className="
text-5xl
font-extrabold
tracking-tight
"
          >
            Explore Products
          </h1>

          <p
            className="
mt-4
text-gray-500
text-lg
"
          >
            Discover premium products from our collection
          </p>
        </div>

        {/* FILTER */}

        <section
          className="
bg-white
border
rounded-3xl
p-7
shadow-sm
mb-12
"
        >
          <div
            className="
flex
items-center
justify-between
mb-6
"
          >
            <h2
              className="
text-xl
font-bold
"
            >
              Filters
            </h2>

            <p
              className="
text-sm
text-gray-500
"
            >
              {filteredProducts.length} products found
            </p>
          </div>

          <ProductsFilter categories={categories} />
        </section>

        {/* PRODUCTS */}

        {filteredProducts.length === 0 ? (
          <div
            className="
bg-white
border
rounded-3xl
p-14
text-center
"
          >
            <h2
              className="
text-2xl
font-bold
"
            >
              No Products Found
            </h2>

            <p
              className="
mt-3
text-gray-500
"
            >
              Try different search or filters
            </p>
          </div>
        ) : (
          <section
            className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-10
"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="
transition
hover:-translate-y-1
duration-300
"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
