import { Activity, MessageSquareText, Sparkles, Star } from "lucide-react";

import { DashboardReviewCard } from "@/components/dashboard/dashboard-review-card";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { ProfileActivityRow } from "@/components/profile/profile-activity-row";
import { ProfileFavoriteCard } from "@/components/profile/profile-favorite-card";
import { ProfileHeroCard } from "@/components/profile/profile-hero-card";
import { ProfileProgressRow } from "@/components/profile/profile-progress-row";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionTitle } from "@/components/ui/section-title";
import { toDashboardReview } from "@/lib/library-mapper";
import { getCategoryCounts, getDashboardSummary, getFavoriteItems, getProgressLabel } from "@/lib/library";
import { getUserLibraryItems, getUserProfile } from "@/lib/supabase/library";

export default async function ProfilePage() {
  const [profile, libraryItems] = await Promise.all([
    getUserProfile(),
    getUserLibraryItems(),
  ]);
  const trackedCounts = getCategoryCounts(libraryItems);
  const favoriteItems = getFavoriteItems(libraryItems).slice(0, 4);
  const recentActivity = libraryItems.filter((item) => getProgressLabel(item)).slice(0, 4);
  const activitySummary = getDashboardSummary(libraryItems);
  const recentReviews = libraryItems
    .map(toDashboardReview)
    .filter((review): review is NonNullable<typeof review> => Boolean(review))
    .slice(0, 3);
  const username = profile?.username ?? "olYmpos user";

  return (
    <div className="space-y-8 pb-8">
      <SectionTitle
        eyebrow="Profile"
        title="Profile"
        description="Your identity, taste, and tracking rhythm across olYmpos."
        action={(
          <Badge className="border-white/12 bg-white/8 text-[#d7def1]">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            Universe identity
          </Badge>
        )}
      />

      <ProfileHeroCard
        username={username}
        isPublic
        bio={profile?.bio ?? "Building a personal olYmpos across anime, movies, and games."}
        interests={buildInterests(trackedCounts)}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <DashboardStatCard
          label="Anime Tracked"
          value={trackedCounts.anime}
          detail="Series and seasons shaping your current universe."
        />
        <DashboardStatCard
          label="Movies Tracked"
          value={trackedCounts.movie}
          detail="Films curated for ratings, favorites, and rewatches."
        />
        <DashboardStatCard
          label="Games Tracked"
          value={trackedCounts.game}
          detail="Campaigns and runs moving through your backlog."
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <section className="space-y-5">
          <SectionTitle
            eyebrow="Favorites"
            title="Signature favorites"
            description="The titles that best represent your taste inside olYmpos."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {favoriteItems.length > 0 ? (
              favoriteItems.map((item) => (
                <ProfileFavoriteCard key={item.id} item={item} />
              ))
            ) : (
              <EmptyState
                className="sm:col-span-2"
                eyebrow="No Favorites Yet"
                title="Your signature favorites are still open"
                description="Favorite titles from your library to shape the taste profile shown here."
                icon={<Star className="h-5 w-5" />}
              />
            )}
          </div>
        </section>

        <section className="space-y-5">
          <SectionTitle
            eyebrow="Recent Reviews"
            title="Latest notes"
            description="Recent impressions published from your library."
          />
          <div className="grid gap-4">
            {recentReviews.length > 0 ? (
              recentReviews.map((review) => (
                <DashboardReviewCard key={review.id} review={review} />
              ))
            ) : (
              <EmptyState
                eyebrow="No Reviews Yet"
                title="No published notes yet"
                description="Your review notes will appear here once you add them to entries."
                icon={<MessageSquareText className="h-5 w-5" />}
              />
            )}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.92fr)]">
        <section className="space-y-5">
          <SectionTitle
            eyebrow="Recently Tracked"
            title="Current activity"
            description="A quick look at what is moving right now in your universe."
          />
          <div className="grid gap-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((item) => (
                <ProfileActivityRow key={item.id} item={item} />
              ))
            ) : (
              <EmptyState
                eyebrow="No Recent Activity"
                title="Your activity feed is quiet"
                description="Track progress on an entry to build a recent activity trail."
                icon={<Activity className="h-5 w-5" />}
              />
            )}
          </div>
          <Card className="border border-white/8 bg-[linear-gradient(135deg,rgba(18,26,42,0.88),rgba(9,14,24,0.96))]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.26em] text-accent-secondary">
                  Tracking pulse
                </p>
                <h3 className="text-lg font-semibold text-white">
                  Cross-category momentum
                </h3>
              </div>
              <p className="text-sm text-[#aeb8cf]">
                {activitySummary.activeItems} active highlights across anime, movies, and games.
              </p>
            </div>
          </Card>
        </section>

        <section className="space-y-5">
          <SectionTitle
            eyebrow="Activity Summary"
            title="Profile rhythm"
            description="How your collection is currently distributed."
          />
          <Card className="space-y-5 border border-white/8 bg-[linear-gradient(180deg,rgba(20,29,46,0.92),rgba(10,14,24,0.98))]">
            <ProfileProgressRow
              label="Completed"
              value={activitySummary.completedItems}
              total={activitySummary.totalItems}
              accentClassName="from-[#4ea1ff] to-[#7c6cff]"
            />
            <ProfileProgressRow
              label="Watching / Playing"
              value={activitySummary.activeItems}
              total={activitySummary.totalItems}
              accentClassName="from-[#7c6cff] to-[#d946ef]"
            />
            <ProfileProgressRow
              label="Planned"
              value={activitySummary.plannedItems}
              total={activitySummary.totalItems}
              accentClassName="from-[#f59e0b] to-[#fb7185]"
            />
          </Card>
        </section>
      </div>
    </div>
  );
}

function buildInterests(counts: ReturnType<typeof getCategoryCounts>) {
  const interests = [];

  if (counts.anime > 0) {
    interests.push("Anime Fan");
  }

  if (counts.movie > 0) {
    interests.push("Movie Curator");
  }

  if (counts.game > 0) {
    interests.push("Game Tracker");
  }

  return interests.length > 0 ? interests : ["New to olYmpos"];
}
