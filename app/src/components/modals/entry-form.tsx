"use client";

import type { ReactNode } from "react";
import {
  Check,
  Film,
  Gamepad2,
  Heart,
  Loader2,
  PenLine,
  Play,
  Save,
  Star,
  TrendingUp,
  Tv,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/components/ui/status-message";
import { getCategoryLabel, getStatusLabel } from "@/lib/library";
import { getDashboardArtwork } from "@/lib/library-mapper";
import { cn } from "@/lib/utils";
import type { EntryFormValues, EntryModalMode, MediaCategory, TrackingStatus } from "@/types";

const categoryOptions: { value: MediaCategory; icon: typeof Tv }[] = [
  { value: "anime", icon: Tv },
  { value: "movie", icon: Film },
  { value: "game", icon: Gamepad2 },
];

const statusOptions: TrackingStatus[] = [
  "planned",
  "watching",
  "playing",
  "completed",
  "paused",
  "dropped",
];

const movieStateOptions = [
  { value: "watched", label: "Watched" },
  { value: "review_ready", label: "Review Ready" },
  { value: "completed", label: "Completed" },
] as const;

type EntryFormProps = {
  mode: EntryModalMode;
  coverUrl?: string | null;
  values: EntryFormValues;
  onChange: <K extends keyof EntryFormValues>(field: K, value: EntryFormValues[K]) => void;
  onCancel: () => void;
  onSubmit: () => void;
  onDelete?: () => void;
  saving?: boolean;
  error?: string | null;
};

export function EntryForm({
  mode,
  coverUrl,
  values,
  onChange,
  onCancel,
  onSubmit,
  onDelete,
  saving = false,
  error,
}: EntryFormProps) {
  const noteCount = values.notes.length;
  const artworkUrl = coverUrl ?? getDashboardArtwork(values.category);
  const ratingOutOfTen = Math.round(Number(values.rating || 0) * 2);

  return (
    <div className="mx-auto max-w-[605px] space-y-7">
      {error ? (
        <StatusMessage tone="error" title="Check this entry">
          {error}
        </StatusMessage>
      ) : null}

      <section className="rounded-[1.35rem] border border-[#3a2a63] bg-[#111122]/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
        <div className="flex gap-4">
          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-[#4b347d] bg-[#0f1020] shadow-[0_18px_42px_rgba(0,0,0,0.32)]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${artworkUrl}")` }}
            />
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-35", getCategoryAccent(values.category))} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,16,0.08),rgba(8,8,16,0.64))]" />
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <Input
              value={values.title}
              onChange={(event) => onChange("title", event.target.value)}
              placeholder="Enter a title"
              className="h-11 rounded-xl border-transparent bg-transparent px-0 text-xl font-bold tracking-[-0.03em] text-white shadow-none placeholder:text-[#f0f4ff] hover:border-transparent focus:border-transparent focus:bg-transparent focus:ring-0"
              required
              aria-invalid={Boolean(error && !values.title.trim())}
            />

            <div className="flex flex-wrap gap-2">
              {categoryOptions.map(({ value, icon: Icon }) => {
                const isActive = values.category === value;

                return (
                  <button
                    key={value}
                    type="button"
                    className={cn(
                      "inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-semibold transition",
                      isActive
                        ? "border-[#8b5cf6]/50 bg-[#8b5cf6]/18 text-[#a78bfa]"
                        : "border-transparent text-[#9ca8c4] hover:bg-white/5 hover:text-white",
                    )}
                    onClick={() => onChange("category", value)}
                    disabled={saving}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {getCategoryLabel(value)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(230px,0.86fr)]">
        <div className="space-y-3">
          <SectionLabel icon={<Play className="h-4 w-4" />} label="Status" />
          <div className="space-y-2">
            {statusOptions.map((status) => {
              const isActive = values.status === status;

              return (
                <button
                  key={status}
                  type="button"
                  className={cn(
                    "flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm font-semibold transition",
                    isActive
                      ? "border-[#8b5cf6]/70 bg-[#3a2a64] text-[#ded7ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                      : "border-[#2c224a] bg-[#111122] text-[#b9c0d8] hover:border-[#7c5bd6]/50 hover:text-white",
                  )}
                  onClick={() => onChange("status", status)}
                  disabled={saving}
                >
                  {getStatusLabel(status)}
                  {isActive ? <Check className="h-4 w-4 text-[#a78bfa]" /> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <SectionLabel icon={<Star className="h-4 w-4" />} label="Your Rating" />
            <div className="rounded-xl border border-[#2c224a] bg-[#111122] px-5 py-5 text-center">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    type="button"
                    className="text-[#596174] transition hover:scale-110 hover:text-[#fbbf24]"
                    onClick={() => onChange("rating", score)}
                    disabled={saving}
                    aria-label={`Set rating to ${score}`}
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        values.rating >= score ? "fill-[#fbbf24] text-[#fbbf24]" : "",
                      )}
                    />
                  </button>
                ))}
              </div>
              <p className="editorial-title mt-4 text-3xl font-bold leading-none text-[#f3f0ff]">
                {ratingOutOfTen}
                <span className="ml-1 font-sans text-sm font-semibold text-[#aeb5cc]">/10</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#bfc7df]">Favorite</p>
            <button
              type="button"
              className={cn(
                "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-sm font-bold transition",
                values.favorite
                  ? "border-[#8b5cf6]/70 bg-[#3a2a64] text-[#ded7ff]"
                  : "border-[#2c224a] bg-[#111122] text-[#b9c0d8] hover:border-[#7c5bd6]/50 hover:text-white",
              )}
              onClick={() => onChange("favorite", !values.favorite)}
              disabled={saving}
            >
              <Heart className={cn("h-5 w-5", values.favorite ? "fill-[#9b6dff] text-[#9b6dff]" : "")} />
              {values.favorite ? "Added to Favorites" : "Mark Favorite"}
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionLabel icon={<TrendingUp className="h-4 w-4" />} label="Progress" />

        {values.category === "anime" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Season">
              <Input
                value={values.season}
                onChange={(event) => onChange("season", event.target.value)}
                placeholder="1"
                className="h-12 rounded-xl border-[#2c224a] bg-[#111122] font-bold text-white"
              />
            </Field>
            <Field label="Episode">
              <Input
                value={values.episode}
                onChange={(event) => onChange("episode", event.target.value)}
                placeholder="22"
                className="h-12 rounded-xl border-[#2c224a] bg-[#111122] font-bold text-white"
              />
            </Field>
          </div>
        ) : null}

        {values.category === "movie" ? (
          <Field label="Viewing State">
            <SelectField
              value={values.movieState}
              onChange={(value) => onChange("movieState", value as EntryFormValues["movieState"])}
              options={movieStateOptions.map((option) => option.value)}
              getLabel={(value) =>
                movieStateOptions.find((option) => option.value === value)?.label ?? value
              }
            />
          </Field>
        ) : null}

        {values.category === "game" ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Chapter">
              <Input
                value={values.chapter}
                onChange={(event) => onChange("chapter", event.target.value)}
                placeholder="10"
                className="h-12 rounded-xl border-[#2c224a] bg-[#111122] font-bold text-white"
              />
            </Field>
            <Field label="Run">
              <Input
                value={values.runLabel}
                onChange={(event) => onChange("runLabel", event.target.value)}
                placeholder="34"
                className="h-12 rounded-xl border-[#2c224a] bg-[#111122] font-bold text-white"
              />
            </Field>
            <Field label="Hours">
              <Input
                value={values.hoursPlayed}
                onChange={(event) => onChange("hoursPlayed", event.target.value)}
                placeholder="31"
                className="h-12 rounded-xl border-[#2c224a] bg-[#111122] font-bold text-white"
              />
            </Field>
          </div>
        ) : null}

        <p className="text-center text-xs font-semibold text-[#9b6dff]">
          {buildPreviewProgress(values)}
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SectionLabel icon={<PenLine className="h-4 w-4" />} label="Personal Review / Notes" />
          <p className="text-xs font-medium text-[#737991]">{noteCount} characters</p>
        </div>
        <textarea
          value={values.notes}
          onChange={(event) => onChange("notes", event.target.value)}
          rows={5}
          placeholder="Capture your latest thoughts about this title."
          className="w-full resize-none rounded-xl border border-[#2c224a] bg-[#111122] px-4 py-4 text-sm font-semibold leading-7 text-[#f1f0fb] outline-none placeholder:text-[#8389a3] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] focus:border-[#8b5cf6]/65 focus:ring-2 focus:ring-[#8b5cf6]/24"
        />
      </section>

      <section className="border-t border-[#33275a] pt-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="secondary"
            className="h-12 rounded-xl border-[#5d45a1]/50 bg-transparent font-bold text-[#d7d4eb] hover:bg-white/6"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            className="h-12 rounded-xl bg-[linear-gradient(135deg,#9b6dff,#6366f1)] font-bold shadow-[0_18px_44px_rgba(139,92,246,0.3)]"
            onClick={onSubmit}
            disabled={saving}
            leftIcon={saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          >
            {saving ? "Saving" : mode === "add" ? "Add Entry" : "Save Changes"}
          </Button>
        </div>

        {onDelete ? (
          <Button
            variant="secondary"
            className="mt-3 h-11 w-full rounded-xl border-red-300/20 text-red-100 hover:bg-red-500/10"
            onClick={onDelete}
            disabled={saving}
            leftIcon={saving ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined}
          >
            {saving ? "Working" : "Delete Entry"}
          </Button>
        ) : null}
      </section>
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
      <span className="text-xs font-bold text-[#9b6dff]">{label}</span>
      {children}
    </label>
  );
}

function SectionLabel({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-bold text-[#bfc7df]">
      <span className="text-[#9b6dff]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

type SelectFieldProps<TValue extends string> = {
  value: TValue;
  onChange: (value: TValue) => void;
  options: readonly TValue[];
  getLabel?: (value: TValue) => string;
};

function SelectField<TValue extends string>({
  value,
  onChange,
  options,
  getLabel,
}: SelectFieldProps<TValue>) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as TValue)}
      className="h-12 w-full rounded-xl border border-[#2c224a] bg-[#111122] px-4 text-sm font-bold text-foreground outline-none focus:border-[#8b5cf6]/65 focus:ring-2 focus:ring-[var(--ring)]"
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-surface text-foreground">
          {getLabel?.(option) ?? option}
        </option>
      ))}
    </select>
  );
}

function getCategoryAccent(category: MediaCategory) {
  if (category === "anime") {
    return "from-[#c026d3] via-[#7c3aed] to-[#1f1838]";
  }

  if (category === "movie") {
    return "from-[#8b5cf6] via-[#4f46e5] to-[#14213d]";
  }

  return "from-[#3b82f6] via-[#1d4ed8] to-[#091b35]";
}

function buildPreviewProgress(values: EntryFormValues) {
  if (values.category === "anime") {
    return values.season || values.episode
      ? `Currently on Season ${values.season || "1"}, Episode ${values.episode || "1"}`
      : "Set season and episode progress for this anime entry.";
  }

  if (values.category === "movie") {
    const movieStateLabel =
      movieStateOptions.find((option) => option.value === values.movieState)?.label ??
      values.movieState;

    return `Viewing state: ${movieStateLabel}`;
  }

  return values.chapter || values.runLabel || values.hoursPlayed
    ? `Chapter ${values.chapter || "-"} | Run ${values.runLabel || "-"} | ${values.hoursPlayed || "0"}h logged`
    : "Track chapter, run count, or hours for this game entry.";
}
