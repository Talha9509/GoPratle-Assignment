/**
 * Returns Tailwind class strings for a given event category badge.
 * Using arbitrary-value Tailwind classes so no inline styles are needed.
 */
export type CategoryKey = "Event Planner" | "Performer" | "Crew";

interface BadgeClasses {
  bg: string;
  text: string;
}

const categoryMap: Record<CategoryKey, BadgeClasses> = {
  "Event Planner": { bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  Performer:       { bg: "bg-[#fce4ec]", text: "text-[#880e4f]" },
  Crew:            { bg: "bg-[#e8f5e9]", text: "text-[#1b5e20]" },
};

const fallback: BadgeClasses = { bg: "bg-gray-100", text: "text-gray-700" };

/**
 * Returns the Tailwind bg + text class strings for a given category.
 */
export function getCategoryClasses(cat: string): BadgeClasses {
  return categoryMap[cat as CategoryKey] ?? fallback;
}

