import type { ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

import { AppHeader } from "@/components/layout/app-header";

type AppShellProps = {
  children: ReactNode;
  user: User;
};

export function AppShell({ children, user }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-3 py-3 sm:gap-5 sm:px-6 sm:py-6 lg:px-8">
        <AppHeader user={user} />
        <main className="flex-1 pt-1">
          {children}
        </main>
      </div>
    </div>
  );
}
