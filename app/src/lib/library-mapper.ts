import type {
  AnimeMetadata,
  AnimeProgress,
  DashboardReview,
  DashboardTrackedItem,
  DetailedLibraryItem,
  EntryFormValues,
  GameMetadata,
  GameProgress,
  LibraryItem,
  LibraryReview,
  MediaCategory,
  MovieMetadata,
  MovieProgress,
  TrackingStatus,
} from "@/types";

export type LibraryItemRow = {
  id: string;
  user_id: string;
  title: string;
  category: string;
  status: string;
  rating: number | null;
  is_favorite: boolean;
  cover_url: string | null;
  year: number | null;
  description: string | null;
  metadata_json: unknown;
  progress_json: unknown;
  created_at: string;
  updated_at: string;
  reviews?: ReviewRow[] | null;
};

export type ReviewRow = {
  id: string;
  user_id: string;
  library_item_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const coverAccents = [
  "from-[#8b5cf6] via-[#2a2248] to-[#0b1020]",
  "from-[#4ea1ff] via-[#16304d] to-[#09111f]",
  "from-[#f59e0b] via-[#4b2c0c] to-[#110d0a]",
  "from-[#22c55e] via-[#163727] to-[#08110d]",
  "from-[#ef4444] via-[#41172e] to-[#0f0b16]",
  "from-[#06b6d4] via-[#15314a] to-[#09111d]",
];

const dashboardAccents = [
  "from-[#8b5cf6]/50 via-[#6d5cff]/15 to-transparent",
  "from-[#4ea1ff]/45 via-[#1f3d73]/10 to-transparent",
  "from-[#f59e0b]/40 via-[#4a2e0f]/10 to-transparent",
  "from-[#22c55e]/35 via-[#163727]/10 to-transparent",
];

export function mapLibraryItemRow(row: LibraryItemRow): LibraryItem {
  const category = parseCategory(row.category);
  const status = parseStatus(row.status);
  const review = mapReview(row.reviews?.[0] ?? null, row.rating ?? 0);
  const base = {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    category,
    status,
    rating: Number(row.rating ?? 0),
    isFavorite: row.is_favorite,
    coverUrl: row.cover_url,
    coverAccent: getCoverAccent(row.id),
    year: row.year ?? new Date(row.created_at).getFullYear(),
    description: row.description ?? "A title tracked inside olYmpos.",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    review,
  };

  if (category === "anime") {
    const metadata = objectValue(row.metadata_json);
    const progress = objectValue(row.progress_json);
    const animeProgress: AnimeProgress = {
      category: "anime",
      currentSeason: numberValue(progress.currentSeason, 1),
      currentEpisode: numberValue(progress.currentEpisode, 0),
      totalEpisodes: numberValue(
        progress.totalEpisodes,
        numberValue(metadata.totalEpisodes, 0),
      ),
      percentComplete: numberValue(progress.percentComplete, 0),
    };

    return {
      ...base,
      category,
      metadata: {
        totalSeasons: numberValue(metadata.totalSeasons, 1),
        totalEpisodes: numberValue(metadata.totalEpisodes, animeProgress.totalEpisodes),
        studio: stringValue(metadata.studio, "Unknown Studio"),
        releaseDate: stringValue(metadata.releaseDate, String(base.year)),
      },
      progress: animeProgress,
    };
  }

  if (category === "movie") {
    const metadata = objectValue(row.metadata_json);
    const progress = objectValue(row.progress_json);
    const movieProgress: MovieProgress = {
      category: "movie",
      watched: booleanValue(progress.watched, status === "completed"),
      reviewDrafted: booleanValue(progress.reviewDrafted, Boolean(review)),
      completed: booleanValue(progress.completed, status === "completed"),
      watchedCount: numberValue(progress.watchedCount, 0),
      percentComplete: numberValue(progress.percentComplete, status === "completed" ? 100 : 0),
    };

    return {
      ...base,
      category,
      metadata: {
        runtimeMinutes: numberValue(metadata.runtimeMinutes, 0),
        director: stringValue(metadata.director, "Unknown Director"),
        watchedCount: numberValue(metadata.watchedCount, movieProgress.watchedCount),
        releaseDate: stringValue(metadata.releaseDate, String(base.year)),
        format: stringValue(metadata.format, "Feature Film"),
      },
      progress: movieProgress,
    };
  }

  const metadata = objectValue(row.metadata_json);
  const progress = objectValue(row.progress_json);
  const gameProgress: GameProgress = {
    category: "game",
    chapter: nullableString(progress.chapter),
    runLabel: nullableString(progress.runLabel),
    hoursPlayed: numberValue(progress.hoursPlayed, 0),
    completionPercent: numberValue(progress.completionPercent, 0),
  };

  return {
    ...base,
    category,
    metadata: {
      platform: stringValue(metadata.platform, "Unknown Platform"),
      hoursPlayed: numberValue(metadata.hoursPlayed, gameProgress.hoursPlayed),
      chapter: nullableString(metadata.chapter),
      completionPercent: numberValue(metadata.completionPercent, gameProgress.completionPercent),
      developer: stringValue(metadata.developer, "Unknown Developer"),
      releaseDate: stringValue(metadata.releaseDate, String(base.year)),
    },
    progress: gameProgress,
  };
}

export function mapDetailedItem(item: LibraryItem, allItems: LibraryItem[]): DetailedLibraryItem {
  const metadata = item.metadata as unknown as { genres?: unknown };
  const genres = Array.isArray(metadata.genres)
    ? metadata.genres.filter((entry): entry is string => typeof entry === "string")
    : [categoryGenre(item.category), item.status === "completed" ? "Completed" : "Tracked"];

  return {
    ...item,
    genres,
    synopsis: item.description,
    userReview:
      item.review?.body ??
      "No personal review yet. Add notes from the library edit flow to keep this title's record current.",
    userRating: item.rating,
    relatedIds: allItems
      .filter((entry) => entry.id !== item.id && entry.category === item.category)
      .slice(0, 3)
      .map((entry) => entry.id),
  };
}

export function formValuesToLibraryPayload(values: EntryFormValues, userId: string) {
  const category = values.category;
  const year = new Date().getFullYear();

  return {
    user_id: userId,
    title: values.title.trim() || "Untitled Entry",
    category,
    status: values.status,
    rating: values.rating,
    is_favorite: values.favorite,
    cover_url: null,
    year,
    description: "A title tracked inside olYmpos.",
    metadata_json: buildMetadata(values),
    progress_json: buildProgress(values),
  };
}

export function itemToEntryFormValues(item: LibraryItem): EntryFormValues {
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
    notes: item.review?.body ?? "",
  };
}

