/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import { useTheme as useNextTheme } from "next-themes";

const ThemeContext = createContext(null);

/**
 * ThemeProvider is already set up in App.jsx via next-themes.
 * This context wraps next-themes for cleaner consumption.
 */
export function ThemeProvider({ children }) {
  return <ThemeContext.Provider value={null}>{children}</ThemeContext.Provider>;
}

/**
 * useTheme — wraps next-themes with convenience helpers.
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();
  const isDark = resolvedTheme === "dark";

  return {
    theme,
    setTheme,
    isDark,
    resolvedTheme,
    systemTheme,
    toggleTheme: () => setTheme(isDark ? "light" : "dark"),
    setLight: () => setTheme("light"),
    setDark: () => setTheme("dark"),
  };
}

export default ThemeContext;
