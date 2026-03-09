import React from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 border border-blue-700/20",
  secondary:
    "bg-white text-gray-900 hover:bg-gray-50 border border-gray-200",
  ghost: "bg-transparent text-gray-900 hover:bg-gray-100 border border-transparent",
  danger: "bg-red-600 text-white hover:bg-red-700 border border-red-700/20",
};

/**
 * PUBLIC_INTERFACE
 * Basic button component used across the app.
 */
export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
