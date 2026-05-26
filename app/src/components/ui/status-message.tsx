import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

import { cn } from "@/lib/utils";

type StatusTone = "error" | "success" | "info";

type StatusMessageProps = {
  tone?: StatusTone;
  title?: string;
  children: ReactNode;
  className?: string;
};

const toneClasses: Record<StatusTone, string> = {
  error: "border-red-300/20 bg-red-500/10 text-red-100",
  success: "border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
  info: "border-white/10 bg-white/6 text-[#d7def1]",
};

const toneIcons: Record<StatusTone, ReactNode> = {
  error: <AlertCircle className="h-4 w-4" />,
  success: <CheckCircle2 className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
};

export function StatusMessage({
  tone = "info",
  title,
  children,
  className,
}: StatusMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl border px-4 py-3 text-sm leading-6",
        toneClasses[tone],
        className,
      )}
      role={tone === "error" ? "alert" : "status"}
    >
      <span className="mt-1 shrink-0">{toneIcons[tone]}</span>
      <div className="space-y-0.5">
        {title ? <p className="font-semibold text-white">{title}</p> : null}
        <div>{children}</div>
      </div>
    </div>
  );
}
