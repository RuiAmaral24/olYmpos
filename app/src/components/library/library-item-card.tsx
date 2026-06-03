"use client";

import { Film, Gamepad2, Pencil, Star, Tv } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { getCategoryLabel, getProgressLabel, getStatusLabel } from "@/lib/library";
import { getDashboardArtwork } from "@/lib/library-mapper";
import { cn } from "@/lib/utils";
import type { LibraryItem, MediaCategory, TrackingStatus } from "@/types";

export type ShowcaseLibraryItem = {
  id: string;
  title: string;
  category: MediaCategory;
  status: TrackingStatus;
  rating: number;
  isFavorite: boolean;
  coverUrl: string;
  coverAccent: string;
  progressLabel?: string;
  isShowcase: true;
};

type LibraryCardItem = LibraryItem | ShowcaseLibraryItem;

type LibraryItemCardProps = {
  item: LibraryCardItem;
  onEdit?: () => void;
  onToggleFavorite?: () => void;
};

export function LibraryItemCard({
  item,
  onEdit,
  onToggleFavorite,
}: LibraryItemCardProps) {
  const progressLabel =
    "isShowcase" in item ? item.progressLabel : getProgressLabel(item);
  const coverUrl = item.coverUrl ?? getDashboardArtwork(item.category);
  const CategoryIcon = getCategoryIcon(item.category);
  const statusLabel = getStatusLabel(item.status);
  const ratingLabel = item.rating.toFixed(item.rating % 1 === 0 ? 0 : 1);
  const isShowcase = "isShowcase" in item;

  const card = (
    <Card className="h-full overflow-hidden rounded-2xl border border-[#8b5cf6]/20 bg-[linear-gradient(135deg,rgba(26,26,46,0.66),rgba(16,17,32,0.94))] p-0 shadow-[0_24px_70px_rgba(3,7,18,0.34)] transition duration-300 group-hover:-translate-y-1.5 group-hover:border-[#8b5cf6]/45">
      <div className="relative h-72 overflow-hidden sm:h-80">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url("${coverUrl}")` }}
        />
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30", item.coverAccent)} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,15,0.04)_0%,rgba(10,10,15,0.38)_48%,rgba(10,10,15,0.94)_100%)]" />

        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-[#8b5cf6]/30 bg-[#0a0a0f]/80 px-3 py-1.5 text-xs font-semibold capitalize text-[#b8c1ec] backdrop-blur-md">
          <CategoryIcon className="h-3.5 w-3.5 text-[#8b5cf6]" />
          <span>{getCategoryLabel(item.category)}</span>
        </div>

        {item.isFavorite ? (
          <button
            type="button"
            aria-label={`${onToggleFavorite ? "Remove" : "Favorite"} ${item.title} favorite`}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#8b5cf6]/85 text-white backdrop-blur-md transition hover:bg-[#a78bfa]"
            onClick={(event) => {
              event.preventDefault();
              onToggleFavorite?.();
            }}
            disabled={!onToggleFavorite}
          >
            <Star className="h-4 w-4 fill-current" />
          </button>
        ) : onToggleFavorite ? (
          <button
            type="button"
            aria-label={`Add ${item.title} favorite`}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-[#0a0a0f]/72 text-[#dce4f3] backdrop-blur-md transition hover:border-[#8b5cf6]/40 hover:text-[#f8cadb]"
            onClick={(event) => {
              event.preventDefault();
              onToggleFavorite();
            }}
          >
            <Star className="h-4 w-4" />
          </button>
        ) : null}

        {item.rating > 0 ? (
          <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-lg bg-[#0a0a0f]/82 px-2.5 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
            <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
            <span>{ratingLabel}</span>
          </div>
        ) : null}
      </div>

      <div className="space-y-4 p-5">
        <h3 className="line-clamp-1 text-lg font-semibold text-[#f0f4ff] transition group-hover:text-white">
          {item.title}
        </h3>
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex min-w-0 items-center rounded-lg border border-[#8b5cf6]/30 bg-[#8b5cf6]/20 px-3 py-1 text-xs font-semibold text-[#a78bfa]">
            {statusLabel}
          </span>
          {progressLabel ? (
            <span className="shrink-0 text-sm font-medium text-[#b8c1ec]">
              {compactProgressLabel(progressLabel)}
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="group relative h-full">
      {isShowcase ? (
        <div className="block h-full">{card}</div>
      ) : (
        <Link
          href={`/details/${item.id}`}
          className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        >
          {card}
        </Link>
      )}

      {onEdit ? (
        <button
          type="button"
          aria-label={`Edit ${item.title}`}
          className={cn(
            "absolute top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-[#0a0a0f]/72 text-[#dce4f3] backdrop-blur-md transition hover:text-white",
            item.isFavorite || onToggleFavorite ? "right-14" : "right-3",
          )}
          onClick={(event) => {
            event.preventDefault();
            onEdit();
          }}
        >
          <Pencil className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

function getCategoryIcon(category: MediaCategory) {
  if (category === "anime") {
    return Tv;
  }

  return category === "movie" ? Film : Gamepad2;
}

function compactProgressLabel(label: string) {
  return label
    .replace(/^Season\s+(\d+),\s+Episode\s+(\d+)$/i, "S$1 E$2")
    .replace(/^Episode\s+(\d+)\s+of\s+\d+$/i, "E$1");
}
