import Link from "next/link";

import { BrandLockup } from "@/components/ui/brand-lockup";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/login", label: "Login" },
];

export function PublicNavbar() {
  return (
    <header className="relative z-30 border-b border-[rgba(124,108,255,0.1)] bg-[rgba(7,9,17,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-4 lg:px-8">
        <BrandLockup />
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8 text-[0.95rem] font-medium text-[#d5d9e7]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-2 py-1 transition hover:text-white"
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
