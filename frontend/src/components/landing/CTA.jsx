import { Link } from "react-router-dom";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MagneticButton from "@/components/animations/MagneticButton";

export default function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 p-10 md:p-16 shadow-xl shadow-indigo-500/20 text-white">
            {/* Subtle Ambient White Blobs */}
            <div className="absolute -right-20 -bottom-20 size-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 size-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid md:grid-cols-[1fr_auto] items-center gap-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white mb-4 border border-white/20">
                  <Lock className="size-3.5" />
                  Zero-Knowledge Encryption
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-xl">
                  Ready to close the file on weak passwords?
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-indigo-100">
                  Open your encrypted vault in under two minutes. Free forever for personal credentials.
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <MagneticButton>
                  <Link
                    to="/sign-up"
                    className="btn-soft-secondary flex items-center justify-center gap-2 text-sm font-bold shadow-lg hover:scale-105 transition-transform !text-indigo-950"
                  >
                    <Sparkles className="size-4 text-indigo-600" />
                    Create Free Vault
                    <ArrowRight className="size-4" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
