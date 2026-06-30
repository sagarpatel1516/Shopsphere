"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditCategoryForm({ category }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: category.name || "",

    description: category.description || "",

    image_url: category.image_url || "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  async function update(e) {
    e.preventDefault();

    if (!form.name) {
      toast.error("Category name required");

      return;
    }

    try {
      setLoading(true);

      const slug = form.name

        .toLowerCase()

        .trim()

        .replace(/[^a-z0-9]+/g, "-");

      const { error } = await supabase

        .from("categories")

        .update({
          name: form.name,

          slug,

          description: form.description,

          image_url: form.image_url,
        })

        .eq("id", category.id);

      if (error) {
        throw error;
      }

      toast.success("Category updated successfully");

      router.push("/admin/categories");

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={update}
      className="
rounded-3xl
border
bg-white
p-8
space-y-6
"
    >
      <div>
        <label className="block mb-2 font-semibold">Category Name</label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
p-3
"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Description</label>

        <textarea
          name="description"
          rows="5"
          value={form.description}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
p-3
"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Image URL</label>

        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          className="
w-full
rounded-xl
border
p-3
"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Slug</label>

        <input
          readOnly
          value={form.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")}
          className="
w-full
rounded-xl
border
bg-gray-100
p-3
"
        />
      </div>

      <button
        disabled={loading}
        className="
rounded-xl
bg-black
px-6
py-3
text-white
disabled:opacity-50
"
      >
        {loading ? "Updating..." : "Update Category"}
      </button>
    </form>
  );
}
