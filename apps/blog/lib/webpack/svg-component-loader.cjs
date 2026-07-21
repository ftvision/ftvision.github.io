/**
 * Import a trusted local SVG as a thin React component without rewriting it.
 *
 * Keeping the source byte-for-byte intact is deliberate: diagram geometry,
 * stable IDs, and animation CSS remain inspectable in the standalone `.svg`.
 * `?url` imports bypass this loader and retain Next's normal asset behavior.
 */
module.exports = function svgComponentLoader(source) {
  const markup = JSON.stringify(source);

  return `
    import * as React from "react";

    export default function SvgAsset({ className = "", ...props }) {
      return React.createElement("span", {
        ...props,
        className: ["cs-svg-host", className].filter(Boolean).join(" "),
        dangerouslySetInnerHTML: { __html: ${markup} },
      });
    }
  `;
};
