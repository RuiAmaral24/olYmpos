import { getCategoryTone, type CategoryTone } from "@/lib/category-tones";

export function getDetailsTone(): CategoryTone {
  return getCategoryTone("movie");
}
