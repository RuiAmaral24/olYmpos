import { ListPlus, Share2, SquarePen, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DetailedLibraryItem } from "@/types";

type DetailsHeroCardProps = {
  item: DetailedLibraryItem;
};

export function DetailsHeroCard({ item }: DetailsHeroCardProps) {
  return (
    <Card className="relative overflow-hidden border border-white/8 bg-[linear-gradient(135deg,rgba(18,27,44,0.96),rgba(9,14,24,0.98))] p-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,108,255,0.18),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(78,161,255,0.14),transparent_24%)]" />
      <div className="relative grid gap-8 p-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:p-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/8">
          <div className={`h-[360px] bg-gradient-to-br ${item.coverAccent}`} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.08),rgba(7,11,20,0.24)_55%,rgba(7,11,20,0.82)_100%)]" />
          <div className="absolute right-5 top-5 h-20 w-16 rounded-[1.2rem] border border-white/8 bg-[rgba(255,255,255,0.05)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="inline-flex rounded-full border border-white/12 bg-[rgba(7,11,20,0.62)] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#ebf0fb] backdrop-blur">
              {item.progressLabel ?? item.status}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="border-white/12 bg-white/8 text-[#dde5f5]">
              {item.category}
            </Badge>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-sm text-[#f4d58d]">
              <Star className="h-4 w-4 fill-current" />
              <span>{item.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-[#95a4bf]">{item.year}</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-[2.7rem] font-semibold tracking-[-0.04em] text-white sm:text-[3.35rem]">
              {item.title}
            </h1>
            <div className="flex flex-wrap gap-3">
              {item.genres.map((genre) => (
                <span
                  key={genre}
                  className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-[#d8e0f2]"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="max-w-3xl text-sm leading-7 text-[#afbad1] sm:text-base">
              {item.synopsis}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="h-12 rounded-2xl px-6" leftIcon={<SquarePen className="h-4 w-4" />}>
              Edit Entry
            </Button>
            <Button variant="secondary" className="h-12 rounded-2xl px-5" leftIcon={<Share2 className="h-4 w-4" />}>
              Share
            </Button>
            <Button variant="secondary" className="h-12 rounded-2xl px-5" leftIcon={<ListPlus className="h-4 w-4" />}>
              Add to List
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
