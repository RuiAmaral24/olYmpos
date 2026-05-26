import Link from "next/link";

import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthSideContent } from "@/components/auth/auth-side-content";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/components/ui/status-message";
import { signup } from "@/lib/supabase/auth";

type SignupPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const { error } = await searchParams;

  return (
    <div className="flex w-full items-center">
      <AuthShell
        sideContent={(
          <AuthSideContent
            badge="Join olYmpos"
            title="Start your universe"
            description="Track your anime, movies, and games in one place."
          >
            <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">
              Personal dashboard
            </span>
            <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">
              Curated progress tracking
            </span>
          </AuthSideContent>
        )}
      >
        <AuthCard
          title="Sign Up"
          subtitle="Create your account and start building your olYmpos."
          footer={(
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-white transition hover:text-accent-secondary"
              >
                Login
              </Link>
            </p>
          )}
        >
          <form action={signup} className="space-y-5">
            {error ? (
              <StatusMessage tone="error" title="Signup failed">
                {error}
              </StatusMessage>
            ) : null}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-[#d9e2f2]">
                Username
              </label>
              <Input
                id="username"
                name="username"
                placeholder="Choose a username"
                required
              />
            </div>
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
                placeholder="Create a password"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="text-sm font-medium text-[#d9e2f2]"
              >
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Repeat your password"
                required
              />
            </div>
            <AuthSubmitButton idleLabel="Create Account" pendingLabel="Creating account" />
          </form>
        </AuthCard>
      </AuthShell>
    </div>
  );
}
