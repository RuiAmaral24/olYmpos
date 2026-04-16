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
      <div className="absolute inset-[-6%] bg-[radial-gradient(circle_at_48%_34%,rgba(146,94,255,0.24),transparent_18%),radial-gradient(circle_at_74%_26%,rgba(78,161,255,0.1),transparent_18%)] blur-3xl" />
      <Image
        src="/olympos-zeus.png"
        alt="Zeus artwork for olYmpos hero"
        fill
        priority
        className="object-cover object-[70%_center] scale-[1.035] [mask-image:linear-gradient(90deg,transparent_0%,black_16%,black_92%,transparent_100%),linear-gradient(180deg,transparent_0%,black_8%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_16%,black_92%,transparent_100%),linear-gradient(180deg,transparent_0%,black_8%,black_88%,transparent_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_44%_30%,rgba(168,85,247,0.14),transparent_22%),radial-gradient(circle_at_78%_24%,rgba(78,161,255,0.08),transparent_22%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,20,1)_0%,rgba(7,11,20,0.96)_17%,rgba(7,11,20,0.62)_38%,rgba(7,11,20,0.14)_64%,rgba(7,11,20,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.16),rgba(7,11,20,0.24)_38%,rgba(7,11,20,0.94)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-[45%] bg-[linear-gradient(90deg,rgba(7,11,20,1),rgba(7,11,20,0.97)_28%,rgba(7,11,20,0.64)_56%,transparent)]" />
      <div className="absolute inset-y-0 right-0 w-[12%] bg-[linear-gradient(270deg,rgba(7,11,20,0.34),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(7,11,20,0.34),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(7,11,20,0.98))]" />
    </div>
  );
}
