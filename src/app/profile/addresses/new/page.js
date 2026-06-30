import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import AddressForm from "@/components/profile/AddressForm";

export default async function NewAddressPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">Add New Address</h1>

      <AddressForm userId={user.id} />
    </main>
  );
}
