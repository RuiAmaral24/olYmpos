"use client";

import { Bell, CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { NotificationRow } from "@/components/notifications/notification-row";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { markAllNotificationsRead } from "@/lib/supabase/notification-actions";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types";

const filters = ["All", "Unread", "Read"] as const;

type NotificationFilter = (typeof filters)[number];
type DateGroup = "Today" | "Yesterday" | "Earlier";

type NotificationListProps = {
  initialNotifications: Notification[];
  referenceDate: string;
};

export function NotificationList({
  initialNotifications,
  referenceDate,
}: NotificationListProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("All");
  const [isPending, startTransition] = useTransition();
  const unreadCount = notifications.filter((notification) => !notification.readAt).length;
  const counts = {
    All: notifications.length,
    Unread: unreadCount,
    Read: notifications.length - unreadCount,
  };
  const groupedNotifications = useMemo(
    () => groupNotifications(notifications, activeFilter, referenceDate),
    [activeFilter, notifications, referenceDate],
  );
  const visibleCount = counts[activeFilter];

  const handleRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, readAt: new Date().toISOString() }
          : notification,
      ),
    );
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
      router.refresh();
    });
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(16,18,33,0.96),rgba(8,10,20,0.98))] shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:rounded-[28px]">
      <div className="flex flex-col gap-4 border-b border-white/8 px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter notifications"
          className="flex w-full flex-wrap gap-2 lg:w-auto"
        >
          {filters.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                  isActive
                    ? "border-[#8b5cf6]/55 bg-[#8b5cf6]/16 text-white"
                    : "border-white/8 bg-white/[0.025] text-[#9ea7bc] hover:border-white/14 hover:bg-white/[0.05] hover:text-[#d5dae8]",
                )}
              >
                {filter}
                <span
                  className={cn(
                    "min-w-5 rounded-full px-1.5 py-0.5 text-center text-[10px] font-semibold leading-4",
                    isActive ? "bg-[#8b5cf6]/25 text-[#d9ceff]" : "bg-white/6 text-[#7f889f]",
                  )}
                >
                  {counts[filter]}
                </span>
              </button>
            );
          })}
        </div>

        <Button
          variant="ghost"
          className="h-10 self-start rounded-xl px-3 text-[#a78bfa] lg:self-auto"
          leftIcon={<CheckCheck className="h-4 w-4" />}
          onClick={handleMarkAllRead}
          disabled={isPending || unreadCount === 0}
        >
          Mark all as read
        </Button>
      </div>

      <div className="p-4 sm:p-6">
        {visibleCount > 0 ? (
          <div className="space-y-8">
            {groupedNotifications.map(([label, items]) => (
              <section key={label} aria-labelledby={`notifications-${label.toLowerCase()}`}>
                <div className="mb-3 flex items-center gap-3">
                  <h2
                    id={`notifications-${label.toLowerCase()}`}
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-[#858ea6]"
                  >
                    {label}
                  </h2>
                  <span className="h-px flex-1 bg-white/8" />
                </div>
                <div className="space-y-3">
                  {items.map((notification) => (
                    <NotificationRow
                      key={notification.id}
                      notification={notification}
                      onRead={handleRead}
                      showReadAction
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <NotificationEmptyState filter={activeFilter} hasNotifications={notifications.length > 0} />
        )}
      </div>
    </div>
  );
}

function NotificationEmptyState({
  filter,
  hasNotifications,
}: {
  filter: NotificationFilter;
  hasNotifications: boolean;
}) {
  const content = !hasNotifications
    ? {
        eyebrow: "Notification History",
        title: "No notifications yet",
        description: "Activity from your library and community will appear here.",
      }
    : filter === "Unread"
      ? {
          eyebrow: "Unread",
          title: "You're all caught up",
          description: "You don't have any unread notifications.",
        }
      : {
          eyebrow: "Read",
          title: "Nothing read yet",
          description: "Notifications you have read will appear here.",
        };

  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#8b5cf6]/20 bg-[#8b5cf6]/10 text-[#a78bfa]">
        <Bell className="h-5 w-5" />
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#8f77d5]">
        {content.eyebrow}
      </p>
      <h2 className="mt-2 text-lg font-semibold text-white">{content.title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#939bb1]">
        {content.description}
      </p>
    </div>
  );
}

function groupNotifications(
  notifications: Notification[],
  filter: NotificationFilter,
  referenceDate: string,
) {
  const groups: Record<DateGroup, Notification[]> = {
    Today: [],
    Yesterday: [],
    Earlier: [],
  };
  const reference = new Date(referenceDate);
  const today = Date.UTC(
    reference.getUTCFullYear(),
    reference.getUTCMonth(),
    reference.getUTCDate(),
  );

  notifications
    .filter((notification) => {
      if (filter === "Unread") return !notification.readAt;
      if (filter === "Read") return Boolean(notification.readAt);
      return true;
    })
    .forEach((notification) => {
      const createdAt = new Date(notification.createdAt);
      const notificationDay = Date.UTC(
        createdAt.getUTCFullYear(),
        createdAt.getUTCMonth(),
        createdAt.getUTCDate(),
      );
      const dayDifference = Math.floor((today - notificationDay) / 86_400_000);
      const group: DateGroup = dayDifference === 0
        ? "Today"
        : dayDifference === 1
          ? "Yesterday"
          : "Earlier";

      groups[group].push(notification);
    });

  return (Object.entries(groups) as [DateGroup, Notification[]][]).filter(
    ([, items]) => items.length > 0,
  );
}
