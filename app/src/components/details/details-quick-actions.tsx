"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Check, Heart, Loader2, SquarePen } from "lucide-react";

import { Card } from "@/components/ui/card";
import { StatusMessage } from "@/components/ui/status-message";
import { useToast } from "@/components/ui/toast-provider";
import {
  markLibraryItemCompleted,
  toggleLibraryItemFavorite,
} from "@/lib/supabase/actions";
import type { DetailedLibraryItem } from "@/types";

type DetailsQuickActionsProps = {
  item: DetailedLibraryItem;
};

export function DetailsQuickActions({ item }: DetailsQuickActionsProps) {
  const [isFavorite, setIsFavorite] = useState(item.isFavorite);
  const [error, setError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<"completed" | "favorite" | null>(null);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const markCompleted = () => {
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
    <Card className="space-y-4 rounded-2xl border border-[#8b5cf6]/24 bg-[linear-gradient(135deg,rgba(26,26,46,0.62),rgba(22,22,42,0.62))] p-6 shadow-[0_22px_70px_rgba(3,7,18,0.24)]">
      <h2 className="section-subtitle">Quick Actions</h2>
      {error ? (
        <StatusMessage tone="error" title="Action failed">
          {error}
        </StatusMessage>
      ) : null}
      <div className="space-y-3">
        <button
          type="button"
          className="flex h-12 w-full items-center gap-3 rounded-xl border border-[#8b5cf6]/45 bg-[#8b5cf6]/22 px-4 text-sm font-bold text-[#c4b5fd] transition hover:bg-[#8b5cf6]/30 disabled:opacity-55"
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
          className="flex h-12 w-full items-center gap-3 rounded-xl border border-[#8b5cf6]/24 bg-transparent px-4 text-sm font-bold text-[#b8c1ec] transition hover:bg-white/5 disabled:opacity-55"
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
        <Link href="/library">
          <span className="flex h-12 w-full items-center gap-3 rounded-xl border border-[#8b5cf6]/24 bg-transparent px-4 text-sm font-bold text-[#b8c1ec] transition hover:bg-white/5">
            <SquarePen className="h-4 w-4" />
            Edit Review
          </span>
        </Link>
      </div>
    </Card>
  );
}
