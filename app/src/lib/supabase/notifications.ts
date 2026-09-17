import { cache } from "react";

import { getSafeNotificationTarget } from "@/lib/notifications";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Notification, NotificationRow } from "@/types";

type NotificationListOptions = {
  limit?: number;
  offset?: number;
};

export async function getUserNotifications({
  limit = 50,
  offset = 0,
}: NotificationListOptions = {}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error("Authenticated user could not be verified.");
  }

  if (!user) {
    return [];
  }

  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const safeOffset = Math.max(offset, 0);

  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(safeOffset, safeOffset + safeLimit - 1);

    if (error) {
      console.error(
        "[notifications] Failed to load notification history.",
        JSON.stringify({ error: getSupabaseErrorDetails(error) }),
      );
      return [];
    }

    return ((data ?? []) as NotificationRow[]).map(mapNotificationRow);
  } catch (error) {
    console.error(
      "[notifications] Notification history query failed unexpectedly.",
      JSON.stringify({ error: getSupabaseErrorDetails(error) }),
    );
    return [];
  }
}

export const getNotificationOverview = cache(async () => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error("Authenticated user could not be verified.");
  }

  if (!user) {
    return emptyNotificationOverview();
  }

  try {
    const [recentResult, countResult] = await Promise.all([
      supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .is("read_at", null),
    ]);

    if (recentResult.error || countResult.error) {
      console.error(
        "[notifications] Failed to load the navbar notification overview.",
        JSON.stringify({
          recentError: getSupabaseErrorDetails(recentResult.error),
          countError: getSupabaseErrorDetails(countResult.error),
        }),
      );

      return emptyNotificationOverview();
    }

    return {
      recent: ((recentResult.data ?? []) as NotificationRow[]).map(mapNotificationRow),
      unreadCount: countResult.count ?? 0,
    };
  } catch (error) {
    console.error(
      "[notifications] Navbar notification queries failed unexpectedly.",
      JSON.stringify({ error: getSupabaseErrorDetails(error) }),
    );
    return emptyNotificationOverview();
  }
});

function emptyNotificationOverview() {
  return { recent: [] as Notification[], unreadCount: 0 };
}

function getSupabaseErrorDetails(error: unknown) {
  if (!error || typeof error !== "object") {
    return { message: String(error ?? "Unknown notification query error") };
  }

  const value = error as Record<string, unknown>;

  return {
    message: typeof value.message === "string" ? value.message : "Unknown notification query error",
    code: typeof value.code === "string" ? value.code : null,
    details: typeof value.details === "string" ? value.details : null,
    hint: typeof value.hint === "string" ? value.hint : null,
  };
}

function mapNotificationRow(row: NotificationRow): Notification {
  return {
    id: row.id,
    type: row.type,
    actorUserId: row.actor_user_id,
    title: row.title,
    body: row.body,
    targetUrl: getSafeNotificationTarget(row.target_url),
    relatedEntityType: row.related_entity_type,
    relatedEntityId: row.related_entity_id,
    payload: row.payload ?? {},
    readAt: row.read_at,
    createdAt: row.created_at,
  };
}
