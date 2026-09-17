import { cache } from "react";

import { mapLibraryItemRow, type LibraryItemRow } from "@/lib/library-mapper";
import { getCurrentUser } from "@/lib/supabase/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/types";

const itemSelect = "*, reviews(*)";

export async function getUserLibraryItems() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("library_items")
    .select(itemSelect)
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as LibraryItemRow[]).map(mapLibraryItemRow);
}

export async function getUserLibraryItem(id: string) {
  const items = await getUserLibraryItems();
  return {
    item: items.find((entry) => entry.id === id) ?? null,
    items,
  };
}

export const getUserProfile = cache(async (): Promise<UserProfile | null> => {
  const supabase = await createServerSupabaseClient();
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    email: user.email ?? null,
    username:
      data?.username ??
      user.user_metadata?.username ??
      user.email?.split("@")[0] ??
      "olympos-user",
    displayName: data?.full_name ?? null,
    bio: data?.bio ?? null,
    avatarUrl: data?.avatar_url ?? null,
    createdAt: data?.created_at ?? user.created_at,
    profileVisibility: data?.profile_visibility === "private" ? "private" : "public",
  };
});
