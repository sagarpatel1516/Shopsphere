export const dynamic = "force-dynamic";

import Link from "next/link";

import LoginForm from "@/components/auth/LoginForm";
import GoogleLogin from "@/components/auth/GoogleLogin";

export default function LoginPage() {
  return (
    <main
      className="
min-h-screen
flex
items-center
justify-center
bg-gray-50
px-4
py-10
"
    >
      <div
        className="
w-full
max-w-md
rounded-3xl
border
bg-white
p-8
shadow-sm
"
      >
        {/* HEADER */}

        <div className="text-center">
          <h1
            className="
text-3xl
font-bold
"
          >
            Login
          </h1>

          <p
            className="
mt-3
text-gray-500
"
          >
            Welcome back to ShopSphere
          </p>
        </div>

        {/* LOGIN FORM */}

        <div className="mt-8">
          <LoginForm />
        </div>

        {/* DIVIDER */}

        <div
          className="
my-6
flex
items-center
gap-3
"
        >
          <div
            className="
h-px
flex-1
bg-gray-200
"
          />

          <span
            className="
text-sm
text-gray-400
"
          >
            OR
          </span>

          <div
            className="
h-px
flex-1
bg-gray-200
"
          />
        </div>

        {/* GOOGLE LOGIN */}

        <GoogleLogin />

        {/* REGISTER */}

        <p
          className="
mt-6
text-center
text-sm
text-gray-500
"
        >
          Don't have an account?{" "}
          <Link
            href="/register"
            className="
font-semibold
text-black
hover:underline
"
          >
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
}
