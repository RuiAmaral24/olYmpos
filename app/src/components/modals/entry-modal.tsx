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
  category: "Anime",
  status: "Planned",
  rating: 4,
  favorite: false,
  season: "",
  episode: "",
  movieState: "Watched",
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

function getInitialValues(item: LibraryItem | null | undefined, mode: EntryModalMode) {
  if (mode === "add" || !item) {
    return defaultValues;
  }

  return {
    title: item.title,
    category: item.category,
    status: item.status,
    rating: item.rating,
    favorite: Boolean(item.favorite),
    season: item.category === "Anime" ? extractNumber(item.progressLabel, 0) : "",
    episode: item.category === "Anime" ? extractNumber(item.progressLabel, 1) : "",
    movieState:
      item.category === "Movie" && item.status === "Completed" ? "Completed" : "Watched",
    chapter: item.category === "Game" ? extractAfterKeyword(item.progressLabel, "Chapter") : "",
    runLabel: item.category === "Game" ? extractAfterKeyword(item.progressLabel, "Run") : "",
    hoursPlayed: "",
    notes: "",
  };
}

function extractNumber(value: string | undefined, index: number) {
  if (!value) {
    return "";
  }

  const matches = value.match(/\d+/g);
  return matches?.[index] ?? "";
}

function extractAfterKeyword(value: string | undefined, keyword: string) {
  if (!value) {
    return "";
  }

  const match = value.match(new RegExp(`${keyword}\\s+(\\d+)`, "i"));
  return match?.[1] ?? "";
}
