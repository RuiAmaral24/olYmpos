import { Calendar, Heart, ListPlus, Share2, SquarePen, Star, Tv } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoryLabel } from "@/lib/library";
import type { DetailedLibraryItem } from "@/types";

type DetailsHeroCardProps = {
  item: DetailedLibraryItem;
};

export function DetailsHeroCard({ item }: DetailsHeroCardProps) {
  const coverStyle = item.coverUrl
    ? { backgroundImage: `url("${item.coverUrl}")` }
    : undefined;

  return (
    <section className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="relative h-[34rem] overflow-hidden rounded-2xl border border-[#8b5cf6]/35 shadow-[0_28px_90px_rgba(3,7,18,0.42)]">
        <div
          className={`absolute inset-0 bg-cover bg-center ${item.coverUrl ? "" : `bg-gradient-to-br ${item.coverAccent}`}`}
          style={coverStyle}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,18,0.02),rgba(8,10,18,0.18)_48%,rgba(8,10,18,0.72)_100%)]" />
        <button
          type="button"
          aria-label={item.isFavorite ? "Remove favorite" : "Add favorite"}
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#8b5cf6]/40 bg-[#0a0a0f]/80 text-[#8b5cf6] backdrop-blur transition hover:bg-[#8b5cf6]/20"
        >
          <Heart className={item.isFavorite ? "h-5 w-5 fill-current" : "h-5 w-5"} />
        </button>
      </div>

      <div className="min-w-0 py-1 lg:pt-0">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge className="gap-2 rounded-lg border-[#8b5cf6]/45 bg-[#8b5cf6]/24 px-3 py-1.5 text-sm font-bold normal-case tracking-[0] text-[#c4b5fd]">
            <Tv className="h-4 w-4" />
            {getCategoryLabel(item.category)}
          </Badge>
          <div className="flex items-center gap-1.5">
            <Star className="h-5 w-5 fill-[#fbbf24] text-[#fbbf24]" />
            <span className="text-xl font-bold text-[#f0f4ff]">
              {item.rating.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-[#b8c1ec]">/ 10</span>
          </div>
        </div>

        <h1 className="editorial-title mb-5 bg-[linear-gradient(135deg,#f3f0ff,#d8ceff,#c4b5fd)] bg-clip-text text-5xl font-normal leading-[0.98] tracking-[0] text-transparent sm:text-6xl lg:text-7xl">
          {item.title}
        </h1>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          {item.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-lg border border-[#8b5cf6]/24 bg-[#1a1a2e]/80 px-3 py-1.5 text-sm font-semibold text-[#b8c1ec]"
            >
              {genre}
            </span>
          ))}
          <span className="flex items-center gap-2 text-sm font-semibold text-[#9a72ff]">
            <Calendar className="h-4 w-4" />
            {item.year}
          </span>
        </div>

        <div className="mb-8 max-w-3xl">
          <h2 className="editorial-title mb-3 text-2xl font-normal text-[#f3f0ff]">
            Synopsis
          </h2>
          <p className="text-base leading-8 text-[#b8c1ec]">
            {item.synopsis}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/library">
            <Button className="h-12 rounded-xl px-6" leftIcon={<SquarePen className="h-4 w-4" />}>
              Edit Entry
            </Button>
          </Link>
          <Button variant="secondary" className="h-12 rounded-xl border-[#8b5cf6]/40 bg-transparent px-6 text-[#b8c1ec]" leftIcon={<Share2 className="h-4 w-4" />}>
            Share
          </Button>
          <Button variant="secondary" className="h-12 rounded-xl border-[#8b5cf6]/40 bg-transparent px-6 text-[#b8c1ec]" leftIcon={<ListPlus className="h-4 w-4" />}>
            Add to List
          </Button>
      </div>
      </div>
    </section>
  );
}
