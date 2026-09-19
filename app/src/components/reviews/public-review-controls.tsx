"use client";

import Link from "next/link";
import { Eye, EyeOff, Loader2, Send, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { ModalShell } from "@/components/modals/modal-shell";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status-message";
import { useToast } from "@/components/ui/toast-provider";
import {
  publishReview,
  unpublishReview,
  updatePublicReview,
} from "@/lib/supabase/review-actions";
import type { PublicReviewState } from "@/types";

type PublicReviewControlsProps = {
  libraryItemId: string;
  privateNote: string;
  savedPrivateNote: string;
  initialReview: PublicReviewState | null;
  disabled?: boolean;
  onReviewChange?: (review: PublicReviewState) => void;
};

export function PublicReviewControls({
  libraryItemId,
  privateNote,
  savedPrivateNote,
  initialReview,
  disabled = false,
  onReviewChange,
}: PublicReviewControlsProps) {
  const [review, setReview] = useState(initialReview);
  const [editorOpen, setEditorOpen] = useState(false);
  const [draft, setDraft] = useState(initialReview?.content ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { showToast } = useToast();
  const published = Boolean(review?.publishedAt);
  const noteHasUnsavedChanges = privateNote.trim() !== savedPrivateNote.trim();
  const canFirstPublish = Boolean(savedPrivateNote.trim()) && !noteHasUnsavedChanges;

  const runPublish = () => {
    setError(null);
    startTransition(async () => {
      const result = await publishReview(libraryItemId);
      if (!result.success || !result.id) {
        setError(result.message ?? "Review could not be published.");
        return;
      }
      const nextReview = {
        id: result.id!,
        content: review?.content ?? savedPrivateNote.trim(),
        publishedAt: new Date().toISOString(),
        updatedAt: review?.updatedAt ?? new Date().toISOString(),
      };
      setReview(nextReview);
      onReviewChange?.(nextReview);
      showToast(review ? "Review republished." : "Review published.");
      router.refresh();
    });
  };

  const runUnpublish = () => {
    if (!review) return;
    setError(null);
    startTransition(async () => {
      const result = await unpublishReview(review.id);
      if (!result.success) {
        setError(result.message ?? "Review could not be unpublished.");
        return;
      }
      const nextReview = { ...review, publishedAt: null };
      setReview(nextReview);
      onReviewChange?.(nextReview);
      showToast("Review unpublished. Its replies are preserved.");
      router.refresh();
    });
  };

  const savePublicEdit = () => {
    if (!review) return;
    setError(null);
    startTransition(async () => {
      const result = await updatePublicReview(review.id, draft);
      if (!result.success) {
        setError(result.message ?? "Review could not be updated.");
        return;
      }
      const nextReview = { ...review, content: draft.trim(), updatedAt: new Date().toISOString() };
      setReview(nextReview);
      onReviewChange?.(nextReview);
      setEditorOpen(false);
      showToast("Public review updated.");
      router.refresh();
    });
  };

  return (
    <section className="space-y-4 rounded-xl border border-[#8b5cf6]/24 bg-[#8b5cf6]/7 p-4">
      <div className="flex items-start gap-3">
        {published ? <Eye className="mt-0.5 h-5 w-5 text-[#a78bfa]" /> : <EyeOff className="mt-0.5 h-5 w-5 text-[#929bb2]" />}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white">{published ? "Published review" : "Public review"}</h3>
          <p className="mt-1 text-xs leading-5 text-[#aeb7cc]">
            Publishing creates a separate public review from your saved personal note. Visibility follows your profile privacy.
          </p>
        </div>
      </div>

      {error ? <StatusMessage tone="error">{error}</StatusMessage> : null}
      {!review && noteHasUnsavedChanges ? (
        <StatusMessage>Save your note changes before publishing them.</StatusMessage>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {!published ? (
          <Button
            className="h-10 rounded-lg px-4"
            leftIcon={isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            onClick={runPublish}
            disabled={disabled || isPending || (!review && !canFirstPublish)}
          >
            {review ? "Republish review" : "Publish as review"}
          </Button>
        ) : null}
        {review ? (
          <>
            <Link href={`/reviews/${review.id}`} className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-semibold text-[#d7def1] transition hover:bg-white/7">
              <Eye className="h-4 w-4" /> View review
            </Link>
            <Button variant="secondary" className="h-10 rounded-lg px-4" leftIcon={<SquarePen className="h-4 w-4" />} onClick={() => { setDraft(review.content); setEditorOpen(true); }} disabled={isPending}>
              Edit public review
            </Button>
          </>
        ) : null}
        {published ? (
          <Button variant="ghost" className="h-10 rounded-lg px-4 text-[#f0a8b5]" leftIcon={<EyeOff className="h-4 w-4" />} onClick={runUnpublish} disabled={isPending}>
            Unpublish
          </Button>
        ) : null}
      </div>

      <ModalShell open={editorOpen} onClose={() => setEditorOpen(false)}>
        <div className="mx-auto max-w-[605px] space-y-5">
          <div>
            <h3 className="section-subtitle">Edit Public Review</h3>
            <p className="mt-2 text-sm leading-6 text-[#9da6bc]">This changes only the published copy. Your personal note stays private and unchanged.</p>
          </div>
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={12} maxLength={10000} className="w-full resize-y rounded-xl border border-[#33275a] bg-[#111122] px-4 py-4 text-sm leading-7 text-white outline-none focus:border-[#8b5cf6]/65 focus:ring-2 focus:ring-[#8b5cf6]/24" />
          <p className="text-right text-xs text-[#858da4]">{draft.length} / 10,000</p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setEditorOpen(false)} disabled={isPending}>Cancel</Button>
            <Button onClick={savePublicEdit} disabled={isPending || !draft.trim()} leftIcon={isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <SquarePen className="h-4 w-4" />}>Save public review</Button>
          </div>
        </div>
      </ModalShell>
    </section>
  );
}
