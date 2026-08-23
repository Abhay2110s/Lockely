import { ShieldCheck, Sparkles, Loader2 } from "lucide-react";

/**
 * PageLoader — Neo-Brutalist full-screen loading state shown while auth / routes are loading.
 * Styled to match PassGuardian's signature landing and app theme.
 */
export default function PageLoader({ message = "Verifying security session..." }) {
  return (
    <div
      className="min-h-screen app-bg text-[#191510] flex flex-col items-center justify-center p-4 selection:bg-[#ffe066]"
      role="status"
      aria-label="Loading PassGuardian"
    >
      {/* Central Tactile Loading Box */}
      <div className="w-full max-w-xs bg-white border-[3px] border-[#191510] shadow-[6px_6px_0px_#191510] p-6 sm:p-8 flex flex-col items-center gap-4 text-center">
        {/* Animated Brand Shield Icon */}
        <div className="size-14 sm:size-16 bg-[#ffe066] border-2 border-[#191510] shadow-[3px_3px_0px_#191510] flex items-center justify-center text-[#191510] -rotate-3 hover:rotate-0 transition-transform">
          <ShieldCheck className="size-7 sm:size-8" />
        </div>

        {/* Brand Name */}
        <div className="space-y-1">
          <h1 className="ca-display text-2xl text-[#191510] tracking-wider leading-none">
            PASSGUARDIAN
          </h1>
          <p className="ca-mono text-[0.62rem] text-[#191510]/60 uppercase tracking-widest">
            Zero-Knowledge Comic Vault
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-[#faf6ea] border-2 border-[#191510] p-1 shadow-[2px_2px_0px_#191510]">
          <div className="h-2 bg-[#86efac] border border-[#191510] w-full animate-pulse" />
        </div>

        {/* Loading Message */}
        <div className="flex items-center gap-2 text-[#191510] ca-mono text-[0.68rem] font-bold">
          <Loader2 className="size-3.5 animate-spin text-[#191510] shrink-0" />
          <span className="truncate">{message}</span>
        </div>

        {/* Security Badge Tag */}
        <div className="pt-1 border-t-2 border-[#191510]/10 w-full flex items-center justify-center gap-1.5 ca-mono text-[0.55rem] text-[#191510]/50 tracking-wide">
          <Sparkles className="size-3 text-[#191510]/60" />
          AES-256-GCM End-To-End
        </div>
      </div>
    </div>
  );
}
