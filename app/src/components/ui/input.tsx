import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.055)] px-4 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] outline-none placeholder:text-muted-foreground/90 hover:border-white/16 focus:border-white/24 focus:bg-[rgba(255,255,255,0.075)] focus:ring-2 focus:ring-[var(--ring)]",
        className,
      )}
      {...props}
    />
  );
}
