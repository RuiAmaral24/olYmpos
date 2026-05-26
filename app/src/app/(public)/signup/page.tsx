import Link from "next/link";
import { Cinzel, Outfit } from "next/font/google";
import { Mail, Sparkles, User, X } from "lucide-react";

import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { PasswordVisibilityInput } from "@/components/auth/password-visibility-input";
import { HeroVisual } from "@/components/landing/hero-visual";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/components/ui/status-message";
import { signup } from "@/lib/supabase/auth";
import { cn } from "@/lib/utils";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type SignupPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const { error } = await searchParams;

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 flex overflow-hidden bg-[#0a0a0f] text-white",
        outfit.className,
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(139,92,246,0.16),transparent_38%),radial-gradient(circle_at_78%_24%,rgba(99,102,241,0.13),transparent_34%),radial-gradient(circle_at_50%_82%,rgba(59,130,246,0.07),transparent_48%),linear-gradient(180deg,#0f1729_0%,#0a0a0f_44%,#07070d_100%)]" />
        <HeroVisual className="-bottom-40 -top-28 left-1/2 right-auto h-auto w-[100vw] max-w-none -translate-x-1/2 opacity-42 blur-[2px] saturate-[0.78]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,15,0.84)_0%,rgba(10,10,15,0.58)_34%,rgba(10,10,15,0.34)_62%,rgba(10,10,15,0.7)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,#0a0a0f_0%,rgba(10,10,15,0.7)_48%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[linear-gradient(180deg,transparent,rgba(10,10,15,0.72)_44%,#07070d_100%)]" />
        <div className="pointer-events-none absolute left-[-12rem] top-[18%] h-[38rem] w-[48rem] rounded-full bg-[rgba(139,92,246,0.14)] blur-[130px]" />
        <div className="pointer-events-none absolute right-[-10rem] top-[16%] h-[36rem] w-[44rem] rounded-full bg-[rgba(99,102,241,0.12)] blur-[140px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.62)_1px,transparent_1px)] [background-size:150px_150px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-[rgba(7,5,13,0.38)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_72%_50%,rgba(139,92,246,0.1)_0%,rgba(7,7,13,0.1)_34%,rgba(7,7,13,0.5)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[58vw] bg-[linear-gradient(90deg,rgba(8,5,15,0.42),rgba(8,5,15,0.18)_58%,transparent)]" />

      <section className="relative z-20 mx-auto grid min-h-svh w-full max-w-[1450px] items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(440px,630px)] lg:gap-16 lg:px-10 xl:gap-24">
        <div className="pointer-events-none relative hidden max-w-[46rem] opacity-100 saturate-100 lg:block">
          <div className="absolute -inset-x-16 -inset-y-20 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_28%_48%,rgba(8,5,15,0.62),rgba(8,5,15,0.36)_42%,transparent_74%)] blur-2xl" />
          <div className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-[#9f7aea]/65 bg-[linear-gradient(90deg,rgba(139,92,246,0.36),rgba(99,102,241,0.24))] px-5 py-2.5 text-sm font-medium text-[#f0e7ff] shadow-[0_0_30px_rgba(139,92,246,0.28)] backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-[#a78bfa]" />
            Join olYmpos
          </div>

          <h1
            className={cn(
              "max-w-[44rem] text-[4.15rem] font-normal uppercase leading-[1.08] tracking-[-0.035em] xl:text-[4.75rem]",
              cinzel.className,
            )}
          >
            <span className="block bg-[linear-gradient(135deg,#ffffff,#eadcff_46%,#d6c4ff)] bg-clip-text text-transparent drop-shadow-[0_10px_36px_rgba(5,5,10,1)] [text-shadow:_0_0_34px_rgba(167,139,250,0.58)]">
              Start your
            </span>
            <span className="mt-2 block bg-[linear-gradient(135deg,#f3ecff,#c9b3ff_42%,#9f7aea)] bg-clip-text pb-2 text-transparent drop-shadow-[0_10px_36px_rgba(5,5,10,1)] [text-shadow:_0_0_42px_rgba(139,92,246,0.82)]">
              Universe
            </span>
          </h1>

          <p className="mt-7 max-w-[34rem] text-[1.18rem] font-medium leading-8 text-[#d7ddfb] drop-shadow-[0_4px_20px_rgba(10,10,15,1)]">
            Create your profile, shape your lists, and begin tracking the stories, films, and games that define you.
          </p>
        </div>

        <div className="relative z-20 ml-auto w-full max-w-[630px]">
          <div className="absolute -inset-4 rounded-[2rem] bg-[linear-gradient(135deg,#8b5cf6,#7c3aed_50%,#6366f1)] opacity-34 blur-3xl" />
          <div className="absolute -inset-14 rounded-[2.6rem] bg-[#030307]/48 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.7rem] border border-[#8b5cf6]/58 bg-[linear-gradient(135deg,rgba(31,27,58,0.985),rgba(21,20,43,0.988)_48%,rgba(27,24,49,0.985))] px-6 py-7 shadow-[0_38px_130px_rgba(0,0,0,0.78),0_0_90px_rgba(139,92,246,0.24)] backdrop-blur-xl sm:px-10 sm:py-9 lg:px-12">
            <Link
              href="/"
              aria-label="Close signup"
              className="absolute right-6 top-6 rounded-full p-2 text-white/65 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Link>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(167,139,250,0.9),transparent)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(139,92,246,0.13),transparent)]" />

            <div className="relative">
              <div className="mb-7 space-y-3.5 pr-10">
                <h2
                  className={cn(
                    "bg-[linear-gradient(135deg,#f0f4ff,#eadcff_48%,#c4b5fd)] bg-clip-text text-[2rem] font-normal uppercase leading-none tracking-[-0.025em] text-transparent sm:text-[2.25rem]",
                    cinzel.className,
                  )}
                >
                  Sign Up
                </h2>
                <p className="max-w-[29rem] text-[0.95rem] font-medium leading-6 text-[#b8c1ec]">
                  Create your account and start building your olYmpos.
                </p>
              </div>

              <form action={signup} className="space-y-5">
                {error ? (
                  <StatusMessage tone="error" title="Signup failed">
                    {error}
                  </StatusMessage>
                ) : null}

                <div className="space-y-2.5">
                  <label htmlFor="username" className="block text-sm font-semibold text-[#eadcff]">
                    Username
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b5cf6]/70" />
                    <Input
                      id="username"
                      name="username"
                      placeholder="Choose a username"
                      autoComplete="username"
                      className="login-field h-[58px] rounded-xl border-[#8b5cf6]/35 !bg-[#05050a] pl-12 pr-5 text-[0.98rem] text-white shadow-[0_4px_22px_rgba(0,0,0,0.22)] placeholder:text-[#70758a] hover:!bg-[#05050a] hover:border-[#8b5cf6]/50 focus:!bg-[#05050a] focus:border-[#8b5cf6] focus:ring-[#8b5cf6]/45 active:!bg-[#05050a]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label htmlFor="email" className="block text-sm font-semibold text-[#eadcff]">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b5cf6]/70" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      autoComplete="email"
                      className="login-field h-[58px] rounded-xl border-[#8b5cf6]/35 !bg-[#05050a] pl-12 pr-5 text-[0.98rem] text-white shadow-[0_4px_22px_rgba(0,0,0,0.22)] placeholder:text-[#70758a] hover:!bg-[#05050a] hover:border-[#8b5cf6]/50 focus:!bg-[#05050a] focus:border-[#8b5cf6] focus:ring-[#8b5cf6]/45 active:!bg-[#05050a]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label htmlFor="password" className="block text-sm font-semibold text-[#eadcff]">
                    Password
                  </label>
                  <PasswordVisibilityInput
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />
                </div>

                <div className="space-y-2.5">
                  <label htmlFor="confirm-password" className="block text-sm font-semibold text-[#eadcff]">
                    Confirm Password
                  </label>
                  <PasswordVisibilityInput
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                  />
                </div>

                <AuthSubmitButton
                  idleLabel="Create Account"
                  pendingLabel="Creating account"
                  className="mt-1 h-[60px] rounded-xl bg-[linear-gradient(135deg,#844cf0,#7334dc_58%,#575eea)] text-[1.05rem] font-semibold shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:scale-[1.01] hover:brightness-110 hover:shadow-[0_0_72px_rgba(139,92,246,0.7)]"
                />

                <p className="pt-4 text-center text-sm font-medium text-[#b8c1ec]">
                  Already have an account?{" "}
                  <Link href="/login" className="!text-[#9a72ff] transition hover:!text-[#c4b5fd] hover:underline hover:decoration-dashed hover:underline-offset-4 hover:[text-decoration-style:dashed]">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
