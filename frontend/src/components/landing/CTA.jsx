import { Link } from "react-router-dom";
import { ArrowRight, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CTA() {
  return (
    <section className="ca-grid px-4 py-24 bg-[#030b15] border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden border border-white/[0.07] bg-[#040e1c] p-8 sm:p-14 space-y-6">

          {/* Glowing orbs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #00d4ff, transparent 70%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
          />

          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#00ff9d]/20 bg-[#00ff9d]/06 px-3 py-1.5">
              <ShieldCheck className="size-3.5 text-[#00ff9d]" />
              <span className="ca-mono text-[0.62rem] text-[#00ff9d] tracking-widest">
                100% Free Forever for Personal Vaults
              </span>
            </div>

            <h2 className="ca-display text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-tight">
              Take control of your passwords in under 2 minutes.
            </h2>

            <p className="text-base sm:text-lg font-light text-[#e2eaf8]/45 max-w-xl">
              Protect your digital identity with military-grade client-side encryption and zero-knowledge privacy.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[#e2eaf8]/40">
              {["No credit card needed", "Instant client setup", "Unlimited passwords"].map((t) => (
                <span key={t} className="ca-mono flex items-center gap-2 text-[0.62rem] tracking-widest">
                  <CheckCircle2 className="size-3.5 text-[#00ff9d]" />
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/register"
                className="ca-mono inline-flex items-center gap-2.5 bg-[#00d4ff] px-6 py-3 text-xs font-bold text-[#030b15] hover:bg-[#00d4ff]/85 transition-colors tracking-widest"
              >
                <ArrowRight className="size-3.5" />
                Open Free Vault
              </Link>
              <Link
                to="/login"
                className="ca-mono inline-flex items-center gap-2.5 border border-white/[0.1] px-6 py-3 text-xs text-[#e2eaf8]/50 hover:text-white hover:border-white/20 transition-all tracking-widest"
              >
                <Lock className="size-3.5" />
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
