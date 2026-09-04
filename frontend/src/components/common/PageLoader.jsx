import { ShieldCheck, Sparkles, Loader2 } from "lucide-react";

/**
 * PageLoader — Glassmorphic full-screen loading state shown while auth / routes are loading.
 * Styled with Burgundy & Blush Pink theme.
 */
export default function PageLoader({ message = "Verifying security session..." }) {
  return (
    <div
      className="min-h-screen app-bg text-[#fff5f7] flex flex-col items-center justify-center p-4"
      role="status"
      aria-label="Loading Lockely"
    >
      {/* Central Glassmorphic Loading Box */}
      <div className="w-full max-w-xs glass-card p-6 sm:p-8 flex flex-col items-center gap-5 text-center relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 size-24 rounded-full bg-[#f43f6e]/20 blur-xl pointer-events-none" />

        {/* Animated Brand Shield Icon */}
        <div className="size-16 rounded-2xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] border border-white/30 shadow-lg shadow-[#be2656]/40 flex items-center justify-center text-white transition-transform hover:scale-105">
          <ShieldCheck className="size-8 text-white" />
        </div>

        {/* Brand Name */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-gradient-blush tracking-wider leading-none">
            LOCKELY
          </h1>
          <p className="text-[0.65rem] text-[#fda4b8] uppercase tracking-widest font-mono-code font-semibold">
            Zero-Knowledge Vault
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-[#120307]/70 rounded-full border border-pink-500/20 p-0.5 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#7a1534] via-[#f43f6e] to-[#fda4b8] rounded-full w-full animate-pulse" />
        </div>

        {/* Loading Message */}
        <div className="flex items-center gap-2 text-[#ffe4e9] text-xs font-medium">
          <Loader2 className="size-3.5 animate-spin text-[#f43f6e] shrink-0" />
          <span className="truncate">{message}</span>
        </div>

        {/* Security Badge Tag */}
        <div className="pt-2 border-t border-pink-500/15 w-full flex items-center justify-center gap-1.5 text-[0.6rem] text-[#fda4b8]/70 font-mono-code tracking-wide">
          <Sparkles className="size-3 text-[#f43f6e]" />
          AES-256-GCM End-To-End
        </div>
      </div>
    </div>
  );
}
