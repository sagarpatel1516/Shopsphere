"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

export default function EditProductForm({ product }) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [imageUrl, setImageUrl] = useState(product.image_url || "");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(product.category_id || "");
  const [featured, setFeatured] = useState(product.featured || false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      setCategories(data || []);
    }

    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !price || !categoryId) {
      toast.error("Please fill required fields");
      return;
    }

    if (Number(stock) < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("products")
        .update({
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          image_url: imageUrl,
          category_id: Number(categoryId),
          featured,
        })
        .eq("id", product.id);

      if (error) throw error;

      toast.success("Product updated successfully");

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* GRID WRAPPER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NAME */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* PRICE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* STOCK */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {/* CATEGORY */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* DESCRIPTION (FULL WIDTH) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          rows={5}
          className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* IMAGE + FEATURED ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Product Image
          </label>
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
        </div>

        <div className="flex items-start gap-3 pt-7">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="mt-1"
          />
          <label className="text-sm font-medium text-gray-700">
            Featured Product
          </label>
        </div>
      </div>

      {/* SUBMIT */}
      <button
        disabled={loading}
        className="w-full rounded-xl bg-black py-3 font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
}
