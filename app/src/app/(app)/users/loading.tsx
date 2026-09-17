import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function UsersLoading() {
  return (
    <div className="space-y-9 pb-14 pt-4 sm:pt-6">
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-14 w-full max-w-md" />
        <Skeleton className="h-5 w-full max-w-lg" />
      </div>
      <SkeletonCard className="mx-auto min-h-20 w-full max-w-5xl" />
      <div className="mx-auto grid w-full max-w-5xl gap-4 lg:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <SkeletonCard key={index} className="min-h-32" />
        ))}
      </div>
    </div>
  );
}
