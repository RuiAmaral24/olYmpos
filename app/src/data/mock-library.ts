import type {
  DashboardReview,
  DashboardTrackedItem,
  DetailedLibraryItem,
  LibraryItem,
} from "@/types";

export const mockLibraryItems: LibraryItem[] = [
  {
    id: "1",
    title: "Frieren: Beyond Journey's End",
    category: "Anime",
    status: "Watching",
    rating: 4.9,
    favorite: true,
    progressLabel: "Episode 22 of 28",
    coverAccent: "from-[#8b5cf6] via-[#2a2248] to-[#0b1020]",
    year: "2023",
  },
  {
    id: "2",
    title: "Dune: Part Two",
    category: "Movie",
    status: "Completed",
    rating: 4.8,
    favorite: true,
    progressLabel: "Review ready",
    coverAccent: "from-[#4ea1ff] via-[#16304d] to-[#09111f]",
    year: "2024",
  },
  {
    id: "3",
    title: "Hades II",
    category: "Game",
    status: "Playing",
    rating: 4.7,
    progressLabel: "Run 34 reached",
    coverAccent: "from-[#f59e0b] via-[#4b2c0c] to-[#110d0a]",
    year: "2024",
  },
  {
    id: "4",
    title: "Solo Leveling",
    category: "Anime",
    status: "Planned",
    rating: 4.3,
    coverAccent: "from-[#22c55e] via-[#163727] to-[#08110d]",
    year: "2024",
  },
  {
    id: "5",
    title: "Spider-Man: Across the Spider-Verse",
    category: "Movie",
    status: "Completed",
    rating: 4.9,
    favorite: true,
    coverAccent: "from-[#ef4444] via-[#41172e] to-[#0f0b16]",
    year: "2023",
  },
  {
    id: "6",
    title: "Final Fantasy VII Rebirth",
    category: "Game",
    status: "Playing",
    rating: 4.8,
    progressLabel: "Chapter 10",
    coverAccent: "from-[#06b6d4] via-[#15314a] to-[#09111d]",
    year: "2024",
  },
  {
    id: "7",
    title: "Blue Lock",
    category: "Anime",
    status: "Watching",
    rating: 4.4,
    progressLabel: "Season 1 rewatch",
    coverAccent: "from-[#38bdf8] via-[#15243d] to-[#09111d]",
    year: "2022",
  },
  {
    id: "8",
    title: "The Boy and the Heron",
    category: "Movie",
    status: "Planned",
    rating: 4.5,
    coverAccent: "from-[#f97316] via-[#4a2618] to-[#120d0b]",
    year: "2023",
  },
  {
    id: "9",
    title: "Persona 3 Reload",
    category: "Game",
    status: "Planned",
    rating: 4.6,
    favorite: true,
    coverAccent: "from-[#60a5fa] via-[#15294b] to-[#08101d]",
    year: "2024",
  },
];

export const dashboardContinueItems: DashboardTrackedItem[] = [
  {
    id: "ct-1",
    title: "Frieren: Beyond Journey's End",
    category: "Anime",
    status: "Episode 22 of 28",
    progressLabel: "78% complete",
    accent: "from-[#8b5cf6]/50 via-[#6d5cff]/15 to-transparent",
    favorite: true,
  },
  {
    id: "ct-2",
    title: "Dune: Part Two",
    category: "Movie",
    status: "Watched 1 time",
    progressLabel: "Review draft saved",
    accent: "from-[#4ea1ff]/45 via-[#1f3d73]/10 to-transparent",
    favorite: true,
  },
  {
    id: "ct-3",
    title: "Hades II",
    category: "Game",
    status: "Run 34 reached",
    progressLabel: "Main arc in progress",
    accent: "from-[#f59e0b]/40 via-[#4a2e0f]/10 to-transparent",
  },
];

export const dashboardRecentReviews: DashboardReview[] = [
  {
    id: "rv-1",
    title: "Frieren: Beyond Journey's End",
    category: "Anime",
    excerpt: "Elegant pacing, quiet emotional payoff, and a world that feels larger every episode.",
    rating: 5,
  },
  {
    id: "rv-2",
    title: "Hades II",
    category: "Game",
    excerpt: "Stylish combat loop with sharp writing and a progression curve that keeps pulling me back.",
    rating: 4,
  },
];

