import type { DetailedLibraryItem, LibraryReview, MediaCategory } from "@/types";

export type ShowcaseLibraryItem = DetailedLibraryItem & {
  isShowcase: true;
};

const showcaseUserId = "showcase-user";
const createdAt = "2024-01-15T12:00:00.000Z";
const updatedAt = "2024-03-08T12:00:00.000Z";

type ShowcaseBase = {
  id: string;
  title: string;
  category: MediaCategory;
  status: ShowcaseLibraryItem["status"];
  rating: number;
  isFavorite: boolean;
  coverUrl: string;
  coverAccent: string;
  year: number;
  description: string;
  genres: string[];
  userReview: string;
  relatedIds: string[];
};

function review(itemId: string, rating: number, body: string): LibraryReview {
  return {
    id: `${itemId}-review`,
    itemId,
    userId: showcaseUserId,
    rating,
    body,
    notes: null,
    containsSpoilers: false,
    draftedAt: null,
    publishedAt: updatedAt,
    updatedAt,
  };
}

function baseItem<TItem extends ShowcaseBase>(item: TItem) {
  return {
    ...item,
    userId: showcaseUserId,
    synopsis: item.description,
    userRating: item.rating,
    createdAt,
    updatedAt,
    review: review(item.id, item.rating, item.userReview),
    publicReview: null,
    isShowcase: true as const,
  };
}

