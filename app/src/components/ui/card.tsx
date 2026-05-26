import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("premium-panel rounded-[24px] p-5 sm:rounded-[28px] sm:p-7", className)}
      {...props}
    />
  );
}
