import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CTA() {
  return (
    <section className="ca-grid px-4 py-20 bg-[#faf6ea] border-t border-[#191510]/15">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-8 sm:p-14 bg-[#ffe066] border-3 border-[#191510] shadow-[10px_10px_0_#191510] rounded-3xl space-y-6 text-[#191510]"
        >
          {/* Washi Tape Corners */}
          <span aria-hidden="true" className="absolute -left-6 -top-3 z-10 h-6 w-28 -rotate-[10deg] bg-[#ff5e89]/70 shadow-[0_1px_3px_rgba(17,18,18,0.15)]" />
          <span aria-hidden="true" className="absolute -right-6 -top-3 z-10 h-6 w-28 rotate-[10deg] bg-[#7dd3fc]/70 shadow-[0_1px_3px_rgba(17,18,18,0.15)]" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-[#191510] shadow-[2px_2px_0_#191510] text-xs ca-mono text-[#191510]">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>100% Free Forever for Personal Vaults</span>
          </div>

          <h2 className="ca-display text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#191510] leading-tight">
            Take control of your passwords in under 2 minutes! 🚀
          </h2>

          <p className="text-base sm:text-lg font-medium text-[#191510]/90 max-w-xl">
            Protect your digital identity with military-grade client-side encryption and zero-knowledge privacy.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm ca-mono text-[#191510]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-800" /> No credit card needed
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-800" /> Instant client setup
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-800" /> Unlimited passwords
            </span>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/register"
              className="group/cta ca-mono relative inline-flex items-center gap-3 border-2 border-[#191510] bg-[#191510] py-3.5 pl-3.5 pr-8 text-sm font-bold uppercase tracking-[0.2em] text-white hover:bg-transparent hover:text-[#191510] transition-colors"
            >
              <span className="flex size-9 items-center justify-center bg-[#60a5fa] text-[#191510] transition-colors group-hover/cta:bg-[#ff5e89] group-hover/cta:text-white">
                <Sparkles className="size-4" />
              </span>
              Open Free Vault
              <ArrowRight className="size-4" />
            </Link>

            <Link
              to="/login"
              className="ca-mono inline-flex items-center gap-2.5 border-2 border-[#191510] bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-[#191510] shadow-[3px_3px_0_#191510] hover:-translate-y-0.5 transition-transform"
            >
              <Lock className="size-4 text-[#191510]" />
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
