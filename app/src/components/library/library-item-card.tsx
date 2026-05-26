"use client";

import { Heart, Pencil, Star } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { getCategoryLabel, getProgressLabel, getStatusLabel } from "@/lib/library";
import { cn } from "@/lib/utils";
import type { LibraryItem } from "@/types";

type LibraryItemCardProps = {
  item: LibraryItem;
  onEdit?: () => void;
  onToggleFavorite?: () => void;
};

export function LibraryItemCard({
  item,
  onEdit,
  onToggleFavorite,
}: LibraryItemCardProps) {
  const progressLabel = getProgressLabel(item);

  return (
    <div className="group relative h-full">
      <Link href={`/details/${item.id}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
        <Card className="h-full overflow-hidden border border-white/8 bg-[linear-gradient(180deg,rgba(19,27,43,0.94),rgba(9,13,22,0.98))] p-0 transition group-hover:border-white/14">
          <div className="relative">
            <div
              className={cn(
                "h-52 bg-gradient-to-br transition duration-300 group-hover:scale-[1.02]",
                item.coverAccent,
              )}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.05),rgba(7,11,20,0.58)_72%,rgba(7,11,20,0.92)_100%)]" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
              <span className="rounded-full border border-white/12 bg-[rgba(7,11,20,0.58)] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#d6ddf0] backdrop-blur">
                {getCategoryLabel(item.category)}
              </span>
              {item.isFavorite ? (
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[rgba(7,11,20,0.58)] text-[#f3b7cb] backdrop-blur">
                  <Heart className="h-4 w-4 fill-current" />
                </span>
              ) : null}
            </div>
            {progressLabel ? (
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="inline-flex rounded-full border border-white/12 bg-[rgba(7,11,20,0.66)] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#e2e8f5] backdrop-blur">
                  {progressLabel}
                </span>
              </div>
            ) : null}
          </div>

          <div className="space-y-4 p-5">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h3 className="min-w-0 text-lg font-semibold leading-6 text-white transition group-hover:text-[#f3f7ff]">
                  {item.title}
                </h3>
                {item.year ? (
                  <span className="text-sm text-[#94a3bd]">{item.year}</span>
                ) : null}
              </div>
              <p className="text-sm text-[#aeb8cf]">{getStatusLabel(item.status)}</p>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/8 pt-4">
              <div className="flex items-center gap-2 text-sm text-[#f4d58d]">
                <Star className="h-4 w-4 fill-current" />
                <span>{item.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#8fa2c1]">
                olYmpos library
              </span>
            </div>
          </div>
        </Card>
      </Link>

      {onEdit ? (
        <button
          type="button"
          aria-label={`Edit ${item.title}`}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[rgba(7,11,20,0.72)] text-[#dce4f3] backdrop-blur transition hover:text-white"
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4" />
        </button>
      ) : null}

      {onToggleFavorite ? (
        <button
          type="button"
          aria-label={`${item.isFavorite ? "Remove" : "Add"} ${item.title} favorite`}
          className={cn(
            "absolute right-16 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[rgba(7,11,20,0.72)] backdrop-blur transition hover:text-[#f8cadb]",
            item.isFavorite ? "text-[#f3b7cb]" : "text-[#dce4f3]",
          )}
          onClick={onToggleFavorite}
        >
          <Heart className={cn("h-4 w-4", item.isFavorite ? "fill-current" : "")} />
        </button>
      ) : null}
    </div>
  );
}
