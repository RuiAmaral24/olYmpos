import type { ReactNode } from "react";

import Link from "next/link";
import { ArrowLeft, Sparkles, Users } from "lucide-react";

type SocialListLayoutProps = {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  profilePath: string;
};

export function SocialListLayout({
  children,
  eyebrow,
  title,
  description,
  profilePath,
}: SocialListLayoutProps) {
  return (
    <div className="space-y-8 pb-14">
      <section className="space-y-3 pt-4 sm:pt-6">
        <div className="flex items-center gap-3 text-[#9b6dff]">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-[0.24em]">{eyebrow}</span>
        </div>
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-[#8b5cf6]" />
          <h1 className="editorial-title bg-[linear-gradient(135deg,#f3f0ff,#d4c5f9,#c4b5fd)] bg-clip-text text-5xl font-normal leading-none text-transparent sm:text-6xl">
            {title}
          </h1>
        </div>
        <p className="text-base font-medium text-[#b8c1ec]">{description}</p>
        <Link
          href={profilePath}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#a78bfa] transition hover:text-[#c4b5fd]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </Link>
      </section>
      <section className="mx-auto w-full max-w-4xl">{children}</section>
    </div>
  );
}

export function parseSocialPage(value: string | string[] | undefined) {
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? Math.min(parsed, 10_000) : 1;
}
