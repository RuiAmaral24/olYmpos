import type { ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

import { AppHeader } from "@/components/layout/app-header";

type AppShellProps = {
  children: ReactNode;
  user: User;
};

export function AppShell({ children, user }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_18%_8%,rgba(139,92,246,0.09),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(59,130,246,0.08),transparent_32%),linear-gradient(180deg,#0d111f_0%,#080b14_42%,#05070d_100%)]">
      <AppHeader user={user} />
      <div className="mx-auto flex min-h-[calc(100vh-77px)] w-full max-w-[1600px] flex-col px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
