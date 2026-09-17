import Link from "next/link";
import { CalendarDays, LockKeyhole, Sparkles, UserRound, Users } from "lucide-react";
import { notFound } from "next/navigation";

import { FollowButton } from "@/components/profile/follow-button";
import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPublicProfileByUsername } from "@/lib/supabase/public-profiles";
import { cn } from "@/lib/utils";

type PublicProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params;
  const profile = await getPublicProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const isSelf = profile.relationship === "self";
  const displayName = profile.displayName?.trim() || profile.username;

  return (
    <div className="space-y-10 pb-14">
      <section className="space-y-3 pt-4 sm:pt-6">
        <div className="flex items-center gap-3 text-[#9b6dff]">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-[0.24em]">
            Community Profile
          </span>
        </div>
        <div className="relative">
          <UserRound
            aria-hidden="true"
            className="pointer-events-none absolute -left-4 top-1/2 h-16 w-16 -translate-y-1/2 text-[#8b5cf6] opacity-[0.08]"
          />
          <h1 className="editorial-title relative bg-[linear-gradient(135deg,#f3f0ff,#d4c5f9,#c4b5fd)] bg-clip-text text-5xl font-normal leading-none text-transparent sm:text-6xl">
            {displayName}
          </h1>
        </div>
        <p className="text-base font-medium text-[#a78bfa] sm:text-lg">
          @{profile.username}
        </p>
      </section>

      <Card className="border border-[#302455] bg-[linear-gradient(135deg,rgba(17,18,34,0.96),rgba(10,12,24,0.99))]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-col gap-6 sm:flex-row sm:items-start">
            <ProfileAvatar
              avatarUrl={profile.avatarUrl}
              displayName={displayName}
              size="lg"
              className="shadow-[0_20px_50px_rgba(139,92,246,0.2)]"
            />

            <div className="min-w-0 max-w-2xl space-y-5">
              <div>
                {profile.canViewPrivateContent ? (
                  <><h2 className="section-subtitle text-[#f3f0ff]">About</h2><p className="mt-3 text-sm leading-7 text-[#b8c1ec] sm:text-base">{profile.bio?.trim() || "This member has not added a bio yet."}</p></>
                ) : (
                  <div className="rounded-2xl border border-[#8b5cf6]/20 bg-[#8b5cf6]/7 p-5">
                    <div className="flex items-center gap-2 text-[#c4b5fd]"><LockKeyhole className="h-5 w-5" /><h2 className="text-base font-semibold">This profile is private</h2></div>
                    <p className="mt-2 text-sm leading-6 text-[#969fb5]">Follow this member and wait for approval to view their bio and social connections.</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-[#929bb2]">
                <CalendarDays className="h-4 w-4 text-[#8b5cf6]" />
                <span>Member since {formatMemberSince(profile.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            {isSelf ? (
              <Link
                href="/settings"
                className={cn(buttonVariants("secondary"), "h-11 rounded-xl px-5")}
              >
                Edit profile
              </Link>
            ) : (
              <FollowButton
                targetUserId={profile.id}
                initialRelationship={profile.relationship}
                profileVisibility={profile.profileVisibility}
              />
            )}
          </div>
        </div>
      </Card>

      <section className="space-y-5" aria-labelledby="community-stats-title">
        <div className="flex items-center gap-3 text-[#8b5cf6]">
          <Users className="h-6 w-6" />
          <h2 id="community-stats-title" className="section-subtitle">
            Community
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileStat
            href={`/users/${profile.username}/followers`}
            label="Followers"
            value={profile.followersCount}
          />
          <ProfileStat
            href={`/users/${profile.username}/following`}
            label="Following"
            value={profile.followingCount}
          />
        </div>
      </section>
    </div>
  );
}

function ProfileStat({
  href,
  label,
  value,
}: {
  href: string;
  label: string;
  value: number;
}) {
  return (
    <Link href={href} aria-label={`View ${label.toLowerCase()}`}>
      <Card className="border border-white/8 bg-[linear-gradient(180deg,rgba(16,18,33,0.94),rgba(8,10,20,0.98))] transition hover:border-[#8b5cf6]/35 hover:bg-[linear-gradient(180deg,rgba(24,22,45,0.96),rgba(10,11,24,0.99))]">
        <span className="stat-number">{value}</span>
        <p className="mt-2 text-sm font-semibold text-[#aeb7cc]">{label}</p>
      </Card>
    </Link>
  );
}

function formatMemberSince(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "recently";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
