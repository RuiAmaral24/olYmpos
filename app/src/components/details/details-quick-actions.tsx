"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, Heart, Loader2, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    <Card className="space-y-5 border border-white/8 bg-[linear-gradient(180deg,rgba(18,27,43,0.92),rgba(10,14,24,0.98))]">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-secondary">
          Quick Actions
        </p>
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
          Keep this title moving
        </h2>
      </div>
      {error ? (
        <StatusMessage tone="error" title="Action failed">
          {error}
        </StatusMessage>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-3">
        <Button
          variant="secondary"
          className="h-12 w-full rounded-2xl px-5"
          leftIcon={
            pendingAction === "completed" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )
          }
          onClick={markCompleted}
          disabled={isPending}
        >
          {pendingAction === "completed" ? "Updating" : "Mark as Completed"}
        </Button>
        <Button
          variant="secondary"
          className="h-12 w-full rounded-2xl px-5"
          leftIcon={
            pendingAction === "favorite" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart className={isFavorite ? "h-4 w-4 fill-current" : "h-4 w-4"} />
            )
          }
          onClick={toggleFavorite}
          disabled={isPending}
        >
          {pendingAction === "favorite"
            ? "Updating"
            : isFavorite
              ? "Remove Favorite"
              : "Add to Favorites"}
        </Button>
        <Link href="/library">
          <Button variant="secondary" className="h-12 w-full rounded-2xl px-5" leftIcon={<SquarePen className="h-4 w-4" />}>
            Edit in Library
          </Button>
        </Link>
      </div>
    </Card>
  );
}
