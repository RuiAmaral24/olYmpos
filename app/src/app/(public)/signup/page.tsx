import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthSideContent } from "@/components/auth/auth-side-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
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
          <form className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-[#d9e2f2]">
                Username
              </label>
              <Input id="username" placeholder="Choose a username" />
            </div>
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
              <Input id="password" type="password" placeholder="Create a password" />
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
                type="password"
                placeholder="Repeat your password"
              />
            </div>
            <Button type="submit" className="h-12 w-full rounded-2xl text-sm font-semibold">
              Create Account
            </Button>
          </form>
        </AuthCard>
      </AuthShell>
    </div>
  );
}
