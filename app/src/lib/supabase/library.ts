import { mapLibraryItemRow, type LibraryItemRow } from "@/lib/library-mapper";
import { createServerSupabaseClient } from "@/lib/supabase/server";

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

export async function getUserProfile() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    email: user.email,
    username:
      data?.full_name ??
      data?.username ??
      user.user_metadata?.username ??
      user.email?.split("@")[0] ??
      "olYmpos user",
    bio:
      data?.bio ??
      "Building a personal olYmpos across anime, movies, and games.",
    avatarUrl: data?.avatar_url ?? null,
  };
}
