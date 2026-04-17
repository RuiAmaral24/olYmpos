import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <Card
      className={cn(
        "relative w-full max-w-[500px] overflow-hidden rounded-[2rem] border-white/10 bg-[linear-gradient(180deg,rgba(16,23,37,0.94),rgba(10,15,26,0.98))] p-6 sm:p-8",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(124,108,255,0.16),transparent_58%)]" />
      <div className="relative space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white">
            {title}
          </h2>
          <p className="max-w-sm text-sm leading-6 text-[#9ca8c0]">
            {subtitle}
          </p>
        </div>
        {children}
        {footer ? (
          <div className="border-t border-white/10 pt-6 text-sm text-[#aeb8cf]">
            {footer}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
