import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
export const metadata = {
  title: "Login",
};
export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-secondary/35 px-4 py-10">
      <Link href="/" className="mx-auto mb-8 flex items-center gap-2 self-start font-semibold">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-sm text-primary-foreground">
          S
        </span>
        Sahyogi
      </Link>
      <div className="mx-auto w-full max-w-md self-center">
        <AuthForm mode="login" />
      </div>
    </main>
  );
}
