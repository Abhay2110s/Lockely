// Toast is powered by react-hot-toast (already installed).
// This file re-exports a pre-styled toast() helper and a Toaster component.
import { Toaster as HotToaster, toast as hotToast } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="bottom-right"
      gutter={12}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#fff",
          color: "#0f172a",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "12px 16px",
          fontSize: "0.75rem",
          fontWeight: "600",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          maxWidth: "360px",
        },
        success: {
          iconTheme: { primary: "#10b981", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#ef4444", secondary: "#fff" },
        },
      }}
    />
  );
}

// Convenience helpers
export const toast = {
  success: (msg, opts) => hotToast.success(msg, opts),
  error: (msg, opts) => hotToast.error(msg, opts),
  loading: (msg, opts) => hotToast.loading(msg, opts),
  dismiss: (id) => hotToast.dismiss(id),
  info: (msg, opts) =>
    hotToast(msg, {
      icon: "ℹ️",
      ...opts,
    }),
};
