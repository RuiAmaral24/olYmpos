import { notFound } from "next/navigation";

import { DetailsBreadcrumb } from "@/components/details/details-breadcrumb";
import { DetailsHeroCard } from "@/components/details/details-hero-card";
import { DetailsMetadataCard } from "@/components/details/details-metadata-card";
import { DetailsQuickActions } from "@/components/details/details-quick-actions";
import { DetailsRelatedCard } from "@/components/details/details-related-card";
import { DetailsReviewCard } from "@/components/details/details-review-card";
import { DetailsTrackingCard } from "@/components/details/details-tracking-card";
import { mapDetailedItem } from "@/lib/library-mapper";
import { getCategoryLabel, getDisplayMetadata } from "@/lib/library";
import { getUserLibraryItem } from "@/lib/supabase/library";

type DetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { id } = await params;
  const { item: libraryItem, items } = await getUserLibraryItem(id);

  if (!libraryItem) {
    notFound();
  }

  const item = mapDetailedItem(libraryItem, items);
  const relatedItems = item.relatedIds
    .map((relatedId) => items.find((entry) => entry.id === relatedId))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const similarTitle = `Similar ${getCategoryLabel(item.category)}`;

  return (
    <div className="space-y-8 pb-10">
      <DetailsBreadcrumb category={getCategoryLabel(item.category)} title={item.title} />

      <DetailsHeroCard item={item} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_480px]">
        <div className="space-y-8">
          <DetailsTrackingCard item={item} />

          <DetailsReviewCard review={item.userReview} />

          <section className="space-y-5">
            <div className="flex items-center gap-3 text-[#9a72ff]">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#9a72ff] text-xs">i</span>
              <h2 className="section-subtitle">{similarTitle}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedItems.length > 0 ? (
                relatedItems.map((relatedItem) => (
                  <DetailsRelatedCard key={relatedItem.id} item={relatedItem} />
                ))
              ) : (
                <div className="rounded-xl border border-[#8b5cf6]/24 bg-[linear-gradient(135deg,rgba(26,26,46,0.62),rgba(22,22,42,0.62))] p-5 text-sm font-medium leading-7 text-[#b8c1ec] sm:col-span-2">
                  Add more {getCategoryLabel(item.category).toLowerCase()} titles to surface similar picks here.
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <DetailsMetadataCard metadata={getDisplayMetadata(item)} />
          <CommunityStats />
          <DetailsQuickActions item={item} />
        </aside>
      </div>
    </div>
  );
}

function CommunityStats() {
  const stats = [
    { label: "Watching", value: "1.2M", className: "text-[#9a72ff]" },
    { label: "Completed", value: "3.8M", className: "text-[#22c55e]" },
    { label: "Plan to Watch", value: "2.1M", className: "text-[#3b82f6]" },
  ];

  return (
    <section className="space-y-5 rounded-2xl border border-[#8b5cf6]/24 bg-[linear-gradient(135deg,rgba(26,26,46,0.62),rgba(22,22,42,0.62))] p-6 shadow-[0_22px_70px_rgba(3,7,18,0.24)]">
      <h2 className="section-subtitle">Community Stats</h2>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between rounded-xl border border-[#8b5cf6]/24 bg-[#1a1a2e]/80 p-4"
          >
            <span className="text-sm font-bold text-[#b8c1ec]">{stat.label}</span>
            <span className={`editorial-title text-2xl font-bold ${stat.className}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
