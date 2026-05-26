"use client";

import type { ReactNode } from "react";

import type { User } from "@supabase/supabase-js";
import { Bell, LogOut, Search, Settings, Zap } from "lucide-react";
import { Cinzel } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { logout } from "@/lib/supabase/auth";

type AppHeaderProps = {
  user: User;
};

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export function AppHeader({ user }: AppHeaderProps) {
  const pathname = usePathname();
  const pageMeta = getPageMeta(pathname);
  const displayName =
    typeof user.user_metadata?.username === "string"
      ? user.user_metadata.username
      : user.email?.split("@")[0] ?? "olYmpos";
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
          <div className="relative w-full max-w-[320px]">
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
            <HeaderIcon aria-label="Notifications" hasDot>
              <Bell className="h-5 w-5" />
            </HeaderIcon>
            <HeaderIcon aria-label="Settings">
              <Settings className="h-5 w-5" />
            </HeaderIcon>
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

type HeaderIconProps = {
  "aria-label": string;
  children: ReactNode;
  hasDot?: boolean;
};

function HeaderIcon({ children, hasDot = false, ...props }: HeaderIconProps) {
  return (
    <button
      type="button"
      className="relative inline-flex h-[42px] w-[42px] items-center justify-center rounded-xl text-[#c8d2f0] transition hover:bg-white/[0.04] hover:text-white"
      {...props}
    >
      {children}
      {hasDot ? (
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#8b5cf6]" />
      ) : null}
    </button>
  );
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

  return {
    searchPlaceholder: "Search anime, movies, games...",
  };
}
