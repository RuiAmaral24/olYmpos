import { SkeletonCard } from "@/components/ui/skeleton";

export default function LibraryLoading() {
  return (
    <div className="space-y-8 pb-8">
      <SkeletonCard className="min-h-[250px]" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SkeletonCard className="min-h-[96px] flex-1" />
        <SkeletonCard className="min-h-[96px] sm:w-80" />
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SkeletonCard className="min-h-[390px]" />
        <SkeletonCard className="min-h-[390px]" />
        <SkeletonCard className="min-h-[390px]" />
      </section>
    </div>
  );
}
