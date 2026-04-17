import { Card } from "@/components/ui/card";
import type { DetailsMetadataItem } from "@/types";

type DetailsMetadataCardProps = {
  metadata: DetailsMetadataItem[];
};

export function DetailsMetadataCard({ metadata }: DetailsMetadataCardProps) {
  return (
    <Card className="space-y-5 border border-white/8 bg-[linear-gradient(180deg,rgba(18,27,43,0.92),rgba(10,14,24,0.98))]">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-secondary">
          Metadata
        </p>
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
          Item details
        </h2>
      </div>
      <div className="space-y-4">
        {metadata.map((entry) => (
          <div
            key={entry.label}
            className="flex items-center justify-between gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
          >
            <span className="text-sm text-[#95a4bf]">{entry.label}</span>
            <span className="text-sm font-medium text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
