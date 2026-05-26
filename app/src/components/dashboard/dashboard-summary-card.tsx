import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

type DashboardSummaryCardProps = {
  label: string;
  value: number;
  icon: ReactNode;
  color: string;
};

export function DashboardSummaryCard({
  label,
  value,
  icon,
  color,
}: DashboardSummaryCardProps) {
  return (
    <Card className="rounded-xl border border-[#2d2454] bg-[linear-gradient(135deg,rgba(17,18,34,0.94),rgba(12,13,25,0.98))] p-4 shadow-[0_16px_48px_rgba(3,7,18,0.3)] transition hover:border-[#8b5cf6]/42">
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
        <span className="editorial-title text-2xl font-normal text-[#d8c9ff]">
          {value}
        </span>
      </div>
    </Card>
  );
}
