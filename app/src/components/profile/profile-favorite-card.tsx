import { Heart } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { LibraryItem } from "@/types";

type ProfileFavoriteCardProps = {
  item: LibraryItem;
};

export function ProfileFavoriteCard({ item }: ProfileFavoriteCardProps) {
  return (
    <Card className="border border-white/8 bg-[linear-gradient(180deg,rgba(19,27,43,0.92),rgba(10,15,26,0.98))]">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-secondary">
            {item.category}
          </p>
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-[#f3b7cb]">
          <Heart className="h-4 w-4 fill-current" />
        </div>
      </div>
    </Card>
  );
}
