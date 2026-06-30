import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      {/* PAGE TITLE */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Add Category</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create and manage product categories
        </p>
      </div>

      {/* CARD */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <CategoryForm />
      </div>
    </main>
  );
}
