import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { getCurrentUser } from "@/lib/supabase/auth";

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

export const dynamic = "force-dynamic";

export default async function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <AppShell user={user}>{children}</AppShell>;
}
