import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { getUserProfile } from "@/lib/supabase/library";
import { getNotificationOverview } from "@/lib/supabase/notifications";

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

export const dynamic = "force-dynamic";

export default async function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  const [profile, notificationOverview] = await Promise.all([
    getUserProfile(),
    getNotificationOverview(),
  ]);

  if (!profile) {
    redirect("/login");
  }

  return (
    <AppShell notificationOverview={notificationOverview} profile={profile}>
      {children}
    </AppShell>
  );
}
