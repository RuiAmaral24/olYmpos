import { Card } from "@/components/ui/card";

type DashboardSummaryCardProps = {
  label: string;
  value: number;
  hint: string;
};

export function DashboardSummaryCard({
  label,
  value,
  hint,
}: DashboardSummaryCardProps) {
  return (
    <Card className="border border-white/8 bg-[linear-gradient(180deg,rgba(19,27,43,0.9),rgba(10,14,24,0.96))]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#d7def1]">{label}</p>
          <p className="mt-1 text-sm text-[#91a0bb]">{hint}</p>
        </div>
        <span className="text-2xl font-semibold tracking-[-0.04em] text-white">
          {value}
        </span>
      </div>
    </Card>
  );
}
