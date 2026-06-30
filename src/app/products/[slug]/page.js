import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase-server";

import ProductDetails from "@/components/products/ProductDetails";

import ReviewSection from "@/components/reviews/ReviewSection";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("name,description")
    .eq("slug", slug)
    .maybeSingle();

  if (!product) {
    return {
      title: "Product Not Found | ShopSphere",
    };
  }

  return {
    title: `${product.name} | ShopSphere`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const supabase = await createClient();

  // PRODUCT
  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories(
        name,
        slug
      )
    `,
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error || !product) {
    notFound();
  }

  // REVIEWS
  const { data: reviews = [] } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", product.id)
    .order("created_at", {
      ascending: false,
    });

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* PRODUCT */}

        <ProductDetails product={product} />

        {/* REVIEWS */}

        <ReviewSection
          productId={product.id}
          reviews={reviews.map((review) => (
            <div
              key={review.id}
              className="
              rounded-3xl
              border
              bg-white
              p-6
              shadow-sm
              "
            >
              <div className="flex justify-between">
                <h3 className="font-bold">Customer</h3>

                <div className="text-yellow-500">
                  {"⭐".repeat(Number(review.rating))}
                </div>
              </div>

              {review.title && (
                <p className="mt-3 font-medium">{review.title}</p>
              )}

              <p className="mt-4 text-gray-600">{review.comment}</p>
            </div>
          ))}
        />
      </div>
    </main>
  );
}
