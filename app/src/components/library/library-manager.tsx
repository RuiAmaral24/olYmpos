"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";

import { LibraryFilterBar } from "@/components/library/library-filter-bar";
import { LibraryItemCard } from "@/components/library/library-item-card";
import { EntryModal } from "@/components/modals/entry-modal";
import { Button } from "@/components/ui/button";
import {
  deleteLibraryItem,
  saveLibraryItem,
  toggleLibraryItemFavorite,
} from "@/lib/supabase/actions";
import type { EntryFormValues, EntryModalMode, LibraryItem } from "@/types";

type LibraryManagerProps = {
  initialItems: LibraryItem[];
};

export function LibraryManager({ initialItems }: LibraryManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<EntryModalMode>("add");
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
    setError(null);
    startTransition(async () => {
      try {
        const savedItem = await saveLibraryItem(values, selectedItem?.id);

        setItems((current) => {
          if (modalMode === "add") {
            return [savedItem, ...current];
          }

          return current.map((item) => (item.id === savedItem.id ? savedItem : item));
        });
        setModalOpen(false);
      } catch (saveError) {
        setError(saveError instanceof Error ? saveError.message : "Could not save item.");
      }
    });
  };

  const handleDelete = () => {
    if (!selectedItem) {
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        await deleteLibraryItem(selectedItem.id);
        setItems((current) => current.filter((item) => item.id !== selectedItem.id));
        setModalOpen(false);
      } catch (deleteError) {
        setError(deleteError instanceof Error ? deleteError.message : "Could not delete item.");
      }
    });
  };

  const handleFavoriteToggle = (item: LibraryItem) => {
    const nextFavorite = !item.isFavorite;

    setItems((current) =>
      current.map((entry) =>
        entry.id === item.id ? { ...entry, isFavorite: nextFavorite } : entry,
      ),
    );

    startTransition(async () => {
      try {
        await toggleLibraryItemFavorite(item.id, nextFavorite);
      } catch (favoriteError) {
        setError(
          favoriteError instanceof Error
            ? favoriteError.message
            : "Could not update favorite.",
        );
        setItems((current) =>
          current.map((entry) =>
            entry.id === item.id ? { ...entry, isFavorite: item.isFavorite } : entry,
          ),
        );
      }
    });
  };

  return (
    <div className="space-y-8 pb-8">
      <LibraryFilterBar resultsCount={items.length} />

      {error ? (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      ) : null}

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
            disabled={!items[0] || isPending}
          >
            Preview Edit
          </Button>
          <Button
            className="h-12 rounded-2xl px-6"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={openAddModal}
            disabled={isPending}
          >
            Add Content
          </Button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.length > 0 ? (
          items.map((item) => (
            <LibraryItemCard
              key={item.id}
              item={item}
              onEdit={() => openEditModal(item)}
              onToggleFavorite={() => handleFavoriteToggle(item)}
            />
          ))
        ) : (
          <div className="rounded-[1.75rem] border border-white/8 bg-white/4 p-6 text-sm leading-6 text-[#aeb8cf] sm:col-span-2 xl:col-span-3">
            Your olYmpos library is ready. Add your first anime, movie, or game to start tracking real progress.
          </div>
        )}
      </section>

      <EntryModal
        open={modalOpen}
        mode={modalMode}
        item={selectedItem}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={modalMode === "edit" ? handleDelete : undefined}
        saving={isPending}
      />
    </div>
  );
}
