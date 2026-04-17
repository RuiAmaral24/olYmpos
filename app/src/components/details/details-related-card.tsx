import Link from "next/link";

import { Card } from "@/components/ui/card";
import type { LibraryItem } from "@/types";

type DetailsRelatedCardProps = {
  item: LibraryItem;
};

export function DetailsRelatedCard({ item }: DetailsRelatedCardProps) {
  return (
    <Link href={`/details/${item.id}`} className="group">
      <Card className="h-full overflow-hidden border border-white/8 bg-[linear-gradient(180deg,rgba(19,27,43,0.92),rgba(9,14,24,0.98))] p-0 transition group-hover:border-white/14">
        <div className={`h-36 bg-gradient-to-br ${item.coverAccent}`} />
        <div className="space-y-2 p-5">
          <p className="text-xs uppercase tracking-[0.26em] text-accent-secondary">
            {item.category}
          </p>
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <p className="text-sm text-[#aeb8cf]">{item.status}</p>
        </div>
      </Card>
    </Link>
  );
}
