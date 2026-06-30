"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsFilter({ categories = [] }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/products?${params.toString()}`);
  }

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (searchParams.get("search") || "")) {
        updateParam("search", search);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div
      className="
mb-10
grid
gap-4
md:grid-cols-3
"
    >
      {/* SEARCH */}

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search products..."
        className="
rounded-xl
border
px-4
py-3
outline-none
focus:ring-2
focus:ring-black
"
      />

      {/* CATEGORY */}

      <select
        value={searchParams.get("category") || ""}
        onChange={(e) => updateParam("category", e.target.value)}
        className="
rounded-xl
border
px-4
py-3
outline-none
"
      >
        <option value="">All Categories</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* SORT */}

      <select
        value={searchParams.get("sort") || ""}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="
rounded-xl
border
px-4
py-3
outline-none
"
      >
        <option value="">Sort By</option>

        <option value="price-asc">Price Low → High</option>

        <option value="price-desc">Price High → Low</option>
      </select>
    </div>
  );
}
