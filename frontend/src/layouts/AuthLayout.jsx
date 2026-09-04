import { Link, Outlet } from "react-router-dom";
import { ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#FDFBF7] text-[#1a1a1a] relative overflow-hidden">
      {/* Ambient background glows — Yellow & Blush Pink blend */}
      <div className="aurora-orb-amber -top-28 -left-28 w-[650px] h-[650px] opacity-90 pointer-events-none" />
      <div className="aurora-orb-blush -bottom-28 -right-28 w-[650px] h-[650px] opacity-85 pointer-events-none" />
      <div className="aurora-orb-amber top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] opacity-60 pointer-events-none" />

      {/* Top Brand Header */}
      <div className="relative z-10 flex flex-col items-center justify-center mb-6 text-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 text-[#8B263E] flex items-center justify-center shadow-md relative group-hover:border-[#8B263E] transition-colors">
            <ShieldCheck className="size-6" />
            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-amber-400 ring-2 ring-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-black tracking-tight text-[#1a1a1a]">
              Lockely
            </span>
            <span className="text-[0.68rem] font-extrabold text-amber-900 uppercase tracking-widest">
              Secure Vault
            </span>
          </div>
        </Link>
      </div>

      {/* Main Outlet Card Container — Centered */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl p-7 sm:p-10 rounded-3xl border border-[#E6E0D5] hover:border-amber-300/70 shadow-2xl relative z-10 transition-colors">
        <Outlet />
      </div>

      {/* Bottom Footer Action */}
      <div className="mt-6 flex flex-col items-center gap-2 relative z-10">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-xs bg-amber-500/10 border border-amber-400/30 px-3.5 py-1.5 rounded-full shadow-xs">
          <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
          <Sparkles className="size-3.5 text-amber-700" />
          AES-256 Zero-Knowledge Encryption
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B6560] hover:text-[#8B263E] transition-colors uppercase tracking-wider mt-1"
        >
          <ArrowLeft className="size-3.5" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
