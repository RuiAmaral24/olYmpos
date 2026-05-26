import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  eyebrow?: string;
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  eyebrow = "Empty State",
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card
      className={cn(
        "border border-white/8 bg-[linear-gradient(180deg,rgba(18,27,43,0.88),rgba(9,14,24,0.96))]",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-accent-secondary">
          {icon ?? <Sparkles className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-xs uppercase tracking-[0.26em] text-accent-secondary">
            {eyebrow}
          </p>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="max-w-2xl text-sm leading-6 text-[#aeb8cf]">
            {description}
          </p>
          {action ? <div className="pt-2">{action}</div> : null}
        </div>
      </div>
    </Card>
  );
}
