/** Represents a content interest/section category. */
export interface Interest {
  /** Display title (uppercase). */
  title: string;
  /** URL-safe slug identifier. */
  slug: string;
  /** Short description of the section. */
  subtitle: string;
  /** Tailwind gradient classes for the section color. */
  color: string;
  /** Numeric section code for decorative display. */
  code: string;
}

/** Available content sections. */
export const interests: Interest[] = [
  { title: "BUILD", slug: "build", subtitle: "tech & tools", color: "from-purple-600 to-violet-900", code: "001" },
  { title: "TASTE", slug: "taste", subtitle: "food & lifestyle", color: "from-amber-600 to-orange-900", code: "002" },
  { title: "READ", slug: "read", subtitle: "books & notes", color: "from-cyan-600 to-blue-900", code: "003" },
  { title: "HOST", slug: "host", subtitle: "events & people", color: "from-pink-600 to-rose-900", code: "004" },
];

/** Finds an interest by its slug identifier. */
export function getInterestBySlug(slug: string): Interest | undefined {
  return interests.find((i) => i.slug === slug);
}
