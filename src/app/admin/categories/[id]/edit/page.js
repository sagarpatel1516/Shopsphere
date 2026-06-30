export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase-server";
import EditCategoryForm from "@/components/admin/EditCategoryForm";

export default async function EditPage({ params }) {
  const supabase = createClient();
  const { id } = await params;

  const { data: category, error } = await supabase

    .from("categories")

    .select("*")

    .eq("id", Number(id))

    .single();

  if (error || !category) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div
          className="
rounded-3xl
border
bg-white
p-10
text-center
"
        >
          <h2 className="text-2xl font-bold">Category not found</h2>

          <p className="mt-2 text-gray-500">The category does not exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1
        className="
mb-8
text-4xl
font-bold
"
      >
        Edit Category
      </h1>

      <div
        className="
rounded-3xl
border
bg-white
p-8
shadow-sm
"
      >
        <EditCategoryForm category={category} />
      </div>
    </main>
  );
}
