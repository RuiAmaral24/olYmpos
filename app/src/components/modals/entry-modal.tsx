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
    >
      <EntryModalContent
        key={formKey}
        item={item}
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
  item?: LibraryItem | null;
  mode: EntryModalMode;
  initialValues: EntryFormValues;
  onCancel: () => void;
  onSave: (values: EntryFormValues) => void;
  onDelete?: () => void;
  saving: boolean;
};

function EntryModalContent({
  item,
  mode,
  initialValues,
  onCancel,
  onSave,
  onDelete,
  saving,
}: EntryModalContentProps) {
  const [values, setValues] = useState<EntryFormValues>(initialValues);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = <K extends keyof EntryFormValues>(
    field: K,
    value: EntryFormValues[K],
  ) => {
    setValidationError(null);
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const title = values.title.trim();

    if (!title) {
      setValidationError("Add a title before saving this entry.");
      return;
    }

    if (!Number.isFinite(values.rating) || values.rating < 0 || values.rating > 5) {
      setValidationError("Rating must be between 0 and 5.");
      return;
    }

    onSave({ ...values, title });
  };

  return (
    <EntryForm
      mode={mode}
      coverUrl={item?.coverUrl ?? null}
      values={values}
      onChange={handleChange}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      onDelete={onDelete}
      saving={saving}
      error={validationError}
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
