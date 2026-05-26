"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

type PasswordVisibilityInputProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  autoComplete?: string;
};

export function PasswordVisibilityInput({
  id = "password",
  name = "password",
  placeholder = "Enter your password",
  autoComplete,
}: PasswordVisibilityInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b5cf6]/70" />
      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="login-field h-[58px] rounded-xl border-[#8b5cf6]/35 !bg-[#05050a] pl-12 pr-12 text-[0.98rem] text-white shadow-[0_4px_22px_rgba(0,0,0,0.22)] placeholder:text-[#70758a] hover:!bg-[#05050a] hover:border-[#8b5cf6]/50 focus:!bg-[#05050a] focus:border-[#8b5cf6] focus:ring-[#8b5cf6]/45 active:!bg-[#05050a]"
        required
      />
      <button
        type="button"
        aria-label={showPassword ? "Hide password" : "Show password"}
        aria-pressed={showPassword}
        onClick={() => setShowPassword((value) => !value)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#9a72ff] transition hover:text-[#c4b5fd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/50"
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
}
