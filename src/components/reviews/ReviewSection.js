"use client";

import { useRouter } from "next/navigation";

import ReviewForm from "./ReviewForm";

export default function ReviewSection({ productId, reviews }) {
  const router = useRouter();

  const hasReviews = Array.isArray(reviews) && reviews.length > 0;

  return (
    <section className="mt-20">
      <div className="mb-10">
        <h2
          className="
          text-3xl
          font-bold
          text-gray-900
          "
        >
          Customer Reviews
        </h2>

        <p className="mt-2 text-gray-500">
          Share your experience and read what others say.
        </p>
      </div>

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-12
        items-start
        "
      >
        {/* LEFT */}

        <ReviewForm productId={productId} onSuccess={() => router.refresh()} />

        {/* RIGHT */}

        <div
          className="
          max-h-[600px]
          overflow-y-auto
          pr-3
          "
        >
          {hasReviews ? (
            reviews
          ) : (
            <div
              className="
              rounded-3xl
              border
              bg-gray-50
              p-10
              text-center
              "
            >
              <div className="text-5xl mb-4">⭐</div>

              <h3
                className="
                text-xl
                font-bold
                text-gray-800
                "
              >
                No reviews yet
              </h3>

              <p
                className="
                mt-3
                text-gray-500
                "
              >
                Be the first customer to review this product.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
