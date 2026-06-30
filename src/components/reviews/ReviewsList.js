import { createClient } from "@/lib/supabase-server";

export default async function ReviewsList({ productId }) {
  const supabase = await createClient();

  const { data: reviews = [], error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.log(error);
  }

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <div
          className="
          rounded-3xl
          border
          bg-gray-50
          p-10
          text-center
          text-gray-500
          "
        >
          No reviews yet. Be the first customer to review this product.
        </div>
      ) : (
        reviews.map((review) => (
          <article
            key={review.id}
            className="
            rounded-3xl
            border
            bg-white
            p-7
            shadow-sm
            hover:shadow-md
            transition
            "
          >
            {/* TOP */}

            <div
              className="
              flex
              justify-between
              items-start
              gap-6
              "
            >
              <div>
                <h3
                  className="
                  text-lg
                  font-bold
                  text-gray-900
                  "
                >
                  Customer
                </h3>

                {review.title && (
                  <p
                    className="
                    mt-2
                    font-medium
                    text-gray-700
                    "
                  >
                    {review.title}
                  </p>
                )}
              </div>

              <div
                className="
                rounded-full
                bg-yellow-50
                px-3
                py-1
                text-yellow-500
                text-sm
                whitespace-nowrap
                "
              >
                {"⭐".repeat(Number(review.rating) || 0)}
              </div>
            </div>

            {/* COMMENT */}

            <p
              className="
              mt-5
              text-gray-600
              leading-7
              "
            >
              {review.comment}
            </p>

            {/* FOOTER */}

            <div
              className="
              mt-6
              pt-4
              border-t
              flex
              justify-between
              items-center
              "
            >
              <span
                className="
                text-xs
                text-gray-400
                "
              >
                {new Date(review.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              <span
                className="
                rounded-full
                bg-green-100
                px-3
                py-1
                text-xs
                font-medium
                text-green-700
                "
              >
                Verified Buyer
              </span>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
