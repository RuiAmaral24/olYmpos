import type { ReactNode } from "react";

import { Clock, Film, Gamepad2, Star, TrendingUp, Tv } from "lucide-react";
import Link from "next/link";

import { DashboardActionCard } from "@/components/dashboard/dashboard-action-card";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { DashboardMediaCard } from "@/components/dashboard/dashboard-media-card";
import { DashboardReviewCard } from "@/components/dashboard/dashboard-review-card";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardSummaryCard } from "@/components/dashboard/dashboard-summary-card";
import {
  getDashboardArtwork,
  toDashboardReview,
  toDashboardTrackedItem,
} from "@/lib/library-mapper";
import { getCategoryCounts, getCategoryLabel } from "@/lib/library";
import { getUserLibraryItems } from "@/lib/supabase/library";
import type { DashboardReview, DashboardTrackedItem, LibraryItem } from "@/types";

const fallbackCounts = {
  anime: 47,
  movie: 132,
  game: 28,
};

const fallbackContinueItems: DashboardTrackedItem[] = [
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    category: "anime",
    status: "Watching",
    progressLabel: "S4 E12",
    accent: "from-[#8b5cf6]/45 via-[#21183d]/20 to-transparent",
    coverUrl: getDashboardArtwork("anime", 0),
    rating: 5,
  },
  {
    id: "inception",
    title: "Inception",
    category: "movie",
    status: "Watched",
    progressLabel: "Watched",
    accent: "from-[#3b82f6]/35 via-[#142440]/20 to-transparent",
    coverUrl: getDashboardArtwork("movie", 0),
    rating: 5,
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    category: "game",
    status: "Playing",
    progressLabel: "78% Complete",
    accent: "from-[#3b82f6]/42 via-[#3b0f48]/18 to-transparent",
    coverUrl: getDashboardArtwork("game", 0),
    rating: 5,
  },
];

const fallbackFavoriteItems: DashboardTrackedItem[] = [
  {
    id: "your-name",
    title: "Your Name",
    category: "anime",
    status: "Anime",
    progressLabel: "Anime",
    accent: "from-[#8b5cf6]/42 via-[#1d1740]/18 to-transparent",
    coverUrl: getDashboardArtwork("anime", 1),
    rating: 5,
    favorite: true,
  },
  {
    id: "interstellar",
    title: "Interstellar",
    category: "movie",
    status: "Movie",
    progressLabel: "Movie",
    accent: "from-[#6366f1]/36 via-[#15213a]/18 to-transparent",
    coverUrl: getDashboardArtwork("movie", 1),
    rating: 5,
    favorite: true,
  },
  {
    id: "the-last-of-us-part-ii",
    title: "The Last of Us Part II",
    category: "game",
    status: "Game",
    progressLabel: "Game",
    accent: "from-[#3b82f6]/38 via-[#171934]/18 to-transparent",
    coverUrl: getDashboardArtwork("game", 1),
    rating: 5,
    favorite: true,
  },
];

const fallbackReviews: DashboardReview[] = [
  {
    id: "review-attack-on-titan",
    title: "Attack on Titan",
    category: "anime",
    excerpt: "An absolute masterpiece. The story keeps getting better with each season.",
    rating: 5,
    dateLabel: "2 days ago",
  },
  {
    id: "review-inception",
    title: "Inception",
    category: "movie",
    excerpt: "Mind-bending and visually stunning. Christopher Nolan at his best.",
    rating: 5,
    dateLabel: "5 days ago",
  },
];

export default async function DashboardPage() {
  const libraryItems = await getUserLibraryItems();
  const hasLibraryItems = libraryItems.length > 0;
  const trackedCounts = getCategoryCounts(libraryItems);
  const displayCounts = hasLibraryItems ? trackedCounts : fallbackCounts;
  const activeItems = libraryItems
    .filter((item) => item.status === "watching" || item.status === "playing")
    .slice(0, 3)
    .map(toDashboardTrackedItem);
  const reviewedItems = libraryItems
    .map(toDashboardReview)
    .filter((review): review is NonNullable<typeof review> => Boolean(review))
    .slice(0, 2);
  const realFavoriteItems = libraryItems
    .filter((item) => item.isFavorite)
    .slice(0, 3)
    .map(toFavoriteDashboardItem);
  const dashboardContinueItems = activeItems.length > 0 ? activeItems : fallbackContinueItems;
  const dashboardRecentReviews = reviewedItems.length > 0 ? reviewedItems : fallbackReviews;
  const favoriteItems = realFavoriteItems.length > 0 ? realFavoriteItems : fallbackFavoriteItems;

  return (
    <div className="space-y-12 pb-12">
      <DashboardHero />

      <section className="grid gap-6 md:grid-cols-3">
        <DashboardStatCard
          label="Anime Tracked"
          value={displayCounts.anime}
          icon={<Tv className="h-7 w-7" />}
          tone="anime"
        />
        <DashboardStatCard
          label="Movies Tracked"
          value={displayCounts.movie}
          icon={<Film className="h-7 w-7" />}
          tone="movie"
        />
        <DashboardStatCard
          label="Games Tracked"
          value={displayCounts.game}
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
          {dashboardContinueItems.map((item) => (
            <DashboardMediaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <DashboardSectionHeader
          icon={<Star className="h-6 w-6" />}
          title="Favorites"
          actionHref="/library"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {favoriteItems.map((item) => (
            <DashboardMediaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <DashboardSectionHeader
            icon={<TrendingUp className="h-6 w-6" />}
            title="Recent Reviews"
          />
          <div className="space-y-4">
            {dashboardRecentReviews.map((review) => (
              <DashboardReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        <aside className="space-y-8">
          <section className="space-y-5">
            <h2 className="section-subtitle">
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
            <h2 className="section-subtitle">
              Your Library
            </h2>
            <div className="space-y-3">
              <DashboardSummaryCard
                label="Anime"
                value={displayCounts.anime}
                icon={<Tv className="h-5 w-5" />}
                color="#c026d3"
                tone="anime"
              />
              <DashboardSummaryCard
                label="Movies"
                value={displayCounts.movie}
                icon={<Film className="h-5 w-5" />}
                color="#8b5cf6"
                tone="movie"
              />
              <DashboardSummaryCard
                label="Games"
                value={displayCounts.game}
                icon={<Gamepad2 className="h-5 w-5" />}
                color="#3b82f6"
                tone="game"
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
        <h2 className="section-subtitle truncate">
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
