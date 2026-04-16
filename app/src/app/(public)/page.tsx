import Link from "next/link";
import { Clapperboard, Gamepad2, Sparkles, TvMinimalPlay } from "lucide-react";

import { CategoryCard } from "@/components/landing/category-card";
import { HeroVisual } from "@/components/landing/hero-visual";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="flex w-full flex-col gap-[5.5rem] py-0 sm:gap-24">
      <section className="relative overflow-hidden px-6 pb-[7.5rem] pt-14 sm:px-8 sm:pb-[8rem] sm:pt-[4.5rem] lg:px-10 lg:pt-[5.5rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_16%,rgba(124,108,255,0.18),transparent_18%),radial-gradient(circle_at_74%_10%,rgba(78,161,255,0.06),transparent_18%),linear-gradient(180deg,rgba(10,12,22,0.12),rgba(10,12,22,0.64)_62%,rgba(7,11,20,1))]" />
        <div className="absolute inset-x-0 bottom-0 h-[8rem] bg-[linear-gradient(180deg,transparent,rgba(7,11,20,0.92))]" />
        <div className="relative mx-auto max-w-[1260px]">
          <div className="grid min-h-[36rem] items-center gap-8 sm:min-h-[40rem] lg:min-h-[44rem] lg:grid-cols-[minmax(0,37rem)_minmax(0,1fr)] lg:gap-6">
            <div className="relative z-10 flex max-w-[37rem] flex-col justify-center space-y-8 lg:pl-2">
              <div className="absolute inset-y-[-2rem] left-[-1rem] right-[-2rem] -z-10 bg-[linear-gradient(90deg,rgba(7,11,20,0.92),rgba(7,11,20,0.82)_62%,transparent)] blur-xl" />
              <div className="space-y-7">
                <Badge className="w-fit gap-2 rounded-full border-[rgba(139,92,246,0.42)] bg-[rgba(88,28,135,0.16)] px-5 py-2 text-sm text-[#e5ddff] shadow-[0_0_32px_rgba(124,108,255,0.2)]">
                  <Sparkles className="h-3.5 w-3.5 text-accent-secondary" />
                  Your universe of taste
                </Badge>
                <div className="space-y-6">
                  <h1 className="max-w-[37rem] font-serif text-[3.55rem] leading-[0.92] tracking-[-0.045em] text-[#f0e9ff] [text-shadow:0_0_24px_rgba(168,85,247,0.16)] sm:text-[4.85rem] md:text-[5.15rem] lg:text-[5.6rem]">
                    <span className="block text-[#ebdeff]">Organize your</span>
                    <span className="block bg-[linear-gradient(180deg,#e0ccff_0%,#9d77ff_92%)] bg-clip-text pb-1 text-transparent">
                      anime, movies,
                    </span>
                    <span className="block text-[#f5f6fb]">and games.</span>
                  </h1>
                  <p className="max-w-[32rem] text-[1.05rem] leading-8 text-[#d0d5e4] sm:text-[1.24rem] sm:leading-9">
                    Build your personal universe with ratings, favorites, reviews, and lists - all inside olYmpos.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/signup"
                  className={cn(
                    buttonVariants("primary"),
                    "h-14 rounded-2xl px-8 text-base shadow-[0_18px_42px_rgba(124,108,255,0.28)]",
                  )}
                >
                  Get Started
                </Link>
                <Link
                  href="/#features"
                  className={cn(
                    buttonVariants("secondary"),
                    "h-14 justify-center rounded-2xl border-[rgba(124,108,255,0.34)] bg-[rgba(10,14,24,0.24)] px-8 text-base text-[#ece8ff]",
                  )}
                >
                  See Features
                </Link>
              </div>
            </div>

            <div className="relative min-h-[24rem] overflow-hidden lg:min-h-[40rem]">
              <HeroVisual className="inset-y-0 right-0 w-[106%]" />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-[1260px] space-y-12 px-1 py-4">
        <SectionTitle
          eyebrow="Collections"
          title="Track Everything You Love"
          description="One platform for all your entertainment. Rate, review, and organize your universe."
          className="mx-auto max-w-[50rem] text-center sm:items-center"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <CategoryCard
            title="Anime"
            description="Follow seasonal releases, score completed arcs, and build lists worthy of your favorite worlds."
            icon={TvMinimalPlay}
            accentClassName="bg-[linear-gradient(90deg,#c026d3,#8b5cf6)]"
          />
          <CategoryCard
            title="Movies"
            description="Collect timeless classics, recent discoveries, and personal reviews in one elegant archive."
            icon={Clapperboard}
            accentClassName="bg-[linear-gradient(90deg,#8b5cf6,#6366f1)]"
          />
          <CategoryCard
            title="Games"
            description="Track story-driven adventures, elite multiplayer sessions, and the backlog still calling your name."
            icon={Gamepad2}
            accentClassName="bg-[linear-gradient(90deg,#3b82f6,#2563eb)]"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1260px] pb-8">
        <Card className="overflow-hidden rounded-[32px] border-white/8 bg-[radial-gradient(circle_at_top,rgba(124,108,255,0.16),transparent_22%),linear-gradient(180deg,rgba(18,23,40,0.94),rgba(10,14,24,0.99))] px-8 py-10 sm:px-12 sm:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow="Start Your Universe"
              title="Build your olYmpos from day one."
              description="Create your profile, shape your lists, and start rating the stories, films, and games that define you."
            />
            <Link
              href="/signup"
              className={cn(
                buttonVariants("primary"),
                "h-14 rounded-2xl px-8 text-base shadow-[0_18px_50px_rgba(124,108,255,0.38)]",
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
