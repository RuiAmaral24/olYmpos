import type { ReactNode } from "react";
import {
  AtSign,
  Bell,
  CalendarDays,
  Cog,
  Eye,
  Heart,
  KeyRound,
  Library,
  Mail,
  MessageSquareText,
  Palette,
  Sparkles,
  UserRound,
} from "lucide-react";

import {
  PasswordSettingsForm,
  ProfileSettingsForm,
} from "@/components/settings/settings-forms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getUserLibraryItems, getUserProfile } from "@/lib/supabase/library";

export default async function SettingsPage() {
  const [profile, libraryItems] = await Promise.all([
    getUserProfile(),
    getUserLibraryItems(),
  ]);

  if (!profile) {
    return null;
  }

  const identity = profile.displayName || profile.username;
  const accountOverview = [
    {
      label: "Library items",
      value: libraryItems.length,
      icon: <Library className="h-4 w-4" />,
    },
    {
      label: "Reviews written",
      value: libraryItems.filter((item) => item.review !== null).length,
      icon: <MessageSquareText className="h-4 w-4" />,
    },
    {
      label: "Favorites",
      value: libraryItems.filter((item) => item.isFavorite).length,
      icon: <Heart className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-10 pb-12">
      <section className="space-y-3">
        <div className="flex items-center gap-3 text-[#9b6dff]">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-[0.24em]">
            Your account
          </span>
        </div>
        <div className="relative">
          <Cog
            aria-hidden="true"
            className="pointer-events-none absolute -left-4 top-1/2 h-16 w-16 -translate-y-1/2 text-[#8b5cf6] opacity-[0.08]"
          />
          <h1 className="editorial-title relative bg-[linear-gradient(90deg,#ffffff,#c9b8ff_62%,#8b8df8)] bg-clip-text text-5xl font-medium text-transparent sm:text-6xl">
            Settings
          </h1>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[#9da5bb] sm:text-base">
          Manage your account and profile.
        </p>
      </section>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.85fr)]">
        <section className="space-y-5">
          <SectionHeading icon={<UserRound className="h-6 w-6" />} title="Profile" />
          <Card className="rounded-2xl sm:rounded-2xl">
            <div className="mb-7 flex items-center gap-4 border-b border-white/8 pb-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8b5cf6,#6366f1)] text-lg font-bold text-white shadow-[0_12px_32px_rgba(99,102,241,0.24)]">
                {getInitials(identity)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-white">{identity}</p>
                <p className="flex items-center gap-1.5 truncate text-sm text-[#939bb1]">
                  <AtSign className="h-3.5 w-3.5 shrink-0" />
                  {profile.username}
                </p>
              </div>
            </div>

            <ProfileSettingsForm
              username={profile.username}
              displayName={profile.displayName ?? ""}
              bio={profile.bio ?? ""}
            />
          </Card>
        </section>

        <aside className="flex h-full flex-col gap-10">
          <section className="flex flex-1 flex-col gap-5">
            <SectionHeading icon={<Mail className="h-6 w-6" />} title="Account" />
            <Card className="flex flex-1 flex-col gap-8 rounded-2xl py-8 sm:rounded-2xl xl:py-9">
              <div className="space-y-2">
                <label htmlFor="account-email" className="text-sm font-semibold text-[#e7e9f5]">
                  Email address
                </label>
                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <Input
                    id="account-email"
                    type="email"
                    defaultValue={profile.email ?? ""}
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                  <Button
                    type="button"
                    disabled
                    className="h-12 rounded-xl px-5"
                    title="Email changes are coming soon"
                  >
                    Change Email
                  </Button>
                </div>
                <p className="text-xs leading-5 text-[#8f96ad]">
                  Email changes will be available soon.
                </p>
              </div>
              <div className="grid gap-4 border-t border-white/8 pt-5 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <AccountDetail
                  icon={<AtSign className="h-3.5 w-3.5" />}
                  label="Handle"
                  value={`@${profile.username}`}
                />
                <AccountDetail
                  icon={<CalendarDays className="h-3.5 w-3.5" />}
                  label="Member since"
                  value={formatMemberSince(profile.createdAt)}
                />
              </div>
            </Card>
          </section>

          <section className="space-y-5">
            <SectionHeading icon={<Sparkles className="h-6 w-6" />} title="Account Overview" />
            <Card className="rounded-2xl p-0 sm:rounded-2xl sm:p-0">
              <div className="grid grid-cols-3 divide-x divide-white/8">
                {accountOverview.map((item) => (
                  <div key={item.label} className="min-w-0 px-3 py-7 text-center sm:px-5 xl:py-8">
                    <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-[#8b5cf6]/12 text-[#a78bfa]">
                      {item.icon}
                    </span>
                    <p className="mt-3 text-xl font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-xs leading-5 text-[#939bb1]">{item.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </aside>
      </div>

      <section className="space-y-5">
        <SectionHeading icon={<KeyRound className="h-6 w-6" />} title="Security" />
        <Card className="rounded-2xl sm:rounded-2xl">
          <div className="w-full">
            <div className="mb-6 space-y-1">
              <h3 className="text-base font-semibold text-white">Change password</h3>
              <p className="text-sm leading-6 text-[#939bb1]">
                Use at least 6 characters for your new password.
              </p>
            </div>
            <PasswordSettingsForm />
          </div>
        </Card>
      </section>

      <section className="space-y-5">
        <SectionHeading icon={<Cog className="h-6 w-6" />} title="Preferences" />
        <Card className="rounded-2xl p-0 sm:rounded-2xl sm:p-0">
          <div className="grid divide-y divide-white/8 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            <PreferenceRow
              icon={<Bell className="h-5 w-5" />}
              title="Notifications"
              description="Choose which activity and release updates you want to receive."
            />
            <PreferenceRow
              icon={<Eye className="h-5 w-5" />}
              title="Privacy"
              description="Control how your profile and activity are shown to others."
            />
            <PreferenceRow
              icon={<Palette className="h-5 w-5" />}
              title="Appearance"
              description="Customize how olYmpos looks for you."
            />
          </div>
        </Card>
      </section>
    </div>
  );
}

function SectionHeading({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 text-[#8b5cf6]">
      {icon}
      <h2 className="section-subtitle">{title}</h2>
    </div>
  );
}

function AccountDetail({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-2 text-xs font-medium text-[#858da4]">
        <span className="text-[#8b5cf6]">{icon}</span>
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold text-[#e7e9f5]">{value}</p>
    </div>
  );
}

function PreferenceRow({
  description,
  icon,
  title,
}: {
  description: string;
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-4 p-5 sm:p-6">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8b5cf6]/12 text-[#a78bfa]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-semibold text-white">{title}</h3>
          <Badge className="border-[#8b5cf6]/20 bg-[#8b5cf6]/10 px-2.5 py-1 text-[10px] tracking-[0.14em] text-[#b9a6ff]">
            Coming soon
          </Badge>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#939bb1]">{description}</p>
      </div>
    </div>
  );
}

function formatMemberSince(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function getInitials(name: string) {
  return name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
