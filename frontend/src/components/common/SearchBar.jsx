import { Search, X } from "lucide-react";

/**
 * SearchBar — glassmorphic search input with clear button.
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
        className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#fda4b8]/70 pointer-events-none"
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
        className="w-full pl-10 pr-9 py-2.5 rounded-xl glass-input font-medium text-sm text-[#fff5f7] placeholder:text-[#fda4b8]/50"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fda4b8]/70 hover:text-white transition-colors"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}
