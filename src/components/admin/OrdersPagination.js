"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function OrdersPagination() {
  const router = useRouter();

  const params = useSearchParams();

  const page = Number(params.get("page") || 1);

  function changePage(newPage) {
    router.push(`/admin/orders?page=${newPage}`);
  }

  return (
    <div
      className="
flex
justify-center
gap-3
mt-8
"
    >
      <button
        onClick={() => changePage(page - 1)}
        disabled={page === 1}
        className="
border
rounded-lg
px-4
py-2
disabled:opacity-40
"
      >
        Previous
      </button>

      <span
        className="
px-4
py-2
font-semibold
"
      >
        {page}
      </span>

      <button
        onClick={() => changePage(page + 1)}
        className="
border
rounded-lg
px-4
py-2
"
      >
        Next
      </button>
    </div>
  );
}
