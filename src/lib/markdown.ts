import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Entry } from "@/config/content";

const contentDirectory = path.join(process.cwd(), "content");

export interface PostFrontmatter {
  title: string;
  subtitle: string;
  date: string;
  status: string;
  tags: string[];
  readingTime: number;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
}

/**
 * Convert a markdown post to an Entry format for the archive view
 */
export function postMetaToEntry(post: PostMeta): Entry {
  return {
    title: post.frontmatter.title.toUpperCase(),
    slug: post.slug,
    desc: post.frontmatter.subtitle,
    date: post.frontmatter.date,
    status: post.frontmatter.status.toUpperCase(),
    isMarkdown: true,
  };
}

/**
 * Get all posts for a given section (crypto, code, design, ai)
 */
export function getPostsBySection(section: string): PostMeta[] {
  const sectionPath = path.join(contentDirectory, section);

  if (!fs.existsSync(sectionPath)) {
    return [];
  }

  const files = fs.readdirSync(sectionPath);
  const posts: PostMeta[] = [];

  for (const filename of files) {
    if (!filename.endsWith(".md")) continue;

    const filePath = path.join(sectionPath, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    posts.push({
      slug: filename.replace(/\.md$/, ""),
      frontmatter: {
        title: data.title || "Untitled",
        subtitle: data.subtitle || "",
        date: data.date ? formatDate(data.date) : "",
        status: data.status || "draft",
        tags: data.tags || [],
        readingTime: data.readingTime || 5,
      },
    });
  }

  // Sort by date (newest first)
  posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  return posts;
}

/**
 * Get a single post by section and slug
 */
export function getPostBySlug(section: string, slug: string): Post | null {
  const filePath = path.join(contentDirectory, section, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: {
      title: data.title || "Untitled",
      subtitle: data.subtitle || "",
      date: data.date ? formatDate(data.date) : "",
      status: data.status || "draft",
      tags: data.tags || [],
      readingTime: data.readingTime || 5,
    },
    content,
  };
}

/**
 * Get all post slugs for a section (for static generation)
 */
export function getPostSlugs(section: string): string[] {
  const sectionPath = path.join(contentDirectory, section);

  if (!fs.existsSync(sectionPath)) {
    return [];
  }

  const files = fs.readdirSync(sectionPath);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/**
 * Get all sections that have content
 */
export function getSectionsWithContent(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const sections = fs.readdirSync(contentDirectory);
  return sections.filter((section) => {
    const sectionPath = path.join(contentDirectory, section);
    if (!fs.statSync(sectionPath).isDirectory()) return false;
    const files = fs.readdirSync(sectionPath);
    return files.some((file) => file.endsWith(".md"));
  });
}

/**
 * Format date to DD.MMM.YYYY format
 */
function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const day = d.getDate().toString().padStart(2, "0");
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}
