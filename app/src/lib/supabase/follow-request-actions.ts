"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { FollowRequestUser } from "@/types";

export type RequestActionResult = { success: boolean; message?: string };

type FollowRequestRow = {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  profile_visibility: string;
  requested_at: string;
};

export async function getFollowRequests(kind: "incoming" | "outgoing"): Promise<FollowRequestUser[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("get_follow_requests", { request_kind: kind });
  if (error) throw new Error(`Follow requests could not be loaded: ${error.message}`);
  return ((data ?? []) as FollowRequestRow[]).map((row) => ({
    id: row.id,
    username: row.username,
    displayName: row.full_name,
    avatarUrl: row.avatar_url,
    profileVisibility: row.profile_visibility === "private" ? "private" : "public",
    requestedAt: row.requested_at,
  }));
}

export async function acceptFollowRequest(requesterId: string) {
  return runRequestMutation("accept_follow_request", requesterId);
}
export async function rejectFollowRequest(requesterId: string) {
  return runRequestMutation("reject_follow_request", requesterId);
}

async function runRequestMutation(functionName: "accept_follow_request" | "reject_follow_request", requesterId: string): Promise<RequestActionResult> {
  if (!isUuid(requesterId)) return { success: false, message: "Invalid request." };
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(functionName, { requester_id: requesterId });
  if (error || !data) return { success: false, message: error?.message ?? "This request is no longer available." };
  revalidatePath("/requests"); revalidatePath("/users"); revalidatePath("/notifications"); revalidatePath("/", "layout");
  return { success: true };
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
