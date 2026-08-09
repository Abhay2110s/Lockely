import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

/**
 * The page's signature element: an engraved security-paper seal, in the
 * manner of a banknote vignette or certificate stamp. Reused at three
 * sizes across the page (hero, security certificate, footer watermark)
 * so it reads as a consistent mark of the brand rather than a one-off
 * decoration.
 */
export default function SealMedallion({ size = 320, className = "" }) {
  const id = "pg-seal";

  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="PassGuardian engraved security seal"
    >
      <defs>
        <path
          id={`${id}-top`}
          d="M 160 44 A 116 116 0 0 1 276 160"
          fill="none"
        />
        <path
          id={`${id}-bottom`}
          d="M 44 160 A 116 116 0 0 1 160 44"
          fill="none"
        />
      </defs>

      {/* outer guilloché ring, tick marks like a combination dial */}
      <motion.g
        className="pg-seal-ring-outer"
        style={{ transformOrigin: "160px 160px" }}
      >
        <circle
          cx="160"
          cy="160"
          r="150"
          fill="none"
          stroke="var(--pg-green)"
          strokeWidth="1"
          opacity="0.35"
        />
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * 360;
          const major = i % 5 === 0;
          return (
            <line
              key={i}
              x1="160"
              y1={major ? "8" : "14"}
              x2="160"
              y2="20"
              stroke="var(--pg-green)"
              strokeWidth={major ? 1.4 : 0.8}
              opacity={major ? 0.75 : 0.4}
              transform={`rotate(${angle} 160 160)`}
            />
          );
        })}
      </motion.g>

      {/* inner engraved ring rotating the opposite direction */}
      <g className="pg-seal-ring-inner" style={{ transformOrigin: "160px 160px" }}>
        <circle
          cx="160"
          cy="160"
          r="118"
          fill="none"
          stroke="var(--pg-red)"
          strokeWidth="0.75"
          strokeDasharray="1 5"
          opacity="0.5"
        />
      </g>

      {/* static structural rings */}
      <circle cx="160" cy="160" r="132" fill="none" stroke="var(--pg-ink)" strokeWidth="1" opacity="0.7" />
      <circle cx="160" cy="160" r="128" fill="none" stroke="var(--pg-ink)" strokeWidth="0.5" opacity="0.4" />
      <circle cx="160" cy="160" r="96" fill="none" stroke="var(--pg-ink)" strokeWidth="0.5" opacity="0.5" />

      {/* engraved motto ring */}
      <text
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10.5"
        letterSpacing="3.5"
        fill="var(--pg-ink)"
        opacity="0.75"
      >
        <textPath href={`#${id}-top`} startOffset="2%">
          PASSGUARDIAN · SECURED FILE
        </textPath>
      </text>
      <text
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10.5"
        letterSpacing="3.5"
        fill="var(--pg-ink)"
        opacity="0.75"
      >
        <textPath href={`#${id}-bottom`} startOffset="2%">
          AES-256-GCM · ZERO-KNOWLEDGE
        </textPath>
      </text>

      {/* center medallion */}
      <circle cx="160" cy="160" r="66" fill="var(--pg-green)" />
      <circle cx="160" cy="160" r="66" fill="none" stroke="var(--pg-paper)" strokeWidth="2" />
      <circle cx="160" cy="160" r="58" fill="none" stroke="var(--pg-paper)" strokeWidth="1" opacity="0.6" />

      <foreignObject x="130" y="130" width="60" height="60">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShieldCheck color="var(--pg-paper)" size={30} strokeWidth={1.75} />
        </div>
      </foreignObject>
    </svg>
  );
}
