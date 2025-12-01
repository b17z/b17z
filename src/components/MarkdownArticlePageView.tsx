"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { TerminalFrame } from "./TerminalFrame";
import { MarkdownArticle } from "./MarkdownArticle";
import type { Interest } from "@/config/interests";
import type { PostFrontmatter } from "@/lib/markdown";
import { getSpineColors } from "@/config/spineColors";

interface MarkdownArticlePageViewProps {
  interest: Interest;
  frontmatter: PostFrontmatter;
  mdxContent: ReactNode;
  relatedPosts: { slug: string; title: string }[];
  allInterests: Interest[];
}

export function MarkdownArticlePageView({
  interest,
  frontmatter,
  mdxContent,
  relatedPosts,
  allInterests,
}: MarkdownArticlePageViewProps) {
  const colorScheme = getSpineColors(interest.slug);

  return (
    <div className="fixed inset-0 z-50">
      <TerminalFrame colorScheme={colorScheme} isArticle>
        <div className="flex h-full">
          {/* Collapsed shelf - vertical mini bookshelf on left edge */}
          <nav
            className={`flex-shrink-0 flex flex-col w-12 md:w-14 bg-zinc-950/90 backdrop-blur-sm border-r ${colorScheme.terminalBorder}`}
            aria-label="Section navigation"
          >
            {allInterests.map((item) => {
              const isActive = item.slug === interest.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  aria-label={`${item.title}${isActive ? " (current section)" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex-1 group transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset
                    ${isActive ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
                >
                  {/* Color strip */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${item.color}
                    ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-70"} transition-opacity`}
                    aria-hidden="true"
                  />

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/80" aria-hidden="true" />
                  )}

                  {/* Label */}
                  <div className="relative h-full flex items-center justify-center">
                    <span className="font-bold text-white text-xs tracking-wider writing-vertical">
                      {item.title}
                    </span>
                  </div>

                  {/* Section code - subtle */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-white/30 text-[10px] tracking-wider" aria-hidden="true">
                    {item.code}
                  </div>
                </Link>
              );
            })}

            {/* Close button at bottom */}
            <Link
              href="/"
              aria-label="Return to home page"
              className={`h-14 flex items-center justify-center border-t ${colorScheme.terminalBorder}
                text-zinc-500 hover:text-white ${colorScheme.bgHover} transition-all font-pixel text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset`}
            >
              <span aria-hidden="true">×</span>
            </Link>
          </nav>

          {/* Expanded content area */}
          <main id="main-content" className="flex-1 min-w-0 min-h-0 bg-zinc-950/[0.97]">
            <MarkdownArticle
              interest={interest}
              frontmatter={frontmatter}
              mdxContent={mdxContent}
              relatedPosts={relatedPosts}
              colorScheme={colorScheme}
            />
          </main>
        </div>
      </TerminalFrame>
    </div>
  );
}
