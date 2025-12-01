import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { MarkdownArticlePageView } from "@/components/MarkdownArticlePageView";
import { interests, getInterestBySlug } from "@/config/interests";
import { getPostBySlug, getPostSlugs, getPostsBySection } from "@/lib/markdown";
import { mdxComponents } from "@/lib/mdx-components";

interface PageProps {
  params: Promise<{ section: string; article: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section, article } = await params;
  const interest = getInterestBySlug(section);
  const post = getPostBySlug(section, article);

  if (!interest || !post) {
    return {
      title: "Article Not Found | b17z",
    };
  }

  const title = `${post.frontmatter.title} | ${interest.title} | b17z`;
  const description = post.frontmatter.subtitle;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: ["b17z"],
      tags: post.frontmatter.tags,
      siteName: "b17z",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    other: {
      "article:section": interest.title,
      "article:tag": post.frontmatter.tags.join(", "),
    },
  };
}

export function generateStaticParams() {
  const params: { section: string; article: string }[] = [];

  for (const interest of interests) {
    const markdownSlugs = getPostSlugs(interest.slug);
    for (const slug of markdownSlugs) {
      params.push({
        section: interest.slug,
        article: slug,
      });
    }
  }

  return params;
}

export default async function ArticlePage({ params }: PageProps) {
  const { section, article } = await params;
  const interest = getInterestBySlug(section);

  if (!interest) {
    notFound();
  }

  const post = getPostBySlug(section, article);

  if (!post) {
    notFound();
  }

  // Compile the MDX content using RSC-compatible method
  const { content: mdxContent } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
    components: mdxComponents,
  });

  // Get related posts from the same section
  const allPosts = getPostsBySection(section);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== article)
    .slice(0, 2)
    .map((p) => ({ slug: p.slug, title: p.frontmatter.title }));

  return (
    <MarkdownArticlePageView
      interest={interest}
      frontmatter={post.frontmatter}
      mdxContent={mdxContent}
      relatedPosts={relatedPosts}
      allInterests={interests}
    />
  );
}
