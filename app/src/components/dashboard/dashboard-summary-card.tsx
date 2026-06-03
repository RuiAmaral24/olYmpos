import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashboardSummaryCardProps = {
  label: string;
  value: number;
  icon: ReactNode;
  color: string;
  tone?: "anime" | "movie" | "game";
};

export function DashboardSummaryCard({
  label,
  value,
  icon,
  color,
  tone = "movie",
}: DashboardSummaryCardProps) {
  const borderClassName = {
    anime: "border-[#b72ed2]/55 hover:border-[#b72ed2]/65",
    movie: "border-[#725de9]/55 hover:border-[#725de9]/65",
    game: "border-[#2f7bec]/55 hover:border-[#2f7bec]/65",
  }[tone];

  return (
    <Card className={cn("rounded-xl border bg-[linear-gradient(135deg,rgba(17,18,34,0.94),rgba(12,13,25,0.98))] p-4 shadow-[0_16px_48px_rgba(3,7,18,0.3)] transition", borderClassName)}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {icon}
          </div>
          <p className="font-semibold text-[#f0f4ff]">{label}</p>
        </div>
        <span className="library-summary-number">
          {value}
        </span>
      </div>
    </Card>
  );
}
