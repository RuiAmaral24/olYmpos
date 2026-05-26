import { Sparkles } from "lucide-react";

export function DashboardHero() {
  return (
    <section className="relative pt-7 sm:pt-10">
      <Sparkles className="absolute -left-3 top-7 h-16 w-16 text-[#8b5cf6] opacity-[0.08] sm:top-10" />
      <div className="relative space-y-4">
        <h1 className="editorial-title bg-[linear-gradient(135deg,#f3f0ff_0%,#ddd5ff_48%,#b9a6ff_100%)] bg-clip-text text-[3rem] font-normal leading-[0.95] tracking-normal text-transparent sm:text-[4.5rem]">
          Welcome back
        </h1>
        <p className="text-base font-medium text-[#b8c1ec] sm:text-lg">
          Continue building your universe.
        </p>
      </div>
    </section>
  );
}
