import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionTitleProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionTitle({
  className,
  eyebrow,
  title,
  description,
  action,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-secondary">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-2">
          <h2 className="text-[1.85rem] font-semibold tracking-[-0.03em] text-foreground sm:text-[2.15rem]">
            {title}
          </h2>
          {description ? (
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {action}
    </div>
  );
}
