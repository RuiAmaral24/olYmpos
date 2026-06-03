import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Clock, MessageSquareText, Star } from "lucide-react";

type DetailsReviewCardProps = {
  review: string | null;
};

export function DetailsReviewCard({ review }: DetailsReviewCardProps) {
  if (!review) {
    return (
      <EmptyState
        eyebrow="No Review Yet"
        title="No personal review has been saved"
        description="Add notes from the library edit flow to keep this title's record current."
        icon={<MessageSquareText className="h-5 w-5" />}
      />
    );
  }

  return (
    <Card className="space-y-5 rounded-2xl border border-[#8b5cf6]/24 bg-[linear-gradient(135deg,rgba(26,26,46,0.62),rgba(22,22,42,0.62))] p-8 shadow-[0_22px_70px_rgba(3,7,18,0.24)]">
      <div className="flex items-center gap-3 text-[#9a72ff]">
        <Star className="h-6 w-6" />
        <h2 className="section-subtitle">Your Review</h2>
      </div>
      <div className="rounded-xl border border-[#8b5cf6]/24 bg-[#1a1a2e]/80 p-5">
        <p className="text-base font-medium leading-8 text-[#b8c1ec]">
          {review ?? "No personal review yet. Add notes from the library edit flow to keep this title's record current."}
        </p>
      </div>
      <div className="flex items-center gap-3 text-xs font-semibold text-[#9a72ff]">
        <Clock className="h-4 w-4" />
        <span>Reviewed on March 8, 2024</span>
      </div>
    </Card>
  );
}
