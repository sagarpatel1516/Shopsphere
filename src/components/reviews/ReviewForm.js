"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";

export default function ReviewForm({ productId, onSuccess }) {
  const [rating, setRating] = useState(5);

  const [title, setTitle] = useState("");

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Write your review first");

      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login first");

        return;
      }

      const { error } = await supabase

        .from("reviews")

        .insert({
          product_id: productId,

          user_email: user.email,

          rating,

          title: title.trim(),

          comment: comment.trim(),
        });

      if (error) throw error;

      toast.success("Review submitted successfully");

      setTitle("");

      setComment("");

      setRating(5);

      onSuccess?.();
    } catch (error) {
      console.log(error);

      toast.error(error.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
rounded-3xl
border
bg-white
p-6
shadow-sm
flex
flex-col
"
    >
      <h3
        className="
text-xl
font-bold
mb-6
"
      >
        Write a Review
      </h3>

      <label className="text-sm font-medium mb-2">Rating</label>

      <div
        className="
flex
gap-2
text-3xl
mb-6
"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`${star} star rating`}
            onClick={() => setRating(star)}
          >
            {star <= rating ? "⭐" : "☆"}
          </button>
        ))}
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Review title (optional)"
        className="
rounded-xl
border
p-3
mb-4
"
      />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        rows="6"
        className="
rounded-xl
border
p-3
resize-none
"
      />

      <button
        disabled={loading}
        className="
mt-6
rounded-xl
bg-black
py-3
text-white
font-semibold
disabled:opacity-50
"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
