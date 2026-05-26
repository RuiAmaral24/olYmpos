import type { ReactNode } from "react";

import { Clock, Film, Gamepad2, Star, TrendingUp, Tv } from "lucide-react";
import Link from "next/link";

import { DashboardActionCard } from "@/components/dashboard/dashboard-action-card";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { DashboardMediaCard } from "@/components/dashboard/dashboard-media-card";
import { DashboardReviewCard } from "@/components/dashboard/dashboard-review-card";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardSummaryCard } from "@/components/dashboard/dashboard-summary-card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getDashboardArtwork,
  toDashboardReview,
  toDashboardTrackedItem,
} from "@/lib/library-mapper";
import { getCategoryCounts, getCategoryLabel } from "@/lib/library";
import { getUserLibraryItems } from "@/lib/supabase/library";
import type { DashboardTrackedItem, LibraryItem } from "@/types";

export default async function DashboardPage() {
  const libraryItems = await getUserLibraryItems();
  const trackedCounts = getCategoryCounts(libraryItems);
  const dashboardContinueItems = libraryItems
    .filter((item) => item.status === "watching" || item.status === "playing")
    .slice(0, 3)
    .map(toDashboardTrackedItem);
  const dashboardRecentReviews = libraryItems
    .map(toDashboardReview)
    .filter((review): review is NonNullable<typeof review> => Boolean(review))
    .slice(0, 2);
  const favoriteItems = libraryItems
    .filter((item) => item.isFavorite)
    .slice(0, 3)
    .map(toFavoriteDashboardItem);

  return (
    <div className="space-y-14 pb-10">
      <DashboardHero />

      <section className="grid gap-6 md:grid-cols-3">
        <DashboardStatCard
          label="Anime Tracked"
          value={trackedCounts.anime}
          icon={<Tv className="h-7 w-7" />}
          tone="anime"
        />
        <DashboardStatCard
          label="Movies Tracked"
          value={trackedCounts.movie}
          icon={<Film className="h-7 w-7" />}
          tone="movie"
        />
        <DashboardStatCard
          label="Games Tracked"
          value={trackedCounts.game}
          icon={<Gamepad2 className="h-7 w-7" />}
          tone="game"
        />
      </section>

      <section className="space-y-6">
        <DashboardSectionHeader
          icon={<Clock className="h-6 w-6" />}
          title="Continue Tracking"
          actionHref="/library"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {dashboardContinueItems.length > 0 ? (
            dashboardContinueItems.map((item) => (
              <DashboardMediaCard key={item.id} item={item} />
            ))
          ) : (
            <EmptyState
              className="lg:col-span-3"
              eyebrow="No Active Titles"
              title="Start tracking your first active title"
              description="Add anime, movies, or games from your library to turn this into your personal entertainment queue."
              icon={<Clock className="h-5 w-5" />}
            />
          )}
        </div>
      </section>

      <section className="space-y-6">
        <DashboardSectionHeader
          icon={<Star className="h-6 w-6" />}
          title="Favorites"
          actionHref="/library"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {favoriteItems.length > 0 ? (
            favoriteItems.map((item) => (
              <DashboardMediaCard key={item.id} item={item} />
            ))
          ) : (
            <EmptyState
              className="lg:col-span-3"
              eyebrow="No Favorites Yet"
              title="Nothing has been crowned favorite"
              description="Favorite standout titles from the library to create a richer, more personal dashboard."
              icon={<Star className="h-5 w-5" />}
            />
          )}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <DashboardSectionHeader
            icon={<TrendingUp className="h-6 w-6" />}
            title="Recent Reviews"
          />
          <div className="space-y-4">
            {dashboardRecentReviews.length > 0 ? (
              dashboardRecentReviews.map((review) => (
                <DashboardReviewCard key={review.id} review={review} />
              ))
            ) : (
              <EmptyState
                eyebrow="No Reviews Yet"
                title="Your impressions are waiting"
                description="Add review notes while editing an entry to surface recent thoughts and scores here."
                icon={<TrendingUp className="h-5 w-5" />}
              />
            )}
          </div>
        </section>

        <aside className="space-y-8">
          <section className="space-y-5">
            <h2 className="editorial-title bg-[linear-gradient(135deg,#f3f0ff,#d4c5f9)] bg-clip-text text-3xl font-normal leading-tight text-transparent">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <DashboardActionCard
                title="Add Anime"
                href="/library"
                icon={<Tv className="h-5 w-5" />}
                tone="anime"
              />
              <DashboardActionCard
                title="Add Movie"
                href="/library"
                icon={<Film className="h-5 w-5" />}
                tone="movie"
              />
              <DashboardActionCard
                title="Add Game"
                href="/library"
                icon={<Gamepad2 className="h-5 w-5" />}
                tone="game"
              />
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="editorial-title bg-[linear-gradient(135deg,#f3f0ff,#d4c5f9)] bg-clip-text text-3xl font-normal leading-tight text-transparent">
              Your Library
            </h2>
            <div className="space-y-3">
              <DashboardSummaryCard
                label="Anime"
                value={trackedCounts.anime}
                icon={<Tv className="h-5 w-5" />}
                color="#c026d3"
              />
              <DashboardSummaryCard
                label="Movies"
                value={trackedCounts.movie}
                icon={<Film className="h-5 w-5" />}
                color="#8b5cf6"
              />
              <DashboardSummaryCard
                label="Games"
                value={trackedCounts.game}
                icon={<Gamepad2 className="h-5 w-5" />}
                color="#3b82f6"
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function DashboardSectionHeader({
  icon,
  title,
  actionHref,
}: {
  icon: ReactNode;
  title: string;
  actionHref?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3 text-[#8b5cf6]">
        {icon}
        <h2 className="editorial-title truncate bg-[linear-gradient(135deg,#f3f0ff,#d4c5f9)] bg-clip-text text-3xl font-normal leading-tight text-transparent sm:text-4xl">
          {title}
        </h2>
      </div>
      {actionHref ? (
        <Link
          href={actionHref}
          className="shrink-0 text-sm font-semibold text-[#8b5cf6] transition hover:text-[#a78bfa]"
        >
          View All
        </Link>
      ) : null}
    </div>
  );
}

function toFavoriteDashboardItem(item: LibraryItem, index: number): DashboardTrackedItem {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    status: getCategoryLabel(item.category),
    progressLabel: getCategoryLabel(item.category),
    accent: item.coverAccent,
    coverUrl: item.coverUrl ?? getDashboardArtwork(item.category, index + 1),
    rating: item.rating,
    favorite: true,
  };
}
