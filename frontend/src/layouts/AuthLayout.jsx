import { Link, Outlet } from "react-router-dom";
import { ShieldCheck, Lock, Eye, KeyRound, Sparkles, Zap } from "lucide-react";

const features = [
  { icon: Lock, label: "AES-256 GCM", bg: "bg-[#fef08a]" },
  { icon: Eye, label: "Zero-Knowledge", bg: "bg-[#bae6fd]" },
  { icon: KeyRound, label: "Master Key Crypto", bg: "bg-[#bbf7d0]" },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex overflow-hidden bg-[#faf6ea] font-comic">
      {/* Left Comic Hero Banner */}
      <div className="relative hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col justify-between overflow-hidden bg-[#ffe066] border-r-[3px] border-[#191510] p-10 xl:p-12">
        <Link to="/" className="relative z-10 flex items-center gap-3 w-fit group">
          <div className="size-12 bg-[#191510] border-2 border-[#191510] flex items-center justify-center shadow-[3px_3px_0px_#191510] group-hover:-rotate-6 transition-transform">
            <ShieldCheck className="size-6 text-[#ffe066]" />
          </div>
          <div>
            <p className="ca-display text-2xl text-[#191510] leading-none">
              PASSGUARDIAN
            </p>
          </div>
        </Link>

        <div className="relative z-10 max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#191510] shadow-[2px_2px_0px_#191510]">
            <Zap className="size-4 fill-amber-400 text-slate-950" />
            <span className="text-xs font-heading-comic font-bold text-slate-950">
              Fortress For Your Secrets
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="ca-display text-4xl xl:text-5xl text-[#191510] leading-none">
              One Vault.<br />Zero Compromises!
            </h1>
            <p className="ca-mono text-[0.7rem] text-[#191510]/70 leading-6">
              Passwords never leave your machine in plaintext. Everything locked with AES-256 client keys.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {features.map(({ icon: Icon, label, bg }) => (
              <div
                key={label}
                className={`inline-flex items-center gap-2 px-3.5 py-2 ${bg} border-2 border-[#191510] shadow-[2px_2px_0px_#191510] ca-mono text-[0.62rem] text-[#191510]`}
              >
                <Icon className="size-4 text-[#191510]" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 ca-mono text-[0.62rem] text-[#191510]/60 flex items-center gap-1.5">
          <Sparkles className="size-4 text-[#191510]" />
          End-to-End Encrypted · Client Master Key Derivation
        </div>
      </div>

      {/* Main Outlet Card Container */}
      <main className="flex-1 min-w-0 flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-md bg-white border-[3px] border-[#191510] p-6 sm:p-9 shadow-[6px_6px_0px_#191510]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
