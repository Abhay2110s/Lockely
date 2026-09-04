import { Link, Outlet } from "react-router-dom";
import { ShieldCheck, Lock, Eye, KeyRound, Sparkles, Zap, ArrowLeft } from "lucide-react";

const features = [
  { icon: Lock, label: "AES-256 GCM" },
  { icon: Eye, label: "Zero-Knowledge" },
  { icon: KeyRound, label: "PBKDF2 Derivation" },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex overflow-hidden bg-[#FDFBF7] text-[#1a1a1a] relative">
      {/* Ambient background glows */}
      <div className="aurora-orb-amber -top-24 -left-24 w-[550px] h-[550px] opacity-80 pointer-events-none" />
      <div className="aurora-orb-blush -top-20 left-1/3 w-[450px] h-[450px]" />
      <div className="aurora-orb-burgundy -bottom-20 right-1/4 w-[450px] h-[450px]" />

      {/* Left Editorial Hero Banner with Warm Yellowish Glow */}
      <div className="relative hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col justify-between overflow-hidden bg-gradient-to-br from-white via-white to-amber-100/35 backdrop-blur-2xl border-r border-[#E6E0D5] p-10 xl:p-12 z-10 shadow-sm">
        {/* Inner ambient yellowish orb */}
        <div className="aurora-orb-amber top-1/3 -left-32 w-80 h-80 opacity-70 pointer-events-none" />

        <Link to="/" className="relative z-10 flex items-center gap-3.5 w-fit group">
          <div className="size-11 rounded-2xl bg-amber-500/15 border border-amber-400/30 group-hover:border-[#8B263E] flex items-center justify-center text-[#8B263E] transition-colors shadow-xs relative">
            <ShieldCheck className="size-6" />
            <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-amber-400 border-2 border-white" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-[#1a1a1a] tracking-tight leading-none uppercase">
              Lockely
            </p>
            <p className="text-[0.65rem] text-amber-800 uppercase tracking-widest font-bold mt-1">
              Secure Vault
            </p>
          </div>
        </Link>

        <div className="relative z-10 max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-xs font-bold uppercase tracking-wider text-amber-900 shadow-xs">
            <Zap className="size-3.5 fill-current text-amber-600" />
            <span>Fortress For Your Secrets</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl xl:text-4xl font-extrabold text-[#1a1a1a] leading-tight tracking-tight">
              One Secure Vault.<br />
              <span className="text-[#8B263E]">Zero Compromises.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed font-normal">
              Passwords never leave your machine in plaintext. Everything is locally encrypted with AES-256 client keys derived securely in your browser.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-950 text-xs font-bold shadow-xs"
              >
                <Icon className="size-3.5 text-amber-700" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-[#6B6560] flex items-center justify-between font-medium">
          <div className="flex items-center gap-2 text-amber-800 font-bold">
            <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
            <Sparkles className="size-3.5 text-amber-600" />
            End-to-End Encrypted
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[#6B6560] hover:text-[#8B263E] transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to Home
          </Link>
        </div>
      </div>

      {/* Main Outlet Card Container */}
      <main className="flex-1 min-w-0 flex items-center justify-center p-4 sm:p-8 lg:p-12 z-10 bg-[#FDFBF7]">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl p-7 sm:p-10 rounded-3xl border border-[#E6E0D5] shadow-xl relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
