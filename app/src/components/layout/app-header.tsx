"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { Bell, Search, Settings } from "lucide-react";

import { BrandLockup } from "@/components/ui/brand-lockup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logout } from "@/lib/supabase/auth";

type AppHeaderProps = {
  user: User;
};

export function AppHeader({ user }: AppHeaderProps) {
  const pathname = usePathname();
  const pageMeta = getPageMeta(pathname);
  const displayName =
    typeof user.user_metadata?.username === "string"
      ? user.user_metadata.username
      : user.email?.split("@")[0] ?? "olYmpos";
  const initials = getInitials(displayName);

  return (
    <header className="premium-panel relative z-20 rounded-[30px] px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <BrandLockup href="/" compact />
            <div className="hidden h-12 w-px bg-white/8 lg:block" />
            <div className="space-y-1.5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-accent-secondary">
                {pageMeta.label}
              </p>
              <p className="text-sm text-[#aeb8cf]">
                {pageMeta.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 xl:hidden">
            <HeaderIcon aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </HeaderIcon>
            <HeaderIcon aria-label="Settings">
              <Settings className="h-4 w-4" />
            </HeaderIcon>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-3 xl:max-w-3xl xl:justify-end">
          <div className="relative w-full xl:max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search"
              placeholder={pageMeta.searchPlaceholder}
              className="pl-10"
            />
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <HeaderIcon aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </HeaderIcon>
            <HeaderIcon aria-label="Settings">
              <Settings className="h-4 w-4" />
            </HeaderIcon>
          </div>

          <Link
            href="/profile"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm font-semibold text-foreground transition hover:border-white/16 hover:bg-white/10 sm:flex"
            aria-label={displayName}
            title={displayName}
          >
            {initials}
          </Link>

          <form action={logout}>
            <Button type="submit" variant="secondary" className="h-10 px-4">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}

function getInitials(name: string) {
  return name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

type HeaderIconProps = {
  "aria-label": string;
  children: React.ReactNode;
};

function HeaderIcon({ children, ...props }: HeaderIconProps) {
  return (
    <button
      type="button"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-muted-foreground transition hover:text-foreground"
      {...props}
    >
      {children}
    </button>
  );
}

function getPageMeta(pathname: string) {
  if (pathname.startsWith("/library")) {
    return {
      label: "Library",
      description: "Browse and manage your universe.",
      searchPlaceholder: "Search your library",
    };
  }

  if (pathname.startsWith("/profile")) {
    return {
      label: "Profile",
      description: "Identity, taste, and activity at a glance.",
      searchPlaceholder: "Search favorites and reviews",
    };
  }

  if (pathname.startsWith("/details")) {
    return {
      label: "Details",
      description: "Deep dive into a title inside olYmpos.",
      searchPlaceholder: "Search related titles",
    };
  }

  return {
    label: "Dashboard",
    description: "Your cross-category tracking overview.",
    searchPlaceholder: "Search your library",
  };
}
