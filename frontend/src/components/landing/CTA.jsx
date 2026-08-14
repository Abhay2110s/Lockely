import { Link } from "react-router-dom";
import { ArrowRight, Lock, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import { ShineBorder } from "@/components/ui/shine-border";

export default function CTA() {
  return (
    <section className="px-6 py-24 bg-slate-50/50 border-t border-slate-200/60">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="relative rounded-[1.6rem] overflow-visible shadow-2xl p-[3px]">
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
            <div className="relative overflow-hidden rounded-[1.4rem] bg-slate-900 text-white p-10 sm:p-16">
              {/* Ambient Background Glow */}
              <div className="absolute top-0 right-0 size-96 bg-gradient-to-bl from-indigo-500/30 via-purple-500/20 to-transparent blur-3xl pointer-events-none rounded-full" />
              <div className="absolute bottom-0 left-0 size-96 bg-gradient-to-tr from-teal-500/20 via-indigo-500/20 to-transparent blur-3xl pointer-events-none rounded-full" />

              <div className="relative z-10 grid lg:grid-cols-[1fr_auto] items-center gap-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-indigo-300">
                    <ShieldCheck className="size-4 text-emerald-400" />
                    <span>Free Forever for Personal Vaults</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-2xl leading-tight">
                    Take control of your passwords in under 2 minutes.
                  </h2>

                  <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
                    Join thousands of developers and security-conscious individuals protecting their digital identities with PassGuardian.
                  </p>

                  <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-400" /> No credit card required
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-400" /> Instant zero-knowledge setup
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-400" /> Unlimited items
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-4 shrink-0">
                  <MagneticButton>
                    <Link
                      to="/sign-up"
                      className="btn-soft-primary px-8 py-4 text-sm font-bold flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30"
                    >
                      <Sparkles className="size-4" />
                      Open Free Vault
                      <ArrowRight className="size-4" />
                    </Link>
                  </MagneticButton>

                  <MagneticButton>
                    <Link
                      to="/sign-in"
                      className="px-8 py-4 text-sm font-bold flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all"
                    >
                      <Lock className="size-4 text-indigo-300" />
                      Sign In to Existing Vault
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
