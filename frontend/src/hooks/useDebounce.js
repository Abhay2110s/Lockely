import { useState, useEffect } from "react";

/**
 * useDebounce — delays updating a value until the user stops changing it.
 *
 * @param {*}      value  — the value to debounce (typically a search string)
 * @param {number} delay  — delay in milliseconds (default 300ms)
 * @returns the debounced value, updated only after `delay` ms of inactivity
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 300);
 * useEffect(() => { fetchResults(debouncedSearch); }, [debouncedSearch]);
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
