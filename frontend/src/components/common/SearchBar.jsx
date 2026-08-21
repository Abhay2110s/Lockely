import { Search, X } from "lucide-react";

/**
 * SearchBar — controlled search input with optional clear button.
 *
 * @param {string}   value         — current search term (controlled)
 * @param {Function} onChange      — called with the new string value
 * @param {string}   [placeholder] — input placeholder text
 * @param {string}   [className]   — extra wrapper classes
 * @param {string}   [id]          — input element id (for accessibility)
 *
 * @example
 * <SearchBar
 *   value={query}
 *   onChange={setQuery}
 *   placeholder="Search vault entries..."
 * />
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  className = "",
  id = "search-bar",
}) {
  return (
    <div className={`relative ${className}`}>
      <Search
        className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        role="searchbox"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15 transition-all duration-200"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}
