import Link from "next/link";
import { Zap } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/login", label: "Login" },
];

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[rgba(124,108,255,0.1)] bg-[rgba(7,9,17,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[radial-gradient(circle,rgba(139,92,246,0.95),rgba(124,108,255,0.42))] text-white shadow-[0_0_18px_rgba(124,108,255,0.38)]">
            <Zap className="h-4 w-4 fill-current" />
          </span>
          <span className="font-serif text-[2rem] tracking-[-0.03em] text-[#e7e1fb]">
            olYmpos
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-10 text-[0.96rem] font-medium text-[#d5d9e7]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/signup"
            className={cn(
              buttonVariants("primary"),
              "h-11 rounded-2xl px-6 shadow-[0_12px_34px_rgba(124,108,255,0.28)]",
            )}
          >
            Sign Up
          </Link>
        </div>
        <div className="md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="sr-only"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
