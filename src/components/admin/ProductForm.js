"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      setCategories(data || []);
    }

    loadCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !price || !categoryId) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const slug = name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replaceAll(" ", "-");

      const { error } = await supabase.from("products").insert({
        name,
        slug,
        description,
        price: Number(price),
        stock: Number(stock) || 0,
        image_url:
          imageUrl ||
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
        featured,
        category_id: Number(categoryId),
      });

      if (error) throw error;

      toast.success("Product added successfully");

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
      setCategoryId("");
      setFeatured(false);
    } catch (error) {
      toast.error(error.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              placeholder="MacBook Pro M4"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              placeholder="1999"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              placeholder="50"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured product
          </label>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              placeholder="Write product description..."
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Image</label>

            <div className="mt-2 rounded-lg border p-3">
              <ImageUpload onUpload={(url) => setImageUrl(url)} />
            </div>

            {imageUrl && (
              <img
                src={imageUrl}
                className="mt-3 h-36 w-36 rounded-lg border object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black py-2.5 text-sm text-white hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Create Product"}
      </button>
    </form>
  );
}
