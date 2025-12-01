import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://b17z.io";

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "b17z — Digital Experiments & Explorations",
    template: "%s | b17z",
  },
  description: "A digital zine by Bienvenido. Builder, educator, explorer. Tech, food, books, and events.",
  keywords: ["digital zine", "tech", "food", "books", "events", "experiments", "explorations"],
  authors: [{ name: "Bienvenido", url: siteUrl }],
  creator: "Bienvenido",
  publisher: "b17z",
  openGraph: {
    title: "b17z — Digital Experiments & Explorations",
    description: "A digital zine by Bienvenido. Builder, educator, explorer. Tech, food, books, and events.",
    type: "website",
    siteName: "b17z",
    locale: "en_US",
    url: siteUrl,
    images: [
      {
        url: "/backgrounds/og-img.png",
        width: 1200,
        height: 630,
        alt: "b17z — Digital Experiments & Explorations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "b17z — Digital Experiments & Explorations",
    description: "A digital zine by Bienvenido. Builder, educator, explorer. Tech, food, books, and events.",
    images: ["/backgrounds/og-img.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
