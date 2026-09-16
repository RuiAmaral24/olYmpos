import { Award, Calendar, Clock, Film, Tv } from "lucide-react";

import { Card } from "@/components/ui/card";
import { getDetailsTone } from "@/lib/details-tone";
import { cn } from "@/lib/utils";
import type { DetailsMetadataItem } from "@/types";

type DetailsMetadataCardProps = {
  metadata: DetailsMetadataItem[];
};

export function DetailsMetadataCard({ metadata }: DetailsMetadataCardProps) {
  const icons = [Tv, Film, Award, Calendar, Clock];
  const tone = getDetailsTone();

  return (
    <Card className={cn("space-y-5 rounded-2xl p-6", tone.panel)}>
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
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", tone.icon)}>
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
