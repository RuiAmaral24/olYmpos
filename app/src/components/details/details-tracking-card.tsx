import { Play, Plus, Star, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCategoryTone } from "@/lib/category-tones";
import { getProgressPercent, getStatusLabel, getTrackingDetails } from "@/lib/library";
import { markLibraryItemCompleted } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";
import type { DetailedLibraryItem } from "@/types";

type DetailsTrackingCardProps = {
  item: DetailedLibraryItem;
};

export function DetailsTrackingCard({ item }: DetailsTrackingCardProps) {
  const progressPercent = getProgressPercent(item);
  const completedAction = markLibraryItemCompleted.bind(null, item.id);
  const trackingDetails = getTrackingDetails(item) || "Not started";
  const tone = getCategoryTone(item.category);

  return (
    <Card className={cn("space-y-6 rounded-2xl p-8", tone.panel)}>
      <div className={cn("flex items-center gap-3", tone.text)}>
        <TrendingUp className="h-6 w-6" />
        <h2 className="section-subtitle">Your Tracking</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold text-[#b8c1ec]">Status</p>
          <div className={cn("flex h-12 items-center gap-3 rounded-xl border px-4", tone.badge)}>
            <Play className="h-4 w-4" />
            <span className="font-bold">{getStatusLabel(item.status)}</span>
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-[#b8c1ec]">Your Rating</p>
          <div className={cn("flex h-12 items-center gap-2 rounded-xl border bg-[#15172a]/78 px-4", tone.border)}>
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={index < Math.round(item.userRating / 2) ? "h-5 w-5 fill-[#fbbf24] text-[#fbbf24]" : "h-5 w-5 text-[#4b5563]"}
              />
            ))}
            <span className="editorial-title ml-2 text-xl font-normal leading-none text-[#f0f4ff]">
              {Math.round(item.userRating)}/10
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-[#b8c1ec]">Progress</p>
          <p className={cn("text-right text-sm font-bold", tone.text)}>{trackingDetails}</p>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-[#202038]">
          <div
            className={cn("h-full rounded-full", tone.progress)}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#b8c1ec]">Started: {formatDate(item.createdAt)}</span>
          <span className={cn("font-semibold", tone.text)}>{progressPercent}% Complete</span>
        </div>
      </div>

      <form action={completedAction}>
        <Button
          type="submit"
          variant="secondary"
          className={cn("h-12 w-full rounded-xl bg-transparent px-5 hover:bg-white/6", tone.borderStrong, tone.text)}
          leftIcon={<Plus className="h-4 w-4" />}
        >
          Update Progress
        </Button>
      </form>
    </Card>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
