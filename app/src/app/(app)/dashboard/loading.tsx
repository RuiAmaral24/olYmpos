import { SkeletonCard } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 pb-8">
      <SkeletonCard className="min-h-[220px]" />
      <section className="grid gap-4 md:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
      <section className="grid gap-4 xl:grid-cols-3">
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
