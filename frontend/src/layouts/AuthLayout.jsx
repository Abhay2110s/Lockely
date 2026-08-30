import { Link, Outlet } from "react-router-dom";
import { ShieldCheck, Lock, Eye, KeyRound, Sparkles, Zap, ArrowLeft } from "lucide-react";

const features = [
  { icon: Lock, label: "AES-256 GCM", bg: "bg-[#7a1534]/50 border-pink-500/30 text-[#ffe4e9]" },
  { icon: Eye, label: "Zero-Knowledge", bg: "bg-[#be2656]/30 border-pink-400/40 text-[#ffe4e9]" },
  { icon: KeyRound, label: "PBKDF2 Derivation", bg: "bg-[#3c0b1a]/70 border-pink-500/30 text-[#ffe4e9]" },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex overflow-hidden app-bg text-[#fff5f7] relative">
      {/* Dynamic ambient glowing background elements */}
      <div className="aurora-orb-burgundy top-[-80px] left-[-80px] w-[450px] h-[450px]" />
      <div className="aurora-orb-blush bottom-[-100px] right-[-100px] w-[500px] h-[500px]" />
      <div className="aurora-orb-burgundy top-[40%] right-[30%] w-[400px] h-[400px]" />

      {/* Left Glass Hero Banner */}
      <div className="relative hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col justify-between overflow-hidden glass-panel border-r border-pink-500/20 p-10 xl:p-12 z-10">
        <Link to="/" className="relative z-10 flex items-center gap-3 w-fit group">
          <div className="size-11 rounded-xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] border border-white/30 flex items-center justify-center shadow-lg shadow-[#be2656]/30 group-hover:scale-105 transition-transform">
            <ShieldCheck className="size-6 text-white" />
          </div>
          <div>
            <p className="text-xl font-bold text-gradient-blush tracking-tight leading-none">
              PASSGUARDIAN
            </p>
            <p className="text-[0.62rem] text-[#fda4b8] uppercase tracking-widest font-mono-code font-semibold mt-0.5">
              Zero-Knowledge Vault
            </p>
          </div>
        </Link>

        <div className="relative z-10 max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-badge-blush">
            <Zap className="size-3.5 text-[#f43f6e] fill-current" />
            <span className="text-xs font-semibold text-[#ffe4e9]">
              Fortress For Your Secrets
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight">
              One Secure Vault.<br />
              <span className="text-gradient-blush">Zero Compromises.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#fda4b8]/80 leading-relaxed font-normal">
              Passwords never leave your machine in plaintext. Everything is locally encrypted with AES-256 client keys derived in your browser.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {features.map(({ icon: Icon, label, bg }) => (
              <div
                key={label}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur-md ${bg} text-xs font-medium`}
              >
                <Icon className="size-3.5 text-[#f43f6e]" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[0.7rem] text-[#fda4b8]/70 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono-code">
            <Sparkles className="size-3.5 text-[#f43f6e]" />
            End-to-End Encrypted
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[#fda4b8] hover:text-white transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to Home
          </Link>
        </div>
      </div>

      {/* Main Outlet Card Container */}
      <main className="flex-1 min-w-0 flex items-center justify-center p-4 sm:p-8 lg:p-12 z-10">
        <div className="w-full max-w-md glass-panel p-6 sm:p-9 rounded-2xl border border-pink-500/20 shadow-2xl relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
