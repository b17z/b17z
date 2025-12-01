"use client";

interface BookSpineProps {
  title: string;
  subtitle: string;
  color: string;
  code: string;
}

export function BookSpine({
  title,
  subtitle,
  color,
  code,
}: BookSpineProps) {
  return (
    <div
      className={`book-spine relative w-16 md:w-20 h-full rounded-sm bg-gradient-to-b ${color}
        border-l border-white/10 cursor-pointer group overflow-hidden`}
    >
      {/* Spine texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-white/5" />

      {/* Section code - decorative */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/20 text-xs font-mono tracking-wider">
        {code}
      </div>

      {/* Main title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white font-bold text-sm md:text-base tracking-[0.3em] uppercase">
          {title}
        </span>
      </div>

      {/* Subtitle at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-[10px] md:text-xs tracking-wider whitespace-nowrap">
        {subtitle}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/10 to-transparent" />

      {/* Edge highlight */}
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/30 via-white/10 to-white/30" />
    </div>
  );
}
