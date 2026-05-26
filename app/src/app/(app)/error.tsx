"use client";

import { AlertTriangle } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export default function AppError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pb-8">
      <EmptyState
        eyebrow="Load Error"
        title="olYmpos could not load this view"
        description="The data request did not complete. Try again, and your current session will stay intact."
        icon={<AlertTriangle className="h-5 w-5" />}
        action={(
          <Button className="h-11 rounded-2xl px-5" onClick={reset}>
            Try Again
          </Button>
        )}
      />
    </div>
  );
}
