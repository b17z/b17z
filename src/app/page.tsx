"use client";

import Link from "next/link";
import Image from "next/image";
import { BookSpine } from "@/components/BookSpine";
import { backgroundConfig } from "@/config/background";
import { interests } from "@/config/interests";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image layer - optimized with Next.js Image */}
      <Image
        src={backgroundConfig.image}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={75}
      />
      {/* Dark overlay to fade the image */}
      <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" aria-hidden="true" />

      {/* Atmospheric background layers */}
      <div className="absolute inset-0 bg-gradient-radial-tl" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-radial-br" aria-hidden="true" />

      {/* Noise/grain texture overlay */}
      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />

      {/* Bokeh circles - soft out-of-focus lights */}
      <div className="bokeh bokeh-1" aria-hidden="true" />
      <div className="bokeh bokeh-2" aria-hidden="true" />
      <div className="bokeh bokeh-3" aria-hidden="true" />

      {/* Japanese text - ambient texture, more faded/integrated */}
      <div className="jp-ambient absolute top-[15%] left-[8%] text-7xl" aria-hidden="true">未来</div>
      <div className="jp-ambient absolute top-[25%] right-[12%] text-5xl" aria-hidden="true">探検</div>
      <div className="jp-ambient absolute bottom-[25%] left-[20%] text-6xl" aria-hidden="true">創造</div>
      <div className="jp-ambient absolute top-[45%] right-[8%] text-4xl" aria-hidden="true">電子</div>

      {/* Main content */}
      <main id="main-content" className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 md:px-6">
        {/* Header */}
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
            <span className="gradient-text glow">b17z</span>
          </h1>
          <p className="text-zinc-500 text-base md:text-lg font-mono tracking-widest uppercase">
            experiments & explorations
          </p>
        </header>

        {/* About + Bookshelf Layout */}
        <section className="relative w-full max-w-6xl">
          {/* Mobile: stacked layout, Desktop: side-by-side */}
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-8 lg:gap-12">

            {/* THE COUNTER - About/Masthead Section */}
            <div className="masthead-container w-full max-w-sm lg:max-w-xs xl:max-w-sm order-2 lg:order-1">
              <div className="p-5 md:p-6 rounded-lg border border-purple-500/20 bg-black/40 backdrop-blur-sm masthead-glow">
                {/* Header */}
                <div className="mb-5">
                  <span className="text-[10px] tracking-[0.3em] text-purple-400/60 uppercase font-mono">
                    The Counter
                  </span>
                </div>

                {/* Bio */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  <span className="text-zinc-200 font-medium">b17z</span> is a digital zine by{" "}
                  <span className="text-purple-400">BIENVENIDO</span> — I like doing things.
                </p>

                {/* Data Readouts */}
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex">
                    <span className="text-zinc-600 w-24 shrink-0">CURRENTLY</span>
                    <span className="text-zinc-400">Protocol Product & Infrastructure @ Large Crypto Company</span>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-600 w-24 shrink-0">PREVIOUSLY</span>
                    <span className="text-zinc-500">EdTech Product & Teaching · SWE at Large Bank</span>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-600 w-24 shrink-0">ALWAYS</span>
                    <span className="text-zinc-500">Cooking, events, rabbit holes</span>
                  </div>

                  <div className="border-t border-zinc-800/50 my-3" />

                  <div className="flex">
                    <span className="text-zinc-600 w-24 shrink-0">SECTOR</span>
                    <span className="text-zinc-400">NYC</span>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-600 w-24 shrink-0">CONTACT</span>
                    <a href="mailto:ben@b17z.io" className="text-cyan-400/80 hover:text-cyan-300 transition-colors">
                      ben@b17z.io
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-zinc-600 w-24 shrink-0">STATUS</span>
                    <span className="flex items-center gap-2 text-zinc-400">
                      <span className="status-dot w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                      <span className="sr-only">Currently active:</span>
                      Making things
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bookshelf - slightly right on desktop */}
            <nav className="relative order-1 lg:order-2 lg:ml-4" aria-label="Section navigation">
              <div className="flex flex-row gap-3 md:gap-4 h-[320px] md:h-[380px] lg:h-[400px] perspective-1000" role="list">
                {interests.map((interest) => (
                  <Link
                    key={interest.slug}
                    href={`/${interest.slug}`}
                    aria-label={`${interest.title}: ${interest.subtitle}`}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                    role="listitem"
                  >
                    <BookSpine
                      title={interest.title}
                      subtitle={interest.subtitle}
                      color={interest.color}
                      code={interest.code}
                    />
                  </Link>
                ))}
              </div>

              {/* Shelf surface - the edge books sit on */}
              <div className="shelf-surface" aria-hidden="true" />

              {/* Soft glow where books meet surface */}
              <div className="shelf-glow" aria-hidden="true" />
            </nav>
          </div>
        </section>

        {/* Tip jar teaser */}
        <section className="mt-12 md:mt-16 text-center" aria-label="Upcoming features">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-500/80 animate-pulse" aria-hidden="true" />
            <span className="font-pixel text-zinc-500 text-sm tracking-wider">TIP JAR COMING SOON</span>
          </div>
        </section>
      </main>

      {/* Attribution line */}
      <footer className="absolute bottom-6 left-0 right-0 text-center z-10">
        <p className="text-zinc-600 text-xs font-mono tracking-wider">
          <span className="mr-1">📍</span>
          {backgroundConfig.location} —{" "}
          <a
            href={backgroundConfig.photographerUrl}
            className="text-zinc-500 hover:text-zinc-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {backgroundConfig.photographer} photography
          </a>
        </p>
      </footer>

      {/* Very subtle scanlines - atmospheric, not CRT */}
      <div className="absolute inset-0 scanlines-subtle pointer-events-none" aria-hidden="true" />
    </div>
  );
}
