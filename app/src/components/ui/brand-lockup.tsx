import Link from "next/link";
import { Zap } from "lucide-react";
import { Cinzel } from "next/font/google";

import { cn } from "@/lib/utils";

type BrandLockupProps = {
  href?: string;
  className?: string;
  compact?: boolean;
  editorial?: boolean;
};

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function BrandLockup({
  href = "/",
  className,
  compact = false,
  editorial = false,
}: BrandLockupProps) {
  return (
    <Link
      href={href}
      className={cn("flex items-center text-foreground", editorial ? "gap-2" : "gap-3", className)}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-xl bg-[radial-gradient(circle,rgba(139,92,246,0.95),rgba(124,108,255,0.42))] text-white shadow-[0_0_18px_rgba(124,108,255,0.38)]",
          editorial ? "h-8 w-8 rounded-lg" : compact ? "h-9 w-9" : "h-10 w-10",
        )}
      >
        <Zap className={cn("fill-current", editorial || compact ? "h-4 w-4" : "h-[1.05rem] w-[1.05rem]")} />
      </span>
      <div className="flex flex-col">
        <span
          className={cn(
            "font-serif tracking-[-0.03em] text-[#e7e1fb]",
            editorial ? cn("text-[1.45rem] font-normal leading-none tracking-[-0.045em]", cinzel.className) : compact ? "text-[1.55rem] leading-none" : "text-[2rem] leading-none",
          )}
        >
          olYmpos
        </span>
      </div>
    </Link>
  );
}
