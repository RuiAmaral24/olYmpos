import { Heart, Layers3, LibraryBig } from "lucide-react";

import { DashboardActionCard } from "@/components/dashboard/dashboard-action-card";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { DashboardMediaCard } from "@/components/dashboard/dashboard-media-card";
import { DashboardReviewCard } from "@/components/dashboard/dashboard-review-card";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardSummaryCard } from "@/components/dashboard/dashboard-summary-card";
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

const favoriteItems = dashboardContinueItems.filter((item) => item.favorite);

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-8">
      <DashboardHero />

      <section className="grid gap-4 md:grid-cols-3">
        <DashboardStatCard
          label="Anime Tracked"
          value={trackedCounts.Anime}
          detail="Series currently active in your olYmpos."
        />
        <DashboardStatCard
          label="Movies Tracked"
          value={trackedCounts.Movie}
          detail="Films saved for rewatches, ratings, and notes."
        />
        <DashboardStatCard
          label="Games Tracked"
          value={trackedCounts.Game}
          detail="Campaigns and runs you are actively progressing."
        />
      </section>

      <section className="space-y-5">
        <SectionTitle
          eyebrow="Continue Tracking"
          title="Resume where your universe paused"
          description="Three titles waiting for your next session."
        />
        <div className="grid gap-4 xl:grid-cols-3">
          {dashboardContinueItems.map((item) => (
            <DashboardMediaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <section className="space-y-5">
          <SectionTitle
            eyebrow="Favorites"
            title="Your curated favorites"
            description="The titles currently defining your olYmpos."
          />
          <div className="grid gap-4">
            {favoriteItems.map((item) => (
              <Card
                key={item.id}
                className="border border-white/8 bg-[linear-gradient(180deg,rgba(21,30,47,0.92),rgba(10,15,26,0.96))]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.28em] text-accent-secondary">
                      {item.category}
                    </p>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-[#aeb8cf]">{item.status}</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-[#f3b7cb]">
                    <Heart className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <SectionTitle
            eyebrow="Recent Reviews"
            title="Fresh impressions"
            description="Your latest thoughts, scores, and standout moments."
          />
          <div className="grid gap-4">
            {dashboardRecentReviews.map((review) => (
              <DashboardReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="space-y-5">
          <SectionTitle
            eyebrow="Quick Actions"
            title="Move your library forward"
            description="Jump straight into the next addition to your olYmpos."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <DashboardActionCard
              title="Add Anime"
              description="Start tracking a new season, backlog, or rewatch."
              href="/library"
            />
            <DashboardActionCard
              title="Add Movie"
              description="Save the next film you want to rate or revisit."
              href="/library"
            />
            <DashboardActionCard
              title="Add Game"
              description="Track a fresh campaign, run, or platinum journey."
              href="/library"
            />
          </div>
        </section>

        <section className="space-y-5">
          <SectionTitle
            eyebrow="Your Library"
            title="Category summary"
            description="A quick pulse on how your collection is taking shape."
          />
          <div className="grid gap-4">
            <DashboardSummaryCard
              label="Anime"
              value={trackedCounts.Anime}
              hint="Episodes, seasons, and ongoing series."
            />
            <DashboardSummaryCard
              label="Movies"
              value={trackedCounts.Movie}
              hint="Feature films saved for ratings and rewatches."
            />
            <DashboardSummaryCard
              label="Games"
              value={trackedCounts.Game}
              hint="Runs, campaigns, and titles still in motion."
            />
          </div>
        </section>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border border-white/8 bg-[linear-gradient(135deg,rgba(20,30,49,0.92),rgba(11,16,28,0.98))]">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-accent-secondary">
              <LibraryBig className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Library momentum</h3>
              <p className="text-sm leading-6 text-[#aeb8cf]">
                Your universe spans anime, movies, and games with a balanced mix
                of in-progress titles and saved favorites.
              </p>
            </div>
          </div>
        </Card>
        <Card className="border border-white/8 bg-[linear-gradient(135deg,rgba(18,28,45,0.92),rgba(9,14,24,0.98))]">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[#d8b4fe]">
              <Layers3 className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Universe focus</h3>
              <p className="text-sm leading-6 text-[#aeb8cf]">
                Frieren, Dune, and Hades II are leading your current cycle across
                every major category in olYmpos.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
