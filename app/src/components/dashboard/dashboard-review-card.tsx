import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { DashboardReview } from "@/types";

type DashboardReviewCardProps = {
  review: DashboardReview;
};

export function DashboardReviewCard({ review }: DashboardReviewCardProps) {
  return (
    <Card className="border border-white/8 bg-[linear-gradient(180deg,rgba(20,28,43,0.9),rgba(11,16,27,0.96))]">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-secondary">
            {review.category}
          </p>
          <h3 className="text-lg font-semibold text-white">{review.title}</h3>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-sm text-[#f4d58d]">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span>{review.rating.toFixed(1)}</span>
        </div>
      </div>
      <p className="mt-5 border-t border-white/8 pt-5 text-sm leading-6 text-[#aeb8cf]">
        {review.excerpt}
      </p>
    </Card>
  );
}
