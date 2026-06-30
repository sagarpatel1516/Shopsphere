export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase-server";

import EditProductForm from "@/components/admin/EditProductForm";

export default async function EditPage({ params }) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: product, error } = await supabase

    .from("products")

    .select("*")

    .eq("id", id)

    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <main
      className="
mx-auto
max-w-4xl
px-6
py-10
"
    >
      <h1
        className="
mb-8
text-4xl
font-bold
"
      >
        Edit Product
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
        <EditProductForm product={product} />
      </div>
    </main>
  );
}
