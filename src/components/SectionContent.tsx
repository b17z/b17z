"use client";

import Link from "next/link";
import type { Interest } from "@/config/interests";
import type { SectionContent as SectionContentType } from "@/config/content";
import type { SpineColorScheme } from "@/config/spineColors";

interface SectionContentProps {
  interest: Interest;
  content: SectionContentType;
  colorScheme: SpineColorScheme;
}

export function SectionContent({ interest, content, colorScheme }: SectionContentProps) {
  const theme = colorScheme.customTheme;
  const hasCustomTheme = !!theme;

  // Get the accent color for glow effects
  const accentColor = hasCustomTheme ? theme.accent : colorScheme.accent;

  // Glow intensity levels for different text hierarchies
  const glowStyles = {
    headerStrong: `0 0 20px ${accentColor}80, 0 0 40px ${accentColor}4d, 0 0 60px ${accentColor}26`,
    headerMedium: `0 0 15px ${accentColor}66, 0 0 30px ${accentColor}33`,
    bodySubtle: "0 0 10px rgba(255, 255, 255, 0.1)",
    mutedSubtle: "0 0 8px rgba(255, 255, 255, 0.05)",
  };

  // Theme-aware color palette
  const colors = hasCustomTheme ? {
    tagline: theme.accent,
    headlinePrefix: theme.subhead,
    headline: theme.headline,
    headlineGlow: theme.headlineGlow,
    headlineSuffix: theme.subhead,
    manifesto: theme.body,
    scrollIndicator: theme.muted,
    sectionTitle: theme.headline,
    entriesCount: theme.muted,
    entryDate: theme.muted,
    entryStatus: theme.accent,
    entryStatusBg: `${theme.accent}20`,
    entryTitle: theme.headline,
    entryDesc: theme.body,
    entryReadMore: theme.accent,
    border: theme.border,
    borderSubtle: theme.borderSubtle,
    pullQuote: theme.headline,
    pullQuoteGlow: theme.headlineGlow,
    pullQuoteAuthor: theme.muted,
    statNumber: theme.accent,
    statLabel: theme.muted,
    codeWatermark: `${theme.headline}08`,
    escBorder: theme.border,
    escText: theme.muted,
    escHoverText: theme.headline,
  } : {
    // Default dark theme fallback colors
    tagline: colorScheme.accent,
    headlinePrefix: "#71717a",
    headline: "#ffffff",
    headlineGlow: `${colorScheme.accent}66`,
    headlineSuffix: "#a1a1aa",
    manifesto: "#a1a1aa",
    scrollIndicator: "#52525b",
    sectionTitle: "#ffffff",
    entriesCount: "#52525b",
    entryDate: "#71717a",
    entryStatus: colorScheme.accent,
    entryStatusBg: "rgba(255,255,255,0.05)",
    entryTitle: "#ffffff",
    entryDesc: "#71717a",
    entryReadMore: colorScheme.accent,
    border: `${colorScheme.accent}4d`,
    borderSubtle: "#27272a50",
    pullQuote: "#ffffff",
    pullQuoteGlow: `${colorScheme.accent}66`,
    pullQuoteAuthor: "#71717a",
    statNumber: colorScheme.accent,
    statLabel: "#52525b",
    codeWatermark: "rgba(255,255,255,0.02)",
    escBorder: "#27272a",
    escText: "#71717a",
    escHoverText: "#ffffff",
  };

  // Scrollbar styling
  const scrollbarColor = hasCustomTheme ? theme.accent : colorScheme.accent;
  const scrollbarHover = hasCustomTheme ? theme.accentHover : colorScheme.accent;

  return (
    <div
      className="h-full overflow-y-auto custom-scrollbar"
      style={{
        "--scrollbar-color": scrollbarColor,
        "--scrollbar-hover": scrollbarHover,
      } as React.CSSProperties}
    >
      {/* Hero Section - Magazine Cover Feel */}
      <div className="relative min-h-screen flex flex-col justify-between p-8 md:p-16">
        {/* Top bar - integrated nav */}
        <div className="flex items-start justify-between">
          {/* Section identifier */}
          <div className="flex items-center gap-4">
            <span
              className="font-pixel text-sm tracking-[0.3em]"
              style={{ color: colors.tagline }}
            >
              {interest.subtitle.toUpperCase()}
            </span>
            <span style={{ color: colors.scrollIndicator }} className="font-pixel">—</span>
            <span style={{ color: colors.scrollIndicator }} className="font-pixel text-sm">SECTOR.17</span>
          </div>

          {/* Close */}
          <Link
            href="/"
            aria-label="Return to home page (ESC)"
            className="font-pixel transition-colors text-sm tracking-wider px-4 py-2 border rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            style={{
              borderColor: colors.escBorder,
              color: colors.escText,
              // @ts-expect-error CSS custom property for focus ring
              "--tw-ring-color": accentColor,
            }}
          >
            ESC
          </Link>
        </div>

        {/* Main headline area - dramatic positioning */}
        <div className="flex-1 flex flex-col justify-center py-16">
          {/* Tagline - medium glow */}
          <p
            className="font-pixel text-sm md:text-base tracking-[0.4em] mb-8"
            style={{ color: colors.tagline, textShadow: glowStyles.headerMedium }}
          >
            {content.tagline}
          </p>

          {/* Giant headline with mixed weights */}
          <h1 className="editorial-headline mb-12">
            <span
              className="block text-2xl md:text-4xl font-light tracking-[0.2em] mb-2"
              style={{ color: colors.headlinePrefix, textShadow: glowStyles.bodySubtle }}
            >
              {content.headline.prefix}
            </span>
            <span
              className="block text-6xl md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter leading-[0.85]"
              style={{
                color: colors.headline,
                textShadow: glowStyles.headerStrong
              }}
            >
              {content.headline.main}
            </span>
            <span
              className="block text-xl md:text-3xl font-light tracking-[0.3em] mt-4"
              style={{ color: colors.headlineSuffix, textShadow: glowStyles.bodySubtle }}
            >
              {content.headline.suffix}
            </span>
          </h1>

          {/* Section code - massive background accent */}
          <div
            className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 font-mono text-[12rem] md:text-[20rem] select-none pointer-events-none leading-none tracking-widest"
            style={{ color: colors.codeWatermark }}
            aria-hidden="true"
          >
            {interest.code}
          </div>
        </div>

        {/* Manifesto text - bottom of hero - subtle body glow */}
        <div className="max-w-2xl">
          <p
            className="font-mono text-sm md:text-base leading-relaxed"
            style={{ color: colors.manifesto, textShadow: glowStyles.bodySubtle }}
          >
            {content.manifesto}
          </p>
        </div>

      </div>

      {/* Scroll indicator - sticky to bottom of viewport */}
      <div className="sticky bottom-4 left-0 right-0 flex justify-center pointer-events-none z-20 -mt-16" aria-hidden="true">
        <div className="flex flex-col items-center gap-2" style={{ color: colors.scrollIndicator }}>
          <span className="font-pixel text-xs tracking-wider">SCROLL</span>
          <div
            className="w-px h-6"
            style={{ background: `linear-gradient(to bottom, ${colors.scrollIndicator}, transparent)` }}
          />
        </div>
      </div>

      {/* Content Section - Editorial Grid */}
      <div
        className="px-8 md:px-16 py-16 border-t"
        style={{ borderColor: colors.borderSubtle }}
      >
        {/* Section header - strong glow on title */}
        <div className="flex items-baseline gap-4 mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: colors.sectionTitle, textShadow: glowStyles.headerStrong }}
          >
            ARCHIVE
          </h2>
          <span
            className="font-pixel tracking-wider"
            style={{ color: colors.entriesCount, textShadow: glowStyles.mutedSubtle }}
          >
            {content.entries.length} ENTRIES
          </span>
        </div>

        {/* Entries - asymmetric grid with links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12" role="list">
          {content.entries.map((entry, index) => (
            <Link
              key={entry.slug}
              href={`/${interest.slug}/${entry.slug}`}
              className={`group block ${index === 0 ? "lg:col-span-7" : "lg:col-span-5"} border-l-2 pl-6 py-4 transition-all duration-300 hover:border-l-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950 rounded-sm`}
              style={{ borderColor: colors.border, "--tw-ring-color": accentColor } as React.CSSProperties}
              role="listitem"
            >
              {/* Meta line */}
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="font-pixel text-xs"
                  style={{ color: colors.entryDate, textShadow: glowStyles.mutedSubtle }}
                >
                  {entry.date}
                </span>
                <span
                  className="font-pixel text-xs px-2 py-0.5 rounded"
                  style={{ color: colors.entryStatus, backgroundColor: colors.entryStatusBg, textShadow: glowStyles.headerMedium }}
                >
                  {entry.status}
                </span>
              </div>

              {/* Title - medium glow */}
              <h3
                className="text-xl md:text-2xl font-bold mb-3 tracking-tight transition-colors"
                style={{ color: colors.entryTitle, textShadow: glowStyles.headerMedium }}
              >
                {entry.title}
              </h3>

              {/* Description - subtle body glow */}
              <p
                className="font-mono text-sm leading-relaxed"
                style={{ color: colors.entryDesc, textShadow: glowStyles.bodySubtle }}
              >
                {entry.desc}
              </p>

              {/* Read more indicator */}
              <div
                className="mt-4 font-pixel text-xs opacity-0 group-hover:opacity-100 transition-opacity tracking-wider"
                style={{ color: colors.entryReadMore, textShadow: glowStyles.headerMedium }}
              >
                READ ENTRY →
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pull Quote Section - Full width drama - strong glow */}
      <div
        className="px-8 md:px-16 py-24 border-t border-b"
        style={{
          borderColor: colors.border,
          backgroundColor: hasCustomTheme ? `${theme.containerBg}80` : "rgba(255,255,255,0.01)"
        }}
      >
        <blockquote className="max-w-4xl mx-auto text-center">
          <p
            className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
            style={{
              color: colors.pullQuote,
              textShadow: glowStyles.headerStrong
            }}
          >
            &ldquo;{content.pullQuote.text}&rdquo;
          </p>
          <cite
            className="block mt-8 font-pixel text-sm tracking-[0.3em] not-italic"
            style={{ color: colors.pullQuoteAuthor, textShadow: glowStyles.mutedSubtle }}
          >
            — {content.pullQuote.author}
          </cite>
        </blockquote>
      </div>

      {/* Footer Stats - strong glow on numbers */}
      <div className="px-8 md:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div
              className="font-pixel text-4xl md:text-5xl"
              style={{ color: colors.statNumber, textShadow: glowStyles.headerStrong }}
            >
              {content.entries.length}
            </div>
            <div
              className="font-pixel text-xs tracking-wider mt-2"
              style={{ color: colors.statLabel, textShadow: glowStyles.mutedSubtle }}
            >
              ENTRIES
            </div>
          </div>
          <div>
            <div
              className="font-pixel text-4xl md:text-5xl"
              style={{ color: colors.statNumber, textShadow: glowStyles.headerStrong }}
            >
              ∞
            </div>
            <div
              className="font-pixel text-xs tracking-wider mt-2"
              style={{ color: colors.statLabel, textShadow: glowStyles.mutedSubtle }}
            >
              ONGOING
            </div>
          </div>
          <div>
            <div
              className="font-pixel text-4xl md:text-5xl"
              style={{ color: colors.statNumber, textShadow: glowStyles.headerStrong }}
            >
              17
            </div>
            <div
              className="font-pixel text-xs tracking-wider mt-2"
              style={{ color: colors.statLabel, textShadow: glowStyles.mutedSubtle }}
            >
              SECTOR
            </div>
          </div>
          <div>
            <div
              className="font-pixel text-4xl md:text-5xl"
              style={{ color: colors.statNumber, textShadow: glowStyles.headerStrong }}
            >
              25
            </div>
            <div
              className="font-pixel text-xs tracking-wider mt-2"
              style={{ color: colors.statLabel, textShadow: glowStyles.mutedSubtle }}
            >
              YEAR
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
