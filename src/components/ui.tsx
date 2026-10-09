import type { ReactNode } from "react";
import { site } from "@/config/site";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function Wordmark() {
  return (
    <span className="wordmark" aria-label={site.brandName}>
      <span className="wordmark-name" aria-hidden="true">
        {site.brandName.split(" ")[0]}
        <span className="brand-dot">.</span>
      </span>
      <small aria-hidden="true">
        {site.brandName.split(" ").slice(1).join(" ")}
      </small>
    </span>
  );
}
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number} /</span> {children}
    </div>
  );
}
export function RouteArt({ variant = "hero" }: { variant?: string }) {
  return (
    <svg
      className={`route-art route-${variant}`}
      viewBox="0 0 700 800"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`grid-${variant}`}
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <path d="M50 0H0v50" stroke="currentColor" opacity=".09" />
        </pattern>
      </defs>
      <rect width="700" height="800" fill={`url(#grid-${variant})`} />
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x={92 + i * 17}
          y={88 + i * 17}
          width={516 - i * 34}
          height={620 - i * 34}
          rx={258 - i * 17}
          transform="rotate(28 350 400)"
          stroke="currentColor"
          strokeWidth={i === 5 ? 2 : 1}
          opacity={i === 5 ? 0.85 : 0.18 + i * 0.026}
        />
      ))}
      <path d="m110 502 29-6-12 27" stroke="currentColor" strokeWidth="2" />
      <circle cx="517" cy="294" r="7" fill="currentColor" />
      <circle cx="517" cy="294" r="19" stroke="currentColor" opacity=".5" />
      <path d="M518 294h96V196" stroke="currentColor" opacity=".5" />
      <text
        x="460"
        y="180"
        fill="currentColor"
        fontSize="11"
        fontFamily="monospace"
        letterSpacing="2"
      >
        TU PUNTO DE PARTIDA
      </text>
    </svg>
  );
}

export function LoopArrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19 8a8 8 0 1 0 1 7M19 3v6h-6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
