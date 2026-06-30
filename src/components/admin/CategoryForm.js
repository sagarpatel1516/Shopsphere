"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function CategoryForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image_url: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const slug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

    const { error } = await supabase.from("categories").insert({
      name: form.name,
      slug,
      description: form.description,
      image_url: form.image_url,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* NAME */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm
                     outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          placeholder="Enter category name"
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm
                     outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          placeholder="Enter category description"
        />
      </div>

      {/* IMAGE URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm
                     outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          placeholder="Paste image URL"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white
                   hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Category"}
      </button>
    </form>
  );
}
