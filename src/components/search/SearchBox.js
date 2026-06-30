"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    const value = query.trim();

    if (!value) return;

    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="
relative
w-full
max-w-md
"
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="
w-full
rounded-xl
border
bg-white
px-5
py-3
pr-20
outline-none
transition
focus:ring-2
focus:ring-black
"
      />

      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="
absolute
right-12
top-1/2
-translate-y-1/2
text-gray-400
hover:text-black
"
        >
          <X size={18} />
        </button>
      )}

      <button
        type="submit"
        className="
absolute
right-3
top-1/2
-translate-y-1/2
text-gray-600
transition
hover:text-black
"
      >
        <Search size={20} />
      </button>
    </form>
  );
}
