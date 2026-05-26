import { SkeletonCard } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="space-y-8 pb-8">
      <SkeletonCard className="min-h-[96px]" />
      <SkeletonCard className="min-h-[260px]" />
      <section className="grid gap-4 md:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
      </section>
    </div>
  );
}
