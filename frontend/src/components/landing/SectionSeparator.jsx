import { useMemo } from "react";

/**
 * SectionSeparator — Animated grid of small squares between sections,
 * inspired by the RezonBio site's decorative separator pattern.
 *
 * @param {"dark"|"light"} variant — colour scheme
 */
export default function SectionSeparator({ variant = "dark" }) {
  const cellCount = useMemo(() => {
    // Generate enough cells to fill typical widths (responsive via CSS auto-fill)
    return 120;
  }, []);

  return (
    <div
      className={`section-separator ${variant === "light" ? "-light" : ""}`}
      aria-hidden="true"
    >
      {Array.from({ length: cellCount }, (_, i) => (
        <div key={i} className="section-separator__item" />
      ))}
    </div>
  );
}
