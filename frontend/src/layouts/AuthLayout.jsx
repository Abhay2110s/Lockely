import { Link, Outlet } from "react-router-dom";
import { ShieldCheck, Lock, Eye, KeyRound, Sparkles, Zap, ArrowLeft } from "lucide-react";

const features = [
  { icon: Lock, label: "AES-256 GCM" },
  { icon: Eye, label: "Zero-Knowledge" },
  { icon: KeyRound, label: "PBKDF2 Derivation" },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex overflow-hidden bg-[#000000] text-[#F8F9FA] relative">
      {/* Left Editorial Hero Banner */}
      <div className="relative hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col justify-between overflow-hidden bg-[#111111] border-r border-[#222222] p-10 xl:p-12 z-10">
        <Link to="/" className="relative z-10 flex items-center gap-3 w-fit group">
          <div className="size-11 bg-[#000000] border border-[#222222] group-hover:border-[#00FF66] flex items-center justify-center text-[#00FF66] transition-colors">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-[#F8F9FA] tracking-tight leading-none uppercase">
              PASS<span className="text-[#00FF66]">GUARDIAN</span>
            </p>
            <p className="text-[0.62rem] text-[#6B7280] uppercase tracking-widest font-mono-code font-bold mt-0.5">
              Zero-Knowledge Vault
            </p>
          </div>
        </Link>

        <div className="relative z-10 max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#000000] border border-[#222222] text-xs font-mono-code uppercase tracking-wider text-[#00FF66]">
            <Zap className="size-3.5 fill-current" />
            <span>Fortress For Your Secrets</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl xl:text-4xl font-black text-[#F8F9FA] leading-tight tracking-tighter uppercase">
              One Secure Vault.<br />
              <span className="text-[#00FF66]">Zero Compromises.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
              Passwords never leave your machine in plaintext. Everything is locally encrypted with AES-256 client keys derived in your browser.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#000000] border border-[#222222] text-[#F8F9FA] text-xs font-mono-code uppercase tracking-wider"
              >
                <Icon className="size-3.5 text-[#00FF66]" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[0.7rem] text-[#6B7280] font-mono-code flex items-center justify-between uppercase tracking-wider">
          <div className="flex items-center gap-1.5 text-[#00FF66]">
            <Sparkles className="size-3.5" />
            End-to-End Encrypted
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[#6B7280] hover:text-[#F8F9FA] transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to Home
          </Link>
        </div>
      </div>

      {/* Main Outlet Card Container */}
      <main className="flex-1 min-w-0 flex items-center justify-center p-4 sm:p-8 lg:p-12 z-10 bg-[#000000]">
        <div className="w-full max-w-md bg-[#111111] p-6 sm:p-9 border border-[#222222] relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
