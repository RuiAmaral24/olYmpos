import { Calendar, Film, Gamepad2, Heart, ListPlus, Share2, Star, Tv } from "lucide-react";

import { DetailsEditEntryButton } from "@/components/details/details-edit-entry-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDetailsTone } from "@/lib/details-tone";
import { getCategoryLabel } from "@/lib/library";
import { cn } from "@/lib/utils";
import type { DetailedLibraryItem, MediaCategory } from "@/types";

type DetailsHeroCardProps = {
  item: DetailedLibraryItem;
  persistChanges: boolean;
};

export function DetailsHeroCard({ item, persistChanges }: DetailsHeroCardProps) {
  const coverStyle = item.coverUrl
    ? { backgroundImage: `url("${item.coverUrl}")` }
    : undefined;
  const tone = getDetailsTone();

  return (
    <section className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className={cn("relative aspect-[2/3] max-h-[30rem] overflow-hidden rounded-2xl border bg-[#0d1020] shadow-[0_28px_90px_rgba(3,7,18,0.42)]", tone.borderStrong, tone.glow)}>
        <div
          className={cn("absolute inset-0 bg-cover bg-center transition duration-500 hover:scale-[1.035]", item.coverUrl ? "" : `bg-gradient-to-br ${item.coverAccent}`)}
          style={coverStyle}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,18,0.02),rgba(8,10,18,0.18)_48%,rgba(8,10,18,0.72)_100%)]" />
        <button
          type="button"
          aria-label={item.isFavorite ? "Remove favorite" : "Add favorite"}
          className={cn("absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border bg-[#0a0a0f]/80 backdrop-blur transition hover:bg-white/10", tone.borderStrong, tone.text)}
        >
          <Heart className={item.isFavorite ? "h-5 w-5 fill-current" : "h-5 w-5"} />
        </button>
      </div>

      <div className="min-w-0 py-1 lg:pt-0">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge className={cn("gap-2 rounded-lg px-3 py-1.5 text-sm font-bold normal-case tracking-[0]", tone.badge)}>
            <CategoryIcon category={item.category} className="h-4 w-4" />
            {getCategoryLabel(item.category)}
          </Badge>
          <div className="flex items-center gap-1.5">
            <Star className="h-5 w-5 fill-[#fbbf24] text-[#fbbf24]" />
            <span className="editorial-title text-2xl font-normal leading-none text-[#f0f4ff]">
              {item.rating.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-[#b8c1ec]">/ 10</span>
          </div>
        </div>

        <h1 className="editorial-title mb-5 bg-[linear-gradient(135deg,#f3f0ff,#d8ceff,#c4b5fd)] bg-clip-text text-5xl font-normal leading-[1.02] tracking-[0] text-transparent sm:text-6xl">
          {item.title}
        </h1>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          {item.genres.map((genre) => (
            <span
              key={genre}
              className={cn("rounded-lg border bg-[#15172a]/78 px-3 py-1.5 text-sm font-semibold text-[#b8c1ec]", tone.border)}
            >
              {genre}
            </span>
          ))}
          <span className={cn("flex items-center gap-2 text-sm font-semibold", tone.text)}>
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
          <DetailsEditEntryButton
            item={item}
            persistChanges={persistChanges}
            presentation="hero"
          />
          <Button variant="secondary" className={cn("h-12 rounded-xl bg-transparent px-6 text-[#b8c1ec]", tone.borderStrong)} leftIcon={<Share2 className="h-4 w-4" />}>
            Share
          </Button>
          <Button variant="secondary" className={cn("h-12 rounded-xl bg-transparent px-6 text-[#b8c1ec]", tone.borderStrong)} leftIcon={<ListPlus className="h-4 w-4" />}>
            Add to List
          </Button>
        </div>
      </div>
    </section>
  );
}

function CategoryIcon({
  category,
  className,
}: {
  category: MediaCategory;
  className: string;
}) {
  if (category === "anime") {
    return <Tv className={className} />;
  }

  return category === "movie" ? (
    <Film className={className} />
  ) : (
    <Gamepad2 className={className} />
  );
}