export const detailedLibraryItems: DetailedLibraryItem[] = [
  {
    ...mockLibraryItems[0],
    genres: ["Fantasy", "Adventure", "Drama"],
    synopsis:
      "After the hero's journey ends, Frieren continues forward through a quieter world, measuring time, loss, and memory with every new companion she meets.",
    userReview:
      "This is the kind of series that feels expensive emotionally in the best way. Every pause matters, and the world keeps revealing new weight without needing to shout.",
    userRating: 5,
    progressPercent: 78,
    trackingDetails: "Season 1, Episode 22 of 28",
    metadata: [
      { label: "Episodes", value: "28" },
      { label: "Seasons", value: "1" },
      { label: "Studio", value: "Madhouse" },
      { label: "Release", value: "September 29, 2023" },
    ],
    relatedIds: ["4", "7"],
  },
  {
    ...mockLibraryItems[1],
    genres: ["Sci-Fi", "Epic", "Adventure"],
    synopsis:
      "Paul Atreides steps deeper into prophecy and war, balancing destiny, love, and survival on a world where every decision redraws the future.",
    userReview:
      "Huge, exacting, and strangely intimate for a film at this scale. The visual language is incredible, but what stayed with me was the control in every quiet scene.",
    userRating: 4.8,
    progressPercent: 100,
    trackingDetails: "Completed, review drafted",
    metadata: [
      { label: "Runtime", value: "166 min" },
      { label: "Director", value: "Denis Villeneuve" },
      { label: "Release Date", value: "March 1, 2024" },
      { label: "Format", value: "Feature Film" },
    ],
    relatedIds: ["5", "8"],
  },
  {
    ...mockLibraryItems[2],
    genres: ["Roguelike", "Action", "Mythic Fantasy"],
    synopsis:
      "Melinoe descends through gods, witches, and impossible resistance, turning each failed run into a sharper route through the underworld's chaos.",
    userReview:
      "The combat rhythm is already addictive and the art direction is absurdly polished. It feels like a sequel that understands exactly what made the first game magnetic.",
    userRating: 4.7,
    progressPercent: 64,
    trackingDetails: "Run 34, main arc in progress",
    metadata: [
      { label: "Platform", value: "PC" },
      { label: "Hours Played", value: "31h" },
      { label: "Developer", value: "Supergiant Games" },
      { label: "Access", value: "Early Access" },
    ],
    relatedIds: ["6", "9"],
  },
  {
    ...mockLibraryItems[3],
    genres: ["Action", "Fantasy", "Thriller"],
    synopsis:
      "Jinwoo's rise accelerates in a world ruled by gates, monsters, and a power curve that refuses to stay human for long.",
    userReview:
      "Still planned, but it already feels like the right next adrenaline pick for the anime side of my olYmpos.",
    userRating: 4.3,
    progressPercent: 0,
    trackingDetails: "Planned for next watch cycle",
    metadata: [
      { label: "Episodes", value: "12" },
      { label: "Seasons", value: "1" },
      { label: "Studio", value: "A-1 Pictures" },
      { label: "Release", value: "January 7, 2024" },
    ],
    relatedIds: ["1", "7"],
  },
  {
    ...mockLibraryItems[4],
    genres: ["Animation", "Sci-Fi", "Adventure"],
    synopsis:
      "Miles Morales faces the weight of identity and multiverse expectation in a film that treats movement, color, and emotion like the same language.",
    userReview:
      "It somehow feels handmade and gigantic at once. Even after finishing it, I keep thinking about the motion and how personal the stakes still feel.",
    userRating: 4.9,
    progressPercent: 100,
    trackingDetails: "Completed, marked as favorite",
    metadata: [
      { label: "Runtime", value: "140 min" },
      { label: "Directors", value: "Dos Santos, Powers, Thompson" },
      { label: "Release Date", value: "June 2, 2023" },
      { label: "Format", value: "Animated Feature" },
    ],
    relatedIds: ["2", "8"],
  },
  {
    ...mockLibraryItems[5],
    genres: ["RPG", "Action", "Adventure"],
    synopsis:
      "Cloud and company move across a wider world where memory, identity, and destiny collide with a much larger sense of scale.",
    userReview:
      "The world design is generous and the party chemistry carries so much of the momentum. I'm taking my time with it because it deserves that pace.",
    userRating: 4.8,
    progressPercent: 58,
    trackingDetails: "Chapter 10, side quests active",
    metadata: [
      { label: "Platform", value: "PlayStation 5" },
      { label: "Hours Played", value: "42h" },
      { label: "Developer", value: "Square Enix" },
      { label: "Release", value: "February 29, 2024" },
    ],
    relatedIds: ["3", "9"],
  },
  {
    ...mockLibraryItems[6],
    genres: ["Sports", "Drama", "Competition"],
    synopsis:
      "Strikers are forged through ruthless ego, velocity, and pressure in a football series that treats ambition like a combat system.",
    userReview:
      "Great momentum series for when I want something sharper and more kinetic between slower fantasy episodes.",
    userRating: 4.4,
    progressPercent: 56,
    trackingDetails: "Season 1 rewatch underway",
    metadata: [
      { label: "Episodes", value: "24" },
      { label: "Seasons", value: "1" },
      { label: "Studio", value: "8bit" },
      { label: "Release", value: "October 9, 2022" },
    ],
    relatedIds: ["1", "4"],
  },
  {
    ...mockLibraryItems[7],
    genres: ["Fantasy", "Drama", "Animation"],
    synopsis:
      "Miyazaki returns with a dreamlike coming-of-age tale where grief, imagination, and the afterimage of war shape every turn.",
    userReview:
      "Still on my planned list, mostly because I want the right uninterrupted night for it rather than a rushed watch.",
    userRating: 4.5,
    progressPercent: 0,
    trackingDetails: "Planned for weekend viewing",
    metadata: [
      { label: "Runtime", value: "124 min" },
      { label: "Director", value: "Hayao Miyazaki" },
      { label: "Release Date", value: "December 8, 2023" },
      { label: "Format", value: "Animated Feature" },
    ],
    relatedIds: ["2", "5"],
  },
  {
    ...mockLibraryItems[8],
    genres: ["JRPG", "Social Sim", "Turn-Based"],
    synopsis:
      "A stylish reimagining of a cult RPG where school life, mortality, and supernatural conflict coexist in a striking daily rhythm.",
    userReview:
      "This is next in line when I want a long-form RPG that balances style with structure. Everything about it looks locked in.",
    userRating: 4.6,
    progressPercent: 0,
    trackingDetails: "Planned for next major playthrough",
    metadata: [
      { label: "Platform", value: "PC, PS5, Xbox" },
      { label: "Hours Played", value: "0h" },
      { label: "Developer", value: "ATLUS" },
      { label: "Release", value: "February 2, 2024" },
    ],
    relatedIds: ["3", "6"],
  },
];

export function getDetailedLibraryItem(id: string) {
  return detailedLibraryItems.find((item) => item.id === id);
}
