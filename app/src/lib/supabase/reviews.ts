import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { MediaCategory, PublicReview, ReviewReply } from "@/types";

type PublicReviewRow = {
  id: string;
  content: string;
  rating: number | string | null;
  media_title: string;
  media_category: string;
  media_cover_url: string | null;
  media_year: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_id: string;
  author_username: string;
  author_full_name: string | null;
  author_avatar_url: string | null;
  author_profile_visibility: string;
  is_owner: boolean;
};

type ReviewReplyRow = {
  id: string;
  review_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author_id: string;
  author_username: string;
  author_full_name: string | null;
  author_avatar_url: string | null;
  is_owner: boolean;
};

export async function getReviewById(reviewId: string): Promise<PublicReview | null> {
  if (!isUuid(reviewId)) return null;
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("get_review_for_viewer", {
    p_review_id: reviewId,
  });
  if (error) throw new Error(`Review could not be loaded: ${error.message}`);
  const row = (data?.[0] ?? null) as PublicReviewRow | null;
  return row ? mapReview(row) : null;
}

export async function getReviewReplies(reviewId: string): Promise<ReviewReply[]> {
  if (!isUuid(reviewId)) return [];
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("get_review_replies", {
    p_review_id: reviewId,
    p_limit: 200,
    p_offset: 0,
  });
  if (error) throw new Error(`Replies could not be loaded: ${error.message}`);
  return ((data ?? []) as ReviewReplyRow[]).map(mapReply);
}

function mapReview(row: PublicReviewRow): PublicReview {
  return {
    id: row.id,
    content: row.content,
    rating: row.rating === null ? null : Number(row.rating),
    mediaTitle: row.media_title,
    mediaCategory: normalizeCategory(row.media_category),
    mediaCoverUrl: row.media_cover_url,
    mediaYear: row.media_year,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    author: {
      id: row.author_id,
      username: row.author_username,
      displayName: row.author_full_name,
      avatarUrl: row.author_avatar_url,
      profileVisibility: row.author_profile_visibility === "private" ? "private" : "public",
    },
    isOwner: row.is_owner,
  };
}

function mapReply(row: ReviewReplyRow): ReviewReply {
  return {
    id: row.id,
    reviewId: row.review_id,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    author: {
      id: row.author_id,
      username: row.author_username,
      displayName: row.author_full_name,
      avatarUrl: row.author_avatar_url,
    },
    isOwner: row.is_owner,
  };
}

function normalizeCategory(value: string): MediaCategory {
  return value === "movie" || value === "game" ? value : "anime";
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
