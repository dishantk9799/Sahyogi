"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/services/api";
import { loginSchema, signupSchema } from "@/validations/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export function AuthForm({ mode }) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const form = useForm({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
    defaultValues: isSignup
      ? { fullName: "", username: "", email: "", password: "" }
      : { email: "", password: "" },
  });
  async function onSubmit(values) {
    try {
      await api.post(isSignup ? "/api/auth/signup" : "/api/auth/login", values);
      toast.success(isSignup ? "Account created" : "Welcome back");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error(isSignup ? "Signup failed" : "Login failed");
    }
  }
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{isSignup ? "Create your writer account" : "Log in to Sahyogi"}</CardTitle>
        <CardDescription>
          {isSignup
            ? "Open a publication workspace in under a minute."
            : "Continue writing, publishing, and managing subscribers."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {isSignup ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="fullName">Name</Label>
                <Input id="fullName" autoComplete="name" {...form.register("fullName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" autoComplete="username" {...form.register("username")} />
              </div>
            </>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              {...form.register("password")}
            />
          </div>
          <Button className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Please wait" : isSignup ? "Create account" : "Log in"}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {isSignup ? "Already writing here?" : "New to Sahyogi?"}{" "}
          <Link
            href={isSignup ? "/login" : "/signup"}
            className="font-medium text-foreground underline"
          >
            {isSignup ? "Log in" : "Create an account"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
