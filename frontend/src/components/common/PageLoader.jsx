import { ShieldCheck } from "lucide-react";
import Loader from "./Loader";

/**
 * PageLoader — full-screen loading state shown while auth is being validated.
 * Displayed by ProtectedRoute until AuthContext.isLoaded becomes true.
 */
export default function PageLoader() {
  return (
    <div
      className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center gap-4"
      role="status"
      aria-label="Loading PassGuardian"
    >
      <div className="size-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25">
        <ShieldCheck className="size-7" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size="size-6" className="text-indigo-500" label="Loading vault..." />
        <p className="text-xs text-slate-400 font-medium tracking-wide">
          Verifying session…
        </p>
      </div>
    </div>
  );
}
