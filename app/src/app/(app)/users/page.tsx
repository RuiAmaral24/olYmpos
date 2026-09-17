import Link from "next/link";
import { Search, Sparkles, UserRoundSearch } from "lucide-react";

import { UserResultRow } from "@/components/profile/user-result-row";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { searchUsers } from "@/lib/supabase/public-profiles";
import { cn } from "@/lib/utils";

type UsersPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = (rawQuery ?? "").trim().slice(0, 50);
  const users = await searchUsers(query);

  return (
    <div className="space-y-9 pb-14">
      <section className="space-y-3 pt-4 sm:pt-6">
        <div className="flex items-center gap-3 text-[#9b6dff]">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-[0.24em]">
            Community
          </span>
        </div>
        <div className="relative">
          <UserRoundSearch
            aria-hidden="true"
            className="pointer-events-none absolute -left-4 top-1/2 h-16 w-16 -translate-y-1/2 text-[#8b5cf6] opacity-[0.08]"
          />
          <h1 className="editorial-title relative bg-[linear-gradient(135deg,#f3f0ff,#d4c5f9,#c4b5fd)] bg-clip-text text-5xl font-normal leading-none text-transparent sm:text-6xl">
            Discover People
          </h1>
        </div>
        <p className="text-base font-medium text-[#b8c1ec] sm:text-lg">
          Find and follow people across your olYmpos.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl space-y-6" aria-labelledby="people-results-title">
        <form
          action="/users"
          method="get"
          className="premium-panel flex flex-col gap-3 rounded-[24px] border border-white/8 p-4 sm:flex-row sm:items-center sm:p-5"
        >
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search people</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b5cf6]" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              maxLength={50}
              placeholder="Search by username or display name"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.045] pl-11 pr-4 text-sm text-white outline-none placeholder:text-[#747d94] focus:border-[#8b5cf6]/55 focus:ring-2 focus:ring-[#8b5cf6]/20"
            />
          </label>
          <button
            type="submit"
            className={cn(buttonVariants("primary"), "h-11 rounded-xl px-5")}
          >
            Search
          </button>
          {query ? (
            <Link
              href="/users"
              className={cn(buttonVariants("ghost"), "h-11 rounded-xl px-4")}
            >
              Clear
            </Link>
          ) : null}
        </form>

        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="people-results-title" className="section-subtitle">
              {query ? "Search Results" : "Recently Joined"}
            </h2>
            <p className="mt-2 text-sm text-[#858ea6]">
              {query
                ? `${users.length} member${users.length === 1 ? "" : "s"} found`
                : "New members across the community"}
            </p>
          </div>
        </div>

        {users.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {users.map((user) => (
              <UserResultRow key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <EmptyState
            eyebrow="People Search"
            title={query ? "No members found" : "No community members yet"}
            description={
              query
                ? "Try another username or display name."
                : "New olYmpos members will appear here when they join."
            }
            icon={<UserRoundSearch className="h-5 w-5" />}
          />
        )}
      </section>
    </div>
  );
}
