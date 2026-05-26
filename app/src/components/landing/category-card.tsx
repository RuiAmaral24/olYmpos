import type { LucideIcon } from "lucide-react";
import { Cinzel, Outfit } from "next/font/google";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  accentClassName?: string;
  tone?: "magenta" | "violet" | "blue";
};

const toneStyles = {
  magenta: {
    line: "bg-[linear-gradient(90deg,#d946ef,#a855f7)] shadow-[0_0_14px_rgba(217,70,239,0.28)]",
    icon: "bg-[linear-gradient(180deg,#d946ef,#8b5cf6)] shadow-[0_18px_38px_rgba(217,70,239,0.2)]",
    glow: "from-[#d946ef]/16 via-transparent to-[#a855f7]/10",
    corner: "bg-[rgba(217,70,239,0.16)]",
  },
  violet: {
    line: "bg-[linear-gradient(90deg,#8b5cf6,#6366f1)] shadow-[0_0_14px_rgba(139,92,246,0.28)]",
    icon: "bg-[linear-gradient(180deg,#8b5cf6,#7c3aed)] shadow-[0_18px_38px_rgba(139,92,246,0.22)]",
    glow: "from-[#8b5cf6]/16 via-transparent to-[#6366f1]/10",
    corner: "bg-[rgba(124,108,255,0.16)]",
  },
  blue: {
    line: "bg-[linear-gradient(90deg,#3b82f6,#2563eb)] shadow-[0_0_14px_rgba(59,130,246,0.28)]",
    icon: "bg-[linear-gradient(180deg,#60a5fa,#2563eb)] shadow-[0_18px_38px_rgba(59,130,246,0.22)]",
    glow: "from-[#3b82f6]/16 via-transparent to-[#2563eb]/10",
    corner: "bg-[rgba(59,130,246,0.16)]",
  },
} as const;

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function CategoryCard({
  title,
  description,
  icon: Icon,
  accentClassName,
  tone = "violet",
}: CategoryCardProps) {
  const styles = toneStyles[tone];

  return (
    <Card className="group relative min-h-[230px] overflow-hidden rounded-[22px] border-white/5 bg-[linear-gradient(135deg,rgba(15,23,41,0.85),rgba(10,10,15,0.72)_52%,rgba(15,23,41,0.85))] px-8 py-10 shadow-[0_28px_80px_rgba(0,0,0,0.38)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/12 sm:min-h-[278px] sm:px-10">
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-[3px] rounded-t-[28px] opacity-80 group-hover:opacity-100",
          accentClassName ?? styles.line,
        )}
      />
      <div className={cn("absolute -inset-1 bg-gradient-to-br opacity-55 blur-2xl transition duration-200 group-hover:opacity-85", styles.glow)} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(168,85,247,0.12),transparent_24%),radial-gradient(circle_at_100%_100%,rgba(124,108,255,0.18),transparent_28%)] opacity-90 transition duration-300 group-hover:opacity-100" />
      <div className={cn("absolute -bottom-16 right-[-34px] h-40 w-40 rounded-tl-full opacity-75 transition duration-500 group-hover:opacity-100 sm:h-48 sm:w-48", styles.corner)} />
      <div className="relative z-10">
        <div className={cn("flex h-16 w-16 items-center justify-center rounded-[0.95rem] text-white", styles.icon)}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className={cn("mt-8 text-[2rem] font-normal leading-none tracking-[-0.03em] text-[#f3efff] sm:text-[2.15rem]", cinzel.className)}>
          {title}
        </h3>
        <p className={cn("mt-5 max-w-sm text-[0.98rem] font-medium leading-7 text-[#c7cceb]", outfit.className)}>
          {description}
        </p>
      </div>
    </Card>
  );
}
