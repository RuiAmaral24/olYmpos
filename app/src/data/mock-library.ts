import type {
  DashboardReview,
  DashboardTrackedItem,
  DetailedLibraryItem,
  LibraryItemBase,
} from "@/types";

const mockUserId = "profile-orion-vale";
const createdAt = "2026-04-01T12:00:00.000Z";
const updatedAt = "2026-04-16T12:00:00.000Z";

function baseItem(
  item: Pick<
    LibraryItemBase,
    | "id"
    | "title"
    | "status"
    | "rating"
    | "isFavorite"
    | "coverAccent"
    | "year"
    | "description"
  >,
): Omit<LibraryItemBase, "category" | "metadata" | "progress"> {
  return {
    ...item,
    userId: mockUserId,
    coverUrl: null,
    createdAt,
    updatedAt,
    review: null,
  };
}

export const mockLibraryItems: DetailedLibraryItem[] = [
  {
    ...baseItem({
      id: "1",
      title: "Frieren: Beyond Journey's End",
      status: "watching",
      rating: 4.9,
      isFavorite: true,
      coverAccent: "from-[#8b5cf6] via-[#2a2248] to-[#0b1020]",
      year: 2023,
      description:
        "After the hero's journey ends, Frieren continues forward through a quieter world.",
    }),
    category: "anime",
    metadata: {
      totalSeasons: 1,
      totalEpisodes: 28,
      studio: "Madhouse",
      releaseDate: "September 29, 2023",
    },
    progress: {
      category: "anime",
      currentSeason: 1,
      currentEpisode: 22,
      totalEpisodes: 28,
      percentComplete: 78,
    },
    genres: ["Fantasy", "Adventure", "Drama"],
    synopsis:
      "After the hero's journey ends, Frieren continues forward through a quieter world, measuring time, loss, and memory with every new companion she meets.",
    userReview:
      "This is the kind of series that feels expensive emotionally in the best way. Every pause matters, and the world keeps revealing new weight without needing to shout.",
    userRating: 5,
    relatedIds: ["4", "7"],
  },
  {
    ...baseItem({
      id: "2",
      title: "Dune: Part Two",
      status: "completed",
      rating: 4.8,
      isFavorite: true,
      coverAccent: "from-[#4ea1ff] via-[#16304d] to-[#09111f]",
      year: 2024,
      description:
        "Paul Atreides steps deeper into prophecy and war on the desert planet Arrakis.",
    }),
    category: "movie",
    metadata: {
      runtimeMinutes: 166,
      director: "Denis Villeneuve",
      watchedCount: 1,
      releaseDate: "March 1, 2024",
      format: "Feature Film",
    },
    progress: {
      category: "movie",
      watched: true,
      reviewDrafted: true,
      completed: true,
      watchedCount: 1,
      percentComplete: 100,
    },
    genres: ["Sci-Fi", "Epic", "Adventure"],
    synopsis:
      "Paul Atreides steps deeper into prophecy and war, balancing destiny, love, and survival on a world where every decision redraws the future.",
    userReview:
      "Huge, exacting, and strangely intimate for a film at this scale. The visual language is incredible, but what stayed with me was the control in every quiet scene.",
    userRating: 4.8,
    relatedIds: ["5", "8"],
  },
  {
    ...baseItem({
      id: "3",
      title: "Hades II",
      status: "playing",
      rating: 4.7,
      isFavorite: false,
      coverAccent: "from-[#f59e0b] via-[#4b2c0c] to-[#110d0a]",
      year: 2024,
      description:
        "Melinoe turns each run through the underworld into sharper resistance.",
    }),
    category: "game",
    metadata: {
      platform: "PC",
      hoursPlayed: 31,
      chapter: null,
      completionPercent: 64,
      developer: "Supergiant Games",
      releaseDate: "May 6, 2024",
    },
    progress: {
      category: "game",
      chapter: null,
      runLabel: "34",
      hoursPlayed: 31,
      completionPercent: 64,
    },
    genres: ["Roguelike", "Action", "Mythic Fantasy"],
    synopsis:
      "Melinoe descends through gods, witches, and impossible resistance, turning each failed run into a sharper route through the underworld's chaos.",
    userReview:
      "The combat rhythm is already addictive and the art direction is absurdly polished. It feels like a sequel that understands exactly what made the first game magnetic.",
    userRating: 4.7,
    relatedIds: ["6", "9"],
  },
  {
    ...baseItem({
      id: "4",
      title: "Solo Leveling",
      status: "planned",
      rating: 4.3,
      isFavorite: false,
      coverAccent: "from-[#22c55e] via-[#163727] to-[#08110d]",
      year: 2024,
      description: "A planned action fantasy pick for the next anime cycle.",
    }),
    category: "anime",
    metadata: {
      totalSeasons: 1,
      totalEpisodes: 12,
      studio: "A-1 Pictures",
      releaseDate: "January 7, 2024",
    },
    progress: {
      category: "anime",
      currentSeason: 1,
      currentEpisode: 0,
      totalEpisodes: 12,
      percentComplete: 0,
    },
    genres: ["Action", "Fantasy", "Thriller"],
    synopsis:
      "Jinwoo's rise accelerates in a world ruled by gates, monsters, and a power curve that refuses to stay human for long.",
    userReview:
      "Still planned, but it already feels like the right next adrenaline pick for the anime side of my olYmpos.",
    userRating: 4.3,
    relatedIds: ["1", "7"],
  },
  {
    ...baseItem({
      id: "5",
      title: "Spider-Man: Across the Spider-Verse",
      status: "completed",
      rating: 4.9,
      isFavorite: true,
      coverAccent: "from-[#ef4444] via-[#41172e] to-[#0f0b16]",
      year: 2023,
      description: "A multiverse animated feature saved as a signature favorite.",
    }),
    category: "movie",
    metadata: {
      runtimeMinutes: 140,
      director: "Dos Santos, Powers, Thompson",
      watchedCount: 2,
      releaseDate: "June 2, 2023",
      format: "Animated Feature",
    },
    progress: {
      category: "movie",
      watched: true,
      reviewDrafted: false,
      completed: true,
      watchedCount: 2,
      percentComplete: 100,
    },
    genres: ["Animation", "Sci-Fi", "Adventure"],
    synopsis:
      "Miles Morales faces the weight of identity and multiverse expectation in a film that treats movement, color, and emotion like the same language.",
    userReview:
      "It somehow feels handmade and gigantic at once. Even after finishing it, I keep thinking about the motion and how personal the stakes still feel.",
    userRating: 4.9,
    relatedIds: ["2", "8"],
  },
  {
    ...baseItem({
      id: "6",
      title: "Final Fantasy VII Rebirth",
      status: "playing",
      rating: 4.8,
      isFavorite: false,
      coverAccent: "from-[#06b6d4] via-[#15314a] to-[#09111d]",
      year: 2024,
      description: "A long-form RPG playthrough currently in motion.",
    }),
    category: "game",
    metadata: {
      platform: "PlayStation 5",
      hoursPlayed: 42,
      chapter: "10",
      completionPercent: 58,
      developer: "Square Enix",
      releaseDate: "February 29, 2024",
    },
    progress: {
      category: "game",
      chapter: "10",
      runLabel: null,
      hoursPlayed: 42,
      completionPercent: 58,
    },
    genres: ["RPG", "Action", "Adventure"],
    synopsis:
      "Cloud and company move across a wider world where memory, identity, and destiny collide with a much larger sense of scale.",
    userReview:
      "The world design is generous and the party chemistry carries so much of the momentum. I'm taking my time with it because it deserves that pace.",
    userRating: 4.8,
    relatedIds: ["3", "9"],
  },
  {
    ...baseItem({
      id: "7",
      title: "Blue Lock",
      status: "watching",
      rating: 4.4,
      isFavorite: false,
      coverAccent: "from-[#38bdf8] via-[#15243d] to-[#09111d]",
      year: 2022,
      description: "A kinetic sports anime currently being rewatched.",
    }),
    category: "anime",
    metadata: {
      totalSeasons: 1,
      totalEpisodes: 24,
      studio: "8bit",
      releaseDate: "October 9, 2022",
    },
    progress: {
      category: "anime",
      currentSeason: 1,
      currentEpisode: 13,
      totalEpisodes: 24,
      percentComplete: 56,
    },
    genres: ["Sports", "Drama", "Competition"],
    synopsis:
      "Strikers are forged through ruthless ego, velocity, and pressure in a football series that treats ambition like a combat system.",
    userReview:
      "Great momentum series for when I want something sharper and more kinetic between slower fantasy episodes.",
    userRating: 4.4,
    relatedIds: ["1", "4"],
  },
  {
    ...baseItem({
      id: "8",
      title: "The Boy and the Heron",
      status: "planned",
      rating: 4.5,
      isFavorite: false,
      coverAccent: "from-[#f97316] via-[#4a2618] to-[#120d0b]",
      year: 2023,
      description: "A planned animated feature saved for the right night.",
    }),
    category: "movie",
    metadata: {
      runtimeMinutes: 124,
      director: "Hayao Miyazaki",
      watchedCount: 0,
      releaseDate: "December 8, 2023",
      format: "Animated Feature",
    },
    progress: {
      category: "movie",
      watched: false,
      reviewDrafted: false,
      completed: false,
      watchedCount: 0,
      percentComplete: 0,
    },
    genres: ["Fantasy", "Drama", "Animation"],
    synopsis:
      "Miyazaki returns with a dreamlike coming-of-age tale where grief, imagination, and the afterimage of war shape every turn.",
    userReview:
      "Still on my planned list, mostly because I want the right uninterrupted night for it rather than a rushed watch.",
    userRating: 4.5,
    relatedIds: ["2", "5"],
  },
  {
    ...baseItem({
      id: "9",
      title: "Persona 3 Reload",
      status: "planned",
      rating: 4.6,
      isFavorite: true,
      coverAccent: "from-[#60a5fa] via-[#15294b] to-[#08101d]",
      year: 2024,
      description: "A planned long-form JRPG playthrough.",
    }),
    category: "game",
    metadata: {
      platform: "PC, PS5, Xbox",
      hoursPlayed: 0,
      chapter: null,
      completionPercent: 0,
      developer: "ATLUS",
      releaseDate: "February 2, 2024",
    },
    progress: {
      category: "game",
      chapter: null,
      runLabel: null,
      hoursPlayed: 0,
      completionPercent: 0,
    },
    genres: ["JRPG", "Social Sim", "Turn-Based"],
    synopsis:
      "A stylish reimagining of a cult RPG where school life, mortality, and supernatural conflict coexist in a striking daily rhythm.",
    userReview:
      "This is next in line when I want a long-form RPG that balances style with structure. Everything about it looks locked in.",
    userRating: 4.6,
    relatedIds: ["3", "6"],
  },
];

