import React from "react";
import { Image as ImageIcon, Video as VideoIcon, Volume2 } from "lucide-react";

interface MediaPlaceholderProps {
  label: string;
  type?: "image" | "video" | "audio" | "portrait" | "wide";
  aspectRatio?: "square" | "portrait" | "video" | "wide";
  className?: string;
  hint?: string;
}

export function MediaPlaceholder({
  label,
  type = "image",
  aspectRatio = "video",
  className = "",
  hint,
}: MediaPlaceholderProps) {
  const ratioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    video: "aspect-[16/9]",
    wide: "aspect-[21/9]",
  }[aspectRatio];

  function renderIcon() {
    if (type === "video") return <VideoIcon className="w-5 h-5" />;
    if (type === "audio") return <Volume2 className="w-5 h-5" />;
    return <ImageIcon className="w-5 h-5" />;
  }

  return (
    <div
      className={`relative w-full ${ratioClasses} rounded-[var(--radius-lg)] border border-dashed border-amber-500/30 bg-[var(--surface-elevated)]/60 overflow-hidden flex flex-col items-center justify-center p-6 text-center group transition-colors hover:border-amber-500/50 ${className}`}
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-radial from-amber-500/[0.03] to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-3 max-w-xs">
        <div className="w-12 h-12 rounded-full bg-[var(--surface-strong)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:scale-105 transition-transform">
          {renderIcon()}
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs font-bold text-[var(--accent)] bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 uppercase tracking-wider">
            {label}
          </span>
          {hint && <span className="text-[11px] text-[var(--text-muted)] mt-1">{hint}</span>}
        </div>
      </div>
    </div>
  );
}
