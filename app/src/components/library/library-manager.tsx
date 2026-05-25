"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { LibraryFilterBar } from "@/components/library/library-filter-bar";
import { LibraryItemCard } from "@/components/library/library-item-card";
import { EntryModal } from "@/components/modals/entry-modal";
import { Button } from "@/components/ui/button";
import type { EntryFormValues, EntryModalMode, LibraryItem } from "@/types";

type LibraryManagerProps = {
  initialItems: LibraryItem[];
};

const coverAccents = [
  "from-[#7c6cff] via-[#2c2354] to-[#09101c]",
  "from-[#4ea1ff] via-[#16304d] to-[#09111f]",
  "from-[#f59e0b] via-[#4b2c0c] to-[#110d0a]",
  "from-[#22c55e] via-[#163727] to-[#08110d]",
];

export function LibraryManager({ initialItems }: LibraryManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<EntryModalMode>("add");
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  const openAddModal = () => {
    setSelectedItem(null);
    setModalMode("add");
    setModalOpen(true);
  };

  const openEditModal = (item: LibraryItem) => {
    setSelectedItem(item);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleSave = (values: EntryFormValues) => {
    if (modalMode === "add") {
      const nextItem = buildLibraryItemFromForm(
        values,
        coverAccents[items.length % coverAccents.length],
      );

      setItems((current) => [nextItem, ...current]);
    } else if (selectedItem) {
      setItems((current) =>
        current.map((item) =>
          item.id === selectedItem.id
            ? buildLibraryItemFromForm(values, item.coverAccent, item)
            : item,
        ),
      );
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-8">
      <LibraryFilterBar resultsCount={items.length} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-secondary">
            Collection View
          </p>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
            Curated across every category
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            className="h-12 rounded-2xl px-6"
            onClick={() => items[0] && openEditModal(items[0])}
          >
            Preview Edit
          </Button>
          <Button
            className="h-12 rounded-2xl px-6"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={openAddModal}
          >
            Add Content
          </Button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <LibraryItemCard key={item.id} item={item} onEdit={() => openEditModal(item)} />
        ))}
      </section>

      <EntryModal
        open={modalOpen}
        mode={modalMode}
        item={selectedItem}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

function buildLibraryItemFromForm(
  values: EntryFormValues,
  coverAccent: string,
  existingItem?: LibraryItem,
): LibraryItem {
  const now = new Date().toISOString();
  const base = {
    id: existingItem?.id ?? String(Date.now()),
    userId: existingItem?.userId ?? "profile-orion-vale",
    title: values.title || "Untitled Entry",
    status: values.status,
    rating: values.rating,
    isFavorite: values.favorite,
    coverUrl: existingItem?.coverUrl ?? null,
    coverAccent,
    year: existingItem?.year ?? 2025,
    description: existingItem?.description ?? "A new title tracked inside olYmpos.",
    createdAt: existingItem?.createdAt ?? now,
    updatedAt: now,
    review: existingItem?.review ?? null,
  };

  if (values.category === "anime") {
    const currentEpisode = Number(values.episode || 0);

    return {
      ...base,
      category: "anime",
      metadata: {
        totalSeasons: Number(values.season || 1),
        totalEpisodes: currentEpisode,
        studio: "Unknown Studio",
        releaseDate: String(base.year),
      },
      progress: {
        category: "anime",
        currentSeason: Number(values.season || 1),
        currentEpisode,
        totalEpisodes: currentEpisode,
        percentComplete: currentEpisode > 0 ? 100 : 0,
      },
    };
  }

  if (values.category === "movie") {
    const completed = values.movieState === "completed";
    const watched = completed || values.movieState === "watched" || values.movieState === "review_ready";

    return {
      ...base,
      category: "movie",
      metadata: {
        runtimeMinutes: 0,
        director: "Unknown Director",
        watchedCount: watched ? 1 : 0,
        releaseDate: String(base.year),
        format: "Feature Film",
      },
      progress: {
        category: "movie",
        watched,
        reviewDrafted: values.movieState === "review_ready",
        completed,
        watchedCount: watched ? 1 : 0,
        percentComplete: completed ? 100 : watched ? 75 : 0,
      },
    };
  }

  return {
    ...base,
    category: "game",
    metadata: {
      platform: "Unknown Platform",
      hoursPlayed: Number(values.hoursPlayed || 0),
      chapter: values.chapter || null,
      completionPercent: 0,
      developer: "Unknown Developer",
      releaseDate: String(base.year),
    },
    progress: {
      category: "game",
      chapter: values.chapter || null,
      runLabel: values.runLabel || null,
      hoursPlayed: Number(values.hoursPlayed || 0),
      completionPercent: 0,
    },
  };
}
