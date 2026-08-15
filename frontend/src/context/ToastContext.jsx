/**
 * ToastContext — thin wrapper around react-hot-toast.
 * Provides a useToast() hook for consistent toast notifications.
 * The actual <Toaster /> component should be rendered in main.jsx or App.jsx.
 */
import { createContext, useContext } from "react";
import { toast as hotToast } from "react-hot-toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  return <ToastContext.Provider value={null}>{children}</ToastContext.Provider>;
}

export function useToast() {
  return {
    success: (message, options) => hotToast.success(message, options),
    error: (message, options) => hotToast.error(message, options),
    loading: (message, options) => hotToast.loading(message, options),
    info: (message, options) => hotToast(message, { icon: "ℹ️", ...options }),
    dismiss: (id) => hotToast.dismiss(id),
    promise: (promise, msgs, options) => hotToast.promise(promise, msgs, options),
  };
}

export default ToastContext;
