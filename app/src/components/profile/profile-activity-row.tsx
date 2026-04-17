import { Card } from "@/components/ui/card";
import type { LibraryItem } from "@/types";

type ProfileActivityRowProps = {
  item: LibraryItem;
};

export function ProfileActivityRow({ item }: ProfileActivityRowProps) {
  return (
    <Card className="border border-white/8 bg-[linear-gradient(180deg,rgba(18,26,42,0.88),rgba(10,14,24,0.96))] py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.26em] text-accent-secondary">
            {item.category}
          </p>
          <h3 className="text-base font-semibold text-white">{item.title}</h3>
        </div>
        <div className="text-sm text-[#aeb8cf]">
          {item.progressLabel ?? item.status}
        </div>
      </div>
    </Card>
  );
}
