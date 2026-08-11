import { CheckCircle, Database, EyeOff, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import SealMedallion from "./SealMedallion";
import ShinyText from "@/components/animations/ShinyText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TiltCard from "@/components/animations/TiltCard";

const principles = [
  {
    icon: EyeOff,
    title: "Secure Password Handling",
    desc: "Analysis happens without your plaintext password ever being written to disk or sent onward.",
    badge: "Client-side Execution",
  },
  {
    icon: Database,
    title: "Minimal Data Collection",
    desc: "We process only what's needed to keep your vault working — nothing is gathered for its own sake.",
    badge: "Zero Tracking",
  },
  {
    icon: LockKeyhole,
    title: "AES-256-GCM at Rest",
    desc: "Every vault entry is encrypted with authenticated, industry-standard encryption before it's stored.",
    badge: "Authenticated Encryption",
  },
];

const clauses = [
  "End-to-End Encryption Enabled",
  "Zero-Knowledge Server Architecture",
  "Encrypted at Rest & In Transit",
  "Automated Threat Scoring",
];

export default function Security() {
  return (
    <section id="security" className="relative px-6 py-28 bg-gradient-to-b from-[#faf8f5] via-indigo-50/30 to-[#faf8f5]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto">
            <div className="pastel-badge-mint mx-auto mb-4">
              <ShieldCheck className="size-3.5" />
              Security & Architecture
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Built for privacy,{" "}
              <ShinyText text="backed by mathematics." className="font-extrabold" />
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Not a promise — a provable security design. Here is exactly what protects your credentials.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          {/* Certificate Card with ScrollReveal & Tilt */}
          <ScrollReveal direction="up" delay={0.2}>
            <TiltCard className="p-8 bg-white border border-slate-200/90 shadow-soft-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-bold uppercase tracking-wider">
                  <Sparkles className="size-3.5" /> Audit Cert. AG-256
                </div>
                <span className="pastel-badge-mint text-[0.72rem]">Verifiable</span>
              </div>

              <div className="flex justify-center py-4 relative">
                <SealMedallion size={170} className="relative z-10 opacity-90" />
              </div>

              <p className="text-center text-xl font-bold text-slate-900 mt-4">
                Sealed under <span className="text-gradient-soft">Authenticated Encryption</span>
              </p>

              <div className="mt-8 space-y-3 pt-5 border-t border-slate-100">
                {clauses.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Security Principles List */}
          <div className="space-y-4">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal
                  key={item.title}
                  direction="up"
                  delay={0.2 + index * 0.1}
                >
                  <TiltCard className="p-6 flex items-start gap-5 hover:border-indigo-300 transition-all bg-white">
                    <div className="size-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-1">
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-slate-900">
                          {item.title}
                        </h3>
                        <span className="text-[0.68rem] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-500 pt-2 px-2">
                <ShieldCheck className="size-4 text-indigo-600" />
                100% Zero-knowledge architecture — Master password never leaves your browser.
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
