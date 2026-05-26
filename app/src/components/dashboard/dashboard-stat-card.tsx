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
      card: "border-[#c026d3]/34 bg-[linear-gradient(135deg,rgba(192,38,211,0.14),rgba(55,18,83,0.18),rgba(16,13,28,0.9))] shadow-[0_22px_70px_rgba(88,28,135,0.16)]",
      icon: "bg-[linear-gradient(135deg,#c026d3,#9333ea)] shadow-[0_14px_34px_rgba(192,38,211,0.24)]",
    },
    movie: {
      card: "border-[#8b5cf6]/34 bg-[linear-gradient(135deg,rgba(139,92,246,0.13),rgba(49,32,92,0.18),rgba(15,16,31,0.92))] shadow-[0_22px_70px_rgba(76,29,149,0.14)]",
      icon: "bg-[linear-gradient(135deg,#8b5cf6,#6d5df7)] shadow-[0_14px_34px_rgba(139,92,246,0.24)]",
    },
    game: {
      card: "border-[#3b82f6]/34 bg-[linear-gradient(135deg,rgba(59,130,246,0.13),rgba(30,58,138,0.15),rgba(10,18,36,0.92))] shadow-[0_22px_70px_rgba(29,78,216,0.13)]",
      icon: "bg-[linear-gradient(135deg,#3b82f6,#2563eb)] shadow-[0_14px_34px_rgba(59,130,246,0.22)]",
    },
  }[tone];

  return (
    <Card className={cn("group relative overflow-hidden rounded-2xl p-6", toneStyles.card)}>
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 bg-[#c4b5fd]/[0.05]" />
      </div>
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="mb-3 text-sm font-medium text-[#b8c1ec]">{label}</p>
          <span className="editorial-title bg-[linear-gradient(135deg,#f5f3ff,#d8ceff)] bg-clip-text text-4xl font-normal leading-none text-transparent">
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
