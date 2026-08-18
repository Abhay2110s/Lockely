import { Link, Outlet } from "react-router-dom";
import { ShieldCheck, Lock, Eye, KeyRound } from "lucide-react";

const features = [
  { icon: Lock, label: "AES-256 encrypted" },
  { icon: Eye, label: "Zero-knowledge security" },
  { icon: KeyRound, label: "Strong password tools" },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex overflow-hidden bg-[#faf8f5]">
      <div className="relative hidden lg:flex lg:w-[45%] xl:w-[43%] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#1e1b4b] to-[#150f3a] px-10 xl:px-12 py-10">
        <div className="absolute -top-24 -left-24 size-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 size-64 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(165,180,252,0.6) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <Link to="/" className="relative z-10 flex items-center gap-3 w-fit">
          <div className="size-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <ShieldCheck className="size-5.5 text-indigo-300" />
          </div>
          <div>
            <p className="font-bold text-xl text-white tracking-tight leading-none">
              PassGuardian
            </p>
            <p className="text-[0.62rem] text-indigo-300/80 font-semibold tracking-widest uppercase mt-0.5">
              Zero-Knowledge Vault
            </p>
          </div>
        </Link>

        <div className="relative z-10 max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="text-[0.68rem] font-semibold text-indigo-200 tracking-wide">
              Private by design
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
              One vault.
              <br />
              Zero compromises.
            </h1>
            <p className="text-sm leading-6 text-indigo-100/65 max-w-sm">
              Keep your credentials protected with encryption built for privacy.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/6 border border-white/10 text-xs font-medium text-white/85"
              >
                <Icon className="size-3.5 text-indigo-300" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[0.68rem] text-indigo-200/45">
          Your data stays private. Your vault stays yours.
        </div>
      </div>

      <main className="flex-1 min-w-0 flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
