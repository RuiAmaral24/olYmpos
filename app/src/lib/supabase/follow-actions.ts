"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { FollowRelationship } from "@/types";

export type FollowActionResult = { success: boolean; relationship: FollowRelationship; changed: boolean; message?: string };

export async function followOrRequest(targetUserId: string) {
  return runMutation(targetUserId, "follow_or_request", "none");
}
export async function cancelFollowRequest(targetUserId: string) {
  return runMutation(targetUserId, "cancel_follow_request", "requested", "none");
}
export async function unfollowUser(targetUserId: string) {
  return runMutation(targetUserId, "unfollow_user", "following", "none");
}

async function runMutation(
  targetUserId: string,
  functionName: "follow_or_request" | "cancel_follow_request" | "unfollow_user",
  failureRelationship: FollowRelationship,
  successRelationship?: FollowRelationship,
): Promise<FollowActionResult> {
  if (!isUuid(targetUserId)) return failure("Invalid profile.", failureRelationship);
  const supabase = await createServerSupabaseClient();
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError || !auth.user) return failure("Sign in to manage follows.", failureRelationship);
  if (auth.user.id === targetUserId) return failure("You cannot follow your own profile.", "self");
  const { data, error } = await supabase.rpc(functionName, { target_id: targetUserId });
  if (error) return failure(error.message || "Follow status could not be updated.", failureRelationship);
  const relationship = successRelationship ?? normalizeRelationship(data);
  revalidatePath("/users"); revalidatePath("/requests"); revalidatePath("/notifications"); revalidatePath("/", "layout");
  return { success: true, relationship, changed: data !== false };
}

function failure(message: string, relationship: FollowRelationship): FollowActionResult {
  return { success: false, relationship, changed: false, message };
}
function normalizeRelationship(value: unknown): FollowRelationship {
  return value === "following" || value === "requested" ? value : "none";
}
function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
