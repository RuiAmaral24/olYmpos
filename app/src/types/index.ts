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
  email: string | null;
  username: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: string;
  profileVisibility: ProfileVisibility;
};

export type ProfileVisibility = "public" | "private";

export type FollowRelationship = "self" | "none" | "requested" | "following";

export type PublicUserProfile = {
  id: string;
  username: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: string;
  profileVisibility: ProfileVisibility;
  relationship: FollowRelationship;
  canViewPrivateContent: boolean;
  followersCount: number;
  followingCount: number;
};

export type FollowStats = {
  followers: number;
  following: number;
};

export type SocialUser = PublicUserProfile & {
  requestedAt?: string;
};

export type SocialUserPage = {
  items: SocialUser[];
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  canView: boolean;
};

export type FollowRequestUser = {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  profileVisibility: ProfileVisibility;
  requestedAt: string;
};

export type NotificationRow = {
  id: string;
  user_id: string;
  type: string;
  actor_user_id: string | null;
  title: string;
  body: string | null;
  target_url: string | null;
  related_entity_type: string | null;
  related_entity_id: string | null;
  payload: Record<string, unknown>;
  dedupe_key: string | null;
  read_at: string | null;
  created_at: string;
};

export type Notification = {
  id: string;
  type: string;
  actorUserId: string | null;
  title: string;
  body: string | null;
  targetUrl: string | null;
  relatedEntityType: string | null;
  relatedEntityId: string | null;
  payload: Record<string, unknown>;
  readAt: string | null;
  createdAt: string;
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
  dateLabel?: string;
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
