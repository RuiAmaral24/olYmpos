import { Card } from "@/components/ui/card";

type DashboardStatCardProps = {
  label: string;
  value: number;
  detail: string;
};

export function DashboardStatCard({
  label,
  value,
  detail,
}: DashboardStatCardProps) {
  return (
    <Card className="relative overflow-hidden border border-white/8 bg-[linear-gradient(180deg,rgba(21,30,47,0.92),rgba(12,18,30,0.96))]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(124,108,255,0.7),transparent)]" />
      <p className="text-xs uppercase tracking-[0.22em] text-accent-secondary sm:tracking-[0.28em]">
        {label}
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <span className="text-4xl font-semibold tracking-[-0.05em] text-white">
          {value}
        </span>
        <p className="max-w-[13rem] text-sm leading-6 text-[#97a4be] sm:max-w-[10rem] sm:text-right">
          {detail}
        </p>
      </div>
    </Card>
  );
}
