"use server";

import { redirect } from "next/navigation";

import {
  createServerSupabaseClient,
  hasSupabaseEnv,
} from "@/lib/supabase/server";

const authErrorParam = (message: string) =>
  `error=${encodeURIComponent(message)}`;

async function ensureProfile(user: {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}) {
  const supabase = await createServerSupabaseClient();
  const username =
    typeof user.user_metadata?.username === "string"
      ? user.user_metadata.username
      : user.email?.split("@")[0] ?? "olympos-user";

  await supabase.from("profiles").upsert(
    {
      id: user.id,
      username,
      full_name:
        typeof user.user_metadata?.full_name === "string"
          ? user.user_metadata.full_name
          : null,
    },
    { onConflict: "id" },
  );
}

export async function login(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect(`/login?${authErrorParam("Supabase is not configured yet.")}`);
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email.trim() || !password) {
    redirect(`/login?${authErrorParam("Email and password are required.")}`);
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/login?${authErrorParam(error.message)}`);
  }

  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect(`/signup?${authErrorParam("Supabase is not configured yet.")}`);
  }

  const username = String(formData.get("username") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm-password") ?? "");

  if (!username || !email || !password) {
    redirect(`/signup?${authErrorParam("Username, email, and password are required.")}`);
  }

  if (password.length < 6) {
    redirect(`/signup?${authErrorParam("Password must be at least 6 characters.")}`);
  }

  if (password !== confirmPassword) {
    redirect(`/signup?${authErrorParam("Passwords do not match.")}`);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    redirect(`/signup?${authErrorParam(error.message)}`);
  }

  if (data.user && data.session) {
    await ensureProfile(data.user);
    redirect("/dashboard");
  }

  redirect(
    "/login?message=Check%20your%20email%20to%20confirm%20your%20account.",
  );
}

export async function logout() {
  if (!hasSupabaseEnv()) {
    redirect("/login");
  }

  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function getCurrentUser() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
