import type { MediaCategory } from "@/types";

export type CategoryTone = {
  text: string;
  border: string;
  borderStrong: string;
  badge: string;
  icon: string;
  fill: string;
  panel: string;
  progress: string;
  glow: string;
};

export function getCategoryTone(category: MediaCategory): CategoryTone {
  if (category === "anime") {
    return {
      text: "text-[#f0abfc]",
      border: "border-[#c026d3]/24",
      borderStrong: "border-[#c026d3]/44",
      badge: "border-[#c026d3]/45 bg-[#c026d3]/18 text-[#f0abfc]",
      icon: "bg-[#c026d3]/18 text-[#f0abfc]",
      fill: "bg-[#c026d3]",
      panel: "border-[#c026d3]/24 shadow-[0_24px_80px_rgba(192,38,211,0.08)]",
      progress: "bg-[linear-gradient(90deg,#c026d3,#8b5cf6)]",
      glow: "shadow-[0_0_42px_rgba(192,38,211,0.12)]",
    };
  }

  if (category === "game") {
    return {
      text: "text-[#93c5fd]",
      border: "border-[#3b82f6]/24",
      borderStrong: "border-[#3b82f6]/44",
      badge: "border-[#3b82f6]/45 bg-[#3b82f6]/18 text-[#93c5fd]",
      icon: "bg-[#3b82f6]/18 text-[#93c5fd]",
      fill: "bg-[#3b82f6]",
      panel: "border-[#3b82f6]/24 shadow-[0_24px_80px_rgba(59,130,246,0.08)]",
      progress: "bg-[linear-gradient(90deg,#3b82f6,#2563eb)]",
      glow: "shadow-[0_0_42px_rgba(59,130,246,0.11)]",
    };
  }

  return {
    text: "text-[#c4b5fd]",
    border: "border-[#8b5cf6]/24",
    borderStrong: "border-[#8b5cf6]/44",
    badge: "border-[#8b5cf6]/45 bg-[#8b5cf6]/20 text-[#c4b5fd]",
    icon: "bg-[#8b5cf6]/18 text-[#c4b5fd]",
    fill: "bg-[#8b5cf6]",
    panel: "border-[#8b5cf6]/24 shadow-[0_24px_80px_rgba(139,92,246,0.08)]",
    progress: "bg-[linear-gradient(90deg,#8b5cf6,#6366f1)]",
    glow: "shadow-[0_0_42px_rgba(139,92,246,0.12)]",
  };
}
