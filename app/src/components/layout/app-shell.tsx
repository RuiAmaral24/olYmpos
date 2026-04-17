import type { ReactNode } from "react";

import { AppHeader } from "@/components/layout/app-header";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <AppHeader />
        <main className="flex-1 pt-1">
          {children}
        </main>
      </div>
    </div>
  );
}
