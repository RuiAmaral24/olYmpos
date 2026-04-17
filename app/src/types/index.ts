export type LibraryCategory = "Anime" | "Movie" | "Game";

export type LibraryStatus =
  | "Completed"
  | "Watching"
  | "Playing"
  | "Planned";

export type LibraryItem = {
  id: string;
  title: string;
  category: LibraryCategory;
  status: LibraryStatus;
  rating: number;
  favorite?: boolean;
  progressLabel?: string;
  coverAccent: string;
  year?: string;
};

export type EntryModalMode = "add" | "edit";

export type EntryFormValues = {
  title: string;
  category: LibraryCategory;
  status: LibraryStatus;
  rating: number;
  favorite: boolean;
  season: string;
  episode: string;
  movieState: "Watched" | "Review Ready" | "Completed";
  chapter: string;
  runLabel: string;
  hoursPlayed: string;
  notes: string;
};

export type DashboardTrackedItem = {
  id: string;
  title: string;
  category: LibraryCategory;
  status: string;
  progressLabel: string;
  accent: string;
  favorite?: boolean;
};

export type DashboardReview = {
  id: string;
  title: string;
  category: LibraryCategory;
  excerpt: string;
  rating: number;
};

export type DetailsMetadataItem = {
  label: string;
  value: string;
};

export type DetailedLibraryItem = LibraryItem & {
  genres: string[];
  synopsis: string;
  userReview: string;
  userRating: number;
  progressPercent: number;
  trackingDetails: string;
  metadata: DetailsMetadataItem[];
  relatedIds: string[];
};
