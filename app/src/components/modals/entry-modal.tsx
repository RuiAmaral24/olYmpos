"use client";

import { useState } from "react";

import { EntryForm } from "@/components/modals/entry-form";
import { ModalShell } from "@/components/modals/modal-shell";
import type { EntryFormValues, EntryModalMode, LibraryItem } from "@/types";

type EntryModalProps = {
  open: boolean;
  mode: EntryModalMode;
  item?: LibraryItem | null;
  onClose: () => void;
  onSave: (values: EntryFormValues) => void;
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
      />
    </ModalShell>
  );
}

type EntryModalContentProps = {
  mode: EntryModalMode;
  initialValues: EntryFormValues;
  onCancel: () => void;
  onSave: (values: EntryFormValues) => void;
};

function EntryModalContent({
  mode,
  initialValues,
  onCancel,
  onSave,
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

  return {
    title: item.title,
    category: item.category,
    status: item.status,
    rating: item.rating,
    favorite: item.isFavorite,
    season: item.category === "anime" ? String(item.progress.currentSeason) : "",
    episode: item.category === "anime" ? String(item.progress.currentEpisode) : "",
    movieState:
      item.category === "movie" && item.progress.reviewDrafted
        ? "review_ready"
        : item.category === "movie" && item.progress.completed
          ? "completed"
          : "watched",
    chapter: item.category === "game" ? item.progress.chapter ?? "" : "",
    runLabel: item.category === "game" ? item.progress.runLabel ?? "" : "",
    hoursPlayed: item.category === "game" ? String(item.progress.hoursPlayed) : "",
    notes: "",
  };
}
