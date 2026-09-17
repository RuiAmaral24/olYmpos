"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { KeyRound, Loader2, Save } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/components/ui/status-message";
import {
  updatePassword,
  updateProfile,
  type SettingsActionState,
} from "@/lib/supabase/settings-actions";

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
