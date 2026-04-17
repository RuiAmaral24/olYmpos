import type { ReactNode } from "react";

import { HeroVisual } from "@/components/landing/hero-visual";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  sideContent: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AuthShell({ sideContent, children, className }: AuthShellProps) {
  return (
    <section
      className={cn(
        "relative flex w-full items-center overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(6,10,18,0.95),rgba(8,12,22,0.9))] shadow-[0_30px_120px_rgba(2,6,18,0.7)]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,108,255,0.2),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(78,161,255,0.14),transparent_22%)]" />
      <HeroVisual className="hidden md:block md:w-[66%] md:opacity-80 lg:w-[70%]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,20,0.92)_0%,rgba(7,11,20,0.78)_34%,rgba(7,11,20,0.54)_55%,rgba(7,11,20,0.76)_100%)] md:bg-[linear-gradient(90deg,rgba(7,11,20,0.96)_0%,rgba(7,11,20,0.84)_32%,rgba(7,11,20,0.28)_62%,rgba(7,11,20,0.78)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(7,11,20,0.28),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(7,11,20,0.86))]" />
      <div className="absolute inset-y-0 right-0 hidden w-px bg-white/8 lg:block" />

      <div className="relative z-10 grid w-full gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,500px)] lg:gap-12 lg:px-12 lg:py-14">
        <div className="flex min-h-full items-center">
          {sideContent}
        </div>
        <div className="flex min-h-full items-center justify-end">
          {children}
        </div>
      </div>
    </section>
  );
}
