import { describe, it, expect } from "vitest";
import { interests, getInterestBySlug } from "@/config/interests";
import { sectionContent } from "@/config/content";
import { spineColors, getSpineColors, defaultSpineColor } from "@/config/spineColors";

describe("interests config", () => {
  it("should have four interests", () => {
    expect(interests).toHaveLength(4);
  });

  it("should have required properties for each interest", () => {
    for (const interest of interests) {
      expect(interest).toHaveProperty("title");
      expect(interest).toHaveProperty("slug");
      expect(interest).toHaveProperty("subtitle");
      expect(interest).toHaveProperty("color");
      expect(interest).toHaveProperty("code");
    }
  });

  it("getInterestBySlug should return correct interest", () => {
    const build = getInterestBySlug("build");
    expect(build?.title).toBe("BUILD");
    expect(build?.slug).toBe("build");
  });

  it("getInterestBySlug should return undefined for invalid slug", () => {
    const invalid = getInterestBySlug("invalid");
    expect(invalid).toBeUndefined();
  });
});

describe("sectionContent config", () => {
  it("should have content for all sections", () => {
    for (const interest of interests) {
      expect(sectionContent[interest.slug]).toBeDefined();
    }
  });

  it("should have required properties for each section", () => {
    for (const key of Object.keys(sectionContent)) {
      const content = sectionContent[key];
      expect(content).toHaveProperty("tagline");
      expect(content).toHaveProperty("headline");
      expect(content).toHaveProperty("manifesto");
      expect(content).toHaveProperty("entries");
      expect(content).toHaveProperty("pullQuote");
    }
  });
});

describe("spineColors config", () => {
  it("should have colors for all sections", () => {
    for (const interest of interests) {
      expect(spineColors[interest.slug]).toBeDefined();
    }
  });

  it("getSpineColors should return correct scheme", () => {
    const buildColors = getSpineColors("build");
    expect(buildColors.accent).toBe("#8B5CF6");
  });

  it("getSpineColors should return default for invalid slug", () => {
    const colors = getSpineColors("invalid");
    expect(colors).toEqual(defaultSpineColor);
  });

  it("each color scheme should have required properties", () => {
    for (const scheme of Object.values(spineColors)) {
      expect(scheme).toHaveProperty("accent");
      expect(scheme).toHaveProperty("text");
      expect(scheme).toHaveProperty("border");
      expect(scheme).toHaveProperty("bg");
      expect(scheme).toHaveProperty("glow");
    }
  });
});
