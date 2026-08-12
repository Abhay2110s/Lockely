import { Link, Outlet } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import AnimatedBackground from "@/components/animations/AnimatedBackground";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-slate-900 flex flex-col justify-between overflow-hidden">
      {/* Background design */}
      <AnimatedBackground />

      {/* Top Header Navigation */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="size-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
              PassGuardian
            </span>
            <span className="text-[0.65rem] font-semibold tracking-wider text-slate-400 uppercase">
              Zero-Knowledge Vault
            </span>
          </div>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-indigo-600 transition-colors bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/80 shadow-xs"
        >
          <ArrowLeft className="size-3.5" />
          Back to Home
        </Link>
      </header>

      {/* Main Form Center Content */}
      <main className="relative z-20 flex-1 flex items-center justify-center p-4">
        <div className="w-full flex justify-center">
          <Outlet />
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="relative z-20 w-full py-4 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} PassGuardian. Protected by end-to-end zero-knowledge security.
      </footer>
    </div>
  );
}
