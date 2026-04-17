"use client";

import type { ReactNode } from "react";
import { Heart, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { EntryFormValues, EntryModalMode } from "@/types";

const categoryOptions = ["Anime", "Movie", "Game"] as const;
const statusOptions = ["Completed", "Watching", "Playing", "Planned"] as const;
const movieStateOptions = ["Watched", "Review Ready", "Completed"] as const;

type EntryFormProps = {
  mode: EntryModalMode;
  values: EntryFormValues;
  onChange: <K extends keyof EntryFormValues>(field: K, value: EntryFormValues[K]) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

export function EntryForm({
  mode,
  values,
  onChange,
  onCancel,
  onSubmit,
}: EntryFormProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_320px]">
      <div className="space-y-6">
        <section className="grid gap-5 rounded-[1.75rem] border border-white/8 bg-white/4 p-5 sm:grid-cols-2">
          <Field label="Title" className="sm:col-span-2">
            <Input
              value={values.title}
              onChange={(event) => onChange("title", event.target.value)}
              placeholder="Enter a title"
            />
          </Field>
          <Field label="Category">
            <SelectField
              value={values.category}
              onChange={(value) => onChange("category", value as EntryFormValues["category"])}
              options={categoryOptions}
            />
          </Field>
          <Field label="Status">
            <SelectField
              value={values.status}
              onChange={(value) => onChange("status", value as EntryFormValues["status"])}
              options={statusOptions}
            />
          </Field>
          <Field label="Rating">
            <div className="relative">
              <Star className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 fill-current text-[#f4d58d]" />
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                className="pl-10"
                value={values.rating}
                onChange={(event) => onChange("rating", Number(event.target.value))}
              />
            </div>
          </Field>
          <Field label="Favorite">
            <button
              type="button"
              className={cn(
                "inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border text-sm font-medium transition",
                values.favorite
                  ? "border-[rgba(243,183,203,0.42)] bg-[rgba(243,183,203,0.14)] text-white"
                  : "border-white/10 bg-white/6 text-[#b8c2d6]",
              )}
              onClick={() => onChange("favorite", !values.favorite)}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  values.favorite ? "fill-current text-[#f3b7cb]" : "",
                )}
              />
              {values.favorite ? "Favorited" : "Mark Favorite"}
            </button>
          </Field>
        </section>

        <section className="space-y-4 rounded-[1.75rem] border border-white/8 bg-white/4 p-5">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.26em] text-accent-secondary">
              Progress Inputs
            </p>
            <h3 className="text-xl font-semibold text-white">
              Tailored to your {values.category.toLowerCase()}
            </h3>
          </div>

          {values.category === "Anime" ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Season">
                <Input
                  value={values.season}
                  onChange={(event) => onChange("season", event.target.value)}
                  placeholder="1"
                />
              </Field>
              <Field label="Episode">
                <Input
                  value={values.episode}
                  onChange={(event) => onChange("episode", event.target.value)}
                  placeholder="22"
                />
              </Field>
            </div>
          ) : null}

          {values.category === "Movie" ? (
            <Field label="Viewing State">
              <SelectField
                value={values.movieState}
                onChange={(value) => onChange("movieState", value as EntryFormValues["movieState"])}
                options={movieStateOptions}
              />
            </Field>
          ) : null}

          {values.category === "Game" ? (
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Chapter">
                <Input
                  value={values.chapter}
                  onChange={(event) => onChange("chapter", event.target.value)}
                  placeholder="10"
                />
              </Field>
              <Field label="Run">
                <Input
                  value={values.runLabel}
                  onChange={(event) => onChange("runLabel", event.target.value)}
                  placeholder="34"
                />
              </Field>
              <Field label="Hours">
                <Input
                  value={values.hoursPlayed}
                  onChange={(event) => onChange("hoursPlayed", event.target.value)}
                  placeholder="31"
                />
              </Field>
            </div>
          ) : null}
        </section>

        <section className="space-y-3 rounded-[1.75rem] border border-white/8 bg-white/4 p-5">
          <Field label="Personal Review / Notes">
            <textarea
              value={values.notes}
              onChange={(event) => onChange("notes", event.target.value)}
              rows={6}
              placeholder="Capture your latest thoughts about this title."
              className="w-full rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/90 focus:border-white/20 focus:ring-2 focus:ring-[var(--ring)]"
            />
          </Field>
        </section>
      </div>

      <aside className="space-y-5 rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(21,30,47,0.92),rgba(10,14,24,0.98))] p-5">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.26em] text-accent-secondary">
            Preview
          </p>
          <div className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(22,31,49,0.9),rgba(12,17,28,0.96))] p-5">
            <div className="flex items-center gap-2 text-sm text-[#d7def0]">
              <Sparkles className="h-4 w-4 text-accent-secondary" />
              <span>{mode === "add" ? "New olYmpos entry" : "Editing existing entry"}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
              {values.title || "Untitled entry"}
            </h3>
            <p className="mt-2 text-sm text-[#afbad1]">
              {values.category} | {values.status}
            </p>
            <p className="mt-4 text-sm leading-6 text-[#96a4bf]">
              {buildPreviewProgress(values)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.26em] text-accent-secondary">
            Actions
          </p>
          <div className="grid gap-3">
            <Button variant="secondary" className="h-12 rounded-2xl" onClick={onCancel}>
              Cancel
            </Button>
            <Button className="h-12 rounded-2xl" onClick={onSubmit}>
              {mode === "add" ? "Add Entry" : "Save Changes"}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}

type FieldProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

function Field({ label, children, className }: FieldProps) {
  return (
    <label className={cn("block space-y-2", className)}>
      <span className="text-sm font-medium text-[#d9e2f2]">{label}</span>
      {children}
    </label>
  );
}

type SelectFieldProps = {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
};

function SelectField({ value, onChange, options }: SelectFieldProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-11 w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-sm text-foreground outline-none focus:border-white/20 focus:ring-2 focus:ring-[var(--ring)]"
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-surface text-foreground">
          {option}
        </option>
      ))}
    </select>
  );
}

function buildPreviewProgress(values: EntryFormValues) {
  if (values.category === "Anime") {
    return values.season || values.episode
      ? `Season ${values.season || "1"}, Episode ${values.episode || "1"}`
      : "Set season and episode progress for this anime entry.";
  }

  if (values.category === "Movie") {
    return `Viewing state: ${values.movieState}`;
  }

  return values.chapter || values.runLabel || values.hoursPlayed
    ? `Chapter ${values.chapter || "-"} | Run ${values.runLabel || "-"} | ${values.hoursPlayed || "0"}h logged`
    : "Track chapter, run count, or hours for this game entry.";
}
