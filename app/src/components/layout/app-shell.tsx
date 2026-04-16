import type { ReactNode } from "react";

import { AppHeader } from "@/components/layout/app-header";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <AppHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
