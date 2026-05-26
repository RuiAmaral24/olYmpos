import { SkeletonCard } from "@/components/ui/skeleton";

export default function DetailsLoading() {
  return (
    <div className="space-y-8 pb-8">
      <SkeletonCard className="min-h-[64px]" />
      <SkeletonCard className="min-h-[340px]" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <SkeletonCard />
    </div>
  );
}
