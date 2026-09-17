"use client";

import { Bell, CheckCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import { NotificationRow } from "@/components/notifications/notification-row";
import { useToast } from "@/components/ui/toast-provider";
import { markAllNotificationsRead } from "@/lib/supabase/notification-actions";
import type { Notification } from "@/types";

type NotificationBellProps = {
  initialNotifications: Notification[];
  initialUnreadCount: number;
};

export function NotificationBell({
  initialNotifications,
  initialUnreadCount,
}: NotificationBellProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const handleRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id && !notification.readAt
          ? { ...notification, readAt: new Date().toISOString() }
          : notification,
      ),
    );
    setUnreadCount((current) => Math.max(0, current - 1));
  };

  const handleMarkAllRead = () => {
    startTransition(async () => {
      const result = await markAllNotificationsRead();

      if (!result.success) {
        showToast(result.message ?? "Notifications could not be updated.", "error");
        return;
      }

      const readAt = new Date().toISOString();
      setNotifications((current) =>
        current.map((notification) => ({ ...notification, readAt })),
      );
      setUnreadCount(0);
      router.refresh();
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="notification-popover"
        onClick={() => setIsOpen((current) => !current)}
        className="relative inline-flex h-[42px] w-[42px] items-center justify-center rounded-xl text-[#c8d2f0] transition hover:bg-white/[0.04] hover:text-white"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 ? (
          <span className="absolute right-1 top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full border border-[#090a12] bg-[#8b5cf6] px-1 text-[9px] font-bold leading-none text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div
          id="notification-popover"
          role="dialog"
          aria-label="Recent notifications"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(390px,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-[#302455] bg-[#0b0d18]/[0.98] shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/8 px-4 py-3.5">
            <div>
              <h2 className="text-sm font-semibold text-white">Notifications</h2>
              <p className="mt-0.5 text-xs text-[#858da4]">
                {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up."}
              </p>
            </div>
            {unreadCount > 0 ? (
              <button
                type="button"
                onClick={handleMarkAllRead}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a78bfa] transition hover:text-[#c4b5fd] disabled:opacity-50"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            ) : null}
          </div>

          <div className="max-h-[430px] divide-y divide-white/8 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationRow
                  key={notification.id}
                  notification={notification}
                  compact
                  onRead={handleRead}
                  onNavigate={() => setIsOpen(false)}
                />
              ))
            ) : (
              <div className="px-6 py-10 text-center">
                <Bell className="mx-auto h-6 w-6 text-[#8b5cf6]" />
                <p className="mt-3 text-sm font-semibold text-white">You&apos;re all caught up.</p>
                <p className="mt-1 text-xs leading-5 text-[#858da4]">
                  New activity will appear here.
                </p>
              </div>
            )}
          </div>

          <Link
            href="/notifications"
            onClick={() => setIsOpen(false)}
            className="block border-t border-white/8 px-4 py-3 text-center text-xs font-semibold text-[#a78bfa] transition hover:bg-white/[0.035] hover:text-[#c4b5fd]"
          >
            View all notifications
          </Link>
        </div>
      ) : null}
    </div>
  );
}
