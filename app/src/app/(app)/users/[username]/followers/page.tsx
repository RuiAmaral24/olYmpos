import { notFound } from "next/navigation";

import {
  parseSocialPage,
  SocialListLayout,
} from "@/components/profile/social-list-layout";
import { SocialUserList } from "@/components/profile/social-user-list";
import { getFollowersPage, getPublicProfileByUsername } from "@/lib/supabase/public-profiles";

type FollowersPageProps = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function FollowersPage({ params, searchParams }: FollowersPageProps) {
  const [{ username }, query] = await Promise.all([params, searchParams]);
  const profile = await getPublicProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const page = parseSocialPage(query.page);
  const result = await getFollowersPage(profile.id, page);
  const profilePath = `/users/${profile.username}`;

  return (
    <SocialListLayout
      eyebrow="Community"
      title="Followers"
      description={`People following @${profile.username}`}
      profilePath={profilePath}
    >
      <SocialUserList
        result={result}
        basePath={`${profilePath}/followers`}
        emptyTitle="No followers yet"
        emptyDescription={`@${profile.username} does not have any followers yet.`}
      />
    </SocialListLayout>
  );
}
