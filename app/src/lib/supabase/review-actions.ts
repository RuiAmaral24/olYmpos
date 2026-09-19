"use server";

import { revalidatePath } from "next/cache";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ReviewActionResult = {
  success: boolean;
  message?: string;
  id?: string;
};

export async function publishReview(libraryItemId: string): Promise<ReviewActionResult> {
  return runIdMutation("publish_review", { p_library_item_id: libraryItemId }, "Review published.");
}

export async function updatePublicReview(reviewId: string, content: string): Promise<ReviewActionResult> {
  if (!validLength(content, 10000)) return failure("Review must be between 1 and 10,000 characters.");
  return runBooleanMutation("update_public_review", { p_review_id: reviewId, p_content: content }, reviewId, "Review updated.");
}

export async function unpublishReview(reviewId: string): Promise<ReviewActionResult> {
  return runBooleanMutation("unpublish_review", { p_review_id: reviewId }, reviewId, "Review unpublished.");
}

export async function createReviewReply(reviewId: string, content: string): Promise<ReviewActionResult> {
  if (!validLength(content, 2000)) return failure("Reply must be between 1 and 2,000 characters.");
  return runIdMutation("create_review_reply", { p_review_id: reviewId, p_content: content }, "Reply posted.", reviewId);
}

export async function updateReviewReply(replyId: string, reviewId: string, content: string): Promise<ReviewActionResult> {
  if (!validLength(content, 2000)) return failure("Reply must be between 1 and 2,000 characters.");
  return runBooleanMutation("update_review_reply", { p_reply_id: replyId, p_content: content }, reviewId, "Reply updated.");
}

export async function deleteReviewReply(replyId: string, reviewId: string): Promise<ReviewActionResult> {
  return runBooleanMutation("delete_review_reply", { p_reply_id: replyId }, reviewId, "Reply deleted.");
}

async function runIdMutation(
  functionName: "publish_review" | "create_review_reply",
  args: Record<string, string>,
  message: string,
  reviewId?: string,
): Promise<ReviewActionResult> {
  const auth = await getAuthenticatedClient();
  if (!auth) return failure("Sign in to continue.");
  if (Object.values(args).some((value, index) => index === 0 && !isUuid(value))) return failure("Invalid review request.");
  const { data, error } = await auth.rpc(functionName, args);
  if (error) return failure(error.message || "Review could not be updated.");
  const id = String(data);
  revalidateReviewPaths(reviewId ?? id);
  return { success: true, id, message };
}

async function runBooleanMutation(
  functionName: "update_public_review" | "unpublish_review" | "update_review_reply" | "delete_review_reply",
  args: Record<string, string>,
  reviewId: string,
  message: string,
): Promise<ReviewActionResult> {
  if (!isUuid(reviewId)) return failure("Invalid review.");
  const auth = await getAuthenticatedClient();
  if (!auth) return failure("Sign in to continue.");
  const { data, error } = await auth.rpc(functionName, args);
  if (error) return failure(error.message || "Review could not be updated.");
  if (data !== true) return failure("The item was not found or you do not have permission.");
  revalidateReviewPaths(reviewId);
  return { success: true, message };
}

async function getAuthenticatedClient() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  return error || !data.user ? null : supabase;
}

function revalidateReviewPaths(reviewId: string) {
  revalidatePath(`/reviews/${reviewId}`);
  revalidatePath("/library");
  revalidatePath("/dashboard");
  revalidatePath("/profile");
  revalidatePath("/notifications");
}

function validLength(value: string, maximum: number) {
  const length = value.trim().length;
  return length >= 1 && length <= maximum;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function failure(message: string): ReviewActionResult {
  return { success: false, message };
}
