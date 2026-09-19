import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Film, Gamepad2, LockKeyhole, Star, Tv } from "lucide-react";
import { notFound } from "next/navigation";

import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { ReviewThread } from "@/components/reviews/review-thread";
import { Card } from "@/components/ui/card";
import { getCategoryLabel } from "@/lib/library";
import { getReviewById, getReviewReplies } from "@/lib/supabase/reviews";
import type { MediaCategory } from "@/types";

type ReviewPageProps = { params: Promise<{ reviewId: string }> };

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { reviewId } = await params;
  const [review, replies] = await Promise.all([
    getReviewById(reviewId),
    getReviewReplies(reviewId),
  ]);

  if (!review) notFound();
  const authorName = review.author.displayName?.trim() || review.author.username;

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-14">
      {!review.publishedAt ? (
        <div className="flex items-center gap-2 rounded-xl border border-amber-300/20 bg-amber-400/8 px-4 py-3 text-sm text-amber-100">
          <LockKeyhole className="h-4 w-4" /> This review is unpublished and visible only to you.
        </div>
      ) : null}

      <section className="grid gap-7 border-b border-white/8 pb-8 sm:grid-cols-[140px_minmax(0,1fr)]">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-white/10 bg-[#111222]">
          {review.mediaCoverUrl ? <Image src={review.mediaCoverUrl} alt={`${review.mediaTitle} cover`} fill sizes="140px" className="object-cover" unoptimized /> : <div className="flex h-full items-center justify-center text-[#8b5cf6]">{renderCategoryIcon(review.mediaCategory, "h-10 w-10")}</div>}
        </div>
        <div className="flex min-w-0 flex-col justify-center">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#a78bfa]">{renderCategoryIcon(review.mediaCategory, "h-4 w-4")} {getCategoryLabel(review.mediaCategory)}{review.mediaYear ? ` · ${review.mediaYear}` : ""}</div>
          <h1 className="editorial-title mt-3 text-5xl font-normal leading-none text-white sm:text-6xl">{review.mediaTitle}</h1>
          {review.rating !== null ? <div className="mt-5 flex items-center gap-2 text-[#fbbf24]"><Star className="h-5 w-5 fill-current" /><span className="font-semibold">{review.rating} / 5</span></div> : null}
          <div className="mt-6 flex items-center gap-3">
            <ProfileAvatar avatarUrl={review.author.avatarUrl} displayName={authorName} size="sm" />
            <div><Link href={`/users/${review.author.username}`} className="font-semibold text-white hover:text-[#c4b5fd]">{authorName}</Link><p className="text-sm text-[#8f98ad]">@{review.author.username}</p></div>
          </div>
        </div>
      </section>

      <Card className="space-y-5 rounded-2xl border border-[#8b5cf6]/20 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4"><h2 className="section-subtitle">Review</h2><span className="flex items-center gap-2 text-xs text-[#858da4]"><CalendarDays className="h-4 w-4" />{formatDate(review.publishedAt ?? review.updatedAt)}</span></div>
        <p className="whitespace-pre-wrap text-base leading-8 text-[#c7cede]">{review.content}</p>
      </Card>

      <ReviewThread reviewId={review.id} replies={replies} />
    </div>
  );
}

function renderCategoryIcon(category: MediaCategory, className: string) {
  if (category === "movie") return <Film className={className} />;
  if (category === "game") return <Gamepad2 className={className} />;
  return <Tv className={className} />;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value));
}
