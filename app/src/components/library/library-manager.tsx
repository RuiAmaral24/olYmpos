"use client";

import { useMemo, useState, useTransition } from "react";
import {
  ChevronDown,
  Film,
  Filter,
  Gamepad2,
  Plus,
  SlidersHorizontal,
  Sparkles,
  Tv,
} from "lucide-react";

import { LibraryItemCard } from "@/components/library/library-item-card";
import { EntryModal } from "@/components/modals/entry-modal";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status-message";
import { useToast } from "@/components/ui/toast-provider";
import { showcaseLibraryItems } from "@/data/showcase-library";
import { getStatusLabel } from "@/lib/library";
import { cn } from "@/lib/utils";
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
  | "Watching/Playing"
  | "Planned";
type SortOption = "Recently Added" | "Highest Rated" | "Alphabetical";

const categoryFilters: {
  label: CategoryFilter;
  icon: typeof Filter;
}[] = [
  { label: "All", icon: Filter },
  { label: "Anime", icon: Tv },
  { label: "Movies", icon: Film },
  { label: "Games", icon: Gamepad2 },
];

const statusFilters: StatusFilter[] = [
  "All Status",
  "Favorites",
  "Completed",
  "Watching/Playing",
  "Planned",
];

const sortOptions: SortOption[] = [
  "Recently Added",
  "Highest Rated",
  "Alphabetical",
];

export function LibraryManager({ initialItems }: LibraryManagerProps) {
  const [items, setItems] = useState(initialItems);
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

        if (activeStatus === "Watching/Playing") {
          return item.status === "watching" || item.status === "playing";
        }

        return getStatusLabel(item.status) === activeStatus;
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
  }, [activeCategory, activeStatus, items, sortValue]);

  const showcaseVisibleItems = useMemo(
    () =>
      showcaseLibraryItems
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

          if (activeStatus === "Watching/Playing") {
            return item.status === "watching" || item.status === "playing";
          }

          return getStatusLabel(item.status) === activeStatus;
        })
        .sort((first, second) => {
          if (sortValue === "Highest Rated") {
            return second.rating - first.rating;
          }

          if (sortValue === "Alphabetical") {
            return first.title.localeCompare(second.title);
          }

          return 0;
        }),
    [activeCategory, activeStatus, sortValue],
  );

  const displayItems = items.length > 0 ? visibleItems : showcaseVisibleItems;

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
    <div className="space-y-8 pb-10">
      <section className="space-y-3 pt-4 sm:pt-6">
        <div className="relative">
          <Sparkles className="absolute -left-4 top-1/2 h-16 w-16 -translate-y-1/2 text-[#8b5cf6] opacity-[0.08]" />
          <h1 className="editorial-title bg-[linear-gradient(135deg,#f3f0ff,#d4c5f9,#c4b5fd)] bg-clip-text text-5xl font-normal leading-none tracking-[0] text-transparent sm:text-6xl">
            Your Library
          </h1>
        </div>
        <p className="text-base font-medium text-[#b8c1ec] sm:text-lg">
          Browse and manage your anime, movies, and games.
        </p>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-fit max-w-full items-center gap-2 overflow-x-auto rounded-xl border border-[#8b5cf6]/20 bg-[#1a1a2e]/60 p-1.5 soft-scrollbar">
            {categoryFilters.map(({ label, icon: Icon }) => {
              const isActive = activeCategory === label;

              return (
                <button
                  key={label}
                  type="button"
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition sm:px-5",
                    isActive
                      ? "bg-[linear-gradient(135deg,#8b5cf6,#6366f1)] text-white shadow-[0_14px_34px_rgba(139,92,246,0.28)]"
                      : "text-[#b8c1ec] hover:bg-white/[0.05] hover:text-white",
                  )}
                  onClick={() => setActiveCategory(label)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              className="h-11 rounded-xl px-5 shadow-[0_18px_46px_rgba(139,92,246,0.24)]"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={openAddModal}
              disabled={isPending}
            >
              Add Content
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-full flex-wrap items-center gap-2">
            {statusFilters.map((filter) => {
              const isActive = activeStatus === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  className={cn(
                    "inline-flex h-9 items-center rounded-lg border px-4 text-sm font-semibold transition",
                    isActive
                      ? "border-[#8b5cf6]/45 bg-[#8b5cf6]/20 text-[#a78bfa]"
                      : "border-transparent text-[#b8c1ec] hover:bg-white/[0.05] hover:text-white",
                  )}
                  onClick={() => setActiveStatus(filter)}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <label className="relative w-full sm:w-[210px]">
            <span className="sr-only">Sort library items</span>
            <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b5cf6]" />
            <select
              value={sortValue}
              onChange={(event) => setSortValue(event.target.value as SortOption)}
              className="h-11 w-full appearance-none rounded-xl border border-[#8b5cf6]/20 bg-[#1a1a2e]/60 pl-11 pr-10 text-sm font-semibold text-[#b8c1ec] outline-none transition hover:border-[#8b5cf6]/40 focus:border-[#8b5cf6]/55 focus:ring-2 focus:ring-[#8b5cf6]/20"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option} className="bg-[#101121] text-[#f3f0ff]">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b5cf6]" />
          </label>
        </div>
      </section>

      {error ? (
        <StatusMessage tone="error" title="Action failed">
          {error}
        </StatusMessage>
      ) : null}

      <div>
        <p className="text-sm font-semibold text-[#8b5cf6]">
          {displayItems.length} {displayItems.length === 1 ? "item" : "items"}
        </p>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.length > 0
          ? visibleItems.map((item) => (
            <LibraryItemCard
              key={item.id}
              item={item}
              onEdit={() => openEditModal(item)}
              onToggleFavorite={() => handleFavoriteToggle(item)}
            />
          ))
          : showcaseVisibleItems.map((item) => (
            <LibraryItemCard key={item.id} item={item} />
          ))}
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
