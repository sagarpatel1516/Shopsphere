"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ShoppingCart, Menu, X, Heart, User } from "lucide-react";

import { supabase } from "@/lib/supabase-client";
import SearchBox from "@/components/search/SearchBox";
import useCartStore from "@/store/cartStore";
import { toast } from "sonner";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setAdmin(data?.role === "admin");
    } else {
      setAdmin(false);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  function active(path) {
    return pathname === path
      ? "text-black font-semibold"
      : "text-gray-500 hover:text-black transition";
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setAdmin(false);

    toast.success("Logged out successfully");
    router.replace("/login");
    router.refresh();
  }

  const userInitial = user?.email?.[0]?.toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-black"
        >
          ShopSphere
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          <Link href="/" className={active("/")}>
            Home
          </Link>
          <Link href="/products" className={active("/products")}>
            Shop
          </Link>
          <Link href="/categories" className={active("/categories")}>
            Categories
          </Link>

          {admin && (
            <Link href="/admin" className="text-red-600 font-semibold">
              Admin
            </Link>
          )}
        </nav>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex items-center gap-6">
          {/* SEARCH */}
          <div className="w-[260px]">
            <SearchBox />
          </div>

          {/* ICON AREA */}
          <div className="flex items-center gap-5">
            {/* WISHLIST */}
            <Link
              href="/wishlist"
              className="
      group
      flex
      items-center
      justify-center
      w-10
      h-10
      "
            >
              <Heart
                size={23}
                strokeWidth={2}
                className="group-hover:scale-110 transition"
              />
            </Link>

            {/* CART */}

            <Link
              href="/cart"
              className="
      relative
      flex
      items-center
      justify-center
      w-10
      h-10
      "
            >
              <ShoppingCart size={23} strokeWidth={2} />

              {cartCount > 0 && (
                <span
                  className="
          absolute
          -top-1
          right-0
          h-[18px]
          min-w-[18px]
          px-1
          rounded-full
          bg-black
          text-white
          text-[10px]
          font-bold
          flex
          items-center
          justify-center
          "
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* PROFILE */}

            {user && (
              <Link
                href="/profile"
                className="
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-full
        bg-gray-900
        text-white
        text-sm
        font-semibold
        "
              >
                {userInitial}
              </Link>
            )}
          </div>

          {/* LOGOUT */}

          {!loading &&
            (user ? (
              <button
                onClick={logout}
                className="
        h-10
        px-5
        rounded-xl
        bg-gray-100
        hover:bg-gray-200
        text-sm
        font-medium
        transition
        "
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="
        h-10
        px-5
        rounded-xl
        bg-gray-900
        text-white
        flex
        items-center
        text-sm
        "
              >
                Login
              </Link>
            ))}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden h-11 w-11 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-5 space-y-4 text-sm">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/products" className="block">
            Shop
          </Link>
          <Link href="/categories" className="block">
            Categories
          </Link>
          <Link href="/wishlist" className="block">
            Wishlist
          </Link>
          <Link href="/cart" className="block">
            Cart ({cartCount})
          </Link>

          {user && (
            <Link href="/profile" className="block">
              Profile
            </Link>
          )}

          {admin && (
            <Link href="/admin" className="block text-red-600">
              Admin
            </Link>
          )}

          {user ? (
            <button className="w-full mt-3 bg-black text-white py-3 rounded-full">
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="block mt-3 bg-black text-white text-center py-3 rounded-full"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
