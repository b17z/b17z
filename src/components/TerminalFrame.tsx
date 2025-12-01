"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { backgroundConfig } from "@/config/background";
import type { SpineColorScheme } from "@/config/spineColors";
import { defaultSpineColor } from "@/config/spineColors";

interface TerminalFrameProps {
  children: React.ReactNode;
  colorScheme?: SpineColorScheme;
  /** When true, increases opacity for better reading focus */
  isArticle?: boolean;
  /** Custom theme overrides for section-specific palettes */
  customTheme?: SpineColorScheme["customTheme"];
}

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${day}.${month}.${year} // ${hours}:${minutes}:${seconds}`;
}

export function TerminalFrame({ children, colorScheme, isArticle = false, customTheme }: TerminalFrameProps) {
  const [time, setTime] = useState<string>(() => formatDate(new Date()));
  const [mounted, setMounted] = useState(false);
  const colors = colorScheme || defaultSpineColor;
  const hasCustomTheme = !!customTheme;

  useEffect(() => {
    // Defer state update to avoid synchronous setState warning
    queueMicrotask(() => setMounted(true));
    const interval = setInterval(() => {
      setTime(formatDate(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Opacity levels vary by page type for reading focus
  const darkOverlay = isArticle ? "bg-black/80" : "bg-black/40";
  const containerOpacity = isArticle ? "bg-[#050508]/[0.92]" : "bg-[#050508]/[0.30]";
  const contentOpacity = isArticle ? "bg-zinc-950/[0.95]" : "bg-zinc-950/[0.40]";

  // Terminal glow effect
  const terminalGlow = hasCustomTheme ? `0 0 40px ${customTheme.accent}30` : `0 0 40px ${colors.accent}15`;

  return (
    <div className="h-screen relative">
      {/* Background image layer - always visible (same café everywhere) */}
      <Image
        src={backgroundConfig.image}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={75}
      />
      {/* Dark overlay - varies by page type */}
      <div className={`absolute inset-0 ${darkOverlay}`} aria-hidden="true" />

      {/* Terminal container with translucency */}
      <div className={`relative h-full ${containerOpacity} backdrop-blur-sm p-2 md:p-4 flex flex-col`}>
        {/* Terminal window - custom themes apply HERE (inside the terminal) */}
        <div
          className={`relative flex-1 min-h-0 rounded-xl border crt-curve flex flex-col backdrop-blur-md ${hasCustomTheme ? '' : contentOpacity}`}
          style={{
            borderColor: hasCustomTheme ? customTheme.border : undefined,
            backgroundColor: hasCustomTheme ? `${customTheme.contentBg}73` : undefined, // ~45% opacity for translucency
            boxShadow: `${terminalGlow}, inset 0 1px 0 rgba(255,255,255,0.03)`
          }}
        >
          {/* Title bar */}
          <div
            className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b"
            style={{ borderColor: hasCustomTheme ? customTheme.borderSubtle : undefined }}
            role="banner"
          >
            {/* Window controls - decorative */}
            <div className="flex items-center gap-2" aria-hidden="true">
              <div className="terminal-button bg-red-500/80" />
              <div className="terminal-button bg-yellow-500/80" />
              <div className="terminal-button bg-green-500/80" />
            </div>

            {/* Title */}
            <div
              className="absolute left-1/2 -translate-x-1/2 font-pixel text-lg tracking-wider"
              style={{ color: hasCustomTheme ? customTheme.accent : undefined }}
            >
              b17z://home
            </div>

            {/* Status */}
            <div className="flex items-center gap-4 text-xs font-mono" role="status" aria-live="polite">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 status-pulse" style={{ color: "#4ade80" }} aria-hidden="true" />
                <span className="text-green-400/80 hidden sm:inline">SYSTEM: ONLINE</span>
              </div>
              <time
                className="hidden md:inline font-pixel"
                style={{ color: hasCustomTheme ? customTheme.muted : "#71717a" }}
                aria-label="Current time"
              >
                {mounted ? time : ""}
              </time>
            </div>
          </div>

          {/* Content area - this is the scrollable region */}
          <div className="relative flex-1 min-h-0 crt-vignette">
            {children}
          </div>

          {/* Bottom status bar */}
          <div
            className="flex-shrink-0 flex items-center justify-between px-4 py-1.5 border-t text-xs font-pixel"
            style={{ borderColor: hasCustomTheme ? customTheme.borderSubtle : undefined }}
          >
            <div className="flex items-center gap-4">
              <span style={{ color: hasCustomTheme ? `${customTheme.accent}99` : undefined }} className={hasCustomTheme ? "" : `${colors.text} opacity-60`}>MEM: 64KB FREE</span>
              <span className="text-blue-400/60 hidden sm:inline">NET: CONNECTED</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-cyan-400/60 hidden sm:inline">SECTOR: 17</span>
              <span style={{ color: hasCustomTheme ? customTheme.muted : "#71717a" }}>v0.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
