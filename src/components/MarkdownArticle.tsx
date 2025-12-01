"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import type { Interest } from "@/config/interests";
import type { PostFrontmatter } from "@/lib/markdown";
import type { SpineColorScheme } from "@/config/spineColors";

interface MarkdownArticleProps {
  interest: Interest;
  frontmatter: PostFrontmatter;
  mdxContent: ReactNode;
  relatedPosts: { slug: string; title: string }[];
  colorScheme: SpineColorScheme;
}

export function MarkdownArticle({ interest, frontmatter, mdxContent, relatedPosts, colorScheme }: MarkdownArticleProps) {
  const textClass = colorScheme.text;
  const borderClass = colorScheme.border;
  const bgClass = colorScheme.bg;
  const accent = colorScheme.accent;

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-zinc-950/95">
      {/* Article Header */}
      <header className="sticky top-0 z-20 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/50">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          {/* Back button */}
          <Link
            href={`/${interest.slug}`}
            className="flex items-center gap-2 font-pixel text-zinc-500 hover:text-white transition-colors text-sm tracking-wider"
          >
            <span className="text-lg">←</span>
            <span>ARCHIVE</span>
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs font-pixel">
            <span className="text-zinc-500">{frontmatter.date}</span>
            <span className={`px-2 py-0.5 rounded ${textClass} ${bgClass}`}>
              {frontmatter.status.toUpperCase()}
            </span>
            <span className="text-zinc-600">{frontmatter.readingTime} MIN READ</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative px-6 md:px-12 lg:px-24 pt-16 pb-24 border-b border-zinc-800/50">
        {/* Category tag */}
        <div className={`font-pixel text-sm tracking-[0.4em] mb-6 ${textClass}`}>
          {interest.title}
        </div>

        {/* Massive headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[0.9] text-white mb-8"
          style={{ textShadow: `0 0 40px ${accent}66, 0 0 80px ${accent}33, 0 0 120px ${accent}1a` }}
        >
          {frontmatter.title.toUpperCase()}
        </h1>

        {/* Subhead */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.1em] text-zinc-400 mb-12 max-w-4xl uppercase">
          {frontmatter.subtitle}
        </h2>

        {/* Decorative line */}
        <div
          className="mt-8 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${accent}4d, transparent)` }}
        />
      </div>

      {/* Main Content - Newspaper Grid */}
      <article className="px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Main content column */}
          <div className="lg:col-span-8">
            <div className="prose-custom markdown-content">
              <ErrorBoundary
                fallback={
                  <div className="p-8 bg-red-950/20 border border-red-500/30 rounded-lg">
                    <div className="font-pixel text-red-400 text-sm tracking-wider mb-2">
                      RENDER ERROR
                    </div>
                    <p className="text-zinc-400 font-mono text-sm">
                      Failed to render article content. The markdown may contain invalid syntax.
                    </p>
                  </div>
                }
              >
                {mdxContent}
              </ErrorBoundary>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Tags */}
              <div className={`p-6 border ${borderClass} rounded-lg`}>
                <div className="font-pixel text-xs text-zinc-500 tracking-[0.3em] mb-4">TAGS</div>
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag, i) => (
                    <span key={i} className={`font-pixel text-xs px-3 py-1.5 rounded ${bgClass} ${textClass}`}>
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related */}
              {relatedPosts.length > 0 && (
                <div className={`p-6 border ${borderClass} rounded-lg`}>
                  <div className="font-pixel text-xs text-zinc-500 tracking-[0.3em] mb-4">RELATED ENTRIES</div>
                  <div className="space-y-3">
                    {relatedPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/${interest.slug}/${post.slug}`}
                        className="group block"
                      >
                        <div className={`text-white font-bold group-hover:${textClass} transition-colors`}>
                          {post.title}
                        </div>
                        <div className="font-pixel text-xs text-zinc-600">{interest.title}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Data readout */}
              <div className={`p-6 border ${borderClass} rounded-lg bg-zinc-900/30`}>
                <div className="font-pixel text-xs text-zinc-500 tracking-[0.3em] mb-4">METADATA</div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">SECTOR</span>
                    <span className={textClass}>17</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">CLEARANCE</span>
                    <span className={textClass}>PUBLIC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">READING TIME</span>
                    <span className={textClass}>{frontmatter.readingTime} MIN</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Article Footer */}
      <footer className={`px-6 md:px-12 lg:px-24 py-16 border-t ${borderClass}`}>
        <div className="flex items-center justify-between">
          <Link
            href={`/${interest.slug}`}
            className={`font-pixel text-sm tracking-wider ${textClass} hover:text-white transition-colors`}
          >
            ← BACK TO ARCHIVE
          </Link>
          <div className="font-pixel text-xs text-zinc-600 tracking-wider">
            END TRANSMISSION
          </div>
        </div>
      </footer>
    </div>
  );
}
