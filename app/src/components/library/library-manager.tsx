"use client";

import { useMemo, useState, useTransition } from "react";
import { LibraryBig, Plus, SearchX } from "lucide-react";

import { LibraryFilterBar } from "@/components/library/library-filter-bar";
import { LibraryItemCard } from "@/components/library/library-item-card";
import { EntryModal } from "@/components/modals/entry-modal";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusMessage } from "@/components/ui/status-message";
import { useToast } from "@/components/ui/toast-provider";
import { getCategoryLabel, getStatusLabel } from "@/lib/library";
import {
  deleteLibraryItem,
  saveLibraryItem,
  toggleLibraryItemFavorite,
} from "@/lib/supabase/actions";
import type { EntryFormValues, EntryModalMode, LibraryItem } from "@/types";

type LibraryManagerProps = {
  initialItems: LibraryItem[];
};

type CategoryFilter = "All" | "Anime" | "Movies" | "Games";
type StatusFilter =
  | "All Status"
  | "Favorites"
  | "Completed"
  | "Watching / Playing"
  | "Planned";
type SortOption = "Recently Added" | "Highest Rated" | "Alphabetical";

export function LibraryManager({ initialItems }: LibraryManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("All Status");
  const [sortValue, setSortValue] = useState<SortOption>("Recently Added");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<EntryModalMode>("add");
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const visibleItems = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return [...items]
      .filter((item) => {
        if (activeCategory === "All") {
          return true;
        }

        if (activeCategory === "Anime") {
          return item.category === "anime";
        }

        if (activeCategory === "Movies") {
          return item.category === "movie";
        }

        return item.category === "game";
      })
      .filter((item) => {
        if (activeStatus === "All Status") {
          return true;
        }

        if (activeStatus === "Favorites") {
          return item.isFavorite;
        }

        if (activeStatus === "Watching / Playing") {
          return item.status === "watching" || item.status === "playing";
        }

        return getStatusLabel(item.status) === activeStatus;
      })
      .filter((item) => {
        if (!normalizedSearch) {
          return true;
        }

        return [
          item.title,
          getCategoryLabel(item.category),
          getStatusLabel(item.status),
          item.description,
        ]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedSearch));
      })
      .sort((first, second) => {
        if (sortValue === "Highest Rated") {
          return second.rating - first.rating;
        }

        if (sortValue === "Alphabetical") {
          return first.title.localeCompare(second.title);
        }

        return new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime();
      });
  }, [activeCategory, activeStatus, items, searchValue, sortValue]);

  const hasActiveFilters =
    searchValue.trim() !== "" ||
    activeCategory !== "All" ||
    activeStatus !== "All Status";

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
        showToast(
          values.notes.trim()
            ? modalMode === "add"
              ? "Item added to olYmpos. Review saved."
              : "Item updated. Review saved."
            : modalMode === "add"
              ? "Item added to olYmpos."
              : "Item updated.",
        );
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
        showToast("Item deleted.");
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
        showToast(nextFavorite ? "Added to favorites." : "Removed from favorites.");
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
      <LibraryFilterBar
        resultsCount={visibleItems.length}
        searchValue={searchValue}
        activeCategory={activeCategory}
        activeStatus={activeStatus}
        sortValue={sortValue}
        onSearchChange={setSearchValue}
        onCategoryChange={setActiveCategory}
        onStatusChange={setActiveStatus}
        onSortChange={setSortValue}
      />

      {error ? (
        <StatusMessage tone="error" title="Action failed">
          {error}
        </StatusMessage>
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
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <LibraryItemCard
              key={item.id}
              item={item}
              onEdit={() => openEditModal(item)}
              onToggleFavorite={() => handleFavoriteToggle(item)}
            />
          ))
        ) : items.length === 0 ? (
          <EmptyState
            className="sm:col-span-2 xl:col-span-3"
            eyebrow="Empty Library"
            title="Your olYmpos library is ready"
            description="Add your first anime, movie, or game to begin tracking progress, ratings, favorites, and reviews."
            icon={<LibraryBig className="h-5 w-5" />}
            action={(
              <Button
                className="h-11 rounded-2xl px-5"
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={openAddModal}
              >
                Add Content
              </Button>
            )}
          />
        ) : hasActiveFilters ? (
          <EmptyState
            className="sm:col-span-2 xl:col-span-3"
            eyebrow="No Results"
            title="No titles match this view"
            description="Adjust your search, category, or status filters to bring more of your olYmpos back into view."
            icon={<SearchX className="h-5 w-5" />}
            action={(
              <Button
                variant="secondary"
                className="h-11 rounded-2xl px-5"
                onClick={() => {
                  setSearchValue("");
                  setActiveCategory("All");
                  setActiveStatus("All Status");
                }}
              >
                Clear Filters
              </Button>
            )}
          />
        ) : (
          <EmptyState
            className="sm:col-span-2 xl:col-span-3"
            eyebrow="No Results"
            title="No titles are visible"
            description="Try another sort or add a new entry to refresh this collection view."
            icon={<SearchX className="h-5 w-5" />}
          />
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
