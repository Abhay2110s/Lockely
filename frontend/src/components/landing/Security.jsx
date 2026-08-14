import { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Database, 
  Key, 
  CheckCircle, 
  Shield
} from "lucide-react";
import ShinyText from "@/components/animations/ShinyText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SpotlightCard from "@/components/animations/SpotlightCard";
import TiltCard from "@/components/animations/TiltCard";
import SealMedallion from "./SealMedallion";

const steps = [
  {
    no: "01",
    title: "Client Master Password",
    subtitle: "Entered strictly in browser memory.",
    desc: "Your key stays 100% local. Never submitted to network traffic.",
    icon: Key,
    badge: "Browser Local"
  },
  {
    no: "02",
    title: "Argon2id Key Derivation",
    subtitle: "Salted memory-hard key stretching.",
    desc: "Derives cryptographic keys immune to GPU brute-force clusters.",
    icon: Cpu,
    badge: "Memory-Hard"
  },
  {
    no: "03",
    title: "AES-256-GCM Cipher",
    subtitle: "Galois/Counter Mode Authentication.",
    desc: "Encrypts payload and attaches cryptographic integrity tags.",
    icon: Lock,
    badge: "256-Bit GCM"
  },
  {
    no: "04",
    title: "Zero-Knowledge Database",
    subtitle: "Stored as opaque ciphertext blob.",
    desc: "Our servers store raw encrypted bytes with zero ability to decrypt.",
    icon: Database,
    badge: "Zero-Server Access"
  }
];

export default function Security() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="security" className="relative px-6 py-28 bg-white border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-semibold text-emerald-800">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              Cryptographic Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Built for privacy,{" "}
              <ShinyText text="backed by mathematics." className="font-extrabold" />
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Not a vague promise — a provable end-to-end zero-knowledge security pipeline.
            </p>
          </div>
        </ScrollReveal>

        {/* 4-Step Interactive Pipeline Diagram with ShineBorder TiltCard Wrapper */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.no}
                  onClick={() => setActiveStep(idx)}
                  className="text-left w-full h-full"
                >
                  <TiltCard
                    className={`p-6 flex flex-col justify-between h-full transition-all ${
                      isSelected
                        ? "bg-indigo-50/80 ring-2 ring-indigo-500/20"
                        : "bg-slate-50/60"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-indigo-600">{step.no}</span>
                        <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                          {step.badge}
                        </span>
                      </div>

                      <div className="size-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-xs">
                        <Icon className="size-5" />
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{step.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mt-4 pt-3 border-t border-slate-200/80">
                      {step.desc}
                    </p>
                  </TiltCard>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Deep Dive Security Guarantee Card */}
        <ScrollReveal direction="up" delay={0.3}>
          <SpotlightCard className="p-8 sm:p-12 bg-slate-50 border border-slate-200 text-slate-900 rounded-3xl shadow-xl relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 size-96 bg-indigo-200/30 blur-3xl pointer-events-none rounded-full" />

            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center relative z-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-mono font-bold">
                  <Shield className="size-3.5 text-indigo-600" />
                  Zero-Knowledge Proof Standard
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Why Zero-Knowledge matters to your digital safety.
                </h3>

                <p className="text-slate-600 text-base leading-relaxed max-w-xl">
                  Even if servers or databases were compromised, your raw vault data remains 100% unreadable ciphertext without your local master password key.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                    <CheckCircle className="size-4 text-emerald-600 shrink-0" />
                    <span>No plaintext stored anywhere</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                    <CheckCircle className="size-4 text-emerald-600 shrink-0" />
                    <span>Argon2id key derivation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                    <CheckCircle className="size-4 text-emerald-600 shrink-0" />
                    <span>Client-side decryption speed</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                    <CheckCircle className="size-4 text-emerald-600 shrink-0" />
                    <span>Audited open cryptography</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-4 text-center">
                <SealMedallion size={130} className="opacity-95" />
                <div>
                  <span className="text-xs font-mono text-indigo-600 font-bold block">VERIFIED CERTIFICATE</span>
                  <span className="text-sm font-bold text-slate-900">100% Client Encrypted</span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
