import { Loader2 } from "lucide-react";

/**
 * Loader — inline animated spinner.
 *
 * @param {string} [size="size-5"]     — Tailwind size class
 * @param {string} [className=""]      — additional classes (e.g. for colour)
 * @param {string} [label="Loading..."] — accessible label for screen readers
 */
export default function Loader({ size = "size-5", className = "text-indigo-500", label = "Loading..." }) {
  return (
    <span role="status" aria-label={label} className="inline-flex items-center justify-center">
      <Loader2 className={`${size} animate-spin ${className}`} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
