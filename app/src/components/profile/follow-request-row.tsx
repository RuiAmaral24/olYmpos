"use client";

import Link from "next/link";
import { Check, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast-provider";
import { cancelFollowRequest } from "@/lib/supabase/follow-actions";
import { acceptFollowRequest, rejectFollowRequest } from "@/lib/supabase/follow-request-actions";
import type { FollowRequestUser } from "@/types";

export function FollowRequestRow({ user, direction }: { user: FollowRequestUser; direction: "incoming" | "outgoing" }) {
  const router = useRouter(); const { showToast } = useToast(); const [pending, startTransition] = useTransition();
  const displayName = user.displayName?.trim() || user.username;
  const act = (action: "accept" | "reject" | "cancel") => startTransition(async () => {
    const result = action === "accept" ? await acceptFollowRequest(user.id) : action === "reject" ? await rejectFollowRequest(user.id) : await cancelFollowRequest(user.id);
    if (!result.success) { showToast(result.message ?? "Request could not be updated.", "error"); return; }
    router.refresh();
  });
  return <Card className="flex flex-col gap-4 rounded-2xl border border-white/8 p-5 sm:flex-row sm:items-center sm:justify-between">
    <Link href={`/users/${user.username}`} className="flex min-w-0 items-center gap-4">
      <ProfileAvatar avatarUrl={user.avatarUrl} displayName={displayName} />
      <span className="min-w-0"><span className="block truncate font-semibold text-white">{displayName}</span><span className="block truncate text-sm text-[#9b83e2]">@{user.username}</span><time className="mt-1 block text-xs text-[#747d94]" dateTime={user.requestedAt}>{formatDate(user.requestedAt)}</time></span>
    </Link>
    <div className="flex shrink-0 gap-2 pl-16 sm:pl-0">
      {direction === "incoming" ? <><Button className="h-9 rounded-xl px-3 text-xs" leftIcon={pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} disabled={pending} onClick={() => act("accept")}>Accept</Button><Button variant="secondary" className="h-9 rounded-xl px-3 text-xs" leftIcon={<X className="h-4 w-4" />} disabled={pending} onClick={() => act("reject")}>Reject</Button></> : <Button variant="secondary" className="h-9 rounded-xl px-3 text-xs" leftIcon={pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />} disabled={pending} onClick={() => act("cancel")}>Cancel</Button>}
    </div>
  </Card>;
}

function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "Recently" : new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date); }
