import Link from "next/link";
import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { LibraryItem } from "@/types";

type DetailsRelatedCardProps = {
  item: LibraryItem;
};

export function DetailsRelatedCard({ item }: DetailsRelatedCardProps) {
  const coverStyle = item.coverUrl
    ? { backgroundImage: `url("${item.coverUrl}")` }
    : undefined;

  return (
    <Link href={`/details/${item.id}`} className="group">
      <Card className="flex h-full gap-4 rounded-xl border border-[#8b5cf6]/24 bg-[linear-gradient(135deg,rgba(26,26,46,0.62),rgba(22,22,42,0.62))] p-4 shadow-[0_18px_56px_rgba(3,7,18,0.22)] transition group-hover:border-[#8b5cf6]/44">
        <div
          className={`h-28 w-20 shrink-0 rounded-lg bg-cover bg-center ${item.coverUrl ? "" : `bg-gradient-to-br ${item.coverAccent}`}`}
          style={coverStyle}
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold text-[#f0f4ff]">{item.title}</h3>
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
            <span className="text-sm font-bold text-[#f0f4ff]">{item.rating.toFixed(1)}</span>
          </div>
          <p className="mt-3 text-xs font-semibold text-[#9a72ff]">
            View Details -&gt;
          </p>
        </div>
      </Card>
    </Link>
  );
}
