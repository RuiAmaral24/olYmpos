import Link from "next/link";

import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
];

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[rgba(7,11,20,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-[0.28em] text-foreground">
          olYmpos
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button variant="secondary" className="h-10 px-4">
            Explore
          </Button>
        </div>
      </div>
    </header>
  );
}
