import { notFound } from "next/navigation";

import {
  parseSocialPage,
  SocialListLayout,
} from "@/components/profile/social-list-layout";
import { SocialUserList } from "@/components/profile/social-user-list";
import { getFollowingPage, getPublicProfileByUsername } from "@/lib/supabase/public-profiles";

type FollowingPageProps = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function FollowingPage({ params, searchParams }: FollowingPageProps) {
  const [{ username }, query] = await Promise.all([params, searchParams]);
  const profile = await getPublicProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const page = parseSocialPage(query.page);
  const result = await getFollowingPage(profile.id, page);
  const profilePath = `/users/${profile.username}`;

  return (
    <SocialListLayout
      eyebrow="Community"
      title="Following"
      description={`People @${profile.username} follows`}
      profilePath={profilePath}
    >
      <SocialUserList
        result={result}
        basePath={`${profilePath}/following`}
        emptyTitle="Not following anyone yet"
        emptyDescription={`@${profile.username} is not following any members yet.`}
      />
    </SocialListLayout>
  );
}
