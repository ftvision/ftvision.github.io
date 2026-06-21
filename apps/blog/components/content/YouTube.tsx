"use client";

import * as React from "react";

export interface YouTubeProps {
  /** YouTube video ID (the part after `v=` or `youtu.be/`) */
  id: string;
  /** Accessible title for the video, also shown on the play facade */
  title: string;
  /** Optional start time in seconds */
  start?: number;
  /** Optional className for the container */
  className?: string;
}

/**
 * Privacy-friendly, performance-friendly YouTube embed.
 *
 * Renders a thumbnail facade first and only loads the (cookieless)
 * `youtube-nocookie` iframe after the user clicks play — so the heavy
 * YouTube player never costs a reader who scrolls past it.
 *
 * Usage in MDX: <YouTube id="dQw4w9WgXcQ" title="learn --auto on X.com's timeline feed" />
 */
export function YouTube({ id, title, start, className }: YouTubeProps) {
  const [activated, setActivated] = React.useState(false);
  const [thumbFailed, setThumbFailed] = React.useState(false);

  const startParam = start ? `&start=${start}` : "";
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${startParam}`;
  // maxresdefault isn't generated for every video; fall back to hqdefault.
  const thumb = thumbFailed
    ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

  return (
    <figure className={className}>
      <div className="relative my-6 aspect-video overflow-hidden rounded-lg bg-ground-secondary">
        {activated ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt=""
              loading="lazy"
              onError={() => setThumbFailed(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 transition-transform group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="ml-1 h-7 w-7"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="text-body-sm text-figure-secondary text-center mt-2">
        {title}
      </figcaption>
    </figure>
  );
}
