"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <main
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      px-4
      "
    >
      <div
        className="
        bg-white
        border
        rounded-3xl
        p-10
        text-center
        shadow-sm
        max-w-md
        w-full
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Something went wrong
        </h1>

        <p
          className="
          mt-3
          text-gray-500
          "
        >
          We couldn't complete your request. Please try again.
        </p>

        <div
          className="
          flex
          flex-col
          gap-3
          mt-6
          "
        >
          <button
            onClick={() => reset()}
            className="
            bg-black
            text-white
            px-6
            py-3
            rounded-xl
            hover:opacity-90
            transition
            "
          >
            Try Again
          </button>

          <Link
            href="/"
            className="
            border
            px-6
            py-3
            rounded-xl
            hover:bg-gray-100
            transition
            "
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
