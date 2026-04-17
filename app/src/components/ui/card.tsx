import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("premium-panel rounded-[28px] p-6 sm:p-7", className)}
      {...props}
    />
  );
}
