/**
 * Color scheme interface for section theming.
 * Each section (build, taste, read, host) has its own color palette.
 *
 * CSS Variable References (defined in globals.css):
 * - --color-accent-violet: #8b5cf6 (BUILD)
 * - --color-accent-amber: #fbbf24 (TASTE)
 * - --color-accent-cyan: #06b6d4 (READ)
 * - --color-accent-pink: #ec4899 (HOST)
 */
export interface SpineColorScheme {
  /** Primary accent color as hex value */
  accent: string;

  /** Tailwind text color class */
  text: string;
  /** Tailwind hover text color class */
  textHover: string;

  /** Tailwind border color class */
  border: string;
  /** Tailwind border glow color class */
  borderGlow: string;

  /** Tailwind background color class */
  bg: string;
  /** Tailwind hover background color class */
  bgHover: string;

  /** Tailwind box-shadow color class */
  glow: string;

  /** Terminal chrome border class */
  terminalBorder: string;
  /** Terminal chrome glow class */
  terminalGlow: string;

  /** Gradient start color class */
  gradientFrom: string;
  /** Gradient end color class */
  gradientTo: string;

  /** Custom theme overrides for radically different palettes */
  customTheme?: {
    /** Main page background color */
    pageBg: string;
    /** Terminal container background */
    containerBg: string;
    /** Content area background */
    contentBg: string;
    /** Main headline text color */
    headline: string;
    /** Headline glow color (rgba format) */
    headlineGlow: string;
    /** Subhead text color */
    subhead: string;
    /** Body text color */
    body: string;
    /** Muted/secondary text color */
    muted: string;
    /** Accent color for links, tags, badges */
    accent: string;
    /** Accent hover state color */
    accentHover: string;
    /** Primary border color */
    border: string;
    /** Subtle border color */
    borderSubtle: string;
  };
}

export const spineColors: Record<string, SpineColorScheme> = {
  build: {
    accent: "#8B5CF6",
    text: "text-violet-400",
    textHover: "hover:text-violet-300",
    border: "border-violet-500/30",
    borderGlow: "border-violet-500/50",
    bg: "bg-violet-500/5",
    bgHover: "hover:bg-violet-500/10",
    glow: "shadow-violet-500/50",
    terminalBorder: "border-violet-900/30",
    terminalGlow: "shadow-violet-500/20",
    gradientFrom: "from-violet-600",
    gradientTo: "to-purple-900",
  },
  taste: {
    accent: "#FBBF24",
    text: "text-amber-400",
    textHover: "hover:text-amber-300",
    border: "border-amber-500/30",
    borderGlow: "border-amber-500/50",
    bg: "bg-amber-500/5",
    bgHover: "hover:bg-amber-500/10",
    glow: "shadow-amber-500/50",
    terminalBorder: "border-amber-900/30",
    terminalGlow: "shadow-amber-500/20",
    gradientFrom: "from-amber-600",
    gradientTo: "to-orange-900",
    // Warm burgundy theme for TASTE
    customTheme: {
      pageBg: "#7f1d1d",           // Deep crimson
      containerBg: "#450a0a",      // Darker burgundy
      contentBg: "#5c1515",        // Mid burgundy
      headline: "#ffffff",          // White
      headlineGlow: "rgba(255,255,255,0.4)",
      subhead: "#fef3c7",          // Cream
      body: "#fefce8",             // Light cream
      muted: "#fcd34d",            // Muted gold
      accent: "#fbbf24",           // Gold/amber
      accentHover: "#fcd34d",      // Lighter gold
      border: "#92400e",           // Warm brown/gold border
      borderSubtle: "#78350f",     // Darker brown
    },
  },
  read: {
    accent: "#06B6D4",
    text: "text-cyan-400",
    textHover: "hover:text-cyan-300",
    border: "border-cyan-500/30",
    borderGlow: "border-cyan-500/50",
    bg: "bg-cyan-500/5",
    bgHover: "hover:bg-cyan-500/10",
    glow: "shadow-cyan-500/50",
    terminalBorder: "border-cyan-900/30",
    terminalGlow: "shadow-cyan-500/20",
    gradientFrom: "from-cyan-600",
    gradientTo: "to-blue-900",
    // Cool teal theme for READ - library, focus, calm
    customTheme: {
      pageBg: "#0f4c5c",           // Deep teal
      containerBg: "#0a3641",      // Darker teal
      contentBg: "#134e5e",        // Mid teal
      headline: "#ffffff",          // White
      headlineGlow: "rgba(6,182,212,0.5)",
      subhead: "#cffafe",          // Cyan-50
      body: "#e0f2fe",             // Light cyan
      muted: "#67e8f9",            // Cyan-300
      accent: "#06b6d4",           // Cyan-500
      accentHover: "#22d3ee",      // Cyan-400
      border: "#0e7490",           // Cyan-700
      borderSubtle: "#155e75",     // Cyan-800
    },
  },
  host: {
    accent: "#EC4899",
    text: "text-pink-400",
    textHover: "hover:text-pink-300",
    border: "border-pink-500/30",
    borderGlow: "border-pink-500/50",
    bg: "bg-pink-500/5",
    bgHover: "hover:bg-pink-500/10",
    glow: "shadow-pink-500/50",
    terminalBorder: "border-pink-900/30",
    terminalGlow: "shadow-pink-500/20",
    gradientFrom: "from-pink-600",
    gradientTo: "to-rose-900",
    // Vibrant magenta theme for HOST - party, event, energy
    customTheme: {
      pageBg: "#831843",           // Deep magenta/pink
      containerBg: "#5c1033",      // Darker magenta
      contentBg: "#9d174d",        // Mid magenta
      headline: "#ffffff",          // White
      headlineGlow: "rgba(236,72,153,0.5)",
      subhead: "#fce7f3",          // Pink-100
      body: "#fbcfe8",             // Pink-200
      muted: "#f9a8d4",            // Pink-300
      accent: "#ec4899",           // Pink-500
      accentHover: "#f472b6",      // Pink-400
      border: "#be185d",           // Pink-700
      borderSubtle: "#9d174d",     // Pink-800
    },
  },
};

// Default fallback (purple/violet)
export const defaultSpineColor: SpineColorScheme = spineColors.build;

export function getSpineColors(slug: string): SpineColorScheme {
  return spineColors[slug] || defaultSpineColor;
}
