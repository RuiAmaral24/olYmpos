import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.12),rgba(255,255,255,0.06))]",
        className,
      )}
    />
  );
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "premium-panel rounded-[28px] border border-white/8 p-6 sm:p-7",
        className,
      )}
    >
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-4 h-7 w-3/4" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-2/3" />
    </div>
  );
}
