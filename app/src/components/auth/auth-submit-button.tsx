"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type AuthSubmitButtonProps = {
  idleLabel: string;
  pendingLabel: string;
};

export function AuthSubmitButton({
  idleLabel,
  pendingLabel,
}: AuthSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="h-12 w-full rounded-2xl text-sm font-semibold"
      disabled={pending}
      leftIcon={pending ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined}
    >
      {pending ? pendingLabel : idleLabel}
    </Button>
  );
}
