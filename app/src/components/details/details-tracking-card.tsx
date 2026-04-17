import { RefreshCcw, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DetailedLibraryItem } from "@/types";

type DetailsTrackingCardProps = {
  item: DetailedLibraryItem;
};

export function DetailsTrackingCard({ item }: DetailsTrackingCardProps) {
  return (
    <Card className="space-y-6 border border-white/8 bg-[linear-gradient(180deg,rgba(19,28,44,0.92),rgba(9,14,24,0.98))]">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-secondary">
          Your Tracking
        </p>
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
          Keep your universe in motion
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[#92a2be]">Current Status</p>
          <p className="mt-3 text-lg font-semibold text-white">{item.status}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[#92a2be]">User Rating</p>
          <div className="mt-3 flex items-center gap-2 text-lg font-semibold text-white">
            <Star className="h-4 w-4 fill-current text-[#f4d58d]" />
            <span>{item.userRating.toFixed(1)}</span>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[#92a2be]">Progress Details</p>
          <p className="mt-3 text-lg font-semibold text-white">{item.trackingDetails}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-[#d7def0]">Progress</span>
          <span className="text-[#9aabc5]">{item.progressPercent}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-secondary))]"
            style={{ width: `${item.progressPercent}%` }}
          />
        </div>
      </div>

      <Button variant="secondary" className="h-12 rounded-2xl px-5 sm:w-fit" leftIcon={<RefreshCcw className="h-4 w-4" />}>
        Update Progress
      </Button>
    </Card>
  );
}
