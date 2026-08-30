import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen app-bg flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="aurora-orb-burgundy top-[20%] left-[30%] w-[450px] h-[450px]" />
      <div className="aurora-orb-blush bottom-[20%] right-[30%] w-[450px] h-[450px]" />

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-pink-500/25 shadow-2xl max-w-md w-full relative z-10 flex flex-col items-center">
        <div className="size-16 rounded-2xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#be2656]/30 border border-white/20">
          <ShieldCheck className="size-8" />
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight">404</h1>
        <p className="text-lg font-bold text-[#fda4b8] mt-2">Page Not Found</p>
        <p className="text-xs text-[#ffe4e9]/80 max-w-xs mt-2 leading-relaxed">
          The vault page or resource you requested could not be located or has been relocated.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="glass-btn-primary px-6 py-2.5 text-xs font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="size-4" /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
