"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, SquarePen } from "lucide-react";

import { EntryModal } from "@/components/modals/entry-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { saveLibraryItem } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";
import type { DetailedLibraryItem, EntryFormValues } from "@/types";

type DetailsEditEntryButtonProps = {
  item: DetailedLibraryItem;
  persistChanges: boolean;
  presentation: "hero" | "quick";
  label?: string;
};

export function DetailsEditEntryButton({
  item,
  persistChanges,
  presentation,
  label = "Edit Entry",
}: DetailsEditEntryButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { showToast } = useToast();

  const openEditor = () => {
    setOpen(true);

    if (!persistChanges) {
      showToast("Demo item preview mode. Changes will not be saved.");
    }
  };

  const handleSave = (values: EntryFormValues) => {
    if (!persistChanges) {
      setOpen(false);
      showToast("Demo item changes were not saved.");
      return;
    }

    startTransition(async () => {
      try {
        await saveLibraryItem(values, item.id);
        setOpen(false);
        router.refresh();
        showToast(values.notes.trim() ? "Item updated. Review saved." : "Item updated.");
      } catch (saveError) {
        showToast(
          saveError instanceof Error ? saveError.message : "Could not save item.",
          "error",
        );
      }
    });
  };

  return (
    <>
      {presentation === "hero" ? (
        <Button
          className="h-12 rounded-xl px-6"
          leftIcon={isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <SquarePen className="h-4 w-4" />}
          onClick={openEditor}
          disabled={isPending}
        >
          {isPending ? "Saving" : label}
        </Button>
      ) : (
        <button
          type="button"
          className={cn("flex h-12 w-full items-center gap-3 rounded-xl border bg-transparent px-4 text-sm font-bold text-[#b8c1ec] transition hover:bg-white/5 disabled:opacity-55", "border-[#8b5cf6]/24")}
          onClick={openEditor}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SquarePen className="h-4 w-4" />
          )}
          <span>{isPending ? "Saving" : label}</span>
        </button>
      )}

      <EntryModal
        open={open}
        mode="edit"
        item={item}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        saving={isPending}
      />
    </>
  );
}
