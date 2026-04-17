import { CheckCircle2, Heart, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DetailsQuickActions() {
  return (
    <Card className="space-y-5 border border-white/8 bg-[linear-gradient(180deg,rgba(18,27,43,0.92),rgba(10,14,24,0.98))]">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-secondary">
          Quick Actions
        </p>
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
          Keep this title moving
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Button variant="secondary" className="h-12 rounded-2xl px-5" leftIcon={<CheckCircle2 className="h-4 w-4" />}>
          Mark as Completed
        </Button>
        <Button variant="secondary" className="h-12 rounded-2xl px-5" leftIcon={<Heart className="h-4 w-4" />}>
          Add to Favorites
        </Button>
        <Button variant="secondary" className="h-12 rounded-2xl px-5" leftIcon={<SquarePen className="h-4 w-4" />}>
          Edit Review
        </Button>
      </div>
    </Card>
  );
}
