"use client";

import * as React from "react";

interface XEmbedProps {
  /** Tweet ID (the numeric string at the end of the tweet URL) */
  tweetId: string;
  /** Optional className for the container */
  className?: string;
}

/**
 * Embeds an X (Twitter) post using the official widgets.js API.
 *
 * Usage in MDX: <XEmbed tweetId="2037994456272499117" />
 */
export function XEmbed({ tweetId, className }: XEmbedProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const renderedRef = React.useRef(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || renderedRef.current) return;
    renderedRef.current = true;

    function render() {
      if (!container) return;
      // Clear any leftover content from prior attempts
      container.innerHTML = "";
      window.twttr?.widgets
        ?.createTweet(tweetId, container, { align: "center" })
        .then((el: HTMLElement | undefined) => {
          if (!el) setError(true);
        });
    }

    // If twttr is already loaded, render immediately
    if (window.twttr?.widgets) {
      render();
      return;
    }

    // Only append the script if it hasn't been added yet
    if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      script.onload = render;
      script.onerror = () => setError(true);
      document.head.appendChild(script);
    } else {
      // Script tag exists but hasn't loaded yet — poll for it
      const interval = setInterval(() => {
        if (window.twttr?.widgets) {
          clearInterval(interval);
          render();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [tweetId]);

  if (error) {
    return (
      <div className={className}>
        <a
          href={`https://x.com/i/status/${tweetId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link-hover underline underline-offset-2"
        >
          View post on X
        </a>
      </div>
    );
  }

  return <div ref={containerRef} className={className} />;
}

// Extend Window for twttr
declare global {
  interface Window {
    twttr?: {
      widgets?: {
        createTweet: (
          id: string,
          el: HTMLElement,
          options?: Record<string, unknown>,
        ) => Promise<HTMLElement | undefined>;
      };
    };
  }
}
