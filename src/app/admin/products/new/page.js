export const dynamic = "force-dynamic";

import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create a new product for your store
          </p>
        </div>

        <Link
          href="/admin/products"
          className="rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          Back
        </Link>
      </div>

      {/* FORM WRAPPER (SAME STYLE AS YOUR PROJECT CARDS) */}
      <div className="rounded-xl border bg-white p-6">
        <ProductForm />
      </div>
    </main>
  );
}
