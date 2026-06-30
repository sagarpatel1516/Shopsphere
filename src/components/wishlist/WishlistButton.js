"use client";

import useWishlistStore from "@/store/wishlistStore";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export default function WishlistButton({ product }) {
  const addItem = useWishlistStore((state) => state.addItem);

  const items = useWishlistStore((state) => state.items);

  function handleWishlist() {
    const exists = items.some((item) => item.id === product.id);

    if (exists) {
      toast.info("Already in wishlist");

      return;
    }

    addItem(product);

    toast.success("Added to wishlist");
  }

  return (
    <button
      onClick={handleWishlist}
      className="
w-full
h-12
rounded-xl
border
font-semibold
text-sm
flex
items-center
justify-center
gap-2
whitespace-nowrap
transition
hover:bg-gray-100
active:scale-95
"
    >
      <Heart size={18} />
      Wishlist
    </button>
  );
}
