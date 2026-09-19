"use client";

import Link from "next/link";
import { Loader2, MessageCircle, Pencil, Send, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status-message";
import { useToast } from "@/components/ui/toast-provider";
import {
  createReviewReply,
  deleteReviewReply,
  updateReviewReply,
} from "@/lib/supabase/review-actions";
import type { ReviewReply } from "@/types";

type ReviewThreadProps = {
  reviewId: string;
  replies: ReviewReply[];
};

export function ReviewThread({ reviewId, replies }: ReviewThreadProps) {
  const [replyDraft, setReplyDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { showToast } = useToast();

  const submitReply = () => {
    setError(null);
    startTransition(async () => {
      const result = await createReviewReply(reviewId, replyDraft);
      if (!result.success) {
        setError(result.message ?? "Reply could not be posted.");
        return;
      }
      setReplyDraft("");
      showToast("Reply posted.");
      router.refresh();
    });
  };

  const saveReply = (replyId: string) => {
    setError(null);
    startTransition(async () => {
      const result = await updateReviewReply(replyId, reviewId, editDraft);
      if (!result.success) {
        setError(result.message ?? "Reply could not be updated.");
        return;
      }
      setEditingId(null);
      showToast("Reply updated.");
      router.refresh();
    });
  };

  const removeReply = (replyId: string) => {
    if (!window.confirm("Delete this reply? This action cannot be undone.")) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteReviewReply(replyId, reviewId);
      if (!result.success) {
        setError(result.message ?? "Reply could not be deleted.");
        return;
      }
      showToast("Reply deleted.");
      router.refresh();
    });
  };

  return (
    <section className="space-y-6" aria-labelledby="replies-title">
      <div className="flex items-center gap-3 text-[#a78bfa]">
        <MessageCircle className="h-6 w-6" />
        <h2 id="replies-title" className="section-subtitle">Replies</h2>
        <span className="text-sm font-semibold text-[#818aa0]">{replies.length}</span>
      </div>

      <div className="premium-panel space-y-4 rounded-2xl p-5 sm:p-6">
        <label htmlFor="reply-content" className="text-sm font-semibold text-white">Join the conversation</label>
        <textarea id="reply-content" value={replyDraft} onChange={(event) => setReplyDraft(event.target.value)} maxLength={2000} rows={4} placeholder="Write a thoughtful reply..." className="w-full resize-y rounded-xl border border-white/10 bg-[#111222] px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-[#747d94] focus:border-[#8b5cf6]/60 focus:ring-2 focus:ring-[#8b5cf6]/20" />
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-[#747d94]">{replyDraft.length} / 2,000</span>
          <Button onClick={submitReply} disabled={isPending || !replyDraft.trim()} leftIcon={isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}>Post reply</Button>
        </div>
        {error ? <StatusMessage tone="error">{error}</StatusMessage> : null}
      </div>

      <div className="space-y-4">
        {replies.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 px-5 py-8 text-center text-sm text-[#8f98ad]">No replies yet.</div>
        ) : replies.map((reply) => {
          const name = reply.author.displayName?.trim() || reply.author.username;
          const editing = editingId === reply.id;
          return (
            <article key={reply.id} className="premium-panel rounded-2xl p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <Link href={`/users/${reply.author.username}`} aria-label={`View ${name}'s profile`}>
                  <ProfileAvatar avatarUrl={reply.author.avatarUrl} displayName={name} size="sm" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Link href={`/users/${reply.author.username}`} className="font-semibold text-white hover:text-[#c4b5fd]">{name}</Link>
                      <p className="text-xs text-[#818aa0]">@{reply.author.username} · {formatDate(reply.createdAt)}</p>
                    </div>
                    {reply.isOwner ? (
                      <div className="flex gap-1">
                        <button type="button" aria-label="Edit reply" title="Edit reply" className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#aeb7cc] transition hover:bg-white/7 hover:text-white" onClick={() => { setEditingId(reply.id); setEditDraft(reply.content); }} disabled={isPending}><Pencil className="h-4 w-4" /></button>
                        <button type="button" aria-label="Delete reply" title="Delete reply" className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#d995a3] transition hover:bg-red-500/10 hover:text-red-200" onClick={() => removeReply(reply.id)} disabled={isPending}><Trash2 className="h-4 w-4" /></button>
                      </div>
                    ) : null}
                  </div>
                  {editing ? (
                    <div className="mt-4 space-y-3">
                      <textarea value={editDraft} onChange={(event) => setEditDraft(event.target.value)} maxLength={2000} rows={4} className="w-full resize-y rounded-xl border border-[#8b5cf6]/30 bg-[#111222] px-4 py-3 text-sm leading-7 text-white outline-none focus:border-[#8b5cf6]/65" />
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setEditingId(null)} disabled={isPending} leftIcon={<X className="h-4 w-4" />}>Cancel</Button>
                        <Button onClick={() => saveReply(reply.id)} disabled={isPending || !editDraft.trim()} leftIcon={isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pencil className="h-4 w-4" />}>Save</Button>
                      </div>
                    </div>
                  ) : <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[#c0c7d8]">{reply.content}</p>}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}
