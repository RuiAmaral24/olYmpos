import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,var(--accent),var(--accent-secondary))] text-white shadow-[0_18px_40px_rgba(78,161,255,0.22)] hover:brightness-[1.03] hover:shadow-[0_20px_44px_rgba(78,161,255,0.28)]",
  secondary:
    "border border-white/10 bg-white/6 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-white/16 hover:bg-white/10",
  ghost: "text-muted-foreground hover:bg-white/6 hover:text-foreground",
};

export function buttonVariants(variant: ButtonVariant = "primary") {
  return cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
  );
}

export function Button({
  className,
  variant = "primary",
  leftIcon,
  rightIcon,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants(variant), className)}
      {...props}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  );
}
