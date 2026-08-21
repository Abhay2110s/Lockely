import { useState, useCallback } from "react";

/**
 * useClipboard — copy text to clipboard with timed feedback.
 *
 * @param {number} timeout — ms to keep the "copied" state active (default 2000ms)
 * @returns {{ copied: boolean, copy: (text: string) => void }}
 *
 * @example
 * const { copied, copy } = useClipboard();
 * <button onClick={() => copy(password)}>
 *   {copied ? "Copied!" : "Copy"}
 * </button>
 */
export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const copy = useCallback(
    async (text, id = null) => {
      try {
        await navigator.clipboard.writeText(String(text));
        setCopied(true);
        setCopiedId(id);
        // Reset after `timeout` ms.
        const timer = setTimeout(() => {
          setCopied(false);
          setCopiedId(null);
        }, timeout);
        return () => clearTimeout(timer);
      } catch (err) {
        // Clipboard API failed (e.g., insecure context) — silently ignore.
        console.warn("[useClipboard] Failed to copy:", err);
      }
    },
    [timeout]
  );

  return { copied, copiedId, copy };
}

export default useClipboard;
