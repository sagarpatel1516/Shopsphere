import { createClient } from "@/lib/supabase-server";
import ProductCard from "@/components/products/ProductCard";

export default async function SearchPage({ searchParams }) {
  const supabase = await createClient();

  const q = (searchParams?.q || "").trim();

  let products = [];

  if (q) {
    const { data } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${q}%`);

    products = data || [];
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {q ? `Search results for "${q}"` : "Search products"}
        </h1>

        {!q ? (
          <div className="bg-white rounded-3xl p-10 text-center text-gray-500">
            Please enter a search term
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center">
            No products found
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
