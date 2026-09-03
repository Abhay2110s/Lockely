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
      <div className="aurora-orb-blush -top-20 -left-20 w-[500px] h-[500px]" />
      <div className="aurora-orb-burgundy -bottom-20 right-1/4 w-[450px] h-[450px]" />

      {/* Left Editorial Hero Banner */}
      <div className="relative hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col justify-between overflow-hidden bg-white/80 backdrop-blur-xl border-r border-[#E6E0D5] p-10 xl:p-12 z-10 shadow-sm">
        <Link to="/" className="relative z-10 flex items-center gap-3.5 w-fit group">
          <div className="size-11 rounded-2xl bg-blush/30 border border-[#E6E0D5] group-hover:border-[#8B263E] flex items-center justify-center text-[#8B263E] transition-colors shadow-sm">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-[#1a1a1a] tracking-tight leading-none uppercase">
              PASS<span className="text-[#8B263E]">GUARDIAN</span>
            </p>
            <p className="text-[0.65rem] text-[#6B6560] uppercase tracking-widest font-semibold mt-1">
              Zero-Knowledge Vault
            </p>
          </div>
        </Link>

        <div className="relative z-10 max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blush/35 border border-[#E6E0D5] text-xs font-semibold uppercase tracking-wider text-[#8B263E]">
            <Zap className="size-3.5 fill-current" />
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
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDFBF7] border border-[#E6E0D5] text-[#1a1a1a] text-xs font-medium shadow-xs"
              >
                <Icon className="size-3.5 text-[#8B263E]" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-[#6B6560] flex items-center justify-between font-medium">
          <div className="flex items-center gap-1.5 text-[#8B263E] font-semibold">
            <Sparkles className="size-3.5" />
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
