import Image from "next/image";

import { cn } from "@/lib/utils";

type HeroVisualProps = {
  className?: string;
};

export function HeroVisual({ className }: HeroVisualProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-y-0 right-0 overflow-hidden bg-transparent",
        className,
      )}
    >
      <div className="absolute left-1/2 top-1/2 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(135deg,#8b5cf6,#6366f1,#3b82f6)] opacity-40 blur-[160px]" />
      <div className="absolute right-[8%] top-[26%] h-[38rem] w-[38rem] rounded-full bg-[#a78bfa] opacity-30 blur-[130px]" />
      <div className="absolute bottom-0 left-1/2 h-[26rem] w-[70rem] -translate-x-1/2 bg-[linear-gradient(0deg,rgba(99,102,241,0.26),rgba(139,92,246,0.12),transparent)] blur-[110px]" />
      <div className="absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8b5cf6]/12" />
      <div className="absolute left-1/2 top-1/2 h-[56rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6366f1]/8" />
      <Image
        src="/olympos-zeus.png"
        alt="Zeus artwork for olYmpos hero"
        fill
        priority
        className="object-cover object-center opacity-[0.58] mix-blend-luminosity [mask-image:radial-gradient(ellipse_105%_95%_at_52%_50%,black_18%,rgba(0,0,0,0.9)_35%,rgba(0,0,0,0.65)_55%,rgba(0,0,0,0.35)_75%,rgba(0,0,0,0.1)_90%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_105%_95%_at_52%_50%,black_18%,rgba(0,0,0,0.9)_35%,rgba(0,0,0,0.65)_55%,rgba(0,0,0,0.35)_75%,rgba(0,0,0,0.1)_90%,transparent_100%)]"
      />
      <Image
        src="/olympos-zeus.png"
        alt=""
        fill
        priority
        aria-hidden
        className="object-cover object-center opacity-[0.24] [mask-image:radial-gradient(ellipse_100%_90%_at_52%_50%,black_12%,rgba(0,0,0,0.75)_30%,rgba(0,0,0,0.45)_50%,rgba(0,0,0,0.2)_70%,rgba(0,0,0,0.05)_85%,transparent_98%)] [-webkit-mask-image:radial-gradient(ellipse_100%_90%_at_52%_50%,black_12%,rgba(0,0,0,0.75)_30%,rgba(0,0,0,0.45)_50%,rgba(0,0,0,0.2)_70%,rgba(0,0,0,0.05)_85%,transparent_98%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_45%,rgba(139,92,246,0.2),rgba(99,102,241,0.15)_35%,rgba(139,92,246,0.08)_60%,transparent_80%)] mix-blend-screen" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,15,0.75),transparent_48%,rgba(10,10,15,0.6)),linear-gradient(180deg,rgba(10,10,15,0.5),transparent_38%,rgba(10,10,15,0.95)),linear-gradient(0deg,rgba(10,10,15,0.7),rgba(10,10,15,0.25)_42%,rgba(10,10,15,0.5))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#0a0a0f_0%,transparent_40%),radial-gradient(ellipse_at_top_right,rgba(10,10,15,0.78)_0%,transparent_40%),radial-gradient(ellipse_at_bottom_left,#0a0a0f_0%,transparent_35%),radial-gradient(ellipse_at_bottom_right,#0a0a0f_0%,transparent_35%)] opacity-80" />
      <div className="absolute inset-0 opacity-[0.13] [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:150px_150px]" />
    </div>
  );
}
