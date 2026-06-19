"use client";

import * as React from "react";

interface ZoomableImageProps {
  /** Image source path */
  src: string;
  /** Alt text (also used as the dialog label) */
  alt: string;
  /** Optional caption shown beneath the image */
  caption?: string;
  /** Optional className for the figure container */
  className?: string;
}

/**
 * An image that opens a full-screen, zoomed view when clicked. Dismiss by
 * clicking anywhere, pressing Escape, or using the close button.
 *
 * Usage in MDX:
 *   <ZoomableImage src="/images/foo.png" alt="..." caption="..." />
 */
export function ZoomableImage({ src, alt, caption, className }: ZoomableImageProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // Lock background scroll while the overlay is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <figure className={`my-6 max-w-prose mx-auto${className ? ` ${className}` : ""}`}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
        className="group relative block w-full overflow-hidden rounded-lg cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-figure-primary"
      >
        <img src={src} alt={alt} className="w-full h-auto object-cover" />
        <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-caption text-white opacity-0 transition-opacity group-hover:opacity-100">
          Click to enlarge
        </span>
      </button>
      {caption && (
        <figcaption className="mt-2 text-caption text-figure-muted">{caption}</figcaption>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[92vh] max-w-[96vw] w-auto h-auto object-contain rounded-lg shadow-2xl"
          />
          <button
            type="button"
            aria-label="Close enlarged image"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-2xl leading-none text-white hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ×
          </button>
        </div>
      )}
    </figure>
  );
}
