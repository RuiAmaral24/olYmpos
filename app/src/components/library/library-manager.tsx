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
      const nextItem: LibraryItem = {
        id: String(Date.now()),
        title: values.title || "Untitled Entry",
        category: values.category,
        status: values.status,
        rating: values.rating,
        favorite: values.favorite,
        progressLabel: buildProgressLabel(values),
        coverAccent: coverAccents[items.length % coverAccents.length],
        year: "2025",
      };

      setItems((current) => [nextItem, ...current]);
    } else if (selectedItem) {
      setItems((current) =>
        current.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                title: values.title,
                category: values.category,
                status: values.status,
                rating: values.rating,
                favorite: values.favorite,
                progressLabel: buildProgressLabel(values),
              }
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

function buildProgressLabel(values: EntryFormValues) {
  if (values.category === "Anime") {
    return values.season || values.episode
      ? `Season ${values.season || "1"} | Episode ${values.episode || "1"}`
      : undefined;
  }

  if (values.category === "Movie") {
    return values.movieState;
  }

  const segments = [
    values.chapter ? `Chapter ${values.chapter}` : "",
    values.runLabel ? `Run ${values.runLabel}` : "",
    values.hoursPlayed ? `${values.hoursPlayed}h` : "",
  ].filter(Boolean);

  return segments.join(" | ") || undefined;
}
