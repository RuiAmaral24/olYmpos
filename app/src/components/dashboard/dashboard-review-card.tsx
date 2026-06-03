import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { getCategoryLabel } from "@/lib/library";
import type { DashboardReview } from "@/types";

type DashboardReviewCardProps = {
  review: DashboardReview;
};

export function DashboardReviewCard({ review }: DashboardReviewCardProps) {
  const stars = Array.from({ length: 5 }, (_, index) => index < Math.round(review.rating));

  return (
    <Card className="rounded-2xl border border-[#2d2454] bg-[linear-gradient(135deg,rgba(17,18,34,0.94),rgba(12,13,25,0.98))] p-6 shadow-[0_20px_64px_rgba(3,7,18,0.3)] transition hover:border-[#8b5cf6]/42">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <h3 className="text-lg font-semibold text-white">{review.title}</h3>
          <p className="text-sm font-medium text-[#a78bfa]">
            {getCategoryLabel(review.category)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1 pt-1 text-[#fbbf24]">
          {stars.map((filled, index) => (
            <Star
              key={index}
              className={filled ? "h-4 w-4 fill-current" : "h-4 w-4 text-[#4b5563]"}
            />
          ))}
        </div>
      </div>
      <p className="mt-5 text-base leading-7 text-[#c7bee4]">
        {review.excerpt}
      </p>
      <p className="mt-4 text-xs text-[#837296]">{review.dateLabel ?? "Recently added"}</p>
    </Card>
  );
}
