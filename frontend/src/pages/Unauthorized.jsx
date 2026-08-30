import { Link } from "react-router-dom";
import { ShieldX, ArrowLeft, Home } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen app-bg flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="aurora-orb-burgundy top-[20%] left-[30%] w-[450px] h-[450px]" />
      <div className="aurora-orb-blush bottom-[20%] right-[30%] w-[450px] h-[450px]" />

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-rose-500/30 shadow-2xl max-w-md w-full relative z-10 flex flex-col items-center">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="size-20 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-950/50">
            <ShieldX className="size-10" />
          </div>
          <div className="absolute -top-1.5 -right-1.5 size-6 rounded-full bg-[#f43f6e] text-white flex items-center justify-center text-xs font-black shadow-md">
            !
          </div>
        </div>

        {/* Text */}
        <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight">403</h1>
        <p className="text-xl font-bold text-rose-300 mt-2">Access Denied</p>
        <p className="text-xs text-[#ffe4e9]/80 max-w-xs mt-2 leading-relaxed">
          You don&apos;t have permission to access this vault resource. This area requires elevated privileges or authentication.
        </p>

        {/* Security badge */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs font-semibold">
          <ShieldX className="size-3.5" />
          Zero-Knowledge Access Control — Permission Denied
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="glass-btn-primary px-6 py-2.5 text-xs font-semibold inline-flex items-center gap-2"
          >
            <Home className="size-4" /> Return to Home
          </Link>
          <button
            onClick={() => history.back()}
            className="glass-btn-ghost px-6 py-2.5 text-xs font-semibold text-[#fda4b8] hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