export function toDashboardTrackedItem(item: LibraryItem, index: number): DashboardTrackedItem {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    status: buildDashboardStatus(item),
    progressLabel: `${Math.round(getItemPercent(item))}% complete`,
    accent: dashboardAccents[index % dashboardAccents.length],
    favorite: item.isFavorite,
  };
}

export function toDashboardReview(item: LibraryItem): DashboardReview | null {
  if (!item.review) {
    return null;
  }

  return {
    id: item.review.id,
    title: item.title,
    category: item.category,
    excerpt: item.review.body,
    rating: item.rating,
  };
}

function mapReview(row: ReviewRow | null, rating: number): LibraryReview | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    itemId: row.library_item_id,
    userId: row.user_id,
    rating,
    body: row.content,
    notes: null,
    containsSpoilers: false,
    draftedAt: null,
    publishedAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function buildMetadata(values: EntryFormValues): AnimeMetadata | MovieMetadata | GameMetadata {
  if (values.category === "anime") {
    const totalEpisodes = numberFromString(values.episode);

    return {
      totalSeasons: numberFromString(values.season, 1),
      totalEpisodes,
      studio: "Unknown Studio",
      releaseDate: String(new Date().getFullYear()),
    };
  }

  if (values.category === "movie") {
    const watched = values.movieState !== "watched" ? values.movieState === "review_ready" || values.movieState === "completed" : true;

    return {
      runtimeMinutes: 0,
      director: "Unknown Director",
      watchedCount: watched ? 1 : 0,
      releaseDate: String(new Date().getFullYear()),
      format: "Feature Film",
    };
  }

  return {
    platform: "Unknown Platform",
    hoursPlayed: numberFromString(values.hoursPlayed),
    chapter: values.chapter || null,
    completionPercent: numberFromString(values.hoursPlayed) > 0 ? 25 : 0,
    developer: "Unknown Developer",
    releaseDate: String(new Date().getFullYear()),
  };
}

function buildProgress(values: EntryFormValues): AnimeProgress | MovieProgress | GameProgress {
  if (values.category === "anime") {
    const currentEpisode = numberFromString(values.episode);
    const totalEpisodes = Math.max(currentEpisode, 1);

    return {
      category: "anime",
      currentSeason: numberFromString(values.season, 1),
      currentEpisode,
      totalEpisodes,
      percentComplete: Math.min(100, Math.round((currentEpisode / totalEpisodes) * 100)),
    };
  }

  if (values.category === "movie") {
    const completed = values.movieState === "completed";
    const watched = completed || values.movieState === "watched" || values.movieState === "review_ready";

    return {
      category: "movie",
      watched,
      reviewDrafted: values.movieState === "review_ready",
      completed,
      watchedCount: watched ? 1 : 0,
      percentComplete: completed ? 100 : watched ? 75 : 0,
    };
  }

  return {
    category: "game",
    chapter: values.chapter || null,
    runLabel: values.runLabel || null,
    hoursPlayed: numberFromString(values.hoursPlayed),
    completionPercent: numberFromString(values.hoursPlayed) > 0 ? 25 : 0,
  };
}

function parseCategory(value: string): MediaCategory {
  return value === "movie" || value === "game" ? value : "anime";
}

function parseStatus(value: string): TrackingStatus {
  const statuses: TrackingStatus[] = ["planned", "watching", "playing", "completed", "paused", "dropped"];
  return statuses.includes(value as TrackingStatus) ? (value as TrackingStatus) : "planned";
}

function getCoverAccent(id: string) {
  const index = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return coverAccents[index % coverAccents.length];
}

function objectValue(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function nullableString(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}

function numberValue(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function booleanValue(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function numberFromString(value: string, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function categoryGenre(category: MediaCategory) {
  if (category === "anime") {
    return "Anime";
  }

  return category === "movie" ? "Film" : "Game";
}

function getItemPercent(item: LibraryItem) {
  if (item.category === "game") {
    return item.progress.completionPercent;
  }

  return item.progress.percentComplete;
}

function buildDashboardStatus(item: LibraryItem) {
  if (item.category === "anime") {
    return `Episode ${item.progress.currentEpisode} of ${item.progress.totalEpisodes}`;
  }

  if (item.category === "movie") {
    return item.progress.completed ? "Completed" : item.progress.watched ? "Watched" : "Planned";
  }

  return item.progress.runLabel
    ? `Run ${item.progress.runLabel} reached`
    : `${item.progress.hoursPlayed}h logged`;
}
