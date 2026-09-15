import { notFound } from "next/navigation";

import { DetailsBreadcrumb } from "@/components/details/details-breadcrumb";
import { DetailsHeroCard } from "@/components/details/details-hero-card";
import { DetailsMetadataCard } from "@/components/details/details-metadata-card";
import { DetailsQuickActions } from "@/components/details/details-quick-actions";
import { DetailsRelatedCard } from "@/components/details/details-related-card";
import { DetailsReviewCard } from "@/components/details/details-review-card";
import { DetailsTrackingCard } from "@/components/details/details-tracking-card";
import {
  getShowcaseItemById,
  showcaseLibraryItems,
} from "@/data/showcase-library";
import { getCategoryTone } from "@/lib/category-tones";
import { mapDetailedItem } from "@/lib/library-mapper";
import { getCategoryLabel, getDisplayMetadata } from "@/lib/library";
import { getUserLibraryItem } from "@/lib/supabase/library";
import { cn } from "@/lib/utils";
import type { MediaCategory } from "@/types";

type DetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { id } = await params;
  const { item: libraryItem, items } = await getUserLibraryItem(id);

  if (!libraryItem) {
    const showcaseItem = getShowcaseItemById(id);

    if (!showcaseItem) {
      notFound();
    }

    return (
      <DetailsPageContent
        item={showcaseItem}
        items={showcaseLibraryItems}
      />
    );
  }

  const item = mapDetailedItem(libraryItem, items);
  return <DetailsPageContent item={item} items={items} />;
}

function DetailsPageContent({
  item,
  items,
}: {
  item: ReturnType<typeof mapDetailedItem>;
  items: Parameters<typeof mapDetailedItem>[1];
}) {
  const relatedItems = item.relatedIds
    .map((relatedId) => items.find((entry) => entry.id === relatedId))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const similarTitle = `Similar ${getCategoryLabel(item.category)}`;
  const tone = getCategoryTone(item.category);

  return (
    <div className="space-y-8 pb-10">
      <DetailsBreadcrumb category={getCategoryLabel(item.category)} title={item.title} />

      <DetailsHeroCard item={item} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <DetailsTrackingCard item={item} />

          <DetailsReviewCard
            review={item.userReview}
            reviewedAt={item.review?.publishedAt ?? item.review?.updatedAt ?? item.updatedAt}
          />

          <section className="space-y-5">
            <div className={cn("flex items-center gap-3", tone.text)}>
              <span className={cn("inline-flex h-8 w-8 items-center justify-center rounded-lg border text-xs", tone.borderStrong)}>
                i
              </span>
              <h2 className="section-subtitle">{similarTitle}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedItems.length > 0 ? (
                relatedItems.map((relatedItem) => (
                  <DetailsRelatedCard key={relatedItem.id} item={relatedItem} />
                ))
              ) : (
                <div className={cn("premium-panel rounded-2xl p-5 text-sm font-medium leading-7 text-[#b8c1ec] sm:col-span-2", tone.panel)}>
                  Add more {getCategoryLabel(item.category).toLowerCase()} titles to surface similar picks here.
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:col-span-1">
          <DetailsMetadataCard category={item.category} metadata={getDisplayMetadata(item)} />
          <CommunityStats category={item.category} />
          <DetailsQuickActions item={item} />
        </aside>
      </div>
    </div>
  );
}

function CommunityStats({ category }: { category: MediaCategory }) {
  const tone = getCategoryTone(category);
  const stats = [
    { label: category === "game" ? "Playing" : "Watching", value: "1.2M", className: tone.text },
    { label: "Completed", value: "3.8M", className: "text-[#22c55e]" },
    { label: category === "game" ? "Queued" : "Plan to Watch", value: "2.1M", className: "text-[#3b82f6]" },
  ];

  return (
    <section className={cn("premium-panel space-y-5 rounded-2xl p-6", tone.panel)}>
      <h2 className="section-subtitle">Community Stats</h2>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={cn("flex items-center justify-between rounded-xl border bg-[#15172a]/78 p-4", tone.border)}
          >
            <span className="text-sm font-bold text-[#b8c1ec]">{stat.label}</span>
            <span className={cn("editorial-title text-xl font-normal", stat.className)}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
