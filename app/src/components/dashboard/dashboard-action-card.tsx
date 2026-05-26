import type { ReactNode } from "react";

import { Plus } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type DashboardActionCardProps = {
  title: string;
  href: string;
  icon: ReactNode;
  tone: "anime" | "movie" | "game";
};

export function DashboardActionCard({
  title,
  href,
  icon,
  tone,
}: DashboardActionCardProps) {
  const gradients = {
    anime: "from-[#d12ee8] via-[#b72ce6] to-[#a12be0]",
    movie: "from-[#8b5cf6] via-[#7762f5] to-[#6767f2]",
    game: "from-[#2f80ed] via-[#2d6eea] to-[#2454d8]",
  };

  return (
    <Link
      href={href}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl bg-gradient-to-br p-4 text-white shadow-[0_18px_48px_rgba(29,31,80,0.28)] transition duration-300 hover:-translate-y-0.5",
        gradients[tone],
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
        {icon}
      </div>
      <span className="font-semibold">{title}</span>
      <Plus className="ml-auto h-5 w-5 transition group-hover:rotate-90" />
    </Link>
  );
}
