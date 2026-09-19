import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Clock, MessageSquareText, Star } from "lucide-react";
import { PublicReviewControls } from "@/components/reviews/public-review-controls";
import type { PublicReviewState } from "@/types";

type DetailsReviewCardProps = {
  review: string | null;
  reviewedAt: string;
  libraryItemId?: string;
  publicReview?: PublicReviewState | null;
  allowPublication?: boolean;
};

export function DetailsReviewCard({ review, reviewedAt, libraryItemId, publicReview = null, allowPublication = false }: DetailsReviewCardProps) {
  if (!review) {
    return (
      <div className="space-y-4">
        <EmptyState
          eyebrow="No Review Yet"
          title="No personal review has been saved"
          description="Add notes from the library edit flow to keep this title's record current."
          icon={<MessageSquareText className="h-5 w-5" />}
        />
        {libraryItemId && allowPublication && publicReview ? (
          <PublicReviewControls libraryItemId={libraryItemId} privateNote="" savedPrivateNote="" initialReview={publicReview} />
        ) : null}
      </div>
    );
  }

  return (
    <Card className="space-y-5 rounded-2xl border border-[#8b5cf6]/24 p-8 shadow-[0_22px_70px_rgba(3,7,18,0.18)]">
      <div className="flex items-center gap-3 text-[#9a72ff]">
        <Star className="h-6 w-6" />
        <h2 className="section-subtitle">Your Review</h2>
      </div>
      <div className="rounded-xl border border-[#8b5cf6]/24 bg-[#15172a]/78 p-5">
        <p className="text-base font-medium leading-8 text-[#b8c1ec]">
          {review ?? "No personal review yet. Add notes from the library edit flow to keep this title's record current."}
        </p>
      </div>
      <div className="flex items-center gap-3 text-xs font-semibold text-[#9a72ff]">
        <Clock className="h-4 w-4" />
        <span>Reviewed on {formatDate(reviewedAt)}</span>
      </div>
      {libraryItemId && allowPublication ? (
        <PublicReviewControls libraryItemId={libraryItemId} privateNote={review} savedPrivateNote={review} initialReview={publicReview} />
      ) : null}
    </Card>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "an unknown date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
