import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/6 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:tracking-[0.26em]",
        className,
      )}
      {...props}
    />
  );
}
