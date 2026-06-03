import { Award, Calendar, Clock, Film, Tv } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { DetailsMetadataItem } from "@/types";

type DetailsMetadataCardProps = {
  metadata: DetailsMetadataItem[];
};

export function DetailsMetadataCard({ metadata }: DetailsMetadataCardProps) {
  const icons = [Tv, Film, Award, Calendar, Clock];

  return (
    <Card className="space-y-5 rounded-2xl border border-[#8b5cf6]/24 bg-[linear-gradient(135deg,rgba(26,26,46,0.62),rgba(22,22,42,0.62))] p-6 shadow-[0_22px_70px_rgba(3,7,18,0.24)]">
      <h2 className="editorial-title text-2xl font-normal text-[#f3f0ff]">
        Details
      </h2>
      <div className="space-y-4">
        {metadata.map((entry, index) => {
          const Icon = icons[index % icons.length];

          return (
          <div
            key={entry.label}
            className="flex items-start gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#8b5cf6]/22 text-[#9a72ff]">
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#b8c1ec]">{entry.label}</p>
              <p className="mt-1 text-sm font-bold text-[#f0f4ff]">{entry.value || "Not set"}</p>
            </div>
          </div>
          );
        })}
      </div>
    </Card>
  );
}
