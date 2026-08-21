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
      <div className="relative hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col justify-between overflow-hidden bg-[#fef08a] border-r-3 border-[#18181b] p-10 xl:p-12">
        <Link to="/" className="relative z-10 flex items-center gap-3 w-fit group">
          <div className="size-12 rounded-2xl bg-[#6366f1] border-2.5 border-[#18181b] flex items-center justify-center shadow-[3px_3px_0px_#18181b] group-hover:rotate-6 transition-transform">
            <ShieldCheck className="size-6 text-white" />
          </div>
          <div>
            <p className="font-heading-comic font-black text-2xl text-slate-950 tracking-tight leading-none">
              PassGuardian
            </p>
            <span className="text-[0.68rem] font-heading-comic font-black text-slate-800 bg-white px-2 py-0.5 rounded border border-[#18181b] mt-1 inline-block">
              COMIC EDITION 💥
            </span>
          </div>
        </Link>

        <div className="relative z-10 max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b]">
            <Zap className="size-4 fill-amber-400 text-slate-950" />
            <span className="text-xs font-heading-comic font-bold text-slate-950">
              Fortress For Your Secrets
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl xl:text-5xl font-heading-comic font-black tracking-tight text-slate-950 leading-[1.05]">
              One Vault.
              <br />
              Zero Compromises!
            </h1>
            <p className="text-sm font-comic font-bold leading-6 text-slate-800">
              Your passwords never leave your machine in plaintext. Everything is locked with AES-256 client keys!
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {features.map(({ icon: Icon, label, bg }) => (
              <div
                key={label}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl ${bg} border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b] text-xs font-heading-comic font-bold text-slate-950`}
              >
                <Icon className="size-4 text-slate-950" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs font-heading-comic font-bold text-slate-800 flex items-center gap-1.5">
          <Sparkles className="size-4 text-indigo-700" />
          End-to-End Encrypted · Client Master Key Derivation
        </div>
      </div>

      {/* Main Outlet Card Container */}
      <main className="flex-1 min-w-0 flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-md bg-[#fffef7] border-3 border-[#18181b] rounded-3xl p-6 sm:p-9 shadow-[6px_6px_0px_#18181b]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
