import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionView } from "@/components/SectionView";
import { interests, getInterestBySlug } from "@/config/interests";
import { sectionContent, type SectionContent } from "@/config/content";
import { getPostsBySection, postMetaToEntry } from "@/lib/markdown";

interface PageProps {
  params: Promise<{ section: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section } = await params;
  const interest = getInterestBySlug(section);
  const content = sectionContent[section];

  if (!interest || !content) {
    return {
      title: "Section Not Found | b17z",
    };
  }

  const title = `${interest.title} | b17z`;
  const description = content.manifesto;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "b17z",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export function generateStaticParams() {
  return interests.map((interest) => ({
    section: interest.slug,
  }));
}

export default async function SectionPage({ params }: PageProps) {
  const { section } = await params;
  const interest = getInterestBySlug(section);
  const baseContent = sectionContent[section];

  if (!interest || !baseContent) {
    notFound();
  }

  // Load and convert markdown posts to entry format
  const markdownPosts = getPostsBySection(section);
  const markdownEntries = markdownPosts.map(postMetaToEntry);

  // Merge entries, with markdown taking precedence over config
  const markdownSlugs = new Set(markdownEntries.map((e) => e.slug));
  const configEntries = baseContent.entries.filter((e) => !markdownSlugs.has(e.slug));

  // Sort combined entries by date, newest first
  const allEntries = [...markdownEntries, ...configEntries].sort((a, b) => {
    const parseDate = (dateStr: string) => {
      // Parse DD.MMM.YYYY format
      const months: Record<string, number> = {
        JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
        JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
      };
      const match = dateStr.match(/(\d{2})\.(\w{3})\.(\d{4})/);
      if (match) {
        const [, day, month, year] = match;
        return new Date(parseInt(year), months[month] || 0, parseInt(day));
      }
      return new Date(0);
    };
    return parseDate(b.date).getTime() - parseDate(a.date).getTime();
  });

  const content: SectionContent = {
    ...baseContent,
    entries: allEntries,
  };

  return (
    <SectionView
      interest={interest}
      content={content}
      allInterests={interests}
    />
  );
}
