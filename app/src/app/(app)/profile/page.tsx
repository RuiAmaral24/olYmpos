import type { ReactNode } from "react";

import {
  Award,
  Clock,
  Edit,
  Film,
  Gamepad2,
  Globe,
  Sparkles,
  Star,
  TrendingUp,
  Tv,
} from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { getCategoryLabel, getDashboardSummary, getFavoriteItems, getProgressLabel, getStatusLabel } from "@/lib/library";
import {
  getDashboardArtwork,
  toDashboardReview,
} from "@/lib/library-mapper";
import { getUserLibraryItems, getUserProfile } from "@/lib/supabase/library";
import { cn } from "@/lib/utils";
import type { DashboardReview, LibraryItem, MediaCategory } from "@/types";

type FavoriteDisplayItem = {
  id: string;
  title: string;
  category: MediaCategory;
  coverUrl: string;
};

type ActivityDisplayItem = {
  id: string;
  title: string;
  category: MediaCategory;
  status: string;
  progress: string | null;
};

const fallbackFavorites: FavoriteDisplayItem[] = [
  {
    id: "fallback-favorite-attack-on-titan",
    title: "Attack on Titan",
    category: "anime",
    coverUrl:
      "https://images.unsplash.com/photo-1764520408437-95890a95db4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "fallback-favorite-inception",
    title: "Inception",
    category: "movie",
    coverUrl:
      "https://images.unsplash.com/photo-1563202221-f4eae97e4828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "fallback-favorite-elden-ring",
    title: "Elden Ring",
    category: "game",
    coverUrl:
      "https://images.unsplash.com/photo-1634658340808-9abaef7eb9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const fallbackReviews: DashboardReview[] = [
  {
    id: "fallback-review-last-of-us",
    title: "The Last of Us Part II",
    category: "game",
    excerpt:
      "An emotional masterpiece with stunning visuals and deep storytelling. One of the best games I've ever played.",
    rating: 5,
  },
  {
    id: "fallback-review-your-name",
    title: "Your Name",
    category: "anime",
    excerpt:
      "Beautiful animation and a heartfelt story that stays with you long after watching.",
    rating: 5,
  },
];

const fallbackActivity: ActivityDisplayItem[] = [
  {
    id: "fallback-activity-demon-slayer",
    title: "Demon Slayer",
    category: "anime",
    status: "Watching",
    progress: "S2 E8",
  },
  {
    id: "fallback-activity-god-of-war",
    title: "God of War",
    category: "game",
    status: "Playing",
    progress: "45%",
  },
  {
    id: "fallback-activity-matrix",
    title: "The Matrix",
    category: "movie",
    status: "Completed",
    progress: null,
  },
];

export default async function ProfilePage() {
  const [profile, libraryItems] = await Promise.all([
    getUserProfile(),
    getUserLibraryItems(),
  ]);

  const trackedCounts = {
    anime: countOrFallback(libraryItems, "anime", 24),
    movie: countOrFallback(libraryItems, "movie", 18),
    game: countOrFallback(libraryItems, "game", 12),
  };
  const activitySummary = getDashboardSummary(libraryItems);
  const summaryValues =
    libraryItems.length > 0
      ? {
          completed: activitySummary.completedItems,
          active: activitySummary.activeItems,
          planned: activitySummary.plannedItems,
          total: activitySummary.totalItems,
        }
      : {
          completed: 28,
          active: 12,
          planned: 14,
          total: 54,
        };
  const favoriteItems = buildFavoriteItems(libraryItems);
  const recentReviews = buildRecentReviews(libraryItems);
  const recentlyTracked = buildRecentlyTracked(libraryItems);
  const displayName = profile?.username || "John Doe";
  const bio =
    profile?.bio ??
    "Entertainment enthusiast tracking anime, movies, and games. Building my ultimate watchlist in the olYmpos universe.";

  return (
    <div className="space-y-12 pb-10">
      <PageTitle />

      <ProfileIdentity
        displayName={displayName}
        bio={bio}
        interests={buildInterests(trackedCounts)}
      />

      <section className="grid gap-6 md:grid-cols-3">
        <ProfileStatCard
          label="Anime Tracked"
          value={trackedCounts.anime}
          icon={<Tv className="h-6 w-6" />}
          tone="anime"
        />
        <ProfileStatCard
          label="Movies Tracked"
          value={trackedCounts.movie}
          icon={<Film className="h-6 w-6" />}
          tone="movie"
        />
        <ProfileStatCard
          label="Games Tracked"
          value={trackedCounts.game}
          icon={<Gamepad2 className="h-6 w-6" />}
          tone="game"
        />
      </section>

      <div className="grid gap-8 xl:grid-cols-2">
        <div className="space-y-10">
          <ProfileSectionTitle
            icon={<Star className="h-6 w-6 fill-current" />}
            title="Favorites"
          />
          <div className="space-y-4">
            {favoriteItems.length > 0 ? (
              favoriteItems.map((item) => (
                <FavoriteRow key={item.id} item={item} />
              ))
            ) : (
              <EmptyState
                eyebrow="No Favorites Yet"
                title="Your signature favorites are still open"
                description="Favorite titles from your library to shape the taste profile shown here."
                icon={<Star className="h-5 w-5" />}
              />
            )}
          </div>

          <ProfileSectionTitle
            icon={<TrendingUp className="h-6 w-6" />}
            title="Activity Summary"
          />
          <div className="space-y-3">
            <ActivitySummaryRow
              label="Completed"
              value={summaryValues.completed}
              total={summaryValues.total}
              colorClassName="bg-[#22c55e]"
            />
            <ActivitySummaryRow
              label="Watching / Playing"
              value={summaryValues.active}
              total={summaryValues.total}
              colorClassName="bg-[#9b6dff]"
            />
            <ActivitySummaryRow
              label="Planned"
              value={summaryValues.planned}
              total={summaryValues.total}
              colorClassName="bg-[#3b82f6]"
            />
          </div>
        </div>

        <div className="space-y-10">
          <ProfileSectionTitle
            icon={<Star className="h-6 w-6" />}
            title="Recent Reviews"
          />
          <div className="space-y-4">
            {recentReviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                dateLabel={index === 0 ? "2 days ago" : "5 days ago"}
              />
            ))}
          </div>

          <ProfileSectionTitle
            icon={<Clock className="h-6 w-6" />}
            title="Recently Tracked"
          />
          <div className="space-y-3">
            {recentlyTracked.map((item) => (
              <RecentlyTrackedRow key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageTitle() {
  return (
    <section className="space-y-3 pt-4 sm:pt-6">
      <div className="relative">
        <Sparkles className="absolute -left-4 top-1/2 h-16 w-16 -translate-y-1/2 text-[#8b5cf6] opacity-[0.08]" />
        <h1 className="editorial-title bg-[linear-gradient(135deg,#f3f0ff,#d4c5f9,#c4b5fd)] bg-clip-text text-5xl font-normal leading-none tracking-[0] text-transparent sm:text-6xl">
          Profile
        </h1>
      </div>
    </section>
  );
}

function ProfileIdentity({
  displayName,
  bio,
  interests,
}: {
  displayName: string;
  bio: string;
  interests: string[];
}) {
  return (
    <section className="rounded-2xl border border-[#2d2454] bg-[linear-gradient(135deg,rgba(17,18,34,0.92),rgba(12,13,25,0.98))] p-6 shadow-[0_24px_80px_rgba(3,7,18,0.28)] sm:p-8 lg:p-10">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative h-32 w-32 shrink-0 rounded-2xl bg-[linear-gradient(135deg,#8b5cf6,#6366f1)] shadow-[0_20px_50px_rgba(139,92,246,0.26)]">
            <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-white">
              {getInitials(displayName)}
            </div>
            <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#111122] bg-[#8b5cf6] text-white">
              <Award className="h-5 w-5" />
            </div>
          </div>

          <div className="max-w-2xl space-y-4">
            <div className="space-y-2">
              <h2 className="editorial-title bg-[linear-gradient(135deg,#f3f0ff,#d4c5f9)] bg-clip-text text-4xl font-normal leading-none text-transparent">
                {displayName}
              </h2>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#a78bfa]">
                <Globe className="h-4 w-4" />
                <span>Public Profile</span>
              </div>
            </div>

            <p className="text-base font-medium leading-7 text-[#b8c1ec]">
              {bio}
            </p>

            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-lg border border-[#8b5cf6]/30 bg-[#8b5cf6]/20 px-3 py-1.5 text-sm font-semibold text-[#a78bfa]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#9b6dff,#6366f1)] px-5 text-sm font-bold text-white shadow-[0_18px_46px_rgba(139,92,246,0.24)] transition hover:brightness-110"
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </button>
      </div>
    </section>
  );
}

function ProfileStatCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  tone: "anime" | "movie" | "game";
}) {
  const iconClassName = {
    anime: "bg-[linear-gradient(135deg,#8b5cf6,#6366f1)]",
    movie: "bg-[linear-gradient(135deg,#6366f1,#4f46e5)]",
    game: "bg-[linear-gradient(135deg,#4f46e5,#8b5cf6)]",
  }[tone];

  return (
    <section className="rounded-2xl border border-[#2d2454] bg-[linear-gradient(135deg,rgba(17,18,34,0.92),rgba(12,13,25,0.98))] p-6 shadow-[0_20px_64px_rgba(3,7,18,0.24)]">
      <div className="flex items-center gap-4">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-[0_14px_34px_rgba(139,92,246,0.2)]", iconClassName)}>
          {icon}
        </div>
        <span className="stat-number block h-10">
          {value}
        </span>
      </div>
      <p className="mt-4 text-base font-semibold text-[#b8c1ec]">{label}</p>
    </section>
  );
}

function ProfileSectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 text-[#8b5cf6]">
      {icon}
      <h2 className="section-subtitle">
        {title}
      </h2>
    </div>
  );
}

function FavoriteRow({ item }: { item: FavoriteDisplayItem }) {
  const CategoryIcon = getCategoryIcon(item.category);

  return (
    <section className="flex items-center gap-4 rounded-xl border border-[#2d2454] bg-[linear-gradient(135deg,rgba(17,18,34,0.92),rgba(12,13,25,0.98))] p-4 shadow-[0_18px_56px_rgba(3,7,18,0.22)] transition hover:border-[#8b5cf6]/45">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-cover bg-center" style={{ backgroundImage: `url("${item.coverUrl}")` }} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-bold text-[#f0f4ff]">{item.title}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-[#b8c1ec]">
          <CategoryIcon className="h-4 w-4 text-[#8b5cf6]" />
          <span>{getCategoryLabel(item.category)}</span>
        </div>
      </div>
      <Star className="h-5 w-5 shrink-0 fill-[#fbbf24] text-[#fbbf24]" />
    </section>
  );
}

function ReviewCard({
  review,
  dateLabel,
}: {
  review: DashboardReview;
  dateLabel: string;
}) {
  return (
    <section className="rounded-xl border border-[#2d2454] bg-[linear-gradient(135deg,rgba(17,18,34,0.92),rgba(12,13,25,0.98))] p-5 shadow-[0_18px_56px_rgba(3,7,18,0.22)] transition hover:border-[#8b5cf6]/45">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold text-[#f0f4ff]">{review.title}</h3>
        <div className="flex shrink-0 gap-1 text-[#fbbf24]">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={cn(
                "h-4 w-4",
                index < Math.round(review.rating) ? "fill-current" : "text-[#4b5563]",
              )}
            />
          ))}
        </div>
      </div>
      <p className="mt-5 text-sm font-medium leading-7 text-[#b8c1ec]">
        {review.excerpt}
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#8b5cf6]">
        <Clock className="h-3.5 w-3.5" />
        <span>{dateLabel}</span>
      </div>
    </section>
  );
}

function ActivitySummaryRow({
  label,
  value,
  total,
  colorClassName,
}: {
  label: string;
  value: number;
  total: number;
  colorClassName: string;
}) {
  const width = total === 0 ? 0 : Math.min(100, Math.round((value / total) * 100));

  return (
    <section className="rounded-xl border border-[#2d2454] bg-[linear-gradient(135deg,rgba(17,18,34,0.92),rgba(12,13,25,0.98))] p-4 shadow-[0_18px_56px_rgba(3,7,18,0.2)]">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="font-semibold text-[#b8c1ec]">{label}</p>
        <span className="editorial-title text-2xl font-normal text-[#f3f0ff]">
          {value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#202038]">
        <div
          className={cn("h-full rounded-full", colorClassName)}
          style={{ width: `${width}%` }}
        />
      </div>
    </section>
  );
}

function RecentlyTrackedRow({ item }: { item: ActivityDisplayItem }) {
  const CategoryIcon = getCategoryIcon(item.category);

  return (
    <section className="flex items-center justify-between gap-4 rounded-xl border border-[#2d2454] bg-[linear-gradient(135deg,rgba(17,18,34,0.92),rgba(12,13,25,0.98))] p-4 shadow-[0_18px_56px_rgba(3,7,18,0.2)] transition hover:border-[#8b5cf6]/45">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#8b5cf6]/20 text-[#8b5cf6]">
          <CategoryIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-bold text-[#f0f4ff]">{item.title}</h3>
          <p className="mt-1 text-xs font-medium text-[#b8c1ec]">
            {getCategoryLabel(item.category)}
          </p>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-[#a78bfa]">{item.status}</p>
        {item.progress ? (
          <p className="mt-1 text-xs font-medium text-[#b8c1ec]">{item.progress}</p>
        ) : null}
      </div>
    </section>
  );
}

function buildFavoriteItems(items: LibraryItem[]): FavoriteDisplayItem[] {
  const favorites = getFavoriteItems(items).slice(0, 3);

  if (favorites.length === 0) {
    return items.length === 0 ? fallbackFavorites : [];
  }

  return favorites.map((item, index) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    coverUrl: item.coverUrl ?? getDashboardArtwork(item.category, index),
  }));
}

function buildRecentReviews(items: LibraryItem[]) {
  const reviews = items
    .map(toDashboardReview)
    .filter((review): review is DashboardReview => Boolean(review))
    .slice(0, 2);

  return reviews.length > 0 ? reviews : fallbackReviews;
}

function buildRecentlyTracked(items: LibraryItem[]): ActivityDisplayItem[] {
  const recentItems = items
    .filter((item) => item.status === "watching" || item.status === "playing" || item.status === "completed")
    .slice(0, 3);

  if (recentItems.length === 0) {
    return fallbackActivity;
  }

  return recentItems.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    status: getStatusLabel(item.status),
    progress: compactProgressLabel(getProgressLabel(item)),
  }));
}

function buildInterests(counts: Record<MediaCategory, number>) {
  const interests = [];

  if (counts.anime > 0) {
    interests.push("Anime Fan");
  }

  if (counts.movie > 0) {
    interests.push("Sci-Fi Lover");
  }

  if (counts.game > 0) {
    interests.push("RPG Gamer");
  }

  return interests.length > 0 ? interests : ["New to olYmpos"];
}

function countOrFallback(items: LibraryItem[], category: MediaCategory, fallback: number) {
  if (items.length === 0) {
    return fallback;
  }

  return items.filter((item) => item.category === category).length;
}

function getInitials(name: string) {
  const initials = name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "OY";
}

function getCategoryIcon(category: MediaCategory) {
  if (category === "anime") {
    return Tv;
  }

  return category === "movie" ? Film : Gamepad2;
}

function compactProgressLabel(label: string | undefined) {
  if (!label) {
    return null;
  }

  return label
    .replace(/^Season\s+(\d+),\s+Episode\s+(\d+)$/i, "S$1 E$2")
    .replace(/^Episode\s+(\d+)\s+of\s+\d+$/i, "E$1");
}
