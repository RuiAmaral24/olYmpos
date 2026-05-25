"use client";

import { useState } from "react";

import { EntryForm } from "@/components/modals/entry-form";
import { ModalShell } from "@/components/modals/modal-shell";
import { itemToEntryFormValues } from "@/lib/library-mapper";
import type { EntryFormValues, EntryModalMode, LibraryItem } from "@/types";

type EntryModalProps = {
  open: boolean;
  mode: EntryModalMode;
  item?: LibraryItem | null;
  onClose: () => void;
  onSave: (values: EntryFormValues) => void;
  onDelete?: () => void;
  saving?: boolean;
};

const defaultValues: EntryFormValues = {
  title: "",
  category: "anime",
  status: "planned",
  rating: 4,
  favorite: false,
  season: "",
  episode: "",
  movieState: "watched",
  chapter: "",
  runLabel: "",
  hoursPlayed: "",
  notes: "",
};

export function EntryModal({
  open,
  mode,
  item,
  onClose,
  onSave,
  onDelete,
  saving = false,
}: EntryModalProps) {
  const formKey = `${mode}-${item?.id ?? "new"}`;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={mode === "add" ? "Add Entry" : "Edit Entry"}
      subtitle={
        mode === "add"
          ? "Shape a new title inside your olYmpos with the same premium tracking flow used across the app."
          : "Refine this entry, update progress, and keep your olYmpos perfectly current."
      }
    >
      <EntryModalContent
        key={formKey}
        mode={mode}
        initialValues={getInitialValues(item, mode)}
        onCancel={onClose}
        onSave={onSave}
        onDelete={onDelete}
        saving={saving}
      />
    </ModalShell>
  );
}

type EntryModalContentProps = {
  mode: EntryModalMode;
  initialValues: EntryFormValues;
  onCancel: () => void;
  onSave: (values: EntryFormValues) => void;
  onDelete?: () => void;
  saving: boolean;
};

function EntryModalContent({
  mode,
  initialValues,
  onCancel,
  onSave,
  onDelete,
  saving,
}: EntryModalContentProps) {
  const [values, setValues] = useState<EntryFormValues>(initialValues);

  const handleChange = <K extends keyof EntryFormValues>(
    field: K,
    value: EntryFormValues[K],
  ) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <EntryForm
      mode={mode}
      values={values}
      onChange={handleChange}
      onCancel={onCancel}
      onSubmit={() => onSave(values)}
      onDelete={onDelete}
      saving={saving}
    />
  );
}

function getInitialValues(
  item: LibraryItem | null | undefined,
  mode: EntryModalMode,
): EntryFormValues {
  if (mode === "add" || !item) {
    return defaultValues;
  }

  return itemToEntryFormValues(item);
}
