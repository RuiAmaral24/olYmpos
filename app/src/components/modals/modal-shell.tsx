"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { Sparkles, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ModalShellProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

export function ModalShell({
  open,
  onClose,
  children,
  className,
}: ModalShellProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-stretch">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-[rgba(4,7,16,0.74)] backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 flex h-full w-full max-w-[720px] flex-col overflow-hidden border border-[#382760] bg-[linear-gradient(180deg,rgba(31,28,60,0.99),rgba(24,24,49,0.99)_48%,rgba(17,18,34,0.99))] shadow-[0_32px_120px_rgba(0,0,0,0.62)]",
          className,
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.2),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(99,102,241,0.12),transparent_26%)]" />
        <div className="relative border-b border-[#33275a] px-5 py-5 sm:px-[58px]">
          <div className="flex items-center justify-between gap-4">
            <div className="relative min-w-0">
              <Sparkles className="absolute -left-4 top-1/2 h-14 w-14 -translate-y-1/2 text-[#8b5cf6] opacity-[0.1]" />
              <h2 className="editorial-title bg-[linear-gradient(135deg,#ffffff,#efe8ff,#d8caff)] bg-clip-text text-5xl font-normal leading-none tracking-[0] text-transparent sm:text-6xl">
                Entry Editor
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close modal"
              className="inline-flex h-15 w-15 shrink-0 items-center justify-center text-muted-foreground transition hover:text-white sm:h-5 sm:w-9"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="soft-scrollbar relative flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-7">
          {children}
        </div>
      </div>
    </div>
  );
}
