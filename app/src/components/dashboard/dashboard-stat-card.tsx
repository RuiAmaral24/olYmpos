import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashboardStatCardProps = {
  label: string;
  value: number;
  detail?: string;
  icon?: ReactNode;
  tone?: "anime" | "movie" | "game";
};

export function DashboardStatCard({
  label,
  value,
  detail,
  icon,
  tone = "movie",
}: DashboardStatCardProps) {
  const toneStyles = {
    anime: {
      card: "border-[#b72ed2]/72 bg-[linear-gradient(135deg,rgba(192,38,211,0.18),rgba(55,18,83,0.18),rgba(16,13,28,0.94))] shadow-[inset_0_0_0_1px_rgba(217,70,239,0.08),0_28px_90px_rgba(192,38,211,0.12)]",
      icon: "bg-[linear-gradient(135deg,#c026d3,#9333ea)] shadow-[0_16px_42px_rgba(192,38,211,0.34)]",
      glow: "from-[#c026d3]/16",
    },
    movie: {
      card: "border-[#725de9]/72 bg-[linear-gradient(135deg,rgba(139,92,246,0.16),rgba(49,32,92,0.18),rgba(15,16,31,0.94))] shadow-[inset_0_0_0_1px_rgba(139,92,246,0.08),0_28px_90px_rgba(139,92,246,0.11)]",
      icon: "bg-[linear-gradient(135deg,#8b5cf6,#6d5df7)] shadow-[0_16px_42px_rgba(139,92,246,0.32)]",
      glow: "from-[#8b5cf6]/16",
    },
    game: {
      card: "border-[#2f7bec]/72 bg-[linear-gradient(135deg,rgba(59,130,246,0.16),rgba(30,58,138,0.16),rgba(10,18,36,0.94))] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.08),0_28px_90px_rgba(59,130,246,0.1)]",
      icon: "bg-[linear-gradient(135deg,#3b82f6,#2563eb)] shadow-[0_16px_42px_rgba(59,130,246,0.3)]",
      glow: "from-[#3b82f6]/16",
    },
  }[tone];

  return (
    <Card className={cn("group relative overflow-hidden rounded-2xl p-6", toneStyles.card)}>
      <div className="absolute inset-0 opacity-80 transition group-hover:opacity-100">
        <div className={cn("absolute inset-0 bg-gradient-to-br to-transparent", toneStyles.glow)} />
        <div className="absolute -right-14 -top-16 h-40 w-40 rounded-full bg-white/[0.04] blur-2xl" />
      </div>
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="mb-3 text-sm font-medium text-[#b8c1ec]">{label}</p>
          <span className="stat-number block h-10">
            {value}
          </span>
        </div>
        {icon ? (
          <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white shadow-lg", toneStyles.icon)}>
            {icon}
          </div>
        ) : detail ? (
          <p className="max-w-[12rem] text-right text-sm leading-6 text-[#97a4be]">
            {detail}
          </p>
        ) : null}
      </div>
    </Card>
  );
}
