export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase-client";

import Link from "next/link";

import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  const { data: categories = [], error } = await supabase

    .from("categories")

    .select("*")

    .order("id");

  if (error) {
    return <p className="p-10 text-red-500">Error loading categories</p>;
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
      <div
        className="
mb-8
flex
items-center
justify-between
"
      >
        <h1
          className="
text-4xl
font-bold
"
        >
          Categories
        </h1>

        <Link
          href="/admin/categories/new"
          className="
rounded-xl
bg-black
px-5
py-3
font-semibold
text-white
hover:bg-gray-800
"
        >
          Add Category
        </Link>
      </div>

      <div
        className="
rounded-3xl
border
bg-white
shadow-sm
overflow-hidden
"
      >
        {categories.length === 0 ? (
          <div
            className="
p-10
text-center
text-gray-500
"
          >
            No categories found
          </div>
        ) : (
          <div
            className="
overflow-x-auto
"
          >
            <table
              className="
w-full
min-w-[700px]
"
            >
              <thead
                className="
bg-gray-100
"
              >
                <tr>
                  <th className="p-4 text-left">ID</th>

                  <th className="p-4 text-left">Name</th>

                  <th className="p-4 text-left">Slug</th>

                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="
border-t
hover:bg-gray-50
transition
"
                  >
                    <td className="p-4">{category.id}</td>

                    <td
                      className="
p-4
font-semibold
"
                    >
                      {category.name}
                    </td>

                    <td
                      className="
p-4
text-gray-500
"
                    >
                      {category.slug}
                    </td>

                    <td
                      className="
p-4
flex
gap-3
"
                    >
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="
rounded-lg
bg-blue-600
px-4
py-2
text-white
"
                      >
                        Edit
                      </Link>

                      <DeleteCategoryButton id={category.id} />
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
