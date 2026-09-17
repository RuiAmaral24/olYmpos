import Link from "next/link";
import { LockKeyhole, UserRoundSearch } from "lucide-react";

import { UserResultRow } from "@/components/profile/user-result-row";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import type { SocialUserPage } from "@/types";

type SocialUserListProps = {
  result: SocialUserPage;
  basePath: string;
  emptyTitle: string;
  emptyDescription: string;
};

export function SocialUserList({
  result,
  basePath,
  emptyTitle,
  emptyDescription,
}: SocialUserListProps) {
  return (
    <div className="space-y-5">
      {!result.canView ? (
        <EmptyState
          eyebrow="Private profile"
          title="These connections are private"
          description="Follow this member and wait for approval to view their social connections."
          icon={<LockKeyhole className="h-5 w-5" />}
        />
      ) : result.items.length > 0 ? (
        <div className="space-y-3">
          {result.items.map((user) => (
            <UserResultRow key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <EmptyState
          eyebrow="Community"
          title={emptyTitle}
          description={emptyDescription}
          icon={<UserRoundSearch className="h-5 w-5" />}
        />
      )}

      {result.hasPreviousPage || result.hasNextPage ? (
        <nav className="flex items-center justify-between gap-3" aria-label="Social list pagination">
          {result.hasPreviousPage ? (
            <Link
              href={`${basePath}?page=${result.page - 1}`}
              className={cn(buttonVariants("secondary"), "h-10 rounded-xl px-4")}
            >
              Previous
            </Link>
          ) : <span />}
          <span className="text-xs font-medium text-[#7f889f]">
            Page {result.page}
          </span>
          {result.hasNextPage ? (
            <Link
              href={`${basePath}?page=${result.page + 1}`}
              className={cn(buttonVariants("secondary"), "h-10 rounded-xl px-4")}
            >
              Next
            </Link>
          ) : <span />}
        </nav>
      ) : null}
    </div>
  );
}
