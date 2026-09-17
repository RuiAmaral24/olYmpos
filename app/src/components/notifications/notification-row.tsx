"use client";

import { Bell, Check, MessageCircle, Tv, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { markNotificationRead } from "@/lib/supabase/notification-actions";
import { useToast } from "@/components/ui/toast-provider";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types";

type NotificationRowProps = {
  notification: Notification;
  compact?: boolean;
  onRead?: (id: string) => void;
  onNavigate?: () => void;
  showReadAction?: boolean;
};

export function NotificationRow({
  notification,
  compact = false,
  onRead,
  onNavigate,
  showReadAction = false,
}: NotificationRowProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [optimisticallyRead, setOptimisticallyRead] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isRead = optimisticallyRead || Boolean(notification.readAt);

  const handleRead = (navigateAfterRead: boolean) => {
    startTransition(async () => {
      if (!isRead) {
        const result = await markNotificationRead(notification.id);

        if (!result.success) {
          showToast(result.message ?? "Notification could not be updated.", "error");
          return;
        }

        setOptimisticallyRead(true);
        onRead?.(notification.id);
      }

      if (navigateAfterRead && notification.targetUrl) {
        onNavigate?.();
        router.push(notification.targetUrl);
      }

      router.refresh();
    });
  };

  return (
    <div
      className={cn(
        "group relative transition",
        !compact && "rounded-xl border",
        compact
          ? isRead
            ? "bg-transparent hover:bg-white/[0.035]"
            : "bg-[#8b5cf6]/8 hover:bg-[#8b5cf6]/12"
          : isRead
            ? "border-white/8 bg-white/[0.025] hover:border-white/14 hover:bg-white/[0.045]"
            : "border-[#8b5cf6]/28 bg-[#8b5cf6]/9 hover:border-[#8b5cf6]/42 hover:bg-[#8b5cf6]/13",
      )}
    >
      <button
        type="button"
        onClick={() => handleRead(true)}
        disabled={isPending}
        className={cn(
          "flex w-full items-start gap-3 text-left disabled:cursor-wait disabled:opacity-65",
          compact ? "px-4 py-3" : "px-4 py-4 sm:px-5 sm:py-5",
          !compact && showReadAction && !isRead && "pb-12 sm:pb-5 sm:pr-36",
        )}
      >
        <span
          className={cn(
            "mt-0.5 flex shrink-0 items-center justify-center rounded-xl border",
            compact ? "h-9 w-9" : "h-11 w-11",
            isRead
              ? "border-white/8 bg-white/[0.035] text-[#929bb2]"
              : "border-[#8b5cf6]/24 bg-[#8b5cf6]/14 text-[#a78bfa]",
          )}
        >
          {renderNotificationIcon(
            notification.type,
            compact ? "h-4 w-4" : "h-5 w-5",
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-3">
            <span className={cn("line-clamp-2 text-sm", isRead ? "font-medium text-[#c4cad9]" : "font-semibold text-white")}>
              {notification.title}
            </span>
            {!isRead ? (
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#8b5cf6] shadow-[0_0_12px_rgba(139,92,246,0.75)]" />
            ) : null}
          </span>
          {notification.body ? (
            <span className={cn("mt-1 block line-clamp-2 text-xs leading-5 text-[#939bb1]", !compact && "sm:text-sm sm:leading-6")}>
              {notification.body}
            </span>
          ) : null}
          {!compact && getNotificationContext(notification.payload) ? (
            <span className="mt-2 block truncate text-xs font-medium text-[#8f82b8]">
              {getNotificationContext(notification.payload)}
            </span>
          ) : null}
          <time
            dateTime={notification.createdAt}
            className="mt-1.5 block text-[11px] font-medium text-[#747d94]"
          >
            {formatNotificationDate(notification.createdAt)}
          </time>
        </span>
      </button>

      {!compact && showReadAction && !isRead ? (
        <button
          type="button"
          onClick={() => handleRead(false)}
          disabled={isPending}
          className="absolute bottom-3.5 left-[4.25rem] inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-[#a78bfa] transition hover:bg-[#8b5cf6]/10 hover:text-[#c4b5fd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-50 sm:bottom-auto sm:left-auto sm:right-5 sm:top-1/2 sm:-translate-y-1/2"
        >
          <Check className="h-3.5 w-3.5" />
          Mark as read
        </button>
      ) : null}
    </div>
  );
}

function getNotificationContext(payload: Record<string, unknown>) {
  const value = payload.context ?? payload.itemTitle ?? payload.source;

  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, 100)
    : null;
}

function renderNotificationIcon(type: string, className: string) {
  if (type.includes("follow")) {
    return <UserPlus className={className} />;
  }

  if (type.includes("reply") || type.includes("review")) {
    return <MessageCircle className={className} />;
  }

  if (type.includes("episode") || type.includes("release")) {
    return <Tv className={className} />;
  }

  return <Bell className={className} />;
}

function formatNotificationDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(date);
}
