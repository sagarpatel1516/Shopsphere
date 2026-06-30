"use client";

import { supabase } from "@/lib/supabase-client";

export default function ImageUpload({ onUpload }) {
  async function handleChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      return;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    onUpload(data.publicUrl);
  }

  return <input type="file" accept="image/*" onChange={handleChange} />;
}
