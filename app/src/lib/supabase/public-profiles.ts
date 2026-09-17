import { cache } from "react";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { FollowRelationship, PublicUserProfile, SocialUser, SocialUserPage } from "@/types";

const discoveryLimit = 20;
const socialPageSize = 20;

type ViewerProfileRow = {
  id: string; username: string; full_name: string | null; bio: string | null;
  avatar_url: string | null; created_at: string; profile_visibility: string;
  relationship: string; can_view_private_content: boolean;
  followers_count: number | string; following_count: number | string;
};

type SocialListRow = ViewerProfileRow & { allowed: boolean };

export const getPublicProfileByUsername = cache(async (username: string): Promise<PublicUserProfile | null> => {
  const normalizedUsername = username.trim();
  if (!normalizedUsername || normalizedUsername.length > 30) return null;
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("get_profile_for_viewer", { profile_username: normalizedUsername });
  if (error) throw new Error(`Public profile could not be loaded: ${error.message}`);
  const row = (data?.[0] ?? null) as ViewerProfileRow | null;
  return row ? mapProfile(row) : null;
});

export async function searchUsers(query: string): Promise<SocialUser[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("discover_profiles", {
    search_query: query.trim().slice(0, 50), result_limit: discoveryLimit,
  });
  if (error) throw new Error(`People search could not be completed: ${error.message}`);
  return ((data ?? []) as ViewerProfileRow[]).map(mapProfile);
}

export async function getRecentUsers(): Promise<SocialUser[]> { return searchUsers(""); }

export async function getFollowersPage(userId: string, page: number) {
  return getSocialUserPage(userId, page, "followers");
}

export async function getFollowingPage(userId: string, page: number) {
  return getSocialUserPage(userId, page, "following");
}

async function getSocialUserPage(userId: string, page: number, kind: "followers" | "following"): Promise<SocialUserPage> {
  const safePage = Math.min(10_000, Math.max(1, Math.floor(page)));
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("get_profile_social_list", {
    profile_id: userId, list_kind: kind, page_limit: socialPageSize + 1,
    page_offset: (safePage - 1) * socialPageSize,
  });
  if (error) throw new Error(`${kind === "followers" ? "Followers" : "Following"} could not be loaded: ${error.message}`);
  const rows = (data ?? []) as SocialListRow[];
  const canView = rows.length === 0 || rows[0].allowed;
  const visibleRows = canView ? rows.slice(0, socialPageSize) : [];
  return { items: visibleRows.map(mapProfile), page: safePage, hasNextPage: rows.length > socialPageSize, hasPreviousPage: safePage > 1, canView };
}

function mapProfile(row: ViewerProfileRow): PublicUserProfile {
  return {
    id: row.id, username: row.username, displayName: row.full_name, bio: row.bio,
    avatarUrl: row.avatar_url, createdAt: row.created_at,
    profileVisibility: row.profile_visibility === "private" ? "private" : "public",
    relationship: normalizeRelationship(row.relationship),
    canViewPrivateContent: Boolean(row.can_view_private_content),
    followersCount: Number(row.followers_count) || 0,
    followingCount: Number(row.following_count) || 0,
  };
}

function normalizeRelationship(value: string): FollowRelationship {
  return value === "self" || value === "requested" || value === "following" ? value : "none";
}
