import { Link } from "react-router-dom";
import { ArrowRight, Lock, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-4 py-16 relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative p-7 sm:p-12 rounded-3xl border-2 border-[#3F3AA5]/40 shadow-2xl space-y-6 overflow-hidden bg-gradient-to-br from-[#120e52] via-[#1A126E] to-[#241C7F] animate-burgundy-border">
          
          {/* Ambient Violet Glows */}
          <div className="absolute top-0 right-0 size-72 rounded-full bg-[#6554DE]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 size-60 rounded-full bg-[#3F3AA5]/30 blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full landing-badge text-xs">
            <ShieldCheck className="size-3.5 text-[#8B7FF0]" />
            <span className="text-[#D5D1FC] font-bold">100% Free Forever for Personal Vaults</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Take control of your passwords in under <span className="text-gradient-warm">2 minutes.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#B4ADFA] max-w-xl font-medium leading-relaxed">
            Protect your digital identity with military-grade client-side encryption and provable zero-knowledge privacy.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-[#D5D1FC] font-semibold">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-400" /> No credit card needed
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-400" /> Instant browser setup
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-400" /> Unlimited passwords
            </span>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 relative z-10">
            <Link
              to="/register"
              className="glass-btn-primary py-3.5 px-8 text-sm shadow-xl"
            >
              <Sparkles className="size-4" />
              <span>Open Free Vault</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              to="/login"
              className="glass-btn-secondary py-3.5 px-7 text-sm"
            >
              <Lock className="size-4 text-[#8B7FF0]" />
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
