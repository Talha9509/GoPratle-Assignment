/**
 * Returns Tailwind class strings for a given event category badge.
 * Category keys match the DB values: "planner" | "performer" | "crew"
 */
export type CategoryKey = "planner" | "performer" | "crew";

interface BadgeClasses {
  bg: string;
  text: string;
}

const categoryMap: Record<CategoryKey, BadgeClasses> = {
  planner:   { bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  performer: { bg: "bg-[#fce4ec]", text: "text-[#880e4f]" },
  crew:      { bg: "bg-[#e8f5e9]", text: "text-[#1b5e20]" },
};

const fallback: BadgeClasses = { bg: "bg-gray-100", text: "text-gray-700" };

/**
 * Returns the Tailwind bg + text class strings for a given category key.
 */
export function getCategoryClasses(cat: string): BadgeClasses {
  return categoryMap[cat as CategoryKey] ?? fallback;
}

/**
 * Returns a human-readable label for a category key.
 */
export function getCategoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    planner:   "Event Planner",
    performer: "Performer",
    crew:      "Crew",
  };
  return labels[cat] ?? cat;
}
