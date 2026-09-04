import { Link } from "react-router-dom";
import { ArrowRight, Lock, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-4 py-16 relative bg-[#FDFBF7]">
      <div className="max-w-5xl mx-auto">
        <div className="relative p-8 sm:p-14 rounded-3xl border border-[#E6E0D5] hover:border-amber-300/60 transition-colors space-y-6 bg-gradient-to-br from-white via-white to-amber-100/30 shadow-xl overflow-hidden">
          
          {/* Ambient blush & amber glow inside CTA */}
          <div className="aurora-orb-amber -top-24 -right-24 w-80 h-80 opacity-60 pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-xs font-semibold">
            <ShieldCheck className="size-3.5 text-amber-800" />
            <span className="text-amber-900 uppercase tracking-wider font-bold">100% Free Forever for Personal Vaults</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight leading-tight uppercase">
            Take control of your passwords in under <span className="text-[#8B263E]">2 minutes.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#6B6560] max-w-xl font-normal leading-relaxed">
            Protect your digital identity with military-grade client-side encryption and provable zero-knowledge privacy.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-[#1a1a1a] font-semibold uppercase tracking-wide">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-600" /> No credit card needed
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-600" /> Instant browser setup
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-600" /> Unlimited passwords
            </span>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 relative z-10">
            <Link
              to="/register"
              className="glass-btn-primary py-4 px-8 text-xs font-bold uppercase tracking-widest rounded-full shadow-button hover:shadow-button-hover"
            >
              <Sparkles className="size-4" />
              <span>Open Free Vault</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              to="/login"
              className="glass-btn-secondary py-4 px-8 text-xs font-bold uppercase tracking-widest rounded-full"
            >
              <Lock className="size-4 text-[#8B263E]" />
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
