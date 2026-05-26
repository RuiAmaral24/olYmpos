import type { ReactNode } from "react";

import { PublicNavbar } from "@/components/layout/public-navbar";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <main className="mx-auto flex min-h-[calc(100vh-68px)] w-full max-w-7xl px-4 pt-5 sm:px-6 sm:pt-8 lg:px-8">
        {children}
      </main>
    </div>
  );
}
