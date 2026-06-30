export const dynamic = "force-dynamic";

import Link from "next/link";

import Image from "next/image";

import { createClient } from "@/lib/supabase-server";

import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const { data: products = [], error } = await supabase

    .from("products")

    .select("*")

    .order("id");

  if (error) {
    return (
      <main
        className="
mx-auto
max-w-7xl
px-6
py-10
"
      >
        <div
          className="
rounded-3xl
border
bg-white
p-10
text-center
text-red-600
font-semibold
"
        >
          Failed loading products
        </div>
      </main>
    );
  }

  return (
    <main
      className="
mx-auto
max-w-7xl
px-6
py-10
"
    >
      {/* HEADER */}

      <div
        className="
mb-8
flex
flex-col
gap-5
sm:flex-row
sm:items-center
sm:justify-between
"
      >
        <div>
          <h1
            className="
text-4xl
font-bold
"
          >
            Products
          </h1>

          <p
            className="
mt-2
text-gray-500
"
          >
            Manage your store products
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="
rounded-xl
bg-black
px-5
py-3
font-semibold
text-white
hover:bg-gray-800
transition
"
        >
          Add Product
        </Link>
      </div>

      {/* TABLE */}

      <div
        className="
overflow-hidden
rounded-3xl
border
bg-white
shadow-sm
"
      >
        {products.length === 0 ? (
          <div
            className="
p-10
text-center
text-gray-500
"
          >
            No products found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table
              className="
w-full
min-w-[800px]
"
            >
              <thead
                className="
bg-gray-100
"
              >
                <tr>
                  <th className="p-5 text-left">Product</th>

                  <th className="p-5 text-left">Price</th>

                  <th className="p-5 text-left">Stock</th>

                  <th className="p-5 text-left">Featured</th>

                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="
border-t
hover:bg-gray-50
transition
"
                  >
                    <td className="p-5">
                      <div
                        className="
flex
items-center
gap-4
"
                      >
                        <div
                          className="
relative
h-14
w-14
overflow-hidden
rounded-xl
"
                        >
                          <Image
                            src={
                              product.image_url ||
                              "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
                            }
                            alt={product.name}
                            fill
                            sizes="60px"
                            className="
object-cover
"
                          />
                        </div>

                        <div>
                          <p
                            className="
font-semibold
"
                          >
                            {product.name}
                          </p>

                          <p
                            className="
text-sm
text-gray-500
"
                          >
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td
                      className="
p-5
font-semibold
"
                    >
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </td>

                    <td className="p-5">
                      {product.stock > 0 ? (
                        <span>{product.stock}</span>
                      ) : (
                        <span
                          className="
text-red-500
font-semibold
"
                        >
                          Out
                        </span>
                      )}
                    </td>

                    <td className="p-5">
                      {product.featured ? (
                        <span
                          className="
rounded-full
bg-green-100
px-3
py-1
text-sm
text-green-700
"
                        >
                          Yes
                        </span>
                      ) : (
                        <span
                          className="
rounded-full
bg-gray-100
px-3
py-1
text-sm
"
                        >
                          No
                        </span>
                      )}
                    </td>

                    <td className="p-5">
                      <div
                        className="
flex
justify-center
gap-3
"
                      >
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="
rounded-lg
bg-blue-600
px-4
py-2
text-sm
text-white
hover:bg-blue-700
"
                        >
                          Edit
                        </Link>

                        <DeleteProductButton id={product.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
