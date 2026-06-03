import { Sparkles } from "lucide-react";

export function DashboardHero() {
  return (
    <section className="relative pt-4 sm:pt-6">
      <Sparkles className="absolute -left-3 top-4 h-16 w-16 text-[#8b5cf6] opacity-[0.08] sm:top-6" />
      <div className="relative space-y-3">
        <h1 className="editorial-title bg-[linear-gradient(135deg,#f3f0ff_0%,#ddd5ff_48%,#b9a6ff_100%)] bg-clip-text text-5xl font-normal leading-none tracking-[0] text-transparent sm:text-6xl">
          Welcome back
        </h1>
        <p className="text-base font-medium text-[#b8c1ec] sm:text-lg">
          Continue building your universe.
        </p>
      </div>
    </section>
  );
}
