import type {
  DetailsMetadataItem,
  LibraryItem,
  MediaCategory,
  TrackingStatus,
} from "@/types";

const categoryLabels: Record<MediaCategory, string> = {
  anime: "Anime",
  movie: "Movie",
  game: "Game",
};

const statusLabels: Record<TrackingStatus, string> = {
  planned: "Planned",
  watching: "Watching",
  playing: "Playing",
  completed: "Completed",
  paused: "Paused",
  dropped: "Dropped",
};

export function getCategoryLabel(category: MediaCategory) {
  return categoryLabels[category];
}

export function getStatusLabel(status: TrackingStatus) {
  return statusLabels[status];
}

export function filterItemsByCategory<T extends LibraryItem>(
  items: T[],
  category: MediaCategory,
) {
  return items.filter((item) => item.category === category);
}

export function filterItemsByStatus<T extends LibraryItem>(
  items: T[],
  status: TrackingStatus,
) {
  return items.filter((item) => item.status === status);
}

export function getCategoryCounts(items: LibraryItem[]) {
  return {
    anime: filterItemsByCategory(items, "anime").length,
    movie: filterItemsByCategory(items, "movie").length,
    game: filterItemsByCategory(items, "game").length,
  };
}

export function getFavoriteItems<T extends LibraryItem>(items: T[]) {
  return items.filter((item) => item.isFavorite);
}

export function getDashboardSummary(items: LibraryItem[]) {
  return {
    totalItems: items.length,
    favoriteItems: getFavoriteItems(items).length,
    completedItems: filterItemsByStatus(items, "completed").length,
    activeItems: items.filter(
      (item) => item.status === "watching" || item.status === "playing",
    ).length,
    plannedItems: filterItemsByStatus(items, "planned").length,
    byCategory: getCategoryCounts(items),
  };
}

export function getProgressPercent(item: LibraryItem) {
  if (item.progress.category === "anime") {
    return item.progress.percentComplete;
  }

  if (item.progress.category === "movie") {
    return item.progress.percentComplete;
  }

  return item.progress.completionPercent;
}

export function getProgressLabel(item: LibraryItem) {
  if (item.progress.category === "anime") {
    const { currentEpisode, totalEpisodes, currentSeason } = item.progress;

    if (currentEpisode <= 0) {
      return undefined;
    }

    if (totalEpisodes > 0) {
      return `Episode ${currentEpisode} of ${totalEpisodes}`;
    }

    return `Season ${currentSeason}, Episode ${currentEpisode}`;
  }

  if (item.progress.category === "movie") {
    if (item.progress.reviewDrafted) {
      return "Review ready";
    }

    if (item.progress.completed) {
      return "Completed";
    }

    return item.progress.watched ? "Watched" : undefined;
  }

  const segments = [
    item.progress.chapter ? `Chapter ${item.progress.chapter}` : "",
    item.progress.runLabel ? `Run ${item.progress.runLabel}` : "",
    item.progress.hoursPlayed > 0 ? `${item.progress.hoursPlayed}h` : "",
  ].filter(Boolean);

  return segments.join(" | ") || undefined;
}

export function getTrackingDetails(item: LibraryItem) {
  if (item.progress.category === "anime") {
    return `Season ${item.progress.currentSeason}, Episode ${item.progress.currentEpisode} of ${item.progress.totalEpisodes}`;
  }

  if (item.progress.category === "movie") {
    if (item.progress.reviewDrafted) {
      return "Completed, review drafted";
    }

    return item.progress.completed ? "Completed" : "Planned for viewing";
  }

  return [
    item.progress.runLabel ? `Run ${item.progress.runLabel}` : "",
    item.progress.chapter ? `Chapter ${item.progress.chapter}` : "",
    item.progress.completionPercent > 0 ? `${item.progress.completionPercent}% complete` : "",
  ].filter(Boolean).join(", ");
}

export function getDisplayMetadata(item: LibraryItem): DetailsMetadataItem[] {
  if (item.category === "anime") {
    return [
      { label: "Episodes", value: String(item.metadata.totalEpisodes) },
      { label: "Seasons", value: String(item.metadata.totalSeasons) },
      { label: "Studio", value: item.metadata.studio },
      { label: "Release", value: item.metadata.releaseDate },
    ];
  }

  if (item.category === "movie") {
    return [
      { label: "Runtime", value: `${item.metadata.runtimeMinutes} min` },
      { label: "Director", value: item.metadata.director },
      { label: "Release Date", value: item.metadata.releaseDate },
      { label: "Format", value: item.metadata.format },
    ];
  }

  return [
    { label: "Platform", value: item.metadata.platform },
    { label: "Hours Played", value: `${item.metadata.hoursPlayed}h` },
    { label: "Developer", value: item.metadata.developer },
    { label: "Release", value: item.metadata.releaseDate },
  ];
}
