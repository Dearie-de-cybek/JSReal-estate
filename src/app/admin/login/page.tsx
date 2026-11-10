import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Monogram } from "@/components/brand";
import { LoginForm } from "./form";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default async function Login() {
  if (await getSession()) redirect("/admin");
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="on-dark hidden flex-col justify-between bg-ink p-12 text-ivory lg:flex">
        <Monogram size={56} />
        <p className="display h-lg">The desk where <em>the journal is kept.</em></p>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <p className="eyebrow">Jorbe Samuel · Admin</p>
          <h1 className="display h-md mt-4">Sign in</h1>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
