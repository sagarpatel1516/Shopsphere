export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";

import { createClient } from "@/lib/supabase-server";

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data: categories = [], error } = await supabase

    .from("categories")

    .select("*")

    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.log(error);
  }

  return (
    <main
      className="
mx-auto
max-w-7xl
px-6
py-12
"
    >
      <section
        className="
mb-12
text-center
"
      >
        <h1
          className="
text-4xl
font-bold
"
        >
          Shop By Category
        </h1>

        <p
          className="
mt-3
text-gray-500
"
        >
          Explore the latest electronics from ShopSphere
        </p>
      </section>

      {categories.length === 0 ? (
        <div
          className="
rounded-3xl
border
bg-white
p-10
text-center
"
        >
          <h2 className="text-2xl font-bold">No Categories Found</h2>

          <p className="mt-2 text-gray-500">Please check back later</p>
        </div>
      ) : (
        <div
          className="
grid
gap-8
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
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
hover:-translate-y-1
hover:shadow-xl
"
            >
              <div
                className="
relative
h-52
w-full
overflow-hidden
"
              >
                <Image
                  src={
                    category.image_url ||
                    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
                  }
                  alt={category.name}
                  fill
                  sizes="300px"
                  className="
object-cover
transition
duration-500
group-hover:scale-105
"
                />
              </div>

              <div className="p-5">
                <h2
                  className="
text-xl
font-bold
"
                >
                  {category.name}
                </h2>

                <p
                  className="
mt-2
line-clamp-2
text-sm
text-gray-500
"
                >
                  {category.description || "Explore products"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
