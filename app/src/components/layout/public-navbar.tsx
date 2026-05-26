"use client";

import Link from "next/link";
import { Outfit } from "next/font/google";
import { usePathname } from "next/navigation";

import { BrandLockup } from "@/components/ui/brand-lockup";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const links = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/login", label: "Login" },
];

export function PublicNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[rgba(139,92,246,0.14)] bg-[rgba(5,6,12,0.94)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between gap-4 px-0 py-3.5 sm:px-1 sm:py-5 lg:px-2 xl:px-3">
        <BrandLockup editorial className="ml-3 sm:ml-5" />
        <div className="hidden items-center gap-8 md:flex">
          <nav className={cn("flex items-center gap-8 text-[0.95rem] font-medium text-[#d5d9e7]", outfit.className)}>
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("/#")
                    ? false
                    : pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-2 py-1 transition hover:text-white",
                    isActive && "text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/signup"
            className={cn(
              buttonVariants("primary"),
              "h-11 rounded-2xl bg-[linear-gradient(135deg,#8b5cf6,#7c3aed_58%,#6366f1)] px-6 shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:scale-[1.03] hover:shadow-[0_0_70px_rgba(139,92,246,0.68)]",
              outfit.className,
            )}
          >
            Sign Up
          </Link>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/login"
            className={cn("rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-[#d5d9e7]", outfit.className)}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={cn("rounded-full bg-[linear-gradient(135deg,#8b5cf6,#7c3aed_58%,#6366f1)] px-4 py-2 text-sm font-medium text-white shadow-[0_0_42px_rgba(139,92,246,0.45)] transition hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(139,92,246,0.62)]", outfit.className)}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
