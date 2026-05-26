"use client";

import { Search, SlidersHorizontal, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categoryFilters = ["All", "Anime", "Movies", "Games"] as const;
const statusFilters = [
  "All Status",
  "Favorites",
  "Completed",
  "Watching / Playing",
  "Planned",
] as const;
const sortOptions = ["Recently Added", "Highest Rated", "Alphabetical"] as const;

type LibraryFilterBarProps = {
  resultsCount: number;
  searchValue: string;
  activeCategory: CategoryFilter;
  activeStatus: StatusFilter;
  sortValue: SortOption;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: CategoryFilter) => void;
  onStatusChange: (value: StatusFilter) => void;
  onSortChange: (value: SortOption) => void;
};

type CategoryFilter = (typeof categoryFilters)[number];
type StatusFilter = (typeof statusFilters)[number];
type SortOption = (typeof sortOptions)[number];

export function LibraryFilterBar({
  resultsCount,
  searchValue,
  activeCategory,
  activeStatus,
  sortValue,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
}: LibraryFilterBarProps) {
  return (
    <Card className="space-y-6 border border-white/8 bg-[linear-gradient(180deg,rgba(18,27,43,0.94),rgba(10,14,24,0.98))]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <Badge className="w-fit border-white/12 bg-white/8 text-[#d7def1]">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            Library signal
          </Badge>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
              Your Library
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[#aeb8cf] sm:text-base">
              Browse and manage your anime, movies, and games.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#d3dbef]">
          <SlidersHorizontal className="h-4 w-4 text-accent-secondary" />
          <span>{resultsCount} items visible</span>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(260px,300px)]">
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.26em] text-[#92a2be]">
              Search
            </p>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#92a2be]" />
              <Input
                value={searchValue}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search by title, status, or category"
                className="pl-10"
              />
            </div>
          </div>
          <FilterGroup
            label="Category"
            items={categoryFilters}
            activeItem={activeCategory}
            onChange={onCategoryChange}
          />
          <FilterGroup
            label="Status"
            items={statusFilters}
            activeItem={activeStatus}
            onChange={onStatusChange}
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.26em] text-[#92a2be]">
            Sort By
          </p>
          <label className="block">
            <span className="sr-only">Sort library items</span>
            <select
              value={sortValue}
              onChange={(event) => onSortChange(event.target.value as SortOption)}
              className={cn(
                "h-12 w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-sm text-foreground outline-none",
                "focus:border-white/20 focus:ring-2 focus:ring-[var(--ring)]",
              )}
            >
              {sortOptions.map((option) => (
                <option key={option} value={option} className="bg-surface text-foreground">
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </Card>
  );
}

type FilterGroupProps<T extends string> = {
  label: string;
  items: readonly T[];
  activeItem: T;
  onChange: (item: T) => void;
};

function FilterGroup<T extends string>({
  label,
  items,
  activeItem,
  onChange,
}: FilterGroupProps<T>) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.26em] text-[#92a2be]">{label}</p>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => {
          const isActive = item === activeItem;

          return (
            <button
              type="button"
              key={item}
              className={cn(
                "inline-flex h-11 items-center rounded-full border px-4 text-sm transition",
                isActive
                  ? "border-[rgba(124,108,255,0.55)] bg-[linear-gradient(135deg,rgba(124,108,255,0.22),rgba(78,161,255,0.16))] text-white shadow-[0_12px_30px_rgba(78,161,255,0.14)]"
                  : "border-white/10 bg-white/6 text-[#b8c2d6]",
              )}
              onClick={() => onChange(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
