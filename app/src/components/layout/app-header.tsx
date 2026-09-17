"use client";

import { LogOut, Search, Settings, Zap } from "lucide-react";
import { Cinzel } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NotificationBell } from "@/components/notifications/notification-bell";
import { logout } from "@/lib/supabase/auth";
import type { Notification, UserProfile } from "@/types";

type AppHeaderProps = {
  notificationOverview: {
    recent: Notification[];
    unreadCount: number;
  };
  profile: UserProfile;
};

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export function AppHeader({ notificationOverview, profile }: AppHeaderProps) {
  const pathname = usePathname();
  const pageMeta = getPageMeta(pathname);
  const displayName =
    profile?.displayName?.trim() ||
    profile?.username ||
    profile.email?.split("@")[0] ||
    "olYmpos";
  const initials = getInitials(displayName);

  return (
    <header className="sticky top-0 z-30 border-b border-[#1c2135] bg-[#090a12]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[77px] w-full max-w-[1600px] items-center justify-between gap-5 px-5 sm:px-7 lg:px-8">
        <Link
          href="/dashboard"
          className="flex shrink-0 items-center gap-3 text-[#e9e3ff] transition hover:text-white"
          aria-label="olYmpos dashboard"
        >
          <span className="relative flex h-8 w-8 items-center justify-center text-[#8b5cf6]">
            <Zap className="h-7 w-7 fill-current" />
            <span className="absolute inset-0 bg-[#8b5cf6]/35 blur-xl" />
          </span>
          <span className={`${cinzel.className} text-[1.35rem] font-medium uppercase leading-none tracking-[-0.02em]`}>
            OLYMPOS
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 justify-center md:flex">
          <div className="relative w-full max-w-[360px] translate-x-6 lg:max-w-[420px] lg:translate-x-24 xl:translate-x-68">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b5cf6]/70" />
            <input
              aria-label="Search"
              placeholder={pageMeta.searchPlaceholder}
              className="h-[42px] w-full rounded-xl border border-[#33265c] bg-[#141322]/78 pl-12 pr-4 text-sm text-[#f3f0ff] outline-none placeholder:text-[#7d758d] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition hover:border-[#46327b] focus:border-[#8b5cf6]/65 focus:ring-2 focus:ring-[#8b5cf6]/25"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-2">
            <NotificationBell
              key={`${notificationOverview.unreadCount}:${notificationOverview.recent[0]?.id ?? "empty"}`}
              initialNotifications={notificationOverview.recent}
              initialUnreadCount={notificationOverview.unreadCount}
            />
            <Link
              href="/settings"
              aria-label="Settings"
              className="relative inline-flex h-[42px] w-[42px] items-center justify-center rounded-xl text-[#c8d2f0] transition hover:bg-white/[0.04] hover:text-white"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>

          <Link
            href="/profile"
            className="hidden h-[42px] items-center gap-3 rounded-xl border border-[#3e2d6e] bg-[linear-gradient(135deg,rgba(139,92,246,0.24),rgba(79,70,229,0.18))] py-2 pl-3 pr-4 text-[#efe9ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-[#6d53b8] hover:bg-[linear-gradient(135deg,rgba(139,92,246,0.3),rgba(79,70,229,0.22))] sm:flex"
            aria-label={displayName}
            title={displayName}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8b5cf6,#6d5df7)] text-sm font-bold text-white">
              {initials}
            </span>
            <span className="hidden max-w-[8.5rem] truncate text-sm font-semibold lg:block">
              {displayName}
            </span>
          </Link>

          <form action={logout} className="shrink-0">
            <button
              type="submit"
              className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl border border-[#2a2445] bg-[#0b0c17] px-4 text-sm font-semibold text-[#d8d1ef] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition hover:border-[#4d3a82] hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[#1c2135] px-5 py-3 md:hidden">
        <div className="relative mx-auto max-w-[420px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b5cf6]/70" />
          <input
            aria-label="Search"
            placeholder={pageMeta.searchPlaceholder}
            className="h-[42px] w-full rounded-xl border border-[#33265c] bg-[#141322]/78 pl-12 pr-4 text-sm text-[#f3f0ff] outline-none placeholder:text-[#7d758d] focus:border-[#8b5cf6]/65 focus:ring-2 focus:ring-[#8b5cf6]/25"
          />
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

function getPageMeta(pathname: string) {
  if (pathname.startsWith("/library")) {
    return {
      searchPlaceholder: "Search your library",
    };
  }

  if (pathname.startsWith("/profile")) {
    return {
      searchPlaceholder: "Search favorites and reviews",
    };
  }

  if (pathname.startsWith("/details")) {
    return {
      searchPlaceholder: "Search related titles",
    };
  }

  if (pathname.startsWith("/settings")) {
    return {
      searchPlaceholder: "Search your olYmpos",
    };
  }

  if (pathname.startsWith("/notifications")) {
    return {
      searchPlaceholder: "Search your notifications",
    };
  }

  return {
    searchPlaceholder: "Search anime, movies, games...",
  };
}
