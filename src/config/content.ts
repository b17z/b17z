/** Represents an article entry in a section. */
export interface Entry {
  /** Display title of the entry. */
  title: string;
  /** URL-safe slug identifier. */
  slug: string;
  /** Short description or subtitle. */
  desc: string;
  /** Formatted date string (DD.MMM.YYYY). */
  date: string;
  /** Publication status (e.g., "ACTIVE", "DRAFT"). */
  status: string;
  /** True if entry is from markdown content. */
  isMarkdown?: boolean;
}

/** Content configuration for a section page. */
export interface SectionContent {
  /** Short tagline displayed above the headline. */
  tagline: string;
  /** Three-part headline structure. */
  headline: { prefix: string; main: string; suffix: string };
  /** Section description or mission statement. */
  manifesto: string;
  /** List of article entries. */
  entries: Entry[];
  /** Featured quote with attribution. */
  pullQuote: { text: string; author: string };
}

/** Section content configurations keyed by section slug. */
export const sectionContent: Record<string, SectionContent> = {
  build: {
    tagline: "SHIPPING IS A FEATURE",
    headline: { prefix: "THE", main: "BUILD", suffix: "LOG" },
    manifesto: "Tech, crypto, AI, code. Things I build, break, and occasionally ship.",
    entries: [],
    pullQuote: { text: "TALK IS CHEAP. SHOW ME THE CODE.", author: "LINUS TORVALDS" },
  },
  taste: {
    tagline: "ACQUIRED TASTE",
    headline: { prefix: "ACQUIRED", main: "TASTE", suffix: "& LIFESTYLE" },
    manifesto: "Food, fashion, aesthetics. The art of living well.",
    entries: [],
    pullQuote: { text: "LIFE IS TOO SHORT FOR BAD FOOD.", author: "ANONYMOUS" },
  },
  read: {
    tagline: "DOWN THE RABBIT HOLE",
    headline: { prefix: "THE", main: "READ", suffix: "ING LIST" },
    manifesto: "Books, notes, highlights. What I'm learning and thinking about.",
    entries: [],
    pullQuote: { text: "I CANNOT REMEMBER THE BOOKS I'VE READ ANY MORE THAN THE MEALS I HAVE EATEN; EVEN SO, THEY HAVE MADE ME.", author: "EMERSON" },
  },
  host: {
    tagline: "COME THROUGH",
    headline: { prefix: "THE", main: "HOST", suffix: "FILES" },
    manifesto: "Events, supper clubs, gatherings. Getting people in the same room.",
    entries: [],
    pullQuote: { text: "THE MORE THE MERRIER.", author: "PROVERB" },
  },
};

