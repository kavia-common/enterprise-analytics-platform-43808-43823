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
  name: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await signUp(values);
    router.replace("/dashboards");
  });

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-background)]">
      <section className="card w-full max-w-md p-6">
        <h1 className="text-xl font-semibold">Create account</h1>
        <p className="text-sm text-gray-600 mt-1">
          This is a UI scaffold; backend signup will be wired later.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-xs text-gray-600">Name</label>
            <Input autoComplete="name" {...form.register("name")} />
          </div>

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
              autoComplete="new-password"
              {...form.register("password")}
            />
            {form.formState.errors.password ? (
              <div className="text-xs text-red-600 mt-1">
                {form.formState.errors.password.message}
              </div>
            ) : null}
          </div>

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating…" : "Create account"}
          </Button>
        </form>

        <div className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link className="text-blue-700 hover:underline" href="/auth/login">
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
