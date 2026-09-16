import Link from "next/link";
import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { getDetailsTone } from "@/lib/details-tone";
import { cn } from "@/lib/utils";
import type { LibraryItem } from "@/types";

type DetailsRelatedCardProps = {
  item: LibraryItem;
};

export function DetailsRelatedCard({ item }: DetailsRelatedCardProps) {
  const coverStyle = item.coverUrl
    ? { backgroundImage: `url("${item.coverUrl}")` }
    : undefined;
  const tone = getDetailsTone();

  return (
    <Link href={`/details/${item.id}`} className="group">
      <Card className={cn("flex h-full gap-4 rounded-xl p-4 shadow-[0_18px_56px_rgba(3,7,18,0.18)] transition duration-300 group-hover:-translate-y-1", tone.panel, tone.borderStrong)}>
        <div
          className={cn("h-28 w-20 shrink-0 rounded-lg bg-cover bg-center transition duration-300 group-hover:scale-[1.035]", item.coverUrl ? "" : `bg-gradient-to-br ${item.coverAccent}`)}
          style={coverStyle}
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold text-[#f0f4ff]">{item.title}</h3>
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
            <span className="text-sm font-bold text-[#f0f4ff]">{item.rating.toFixed(1)}</span>
          </div>
          <p className={cn("mt-3 text-xs font-semibold", tone.text)}>
            View Details -&gt;
          </p>
        </div>
      </Card>
    </Link>
  );
}
