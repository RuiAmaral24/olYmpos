import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthSideContent } from "@/components/auth/auth-side-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="flex w-full items-center">
      <AuthShell
        sideContent={(
          <AuthSideContent
            badge="Welcome back"
            title="Return to your universe"
            description="Track your anime, movies, and games in one place."
          >
            <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">
              Unified library
            </span>
            <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">
              Premium watchlists
            </span>
          </AuthSideContent>
        )}
      >
        <AuthCard
          title="Login"
          subtitle="Enter your account and continue building your olYmpos."
          footer={(
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-white transition hover:text-accent-secondary"
              >
                Sign Up
              </Link>
            </p>
          )}
        >
          <form className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#d9e2f2]">
                Email
              </label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#d9e2f2]">
                Password
              </label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            <div className="flex flex-col gap-3 text-sm text-[#aeb8cf] sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-transparent accent-[var(--accent)]"
                />
                <span>Remember me</span>
              </label>
              <Link href="/login" className="transition hover:text-white">
                Forgot password
              </Link>
            </div>
            <Button type="submit" className="h-12 w-full rounded-2xl text-sm font-semibold">
              Login
            </Button>
          </form>
        </AuthCard>
      </AuthShell>
    </div>
  );
}
