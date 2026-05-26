import Link from "next/link";
import { Cinzel, Outfit } from "next/font/google";
import { Clapperboard, Gamepad2, Sparkles, TvMinimalPlay } from "lucide-react";

import { CategoryCard } from "@/components/landing/category-card";
import { HeroVisual } from "@/components/landing/hero-visual";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LandingPage() {
  return (
    <div className={cn("relative left-1/2 right-1/2 -mt-5 ml-[-50vw] mr-[-50vw] flex w-[100vw] max-w-none shrink-0 flex-col overflow-hidden bg-[#0a0a0f] text-white sm:-mt-8", outfit.className)}>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(139,92,246,0.12),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.08),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.06),transparent_50%),linear-gradient(180deg,#0f1729,#0a0a0f_42%,#0a0a0f)]" />
      <section className="relative z-10 -mb-20 min-h-[calc(100svh-3rem)] w-[100vw] max-w-none overflow-hidden pb-20 lg:min-h-[calc(100svh-2rem)]">
        <HeroVisual className="-bottom-40 -top-28 left-1/2 right-auto h-auto w-[100vw] max-w-none -translate-x-1/2" />
        <div className="absolute inset-x-0 top-0 z-[8] h-44 bg-[linear-gradient(180deg,#0a0a0f_0%,rgba(10,10,15,0.86)_18%,rgba(10,10,15,0.48)_52%,transparent_100%)]" />
        <div className="absolute inset-x-0 top-0 z-[8] h-28 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1),transparent_68%)]" />
        <div className="absolute inset-0 z-[5] bg-[linear-gradient(90deg,rgba(10,10,15,0.78)_0%,rgba(10,10,15,0.52)_34%,rgba(10,10,15,0.16)_62%,rgba(10,10,15,0.38)_100%)]" />
        <div className="absolute left-0 top-1/2 z-[6] h-[75%] w-[62%] -translate-y-1/2 bg-[linear-gradient(135deg,rgba(10,10,15,0.82),rgba(10,10,15,0.42)_48%,transparent)] blur-[80px]" />
        <div className="absolute left-[5%] top-1/2 z-[6] h-[58%] w-[46%] -translate-y-1/2 bg-[#0a0a0f]/45 blur-[64px]" />
        <div className="absolute inset-x-0 bottom-[-1px] z-[7] h-96 bg-[linear-gradient(180deg,transparent,rgba(10,10,15,0.62)_34%,#0a0a0f_82%,#0a0a0f)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-[1450px] items-center px-5 pb-40 pt-24 sm:px-8 sm:pb-44 sm:pt-28 lg:min-h-[calc(100svh-2rem)] lg:px-10">
          <div className="w-full max-w-[45rem] lg:ml-[8%] xl:ml-[10%]">
            <div className="relative z-10 flex max-w-[43rem] flex-col justify-center space-y-9">
              <div className="space-y-7">
                <Badge className="w-fit gap-2 rounded-full border-[#9f7aea]/65 bg-[linear-gradient(90deg,rgba(139,92,246,0.38),rgba(124,58,237,0.28))] px-4 py-2 text-[0.8rem] normal-case tracking-normal text-[#eadcff] shadow-[0_0_30px_rgba(139,92,246,0.32)] backdrop-blur-md">
                  <Sparkles className="h-3 w-3 text-[#a78bfa]" />
                  Your universe of taste
                </Badge>
                <div className="space-y-6">
                  <h1 className={cn("max-w-[55rem] overflow-visible text-[3.55rem] leading-[1.12] tracking-[-0.04em] text-[#f0f4ff] drop-shadow-[0_6px_32px_rgba(10,10,15,1)] sm:text-[4.65rem] md:text-[5.15rem] xl:text-[5.7rem]", cinzel.className)}>
                    <span className="block whitespace-nowrap bg-[linear-gradient(135deg,#f0f4ff,#d4c5f9_48%,#c4b5fd)] bg-clip-text text-transparent [text-shadow:_0_3px_24px_rgba(139,92,246,0.6)]">
                      Organize your
                    </span>
                    <span className="mt-2 block whitespace-nowrap bg-[linear-gradient(135deg,#c4b5fd,#a78bfa_48%,#8b5cf6)] bg-clip-text pb-1 text-transparent [text-shadow:_0_3px_24px_rgba(139,92,246,0.7)]">
                      anime, movies,
                    </span>
                    <span className="mt-2 block whitespace-nowrap text-[#f0f4ff] [text-shadow:_0_3px_28px_rgba(139,92,246,0.5)]">
                      and games.
                    </span>
                  </h1>
                  <p className="max-w-[40rem] text-[1.08rem] leading-[1.7] text-[#d4c5f9] drop-shadow-[0_4px_20px_rgba(10,10,15,1)] sm:text-[1.24rem] lg:text-[1.34rem]">
                    Build your personal universe with ratings, favorites, reviews, and lists - all inside olYmpos.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                <Link
                  href="/signup"
                  className={cn(
                    buttonVariants("primary"),
                    "h-14 rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#7c3aed_58%,#6366f1)] px-10 text-base font-semibold shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:scale-[1.03] hover:shadow-[0_0_70px_rgba(139,92,246,0.68)]",
                  )}
                >
                  Get Started
                </Link>
                <Link
                  href="/#features"
                  className={cn(
                    buttonVariants("secondary"),
                    "h-14 justify-center rounded-xl border-2 border-[#8b5cf6]/60 bg-[rgba(10,10,15,0.24)] px-10 text-base font-semibold text-[#f0f4ff] shadow-[0_0_25px_rgba(139,92,246,0.2)] backdrop-blur-md hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/25",
                  )}
                >
                  See Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="relative z-10 overflow-hidden bg-[radial-gradient(circle_at_50%_46%,rgba(124,108,255,0.13),transparent_26%),radial-gradient(circle_at_12%_74%,rgba(168,85,247,0.09),transparent_22%),linear-gradient(180deg,#0a0a0f_0%,#0f1429_48%,#0b0d19_100%)] px-5 pb-12 pt-20 sm:px-8 sm:pb-14 sm:pt-24 lg:px-10 lg:pt-28"
      >
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:180px_180px]" />
        <div className="relative mx-auto w-full max-w-[1400px] space-y-16 lg:space-y-20">
          <div className="mx-auto max-w-[78rem] space-y-5 text-center">
            <h2 className={cn("whitespace-nowrap bg-[linear-gradient(135deg,#f0f4ff,#c4b5fd_52%,#a78bfa)] bg-clip-text text-[clamp(2rem,5vw,4.05rem)] leading-none tracking-[-0.035em] text-transparent", cinzel.className)}>
              Track Everything You Love
            </h2>
            <p className="mx-auto max-w-[46rem] text-base leading-8 text-[#b8c1ec] sm:text-[1.24rem]">
              One platform for all your entertainment. Rate, review, and organize your universe.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <CategoryCard
              title="Anime"
              description="Track series, rate episodes, and build your watchlist."
              icon={TvMinimalPlay}
              accentClassName="bg-[linear-gradient(90deg,#c026d3,#8b5cf6)]"
              tone="magenta"
            />
            <CategoryCard
              title="Movies"
              description="Organize your collection, write reviews, and curate your cinema."
              icon={Clapperboard}
              accentClassName="bg-[linear-gradient(90deg,#8b5cf6,#6366f1)]"
              tone="violet"
            />
            <CategoryCard
              title="Games"
              description="Track your gaming journey with ratings and progress logs."
              icon={Gamepad2}
              accentClassName="bg-[linear-gradient(90deg,#3b82f6,#2563eb)]"
              tone="blue"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[-10rem] left-1/2 h-80 w-[min(82rem,92vw)] -translate-x-1/2 rounded-full bg-[rgba(139,92,246,0.08)] blur-[90px]" />
        <Card className="relative mx-auto mt-24 w-full max-w-[1400px] overflow-hidden rounded-[28px] border-white/8 bg-[radial-gradient(circle_at_16%_22%,rgba(167,139,250,0.16),transparent_24%),radial-gradient(circle_at_86%_18%,rgba(99,102,241,0.14),transparent_24%),linear-gradient(180deg,rgba(18,23,40,0.94),rgba(10,14,24,0.99))] px-5 py-8 sm:mt-32 sm:rounded-[32px] sm:px-12 sm:py-12">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,rgba(192,38,211,0.95),rgba(139,92,246,0.82)_48%,rgba(59,130,246,0.82))] opacity-80 shadow-[0_0_16px_rgba(139,92,246,0.28)]" />
          <div className="pointer-events-none absolute left-[32%] top-6 h-24 w-24 rounded-full bg-[rgba(139,92,246,0.08)] blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-3rem] right-[12%] h-40 w-40 rounded-full bg-[rgba(59,130,246,0.08)] blur-[70px]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 flex-1 space-y-6.5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#8b5cf6]/35 bg-[linear-gradient(90deg,rgba(139,92,246,0.18),rgba(99,102,241,0.12))] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d9ccff] shadow-[0_0_24px_rgba(139,92,246,0.14)] backdrop-blur-md">
                <span className="text-[13px] leading-none text-[#a78bfa] opacity-90 [text-shadow:0_0_14px_rgba(167,139,250,0.32)]">✨</span>
                <span>Start Your Universe</span>
              </div>
              <div className="space-y-2">
                <h2 className={cn("text-[1.7rem] font-normal leading-none tracking-[-0.03em] text-foreground sm:text-[2.15rem]", cinzel.className)}>
                  Build your olYmpos from day one.
                </h2>
                <p className={cn("max-w-none text-sm leading-7 text-muted-foreground sm:text-base lg:whitespace-nowrap lg:pr-8", outfit.className)}>
                  Create your profile, shape your lists, and start rating the stories, films, and games that define you.
                </p>
              </div>
            </div>
            <Link
              href="/signup"
              className={cn(
                buttonVariants("primary"),
                "h-14 rounded-2xl bg-[linear-gradient(135deg,#8b5cf6,#7c3aed_58%,#6366f1)] px-8 text-base shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:scale-[1.03] hover:shadow-[0_0_70px_rgba(139,92,246,0.68)]",
              )}
            >
              Begin Now
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
