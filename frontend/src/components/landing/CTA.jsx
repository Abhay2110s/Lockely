import { Link } from "react-router-dom";
import { ArrowRight, Lock, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-4 py-16 relative bg-[#000000]">
      <div className="max-w-5xl mx-auto">
        <div className="relative p-7 sm:p-12 border border-[#222222] space-y-6 bg-[#111111]">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#000000] border border-[#222222] text-xs font-mono-code">
            <ShieldCheck className="size-3.5 text-[#00FF66]" />
            <span className="text-[#F8F9FA] font-bold uppercase tracking-wider">100% Free Forever for Personal Vaults</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F8F9FA] tracking-tighter leading-tight uppercase">
            Take control of your passwords in under <span className="text-[#00FF66]">2 minutes.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#6B7280] max-w-xl font-normal leading-relaxed">
            Protect your digital identity with military-grade client-side encryption and provable zero-knowledge privacy.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-[#F8F9FA] font-mono-code uppercase tracking-wide">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[#00FF66]" /> No credit card needed
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[#00FF66]" /> Instant browser setup
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[#00FF66]" /> Unlimited passwords
            </span>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 relative z-10">
            <Link
              to="/register"
              className="glass-btn-primary py-3.5 px-8 text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles className="size-4" />
              <span>Open Free Vault</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              to="/login"
              className="glass-btn-secondary py-3.5 px-7 text-xs font-bold uppercase tracking-widest"
            >
              <Lock className="size-4 text-[#00FF66]" />
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
