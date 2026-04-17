import { cn } from "@/lib/utils";

type ProfileProgressRowProps = {
  label: string;
  value: number;
  total: number;
  accentClassName: string;
};

export function ProfileProgressRow({
  label,
  value,
  total,
  accentClassName,
}: ProfileProgressRowProps) {
  const width = total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-[#d6def0]">{label}</span>
        <span className="text-[#96a4bf]">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r", accentClassName)}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
