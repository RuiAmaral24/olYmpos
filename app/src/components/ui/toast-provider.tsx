"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ToastTone = "success" | "error";

type Toast = {
  id: number;
  tone: ToastTone;
  message: string;
};

type ToastContextValue = {
  showToast: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, tone: ToastTone = "success") => {
      const id = Date.now();
      setToasts((current) => [...current.slice(-2), { id, tone, message }]);
      window.setTimeout(() => dismissToast(id), 3600);
    },
    [dismissToast],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 grid w-[min(360px,calc(100vw-2.5rem))] gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-[0_22px_60px_rgba(0,0,0,0.36)] backdrop-blur",
              toast.tone === "success"
                ? "border-emerald-300/20 bg-[rgba(12,42,33,0.92)] text-emerald-50"
                : "border-red-300/20 bg-[rgba(52,18,28,0.92)] text-red-50",
            )}
            role="status"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="min-w-0 flex-1 leading-6">{toast.message}</p>
            <button
              type="button"
              aria-label="Dismiss message"
              className="rounded-full p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
              onClick={() => dismissToast(toast.id)}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider.");
  }

  return context;
}
