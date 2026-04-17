import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(16,23,37,0.96),rgba(8,12,21,0.94))] px-6 py-8 shadow-[0_24px_80px_rgba(2,6,18,0.4)] sm:px-8 sm:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,108,255,0.22),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(78,161,255,0.16),transparent_24%)]" />
      <div className="absolute right-8 top-8 hidden h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(124,108,255,0.22),transparent_68%)] blur-2xl sm:block" />

      <div className="relative flex flex-col gap-5">
        <Badge className="w-fit border-white/12 bg-white/8 text-[#d7def1]">
          <Sparkles className="mr-2 h-3.5 w-3.5" />
          Universe pulse
        </Badge>
        <div className="space-y-3">
          <h2 className="text-[2.2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.7rem]">
            Welcome back
          </h2>
          <p className="max-w-2xl text-base leading-7 text-[#aeb8cf] sm:text-lg">
            Continue building your universe.
          </p>
        </div>
      </div>
    </section>
  );
}
