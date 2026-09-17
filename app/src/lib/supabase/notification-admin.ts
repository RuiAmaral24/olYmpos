import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getSafeNotificationTarget } from "@/lib/notifications";

type CreateNotificationInput = {
  userId: string;
  type: string;
  actorUserId?: string | null;
  title: string;
  body?: string | null;
  targetUrl?: string | null;
  relatedEntityType?: string | null;
  relatedEntityId?: string | null;
  payload?: Record<string, unknown>;
  dedupeKey?: string | null;
};

export async function createNotification(input: CreateNotificationInput) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Trusted notification creation is not configured.");
  }

  if (!isUuid(input.userId)) {
    throw new Error("A valid notification recipient is required.");
  }

  const type = input.type.trim();
  const title = input.title.trim();
  const targetUrl = input.targetUrl
    ? getSafeNotificationTarget(input.targetUrl)
    : null;

  if (!type || !title) {
    throw new Error("Notification type and title are required.");
  }

  if (input.targetUrl && !targetUrl) {
    throw new Error("Notification target must be a safe internal route.");
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: recipient, error: recipientError } = await admin.auth.admin.getUserById(
    input.userId,
  );

  if (recipientError || !recipient.user) {
    throw new Error("Notification recipient does not exist.");
  }

  const { data, error } = await admin
    .from("notifications")
    .insert({
      user_id: input.userId,
      type,
      actor_user_id: input.actorUserId ?? null,
      title,
      body: input.body?.trim() || null,
      target_url: targetUrl,
      related_entity_type: input.relatedEntityType?.trim() || null,
      related_entity_id: input.relatedEntityId ?? null,
      payload: input.payload ?? {},
      dedupe_key: input.dedupeKey?.trim() || null,
    })
    .select("id")
    .single();

  if (error?.code === "23505" && input.dedupeKey) {
    return null;
  }

  if (error) {
    throw new Error("Notification could not be created.");
  }

  return data?.id ?? null;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
