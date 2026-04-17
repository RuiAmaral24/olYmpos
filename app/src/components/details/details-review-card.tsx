import { Card } from "@/components/ui/card";

type DetailsReviewCardProps = {
  review: string;
};

export function DetailsReviewCard({ review }: DetailsReviewCardProps) {
  return (
    <Card className="space-y-4 border border-white/8 bg-[linear-gradient(180deg,rgba(18,27,43,0.92),rgba(10,14,24,0.98))]">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-secondary">
          Personal Review
        </p>
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
          Your notes
        </h2>
      </div>
      <p className="max-w-3xl text-sm leading-7 text-[#afbad1] sm:text-base">
        {review}
      </p>
    </Card>
  );
}
