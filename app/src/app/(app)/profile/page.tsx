import { Sparkles } from "lucide-react";

import { DashboardReviewCard } from "@/components/dashboard/dashboard-review-card";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { ProfileActivityRow } from "@/components/profile/profile-activity-row";
import { ProfileFavoriteCard } from "@/components/profile/profile-favorite-card";
import { ProfileHeroCard } from "@/components/profile/profile-hero-card";
import { ProfileProgressRow } from "@/components/profile/profile-progress-row";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";
import {
  dashboardContinueItems,
  dashboardRecentReviews,
  mockLibraryItems,
} from "@/data/mock-library";

const trackedCounts = {
  Anime: mockLibraryItems.filter((item) => item.category === "Anime").length,
  Movie: mockLibraryItems.filter((item) => item.category === "Movie").length,
  Game: mockLibraryItems.filter((item) => item.category === "Game").length,
};

const favoriteItems = mockLibraryItems.filter((item) => item.favorite).slice(0, 4);
const recentActivity = mockLibraryItems.filter((item) => item.progressLabel).slice(0, 4);
const totalItems = mockLibraryItems.length;
const activitySummary = {
  Completed: mockLibraryItems.filter((item) => item.status === "Completed").length,
  WatchingPlaying: mockLibraryItems.filter(
    (item) => item.status === "Watching" || item.status === "Playing",
  ).length,
  Planned: mockLibraryItems.filter((item) => item.status === "Planned").length,
};

export default function ProfilePage() {
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
        username="Orion Vale"
        isPublic
        bio="Building a personal olYmpos around contemplative anime, bold sci-fi cinema, and long-form RPG runs that actually deserve the hours."
        interests={["Anime Fan", "Sci-Fi Lover", "RPG Gamer"]}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <DashboardStatCard
          label="Anime Tracked"
          value={trackedCounts.Anime}
          detail="Series and seasons shaping your current universe."
        />
        <DashboardStatCard
          label="Movies Tracked"
          value={trackedCounts.Movie}
          detail="Films curated for ratings, favorites, and rewatches."
        />
        <DashboardStatCard
          label="Games Tracked"
          value={trackedCounts.Game}
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
            {favoriteItems.map((item) => (
              <ProfileFavoriteCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <SectionTitle
            eyebrow="Recent Reviews"
            title="Latest notes"
            description="Recent impressions published from your library."
          />
          <div className="grid gap-4">
            {dashboardRecentReviews.map((review) => (
              <DashboardReviewCard key={review.id} review={review} />
            ))}
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
            {recentActivity.map((item) => (
              <ProfileActivityRow key={item.id} item={item} />
            ))}
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
                {dashboardContinueItems.length} active highlights across anime, movies, and games.
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
              value={activitySummary.Completed}
              total={totalItems}
              accentClassName="from-[#4ea1ff] to-[#7c6cff]"
            />
            <ProfileProgressRow
              label="Watching / Playing"
              value={activitySummary.WatchingPlaying}
              total={totalItems}
              accentClassName="from-[#7c6cff] to-[#d946ef]"
            />
            <ProfileProgressRow
              label="Planned"
              value={activitySummary.Planned}
              total={totalItems}
              accentClassName="from-[#f59e0b] to-[#fb7185]"
            />
          </Card>
        </section>
      </div>
    </div>
  );
}
