"use client";

import { useState, useTransition } from "react";
import { Check, Heart, Loader2 } from "lucide-react";

import { DetailsEditEntryButton } from "@/components/details/details-edit-entry-button";
import { Card } from "@/components/ui/card";
import { StatusMessage } from "@/components/ui/status-message";
import { useToast } from "@/components/ui/toast-provider";
import { getDetailsTone } from "@/lib/details-tone";
import {
  markLibraryItemCompleted,
  toggleLibraryItemFavorite,
} from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";
import type { DetailedLibraryItem } from "@/types";

type DetailsQuickActionsProps = {
  item: DetailedLibraryItem;
  persistChanges: boolean;
};

export function DetailsQuickActions({ item, persistChanges }: DetailsQuickActionsProps) {
  const [isFavorite, setIsFavorite] = useState(item.isFavorite);
  const [error, setError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<"completed" | "favorite" | null>(null);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const tone = getDetailsTone();

  const markCompleted = () => {
    if (!persistChanges) {
      setError("Demo items are preview-only. Changes are not saved.");
      showToast("Demo item changes are not saved.", "error");
      return;
    }

    setError(null);
    setPendingAction("completed");
    startTransition(async () => {
      try {
        await markLibraryItemCompleted(item.id);
        showToast("Progress updated.");
      } catch (actionError) {
        setError(actionError instanceof Error ? actionError.message : "Could not update progress.");
      } finally {
        setPendingAction(null);
      }
    });
  };

  const toggleFavorite = () => {
    const nextFavorite = !isFavorite;
    setIsFavorite(nextFavorite);

    if (!persistChanges) {
      setError("Demo items are preview-only. Changes are not saved.");
      showToast("Demo item changes are not saved.", "error");
      return;
    }

    setError(null);
    setPendingAction("favorite");
    startTransition(async () => {
      try {
        await toggleLibraryItemFavorite(item.id, nextFavorite);
        showToast(nextFavorite ? "Added to favorites." : "Removed from favorites.");
      } catch (actionError) {
        setIsFavorite(!nextFavorite);
        setError(actionError instanceof Error ? actionError.message : "Could not update favorite.");
      } finally {
        setPendingAction(null);
      }
    });
  };

  return (
    <Card className={cn("space-y-4 rounded-2xl p-6", tone.panel)}>
      <h2 className="section-subtitle">Quick Actions</h2>
      {error ? (
        <StatusMessage tone="error" title="Action failed">
          {error}
        </StatusMessage>
      ) : null}
      <div className="space-y-3">
        <button
          type="button"
          className={cn("flex h-12 w-full items-center gap-3 rounded-xl border px-4 text-sm font-bold transition hover:bg-white/10 disabled:opacity-55", tone.badge)}
          onClick={markCompleted}
          disabled={isPending}
        >
          {pendingAction === "completed" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          <span>{pendingAction === "completed" ? "Updating" : "Mark as Completed"}</span>
        </button>
        <button
          type="button"
          className={cn("flex h-12 w-full items-center gap-3 rounded-xl border bg-transparent px-4 text-sm font-bold text-[#b8c1ec] transition hover:bg-white/5 disabled:opacity-55", tone.border)}
          onClick={toggleFavorite}
          disabled={isPending}
        >
          {pendingAction === "favorite" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Heart className={isFavorite ? "h-4 w-4 fill-current" : "h-4 w-4"} />
          )}
          <span>
            {pendingAction === "favorite"
              ? "Updating"
              : isFavorite
                ? "Remove Favorite"
                : "Add to Favorites"}
          </span>
        </button>
        <DetailsEditEntryButton
          item={item}
          persistChanges={persistChanges}
          presentation="quick"
          label="Edit Review"
        />
      </div>
    </Card>
  );
}
