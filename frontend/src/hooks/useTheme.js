// Re-export the useTheme hook from ThemeContext so components can import
// from either path:
//   import { useTheme } from "@/hooks/useTheme";       ← new canonical path
//   import { useTheme } from "@/context/ThemeContext";  ← still works
export { useTheme } from "@/context/ThemeContext";
