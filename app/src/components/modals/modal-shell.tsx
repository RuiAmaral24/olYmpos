"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type ModalShellProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
};

export function ModalShell({
  open,
  onClose,
  title,
  subtitle,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-[rgba(4,7,16,0.74)] backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.98),rgba(8,12,22,0.99))] shadow-[0_32px_120px_rgba(0,0,0,0.56)]",
          className,
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,108,255,0.2),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(78,161,255,0.14),transparent_22%)]" />
        <div className="relative border-b border-white/8 px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.28em] text-accent-secondary">
                Entry Editor
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
                {title}
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-[#aeb8cf]">
                {subtitle}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close modal"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-muted-foreground transition hover:text-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="relative max-h-[calc(100vh-9rem)] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
