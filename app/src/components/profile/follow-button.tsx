"use client";

import { Clock3, Loader2, UserCheck, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { cancelFollowRequest, followOrRequest, unfollowUser } from "@/lib/supabase/follow-actions";
import { cn } from "@/lib/utils";
import type { FollowRelationship, ProfileVisibility } from "@/types";

type FollowButtonProps = {
  targetUserId: string;
  initialRelationship: FollowRelationship;
  profileVisibility: ProfileVisibility;
  compact?: boolean;
};

export function FollowButton({
  targetUserId,
  initialRelationship,
  profileVisibility,
  compact = false,
}: FollowButtonProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [relationship, setRelationship] = useState(initialRelationship);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = relationship === "following"
        ? await unfollowUser(targetUserId)
        : relationship === "requested"
          ? await cancelFollowRequest(targetUserId)
          : await followOrRequest(targetUserId);

      if (!result.success) {
        showToast(result.message ?? "Follow status could not be updated.", "error");
        return;
      }

      setRelationship(result.relationship);
      router.refresh();
    });
  };

  return (
    <Button
      variant={relationship === "none" ? "primary" : "secondary"}
      className={cn(
        "rounded-xl",
        compact ? "h-9 px-3 text-xs" : "h-11 px-5",
      )}
      leftIcon={
        isPending
          ? <Loader2 className="h-4 w-4 animate-spin" />
          : relationship === "following"
            ? <UserCheck className="h-4 w-4" />
            : relationship === "requested"
              ? <Clock3 className="h-4 w-4" />
            : <UserPlus className="h-4 w-4" />
      }
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={relationship !== "none"}
    >
      {relationship === "following"
        ? "Following"
        : relationship === "requested"
          ? "Requested"
          : profileVisibility === "private"
            ? "Request to Follow"
            : "Follow"}
    </Button>
  );
}
