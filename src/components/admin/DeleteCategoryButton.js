"use client";

import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteCategoryButton({ id }) {
  const router = useRouter();

  async function remove() {
    if (!confirm("Delete category?")) return;

    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Category deleted successfully");

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete category");
    }
  }

  return (
    <button
      onClick={remove}
      className="
      rounded-lg
      bg-red-600
      px-4
      py-2
      text-white
      transition
      hover:bg-red-700
      "
    >
      Delete
    </button>
  );
}
