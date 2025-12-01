import React from "react";
import type { MDXComponents } from "mdx/types";

// Custom MDX components for rendering markdown content
export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6 tracking-tight" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4 tracking-tight" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl md:text-2xl font-bold text-white mt-8 mb-3 tracking-tight" {...props} />
  ),
  p: (props) => (
    <p className="text-zinc-400 font-mono text-sm md:text-base leading-relaxed mb-6" {...props} />
  ),
  a: (props) => (
    <a className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors" {...props} />
  ),
  ul: (props) => (
    <ul className="text-zinc-400 font-mono text-sm md:text-base mb-6 ml-4 space-y-2 list-disc list-outside" {...props} />
  ),
  ol: (props) => (
    <ol className="text-zinc-400 font-mono text-sm md:text-base mb-6 ml-4 space-y-2 list-decimal list-outside" {...props} />
  ),
  li: (props) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="my-8 py-6 px-6 border-l-4 border-purple-500/30 bg-purple-500/5 text-zinc-300 italic" {...props} />
  ),
  pre: (props) => (
    <pre className="my-6 p-4 bg-zinc-900/80 border border-purple-500/20 rounded-lg overflow-x-auto" {...props} />
  ),
  code: ({ className, children, ...props }) => {
    // Inline code vs code blocks
    const isInline = !className;
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 bg-zinc-800 text-purple-300 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="font-mono text-sm text-zinc-300" {...props}>
        {children}
      </code>
    );
  },
  table: (props) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border border-purple-500/20 text-sm" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead className="bg-purple-500/10" {...props} />
  ),
  th: (props) => (
    <th className="px-4 py-3 text-left font-mono text-purple-400 border-b border-purple-500/20" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-3 text-zinc-400 font-mono border-b border-zinc-800/50" {...props} />
  ),
  hr: () => (
    <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
  ),
  strong: (props) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  em: (props) => (
    <em className="text-zinc-300" {...props} />
  ),
};
