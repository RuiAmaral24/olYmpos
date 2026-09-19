"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { KeyRound, Loader2, LockKeyhole, Save, Unlock } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/components/ui/status-message";
import {
  updatePassword,
  updateProfile,
  updateProfileVisibility,
  type SettingsActionState,
} from "@/lib/supabase/settings-actions";
import { cn } from "@/lib/utils";
import type { ProfileVisibility } from "@/types";

const initialSettingsActionState: SettingsActionState = {
  status: "idle",
  message: "",
};

type ProfileFormProps = {
  username: string;
  displayName: string;
  bio: string;
};

export function ProfileSettingsForm({
  username,
  displayName,
  bio,
}: ProfileFormProps) {
  const [state, formAction] = useActionState(
    updateProfile,
    initialSettingsActionState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Username" htmlFor="username">
          <Input
            id="username"
            name="username"
            defaultValue={username}
            minLength={3}
            maxLength={30}
            pattern="[A-Za-z0-9_-]+"
            autoComplete="username"
            required
          />
          <p className="text-xs leading-5 text-[#8f96ad]">
            3-30 characters. Letters, numbers, underscores, and hyphens.
          </p>
        </Field>

        <Field label="Display name" htmlFor="displayName">
          <Input
            id="displayName"
            name="displayName"
            defaultValue={displayName}
            maxLength={80}
            autoComplete="name"
            placeholder="How your name appears"
          />
        </Field>
      </div>

      <Field label="Bio" htmlFor="bio">
        <textarea
          id="bio"
          name="bio"
          defaultValue={bio}
          maxLength={500}
          rows={5}
          placeholder="Share a little about your taste."
          className="w-full resize-y rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.055)] px-4 py-3 text-sm leading-6 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] outline-none placeholder:text-muted-foreground/90 hover:border-white/16 focus:border-white/24 focus:bg-[rgba(255,255,255,0.075)] focus:ring-2 focus:ring-[var(--ring)]"
        />
      </Field>

      <ActionFeedback state={state} />

      <SubmitButton
        idleLabel="Save Profile"
        pendingLabel="Saving Profile"
        icon={<Save className="h-4 w-4" />}
      />
    </form>
  );
}

export function PasswordSettingsForm() {
  const [state, formAction] = useActionState(
    updatePassword,
    initialSettingsActionState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        <Field label="New password" htmlFor="password">
          <Input
            id="password"
            name="password"
            type="password"
            minLength={6}
            autoComplete="new-password"
            required
          />
        </Field>

        <Field label="Confirm new password" htmlFor="confirmPassword">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            minLength={6}
            autoComplete="new-password"
            required
          />
        </Field>
      </div>

      <ActionFeedback state={state} />

      <SubmitButton
        idleLabel="Update Password"
        pendingLabel="Updating Password"
        icon={<KeyRound className="h-4 w-4" />}
      />
    </form>
  );
}

export function PrivacySettingsForm({
  profileVisibility,
}: {
  profileVisibility: ProfileVisibility;
}) {
  const [state, formAction] = useActionState(
    updateProfileVisibility,
    initialSettingsActionState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <fieldset className="grid gap-3 sm:grid-cols-2">
        <legend className="sr-only">Profile visibility</legend>
        <VisibilityOption
          defaultChecked={profileVisibility === "public"}
          description="Anyone can view your bio, followers, and following."
          icon={<Unlock className="h-5 w-5" />}
          label="Public"
          value="public"
        />
        <VisibilityOption
          defaultChecked={profileVisibility === "private"}
          description="Only approved followers can view private profile details."
          icon={<LockKeyhole className="h-5 w-5" />}
          label="Private"
          value="private"
        />
      </fieldset>

      <ActionFeedback state={state} />

      <SubmitButton
        idleLabel="Update Privacy"
        pendingLabel="Updating Privacy"
        icon={<LockKeyhole className="h-4 w-4" />}
      />
    </form>
  );
}

function VisibilityOption({
  defaultChecked,
  description,
  icon,
  label,
  value,
}: {
  defaultChecked: boolean;
  description: string;
  icon: ReactNode;
  label: string;
  value: ProfileVisibility;
}) {
  return (
    <label
      className={cn(
        "group flex cursor-pointer gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition",
        "hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/8 has-[:checked]:border-[#8b5cf6]/55 has-[:checked]:bg-[#8b5cf6]/12",
      )}
    >
      <input
        type="radio"
        name="profileVisibility"
        value={value}
        defaultChecked={defaultChecked}
        className="sr-only"
      />
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8b5cf6]/12 text-[#a78bfa]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-semibold text-white">{label}</span>
        <span className="mt-1 block text-sm leading-6 text-[#939bb1]">
          {description}
        </span>
      </span>
    </label>
  );
}

function Field({
  children,
  htmlFor,
  label,
}: {
  children: ReactNode;
  htmlFor: string;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-[#e7e9f5]">
        {label}
      </label>
      {children}
    </div>
  );
}

function ActionFeedback({
  state,
}: {
  state: typeof initialSettingsActionState;
}) {
  if (state.status === "idle") {
    return null;
  }

  return (
    <StatusMessage tone={state.status === "success" ? "success" : "error"}>
      {state.message}
    </StatusMessage>
  );
}

function SubmitButton({
  icon,
  idleLabel,
  pendingLabel,
}: {
  icon: ReactNode;
  idleLabel: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="h-11 rounded-xl px-5"
      disabled={pending}
      leftIcon={pending ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
    >
      {pending ? pendingLabel : idleLabel}
    </Button>
  );
}
