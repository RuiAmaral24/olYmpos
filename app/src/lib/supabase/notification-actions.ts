"use server";

import { revalidatePath } from "next/cache";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type NotificationActionResult = {
  success: boolean;
  message?: string;
};

export async function markNotificationRead(
  id: string,
): Promise<NotificationActionResult> {
  if (!isUuid(id)) {
    return { success: false, message: "Invalid notification." };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Sign in to update notifications." };
  }

  const { data, error } = await supabase.rpc("mark_notification_read", {
    notification_id: id,
  });

  if (error) {
    return { success: false, message: "Notification could not be updated." };
  }

  if (!data) {
    return { success: false, message: "Notification was not found or is already read." };
  }

  revalidateNotificationPaths();
  return { success: true };
}

export async function markAllNotificationsRead(): Promise<NotificationActionResult> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Sign in to update notifications." };
  }

  const { error } = await supabase.rpc("mark_all_notifications_read");

  if (error) {
    return { success: false, message: "Notifications could not be updated." };
  }

  revalidateNotificationPaths();
  return { success: true };
}

function revalidateNotificationPaths() {
  revalidatePath("/", "layout");
  revalidatePath("/notifications");
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
