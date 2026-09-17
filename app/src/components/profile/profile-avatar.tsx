import Image from "next/image";

import { cn } from "@/lib/utils";

type ProfileAvatarProps = {
  avatarUrl: string | null;
  displayName: string;
  size?: "sm" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "h-12 w-12 rounded-xl text-base",
  lg: "h-28 w-28 rounded-2xl text-4xl",
};

export function ProfileAvatar({
  avatarUrl,
  displayName,
  size = "sm",
  className,
}: ProfileAvatarProps) {
  const dimension = size === "lg" ? "112px" : "48px";

  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden border border-[#8b5cf6]/25 bg-[linear-gradient(135deg,#8b5cf6,#6366f1)] font-bold text-white shadow-[0_14px_34px_rgba(139,92,246,0.16)]",
        sizeClasses[size],
        className,
      )}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={`${displayName}'s avatar`}
          fill
          sizes={dimension}
          className="object-cover"
          unoptimized
        />
      ) : (
        getInitials(displayName)
      )}
    </span>
  );
}

function getInitials(value: string) {
  return value
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "OY";
}