export const showcaseLibraryItems: ShowcaseLibraryItem[] = [
  {
    ...baseItem({
      id: "showcase-attack-on-titan",
      title: "Attack on Titan",
      category: "anime",
      status: "watching",
      rating: 5,
      isFavorite: true,
      coverUrl:
        "https://images.unsplash.com/photo-1764520408437-95890a95db4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      coverAccent: "from-[#8b5cf6] via-[#2a2248] to-[#0b1020]",
      year: 2013,
      description:
        "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason. The story follows Eren Yeager, who vows to exterminate the Titans after they bring about the destruction of his hometown and the death of his mother. As the series progresses, it explores themes of freedom, survival, and the cyclical nature of hatred.",
      genres: ["Action", "Dark Fantasy", "Drama", "Mystery"],
      userReview:
        "An absolute masterpiece that redefined the shounen genre. The plot twists are incredible, the character development is phenomenal, and the final season ties everything together perfectly.",
      relatedIds: ["showcase-demon-slayer", "showcase-cowboy-bebop"],
    }),
    metadata: {
      totalSeasons: 4,
      totalEpisodes: 87,
      studio: "MAPPA, Wit Studio",
      releaseDate: "Apr 7, 2013 - Nov 5, 2023",
    },
    progress: {
      category: "anime",
      currentSeason: 3,
      currentEpisode: 18,
      totalEpisodes: 87,
      percentComplete: 65,
    },
  },
  {
    ...baseItem({
      id: "showcase-inception",
      title: "Inception",
      category: "movie",
      status: "completed",
      rating: 5,
      isFavorite: true,
      coverUrl:
        "https://images.unsplash.com/photo-1563202221-f4eae97e4828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      coverAccent: "from-[#4ea1ff] via-[#16304d] to-[#09111f]",
      year: 2010,
      description:
        "A skilled thief enters dreams to plant an idea, turning memory, grief, and architecture into a high-wire heist.",
      genres: ["Sci-Fi", "Thriller", "Heist"],
      userReview:
        "Still a beautifully engineered puzzle box, with spectacle that works because the emotional hook stays legible.",
      relatedIds: ["showcase-interstellar", "showcase-matrix"],
    }),
    metadata: {
      runtimeMinutes: 148,
      director: "Christopher Nolan",
      watchedCount: 2,
      releaseDate: "July 16, 2010",
      format: "Feature Film",
    },
    progress: {
      category: "movie",
      watched: true,
      reviewDrafted: true,
      completed: true,
      watchedCount: 2,
      percentComplete: 100,
    },
  },
  {
    ...baseItem({
      id: "showcase-elden-ring",
      title: "Elden Ring",
      category: "game",
      status: "playing",
      rating: 5,
      isFavorite: false,
      coverUrl:
        "https://images.unsplash.com/photo-1634658340808-9abaef7eb9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      coverAccent: "from-[#f59e0b] via-[#4b2c0c] to-[#110d0a]",
      year: 2022,
      description:
        "A vast action RPG about ambition, ruin, and discovery across the Lands Between.",
      genres: ["Action RPG", "Open World", "Fantasy"],
      userReview:
        "The sense of discovery is still astonishing. Every horizon feels like a dare.",
      relatedIds: ["showcase-god-of-war", "showcase-hades"],
    }),
    metadata: {
      platform: "PC, PlayStation, Xbox",
      hoursPlayed: 78,
      chapter: null,
      completionPercent: 78,
      developer: "FromSoftware",
      releaseDate: "February 25, 2022",
    },
    progress: {
      category: "game",
      chapter: null,
      runLabel: "2",
      hoursPlayed: 78,
      completionPercent: 78,
    },
  },
  {
    ...baseItem({
      id: "showcase-your-name",
      title: "Your Name",
      category: "anime",
      status: "completed",
      rating: 5,
      isFavorite: true,
      coverUrl:
        "https://images.unsplash.com/photo-1763732397784-c5ff2651d40c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      coverAccent: "from-[#c026d3] via-[#41172e] to-[#0f0b16]",
      year: 2016,
      description:
        "Two teenagers become linked across distance and time in a luminous story about memory, longing, and fate.",
      genres: ["Romance", "Drama", "Fantasy"],
      userReview:
        "Beautifully paced and emotionally direct, with images that feel etched into memory.",
      relatedIds: ["showcase-attack-on-titan", "showcase-cowboy-bebop"],
    }),
    metadata: {
      totalSeasons: 1,
      totalEpisodes: 1,
      studio: "CoMix Wave Films",
      releaseDate: "August 26, 2016",
    },
    progress: {
      category: "anime",
      currentSeason: 1,
      currentEpisode: 1,
      totalEpisodes: 1,
      percentComplete: 100,
    },
  },
  {
    ...baseItem({
      id: "showcase-interstellar",
      title: "Interstellar",
      category: "movie",
      status: "completed",
      rating: 5,
      isFavorite: true,
      coverUrl:
        "https://images.unsplash.com/photo-1765510296004-614b6cc204da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      coverAccent: "from-[#7c3aed] via-[#1f1b45] to-[#090b14]",
      year: 2014,
      description:
        "Explorers cross impossible distances to find a future for humanity while love and time bend around them.",
      genres: ["Sci-Fi", "Drama", "Adventure"],
      userReview:
        "Big-hearted science fiction with a final act that still hits hard.",
      relatedIds: ["showcase-inception", "showcase-dune"],
    }),
    metadata: {
      runtimeMinutes: 169,
      director: "Christopher Nolan",
      watchedCount: 3,
      releaseDate: "November 7, 2014",
      format: "Feature Film",
    },
    progress: {
      category: "movie",
      watched: true,
      reviewDrafted: true,
      completed: true,
      watchedCount: 3,
      percentComplete: 100,
    },
  },
  {
    ...baseItem({
      id: "showcase-last-of-us",
      title: "The Last of Us Part II",
      category: "game",
      status: "completed",
      rating: 5,
      isFavorite: true,
      coverUrl:
        "https://images.unsplash.com/photo-1592840496694-26d035b52b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      coverAccent: "from-[#22c55e] via-[#163727] to-[#08110d]",
      year: 2020,
      description:
        "A brutal, intimate action-adventure about grief, violence, and the cost of obsession.",
      genres: ["Action", "Survival", "Drama"],
      userReview:
        "Difficult, deliberate, and deeply committed to the consequences of its story.",
      relatedIds: ["showcase-god-of-war", "showcase-elden-ring"],
    }),
    metadata: {
      platform: "PlayStation",
      hoursPlayed: 32,
      chapter: "Seattle Day 3",
      completionPercent: 100,
      developer: "Naughty Dog",
      releaseDate: "June 19, 2020",
    },
    progress: {
      category: "game",
      chapter: "Seattle Day 3",
      runLabel: null,
      hoursPlayed: 32,
      completionPercent: 100,
    },
  },
  {
    ...baseItem({
      id: "showcase-demon-slayer",
      title: "Demon Slayer",
      category: "anime",
      status: "watching",
      rating: 4,
      isFavorite: false,
      coverUrl:
        "https://images.unsplash.com/photo-1612036781124-847f8939b154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      coverAccent: "from-[#ef4444] via-[#41172e] to-[#0f0b16]",
      year: 2019,
      description:
        "A demon-slaying journey built on family, discipline, and dazzling swordplay.",
      genres: ["Action", "Supernatural", "Adventure"],
      userReview:
        "The set pieces are gorgeous, and the emotional clarity makes it easy to return to.",
      relatedIds: ["showcase-attack-on-titan", "showcase-cowboy-bebop"],
    }),
    metadata: {
      totalSeasons: 4,
      totalEpisodes: 63,
      studio: "ufotable",
      releaseDate: "April 6, 2019",
    },
    progress: {
      category: "anime",
      currentSeason: 2,
      currentEpisode: 8,
      totalEpisodes: 63,
      percentComplete: 42,
    },
  },
  {
    ...baseItem({
      id: "showcase-matrix",
      title: "The Matrix",
      category: "movie",
      status: "completed",
      rating: 5,
      isFavorite: false,
      coverUrl:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      coverAccent: "from-[#06b6d4] via-[#15314a] to-[#09111d]",
      year: 1999,
      description:
        "A hacker discovers reality itself is a system, and rebellion becomes a matter of perception.",
      genres: ["Sci-Fi", "Action", "Cyberpunk"],
      userReview:
        "Still sharp, stylish, and philosophically sticky in the best way.",
      relatedIds: ["showcase-inception", "showcase-interstellar"],
    }),
    metadata: {
      runtimeMinutes: 136,
      director: "The Wachowskis",
      watchedCount: 4,
      releaseDate: "March 31, 1999",
      format: "Feature Film",
    },
    progress: {
      category: "movie",
      watched: true,
      reviewDrafted: false,
      completed: true,
      watchedCount: 4,
      percentComplete: 100,
    },
  },
  {
    ...baseItem({
      id: "showcase-god-of-war",
      title: "God of War",
      category: "game",
      status: "playing",
      rating: 5,
      isFavorite: true,
      coverUrl:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      coverAccent: "from-[#3b82f6] via-[#15294b] to-[#08101d]",
      year: 2018,
      description:
        "A mythic action game about parenthood, restraint, and old violence crossing into a new world.",
      genres: ["Action", "Adventure", "Mythology"],
      userReview:
        "Powerful because the spectacle keeps folding back into character.",
      relatedIds: ["showcase-elden-ring", "showcase-last-of-us"],
    }),
    metadata: {
      platform: "PlayStation, PC",
      hoursPlayed: 45,
      chapter: null,
      completionPercent: 45,
      developer: "Santa Monica Studio",
      releaseDate: "April 20, 2018",
    },
    progress: {
      category: "game",
      chapter: null,
      runLabel: null,
      hoursPlayed: 45,
      completionPercent: 45,
    },
  },
  {
    ...baseItem({
      id: "showcase-cowboy-bebop",
      title: "Cowboy Bebop",
      category: "anime",
      status: "planned",
      rating: 0,
      isFavorite: false,
      coverUrl:
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      coverAccent: "from-[#60a5fa] via-[#15294b] to-[#08101d]",
      year: 1998,
      description:
        "Bounty hunters drift through space, jazz, memory, and melancholy.",
      genres: ["Sci-Fi", "Noir", "Action"],
      userReview:
        "Queued up as a classic I want to revisit with proper attention.",
      relatedIds: ["showcase-attack-on-titan", "showcase-demon-slayer"],
    }),
    metadata: {
      totalSeasons: 1,
      totalEpisodes: 26,
      studio: "Sunrise",
      releaseDate: "April 3, 1998",
    },
    progress: {
      category: "anime",
      currentSeason: 1,
      currentEpisode: 0,
      totalEpisodes: 26,
      percentComplete: 0,
    },
  },
  {
    ...baseItem({
      id: "showcase-dune",
      title: "Dune",
      category: "movie",
      status: "planned",
      rating: 0,
      isFavorite: false,
      coverUrl:
        "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      coverAccent: "from-[#f97316] via-[#4a2618] to-[#120d0b]",
      year: 2021,
      description:
        "A young heir enters a desert world of prophecy, politics, and ecological power.",
      genres: ["Sci-Fi", "Epic", "Adventure"],
      userReview:
        "Saved for a full rewatch alongside Part Two.",
      relatedIds: ["showcase-interstellar", "showcase-inception"],
    }),
    metadata: {
      runtimeMinutes: 155,
      director: "Denis Villeneuve",
      watchedCount: 0,
      releaseDate: "October 22, 2021",
      format: "Feature Film",
    },
    progress: {
      category: "movie",
      watched: false,
      reviewDrafted: false,
      completed: false,
      watchedCount: 0,
      percentComplete: 0,
    },
  },
  {
    ...baseItem({
      id: "showcase-hades",
      title: "Hades",
      category: "game",
      status: "completed",
      rating: 5,
      isFavorite: true,
      coverUrl:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
      coverAccent: "from-[#f59e0b] via-[#4b2c0c] to-[#110d0a]",
      year: 2020,
      description:
        "A mythic roguelike where every failed escape sharpens the next attempt.",
      genres: ["Roguelike", "Action", "Mythology"],
      userReview:
        "A perfect loop: fast, stylish, generous, and full of character.",
      relatedIds: ["showcase-elden-ring", "showcase-god-of-war"],
    }),
    metadata: {
      platform: "PC, Switch, PlayStation, Xbox",
      hoursPlayed: 65,
      chapter: null,
      completionPercent: 100,
      developer: "Supergiant Games",
      releaseDate: "September 17, 2020",
    },
    progress: {
      category: "game",
      chapter: null,
      runLabel: "42",
      hoursPlayed: 65,
      completionPercent: 100,
    },
  },
];

export function getShowcaseItemById(id: string) {
  return showcaseLibraryItems.find((item) => item.id === id) ?? null;
}
