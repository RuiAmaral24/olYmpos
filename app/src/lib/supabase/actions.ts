"use server";

import { revalidatePath } from "next/cache";

import {
  formValuesToLibraryPayload,
  mapLibraryItemRow,
  type LibraryItemRow,
} from "@/lib/library-mapper";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUserLibraryItem } from "@/lib/supabase/library";
import type { EntryFormValues } from "@/types";

const itemSelect = "*, reviews(*)";

export async function saveLibraryItem(values: EntryFormValues, itemId?: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in to save library items.");
  }

  if (!values.title.trim()) {
    throw new Error("A title is required before saving.");
  }

  if (!Number.isFinite(values.rating) || values.rating < 0 || values.rating > 5) {
    throw new Error("Rating must be between 0 and 5.");
  }

  const payload = formValuesToLibraryPayload(values, user.id);
  const query = itemId
    ? supabase
        .from("library_items")
        .update(payload)
        .eq("id", itemId)
        .eq("user_id", user.id)
        .select(itemSelect)
        .single()
    : supabase.from("library_items").insert(payload).select(itemSelect).single();

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const savedItem = mapLibraryItemRow(data as LibraryItemRow);
  await upsertReview(savedItem.id, user.id, values.notes);
  revalidateLibraryPaths(savedItem.id);

  const { item } = await getUserLibraryItem(savedItem.id);
  return item ?? savedItem;
}

export async function deleteLibraryItem(itemId: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in to delete library items.");
  }

  const { error } = await supabase
    .from("library_items")
    .delete()
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateLibraryPaths(itemId);
}

export async function toggleLibraryItemFavorite(itemId: string, isFavorite: boolean) {
  await updateLibraryItemFields(itemId, {
    is_favorite: isFavorite,
  });
}

export async function markLibraryItemCompleted(itemId: string) {
  const { item } = await getUserLibraryItem(itemId);

  if (!item) {
    throw new Error("Library item not found.");
  }

  const progress =
    item.category === "anime"
      ? {
          ...item.progress,
          currentEpisode: item.progress.totalEpisodes,
          percentComplete: 100,
        }
      : item.category === "movie"
        ? {
            ...item.progress,
            watched: true,
            completed: true,
            percentComplete: 100,
          }
        : {
            ...item.progress,
            completionPercent: 100,
          };

  await updateLibraryItemFields(itemId, {
    status: "completed",
    progress_json: progress,
  });
}

async function upsertReview(itemId: string, userId: string, content: string) {
  const supabase = await createServerSupabaseClient();
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("library_item_id", itemId)
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return;
  }

  const { data: existingReview, error: existingError } = await supabase
    .from("reviews")
    .select("id")
    .eq("library_item_id", itemId)
    .eq("user_id", userId)
    .maybeSingle();

  if (existingError) {
    throw new Error(existingError.message);
  }

  const query = existingReview
    ? supabase
        .from("reviews")
        .update({ content: trimmedContent })
        .eq("id", existingReview.id)
        .eq("user_id", userId)
    : supabase.from("reviews").insert({
        user_id: userId,
        library_item_id: itemId,
        content: trimmedContent,
      });

  const { error } = await query;

  if (error) {
    throw new Error(error.message);
  }
}

async function updateLibraryItemFields(
  itemId: string,
  fields: Record<string, unknown>,
) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in to update library items.");
  }

  const { error } = await supabase
    .from("library_items")
    .update(fields)
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateLibraryPaths(itemId);
}

function revalidateLibraryPaths(itemId: string) {
  revalidatePath("/dashboard");
  revalidatePath("/library");
  revalidatePath("/profile");
  revalidatePath(`/details/${itemId}`);
}
