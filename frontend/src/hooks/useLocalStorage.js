import { useState, useCallback } from "react";

/**
 * useLocalStorage — useState that persists to localStorage.
 *
 * @param {string} key           — localStorage key
 * @param {*}      initialValue  — default value if key doesn't exist
 * @returns {[value, setValue, removeValue]}
 *
 * @example
 * const [theme, setTheme] = useLocalStorage("pg_theme", "light");
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const toStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(toStore);
        window.localStorage.setItem(key, JSON.stringify(toStore));
      } catch (err) {
        console.warn(`[useLocalStorage] Could not set key "${key}":`, err);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (err) {
      console.warn(`[useLocalStorage] Could not remove key "${key}":`, err);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
