"use server";

import { revalidatePath } from "next/cache";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type SettingsActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

const usernamePattern = /^[A-Za-z0-9_-]+$/;

export async function updateProfile(
  _previousState: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const username = String(formData.get("username") ?? "").trim();
  const displayName = String(formData.get("displayName") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();

  if (!username) {
    return errorResult("Username is required.");
  }

  if (username.length < 3 || username.length > 30) {
    return errorResult("Username must be between 3 and 30 characters.");
  }

  if (!usernamePattern.test(username)) {
    return errorResult("Username can only use letters, numbers, underscores, and hyphens.");
  }

  if (displayName.length > 80) {
    return errorResult("Display name must be 80 characters or fewer.");
  }

  if (bio.length > 500) {
    return errorResult("Bio must be 500 characters or fewer.");
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return errorResult("Your session has expired. Sign in again to update your profile.");
  }

  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  const { error } = await supabase
    .from("profiles")
    .update({
      username,
      full_name: displayName || null,
      bio: bio || null,
    })
    .eq("id", user.id);

  if (error?.code === "23505") {
    return errorResult("That username is already in use.");
  }

  if (error) {
    return errorResult("We couldn't update your profile. Please try again.");
  }

  revalidatePath("/", "layout");
  revalidatePath("/profile");
  revalidatePath("/settings");
  revalidatePath(`/users/${username}`);

  if (currentProfile?.username && currentProfile.username !== username) {
    revalidatePath(`/users/${currentProfile.username}`);
  }

  return {
    status: "success",
    message: "Profile updated.",
  };
}

export async function updatePassword(
  _previousState: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!password || !confirmPassword) {
    return errorResult("Enter and confirm your new password.");
  }

  if (password.length < 6) {
    return errorResult("Password must be at least 6 characters.");
  }

  if (password !== confirmPassword) {
    return errorResult("Passwords do not match.");
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return errorResult("Your session has expired. Sign in again to change your password.");
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return errorResult(error.message);
  }

  return {
    status: "success",
    message: "Password updated.",
  };
}

function errorResult(message: string): SettingsActionState {
  return { status: "error", message };
}
