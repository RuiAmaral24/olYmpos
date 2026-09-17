import { Bell, Sparkles } from "lucide-react";

import { NotificationList } from "@/components/notifications/notification-list";
import { getUserNotifications } from "@/lib/supabase/notifications";

export default async function NotificationsPage() {
  const notifications = await getUserNotifications({ limit: 100 });
  const referenceDate = new Date().toISOString();

  return (
    <div className="space-y-10 pb-14">
      <section className="space-y-3 pt-4 sm:pt-6">
        <div className="flex items-center gap-3 text-[#9b6dff]">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-[0.24em]">
            Your Activity
          </span>
        </div>
        <div className="relative">
          <Bell
            aria-hidden="true"
            className="pointer-events-none absolute -left-4 top-1/2 h-16 w-16 -translate-y-1/2 text-[#8b5cf6] opacity-[0.08]"
          />
          <h1 className="editorial-title relative bg-[linear-gradient(135deg,#f3f0ff,#d4c5f9,#c4b5fd)] bg-clip-text text-5xl font-normal leading-none text-transparent sm:text-6xl">
            Notifications
          </h1>
        </div>
        <p className="text-base font-medium text-[#b8c1ec] sm:text-lg">
          Stay up to date with activity around your olYmpos.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl">
        <NotificationList
          initialNotifications={notifications}
          referenceDate={referenceDate}
        />
      </section>
    </div>
  );
}
