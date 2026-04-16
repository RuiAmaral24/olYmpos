import type { ReactNode } from "react";

import { PublicNavbar } from "@/components/layout/public-navbar";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-7xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}
