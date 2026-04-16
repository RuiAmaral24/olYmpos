import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  accentClassName?: string;
};

export function CategoryCard({
  title,
  description,
  icon: Icon,
  accentClassName,
}: CategoryCardProps) {
  return (
    <Card className="group relative min-h-[248px] overflow-hidden rounded-[26px] border-white/6 bg-[linear-gradient(180deg,rgba(18,23,40,0.9),rgba(9,13,24,0.98))] px-9 py-8 transition duration-300 hover:-translate-y-1 hover:border-white/12">
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-[3px] rounded-t-[28px] bg-[linear-gradient(90deg,rgba(168,85,247,0.95),rgba(124,108,255,0.65))]",
          accentClassName,
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,108,255,0.1),transparent_34%)] opacity-80 transition duration-300 group-hover:opacity-100" />
      <div className="absolute -bottom-8 right-[-20px] h-[6.75rem] w-[6.75rem] rounded-full bg-white/5" />
      <div className="relative z-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(168,85,247,0.96),rgba(124,108,255,0.78))] text-white shadow-[0_16px_36px_rgba(124,108,255,0.18)]">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-8 font-serif text-[2.1rem] leading-none tracking-[-0.03em] text-foreground">
          {title}
        </h3>
        <p className="mt-5 max-w-sm text-[1rem] leading-8 text-[#c6cbdd]">
          {description}
        </p>
      </div>
    </Card>
  );
}
