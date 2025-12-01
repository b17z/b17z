import { describe, it, expect } from "vitest";
import { getPostsBySection, getPostSlugs, postMetaToEntry } from "@/lib/markdown";

describe("markdown utilities", () => {
  describe("getPostsBySection", () => {
    it("should return posts for build section", () => {
      const posts = getPostsBySection("build");
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it("should return empty array for non-existent section", () => {
      const posts = getPostsBySection("nonexistent");
      expect(posts).toEqual([]);
    });

    it("each post should have required frontmatter fields", () => {
      const posts = getPostsBySection("build");
      for (const post of posts) {
        expect(post).toHaveProperty("slug");
        expect(post.frontmatter).toHaveProperty("title");
        expect(post.frontmatter).toHaveProperty("subtitle");
        expect(post.frontmatter).toHaveProperty("date");
        expect(post.frontmatter).toHaveProperty("status");
        expect(post.frontmatter).toHaveProperty("tags");
        expect(post.frontmatter).toHaveProperty("readingTime");
      }
    });
  });

  describe("getPostSlugs", () => {
    it("should return slugs for build section", () => {
      const slugs = getPostSlugs("build");
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs.length).toBeGreaterThan(0);
    });

    it("should return empty array for non-existent section", () => {
      const slugs = getPostSlugs("nonexistent");
      expect(slugs).toEqual([]);
    });
  });

  describe("postMetaToEntry", () => {
    it("should convert post meta to entry format", () => {
      const posts = getPostsBySection("build");
      if (posts.length > 0) {
        const entry = postMetaToEntry(posts[0]);
        expect(entry).toHaveProperty("title");
        expect(entry).toHaveProperty("slug");
        expect(entry).toHaveProperty("desc");
        expect(entry).toHaveProperty("date");
        expect(entry).toHaveProperty("status");
        expect(entry.isMarkdown).toBe(true);
      }
    });

    it("should uppercase title and status", () => {
      const mockPost = {
        slug: "test",
        frontmatter: {
          title: "Test Title",
          subtitle: "Test subtitle",
          date: "01.JAN.2025",
          status: "active",
          tags: [],
          readingTime: 5,
        },
      };
      const entry = postMetaToEntry(mockPost);
      expect(entry.title).toBe("TEST TITLE");
      expect(entry.status).toBe("ACTIVE");
    });
  });
});