export const dashboardContinueItems: DashboardTrackedItem[] = [
  {
    id: "ct-1",
    title: "Frieren: Beyond Journey's End",
    category: "anime",
    status: "Episode 22 of 28",
    progressLabel: "78% complete",
    accent: "from-[#8b5cf6]/50 via-[#6d5cff]/15 to-transparent",
    favorite: true,
  },
  {
    id: "ct-2",
    title: "Dune: Part Two",
    category: "movie",
    status: "Watched 1 time",
    progressLabel: "Review draft saved",
    accent: "from-[#4ea1ff]/45 via-[#1f3d73]/10 to-transparent",
    favorite: true,
  },
  {
    id: "ct-3",
    title: "Hades II",
    category: "game",
    status: "Run 34 reached",
    progressLabel: "Main arc in progress",
    accent: "from-[#f59e0b]/40 via-[#4a2e0f]/10 to-transparent",
  },
];

export const dashboardRecentReviews: DashboardReview[] = [
  {
    id: "rv-1",
    title: "Frieren: Beyond Journey's End",
    category: "anime",
    excerpt:
      "Elegant pacing, quiet emotional payoff, and a world that feels larger every episode.",
    rating: 5,
  },
  {
    id: "rv-2",
    title: "Hades II",
    category: "game",
    excerpt:
      "Stylish combat loop with sharp writing and a progression curve that keeps pulling me back.",
    rating: 4,
  },
];

export const detailedLibraryItems = mockLibraryItems;

export function getDetailedLibraryItem(id: string) {
  return detailedLibraryItems.find((item) => item.id === id);
}
