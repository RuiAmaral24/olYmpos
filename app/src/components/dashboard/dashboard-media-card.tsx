import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardTrackedItem } from "@/types";

type DashboardMediaCardProps = {
  item: DashboardTrackedItem;
};

export function DashboardMediaCard({ item }: DashboardMediaCardProps) {
  return (
    <Card className="relative overflow-hidden border border-white/8 p-0">
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-100", item.accent)} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,22,0.18),rgba(8,12,22,0.95))]" />
      <div className="absolute right-5 top-5 h-20 w-16 rounded-[1.25rem] border border-white/8 bg-[rgba(255,255,255,0.05)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" />
      <div className="relative space-y-12 p-6">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[#d3dcf0]">
            {item.category}
          </p>
          <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#dfe6f4]">
            {item.progressLabel}
          </span>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
            {item.title}
          </h3>
          <p className="text-sm leading-6 text-[#b0bdd5]">{item.status}</p>
        </div>
      </div>
    </Card>
  );
}
