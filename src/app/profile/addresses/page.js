import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import AddressForm from "@/components/profile/AddressForm";
import AddressCard from "@/components/profile/AddressCard";

export default async function AddressPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: addresses = [] } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10">My Addresses</h1>

      {/* ADD ADDRESS */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Add New Address</h2>

        <AddressForm userId={user.id} />
      </section>

      {/* SAVED ADDRESSES */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Saved Addresses</h2>

        {addresses.length === 0 ? (
          <div className="border rounded-3xl p-10 text-center bg-white shadow-sm">
            <p className="text-gray-500">No addresses saved yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <AddressCard key={address.id} address={address} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
