import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AuthSideContentProps = {
  badge: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function AuthSideContent({
  badge,
  title,
  description,
  children,
  className,
}: AuthSideContentProps) {
  return (
    <div className={cn("max-w-xl space-y-6 lg:space-y-8", className)}>
      <Badge className="border-white/12 bg-white/8 text-[#cfd7ea]">
        {badge}
      </Badge>
      <div className="space-y-4">
        <h1 className="max-w-md text-[2.8rem] font-semibold tracking-[-0.04em] text-white sm:text-[3.45rem]">
          {title}
        </h1>
        <p className="max-w-lg text-base leading-7 text-[#b6c1d7] sm:text-lg">
          {description}
        </p>
      </div>
      {children ? (
        <div className="flex flex-wrap gap-3 text-sm text-[#d8def0]">
          {children}
        </div>
      ) : null}
    </div>
  );
}
