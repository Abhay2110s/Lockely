import { Link } from "react-router-dom";
import { ArrowRight, Lock, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-6 py-20 bg-[#faf6ea] font-comic">
      <div className="max-w-5xl mx-auto">
        <div className="p-8 sm:p-14 bg-[#fde047] border-3.5 border-[#18181b] shadow-[10px_10px_0px_#18181b] rounded-3xl space-y-6 text-slate-950">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#18181b] text-xs font-heading-comic font-black">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>100% Free Forever for Personal Vaults</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading-comic font-black tracking-tight text-slate-950 leading-tight">
            Take control of your passwords in under 2 minutes! 🚀
          </h2>

          <p className="text-base sm:text-lg font-comic font-bold text-slate-900 max-w-xl">
            Protect your digital identity with military-grade client-side encryption and zero-knowledge privacy.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm font-heading-comic font-bold text-slate-950">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-800" /> No credit card needed
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-800" /> Instant zero-knowledge setup
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-800" /> Unlimited passwords
            </span>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/register"
              className="btn-comic btn-comic-primary px-8 py-4 text-sm gap-2 text-white"
            >
              <Sparkles className="size-4" />
              Open Free Vault
              <ArrowRight className="size-4" />
            </Link>

            <Link
              to="/login"
              className="btn-comic btn-comic-white px-8 py-4 text-sm gap-2"
            >
              <Lock className="size-4 text-slate-950" />
              Sign In to Existing Vault
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
