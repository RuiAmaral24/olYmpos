import { LockKeyhole } from "lucide-react";
import Link from "next/link";

import { FollowButton } from "@/components/profile/follow-button";
import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { SocialUser } from "@/types";

type UserResultRowProps = {
  user: SocialUser;
};

export function UserResultRow({ user }: UserResultRowProps) {
  const displayName = user.displayName?.trim() || user.username;

  return (
    <Card className="flex flex-col gap-5 border border-white/8 bg-[linear-gradient(180deg,rgba(16,18,33,0.95),rgba(8,10,20,0.98))] p-5 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href={`/users/${user.username}`}
        className="group flex min-w-0 items-start gap-4"
      >
        <ProfileAvatar avatarUrl={user.avatarUrl} displayName={displayName} />
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="truncate text-base font-semibold text-white transition group-hover:text-[#c4b5fd]">
              {displayName}
            </span>
            {user.relationship === "self" ? (
              <Badge className="border-[#8b5cf6]/25 bg-[#8b5cf6]/10 px-2.5 py-1 text-[9px] text-[#bda8ff]">
                You
              </Badge>
            ) : null}
            {user.profileVisibility === "private" ? (
              <Badge className="border-white/10 bg-white/5 px-2.5 py-1 text-[9px] text-[#aeb7cc]">
                <LockKeyhole className="mr-1 h-3 w-3" /> Private
              </Badge>
            ) : null}
          </span>
          <span className="mt-0.5 block truncate text-sm font-medium text-[#9b83e2]">
            @{user.username}
          </span>
          {user.bio?.trim() ? (
            <span className="mt-2 block line-clamp-2 text-sm leading-6 text-[#969fb5]">
              {user.bio}
            </span>
          ) : null}
        </span>
      </Link>

      {user.relationship !== "self" ? (
        <div className="shrink-0 pl-16 sm:pl-0">
          <FollowButton
            targetUserId={user.id}
            initialRelationship={user.relationship}
            profileVisibility={user.profileVisibility}
            compact
          />
        </div>
      ) : null}
    </Card>
  );
}
