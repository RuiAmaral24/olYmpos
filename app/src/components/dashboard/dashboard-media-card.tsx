import { Star } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { getCategoryLabel } from "@/lib/library";
import { getDashboardArtwork } from "@/lib/library-mapper";
import { cn } from "@/lib/utils";
import type { DashboardTrackedItem } from "@/types";

type DashboardMediaCardProps = {
  item: DashboardTrackedItem;
};

export function DashboardMediaCard({ item }: DashboardMediaCardProps) {
  const coverUrl = item.coverUrl ?? getDashboardArtwork(item.category);
  const rating = item.rating ?? 5;

  return (
    <Link href={`/details/${item.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden rounded-2xl border border-[#2d2454] bg-[linear-gradient(135deg,rgba(17,18,34,0.94),rgba(12,13,25,0.98))] p-0 shadow-[0_24px_80px_rgba(3,7,18,0.34)] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#8b5cf6]/45">
        <div className="relative h-64 overflow-hidden sm:h-72">
          <div
            className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url("${coverUrl}")` }}
          />
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40", item.accent)} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,20,0.08)_0%,rgba(10,12,24,0.5)_58%,rgba(10,11,22,0.96)_100%)]" />
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-[#090b14]/82 px-2.5 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
            <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
            <span>{rating.toFixed(rating % 1 === 0 ? 0 : 1)}</span>
          </div>
          {item.favorite ? (
            <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#9b5cff]/88 text-white backdrop-blur-md">
              <Star className="h-4 w-4 fill-current" />
            </div>
          ) : null}
        </div>
        <div className="space-y-2 p-5">
          <h3 className="line-clamp-1 text-lg font-semibold text-[#f0f4ff]">
            {item.title}
          </h3>
          <p className="text-sm font-medium text-[#a78bfa]">
            {getCategoryLabel(item.category)}
          </p>
          <p className="text-sm text-[#c7bee4]">{item.progressLabel || item.status}</p>
        </div>
      </Card>
    </Link>
  );
}
