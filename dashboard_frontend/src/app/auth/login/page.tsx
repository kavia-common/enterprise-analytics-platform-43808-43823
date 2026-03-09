"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/auth-context";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await signIn(values);
    router.replace("/dashboards");
  });

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-background)]">
      <section className="card w-full max-w-md p-6">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <p className="text-sm text-gray-600 mt-1">
          Use an email containing <span className="font-mono">admin</span> to
          simulate admin access.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-xs text-gray-600">Email</label>
            <Input
              type="email"
              autoComplete="email"
              {...form.register("email")}
            />
            {form.formState.errors.email ? (
              <div className="text-xs text-red-600 mt-1">
                {form.formState.errors.email.message}
              </div>
            ) : null}
          </div>

          <div>
            <label className="text-xs text-gray-600">Password</label>
            <Input
              type="password"
              autoComplete="current-password"
              {...form.register("password")}
            />
            {form.formState.errors.password ? (
              <div className="text-xs text-red-600 mt-1">
                {form.formState.errors.password.message}
              </div>
            ) : null}
          </div>

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <div className="text-sm text-gray-600 mt-4">
          No account?{" "}
          <Link className="text-blue-700 hover:underline" href="/auth/signup">
            Create one
          </Link>
        </div>
      </section>
    </main>
  );
}
