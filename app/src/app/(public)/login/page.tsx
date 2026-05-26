import Link from "next/link";

import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthSideContent } from "@/components/auth/auth-side-content";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/components/ui/status-message";
import { login } from "@/lib/supabase/auth";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, message } = await searchParams;

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
          <form action={login} className="space-y-5">
            {error ? (
              <StatusMessage tone="error" title="Login failed">
                {error}
              </StatusMessage>
            ) : null}
            {message ? (
              <StatusMessage tone="success">
                {message}
              </StatusMessage>
            ) : null}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#d9e2f2]">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#d9e2f2]">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
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
            <AuthSubmitButton idleLabel="Login" pendingLabel="Signing in" />
          </form>
        </AuthCard>
      </AuthShell>
    </div>
  );
}
