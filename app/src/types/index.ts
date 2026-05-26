export type MediaCategory = "anime" | "movie" | "game";

export type TrackingStatus =
  | "planned"
  | "watching"
  | "playing"
  | "completed"
  | "paused"
  | "dropped";

export type UserProfile = {
  id: string;
  username: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LibraryReview = {
  id: string;
  itemId: string;
  userId: string;
  rating: number;
  body: string;
  notes: string | null;
  containsSpoilers: boolean;
  draftedAt: string | null;
  publishedAt: string | null;
  updatedAt: string;
};

export type AnimeMetadata = {
  totalSeasons: number;
  totalEpisodes: number;
  studio: string;
  releaseDate: string;
};

export type MovieMetadata = {
  runtimeMinutes: number;
  director: string;
  watchedCount: number;
  releaseDate: string;
  format: string;
};

export type GameMetadata = {
  platform: string;
  hoursPlayed: number;
  chapter: string | null;
  completionPercent: number;
  developer: string;
  releaseDate: string;
};

export type AnimeProgress = {
  category: "anime";
  currentSeason: number;
  currentEpisode: number;
  totalEpisodes: number;
  percentComplete: number;
};

export type MovieProgress = {
  category: "movie";
  watched: boolean;
  reviewDrafted: boolean;
  completed: boolean;
  watchedCount: number;
  percentComplete: number;
};

export type GameProgress = {
  category: "game";
  chapter: string | null;
  runLabel: string | null;
  hoursPlayed: number;
  completionPercent: number;
};

export type LibraryProgress = AnimeProgress | MovieProgress | GameProgress;

export type LibraryItemBase = {
  id: string;
  userId: string;
  title: string;
  category: MediaCategory;
  status: TrackingStatus;
  rating: number;
  isFavorite: boolean;
  coverUrl: string | null;
  coverAccent: string;
  year: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  review: LibraryReview | null;
};

export type AnimeLibraryItem = LibraryItemBase & {
  category: "anime";
  metadata: AnimeMetadata;
  progress: AnimeProgress;
};

export type MovieLibraryItem = LibraryItemBase & {
  category: "movie";
  metadata: MovieMetadata;
  progress: MovieProgress;
};

export type GameLibraryItem = LibraryItemBase & {
  category: "game";
  metadata: GameMetadata;
  progress: GameProgress;
};

export type LibraryItem = AnimeLibraryItem | MovieLibraryItem | GameLibraryItem;

export type EntryModalMode = "add" | "edit";

export type EntryFormValues = {
  title: string;
  category: MediaCategory;
  status: TrackingStatus;
  rating: number;
  favorite: boolean;
  season: string;
  episode: string;
  movieState: "watched" | "review_ready" | "completed";
  chapter: string;
  runLabel: string;
  hoursPlayed: string;
  notes: string;
};

export type DashboardTrackedItem = {
  id: string;
  title: string;
  category: MediaCategory;
  status: string;
  progressLabel: string;
  accent: string;
  coverUrl?: string;
  rating?: number;
  favorite?: boolean;
};

export type DashboardReview = {
  id: string;
  title: string;
  category: MediaCategory;
  excerpt: string;
  rating: number;
};

export type DetailsMetadataItem = {
  label: string;
  value: string;
};

export type DashboardSummary = {
  totalItems: number;
  favoriteItems: number;
  completedItems: number;
  activeItems: number;
  plannedItems: number;
  byCategory: Record<MediaCategory, number>;
};

export type DetailedLibraryItem = LibraryItem & {
  genres: string[];
  synopsis: string;
  userReview: string | null;
  userRating: number;
  relatedIds: string[];
};
