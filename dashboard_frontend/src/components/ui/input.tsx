import React from "react";
import { cn } from "@/lib/cn";

/**
 * PUBLIC_INTERFACE
 * Standard text input.
 */
export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30",
        className,
      )}
      {...props}
    />
  );
}
