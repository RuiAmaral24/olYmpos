import { notFound } from "next/navigation";

import { DetailsBreadcrumb } from "@/components/details/details-breadcrumb";
import { DetailsHeroCard } from "@/components/details/details-hero-card";
import { DetailsMetadataCard } from "@/components/details/details-metadata-card";
import { DetailsQuickActions } from "@/components/details/details-quick-actions";
import { DetailsRelatedCard } from "@/components/details/details-related-card";
import { DetailsReviewCard } from "@/components/details/details-review-card";
import { DetailsTrackingCard } from "@/components/details/details-tracking-card";
import { SectionTitle } from "@/components/ui/section-title";
import { getDetailedLibraryItem, mockLibraryItems } from "@/data/mock-library";

type DetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { id } = await params;
  const item = getDetailedLibraryItem(id);

  if (!item) {
    notFound();
  }

  const relatedItems = item.relatedIds
    .map((relatedId) => mockLibraryItems.find((entry) => entry.id === relatedId))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <div className="space-y-8 pb-8">
      <DetailsBreadcrumb category={item.category} title={item.title} />

      <DetailsHeroCard item={item} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <DetailsTrackingCard item={item} />
        <DetailsMetadataCard metadata={item.metadata} />
      </div>

      <DetailsReviewCard review={item.userReview} />

      <section className="space-y-5">
        <SectionTitle
          eyebrow="Related Content"
          title="Similar titles in your universe"
          description="A few nearby picks that fit the same corner of your olYmpos."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {relatedItems.map((relatedItem) => (
            <DetailsRelatedCard key={relatedItem.id} item={relatedItem} />
          ))}
        </div>
      </section>

      <DetailsQuickActions />
    </div>
  );
}
