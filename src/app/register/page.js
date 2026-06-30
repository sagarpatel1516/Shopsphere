import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-md p-10">
      <h1 className="mb-8 text-3xl font-bold">Create Account</h1>

      <RegisterForm />
    </main>
  );
}
