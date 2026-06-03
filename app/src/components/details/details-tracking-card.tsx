import { Play, Plus, Star, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProgressPercent, getStatusLabel, getTrackingDetails } from "@/lib/library";
import { markLibraryItemCompleted } from "@/lib/supabase/actions";
import type { DetailedLibraryItem } from "@/types";

type DetailsTrackingCardProps = {
  item: DetailedLibraryItem;
};

export function DetailsTrackingCard({ item }: DetailsTrackingCardProps) {
  const progressPercent = getProgressPercent(item);
  const completedAction = markLibraryItemCompleted.bind(null, item.id);
  const trackingDetails = getTrackingDetails(item) || "Not started";

  return (
    <Card className="space-y-6 rounded-2xl border border-[#8b5cf6]/24 bg-[linear-gradient(135deg,rgba(26,26,46,0.62),rgba(22,22,42,0.62))] p-8 shadow-[0_22px_70px_rgba(3,7,18,0.26)]">
      <div className="flex items-center gap-3 text-[#9a72ff]">
        <TrendingUp className="h-6 w-6" />
        <h2 className="section-subtitle">Your Tracking</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold text-[#b8c1ec]">Status</p>
          <div className="flex h-12 items-center gap-3 rounded-xl border border-[#8b5cf6]/45 bg-[#8b5cf6]/22 px-4 text-[#c4b5fd]">
            <Play className="h-4 w-4" />
            <span className="font-bold">{getStatusLabel(item.status)}</span>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-[#b8c1ec]">Your Rating</p>
          <div className="flex h-12 items-center gap-2 rounded-xl border border-[#8b5cf6]/24 bg-[#1a1a2e]/80 px-4">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={index < Math.round(item.userRating / 2) ? "h-5 w-5 fill-[#fbbf24] text-[#fbbf24]" : "h-5 w-5 text-[#4b5563]"}
              />
            ))}
            <span className="ml-2 font-bold text-[#f0f4ff]">
              {Math.round(item.userRating)}/10
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-[#b8c1ec]">Progress</p>
          <p className="text-sm font-bold text-[#9a72ff]">{trackingDetails}</p>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-[#1a1a2e]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#8b5cf6,#6366f1)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#b8c1ec]">Started: January 15, 2024</span>
          <span className="font-semibold text-[#9a72ff]">{progressPercent}% Complete</span>
        </div>
      </div>

      <form action={completedAction}>
        <Button
          type="submit"
          variant="secondary"
          className="h-12 w-full rounded-xl border-[#f3f0ff] bg-transparent px-5 text-[#c4b5fd] hover:bg-[#8b5cf6]/10"
          leftIcon={<Plus className="h-4 w-4" />}
        >
          Update Progress
        </Button>
      </form>
    </Card>
  );
}
