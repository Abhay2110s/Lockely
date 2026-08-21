import { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Database, 
  Key, 
  CheckCircle, 
  Shield,
  Zap,
} from "lucide-react";

const steps = [
  {
    no: "01",
    title: "Master Password",
    subtitle: "Entered purely in browser RAM",
    desc: "Your master password stays local. Never sent across the network.",
    icon: Key,
    bg: "bg-[#fef08a]",
    badge: "100% Local"
  },
  {
    no: "02",
    title: "Key Derivation",
    subtitle: "PBKDF2 Salted Stretching",
    desc: "Derives a 256-bit AES cryptographic key resistant to brute-force.",
    icon: Cpu,
    bg: "bg-[#bae6fd]",
    badge: "Memory-Hard"
  },
  {
    no: "03",
    title: "AES-256-GCM",
    subtitle: "Authenticated Cipher Blob",
    desc: "Encrypts your payload with IV and AuthTag checksums.",
    icon: Lock,
    bg: "bg-[#bbf7d0]",
    badge: "256-Bit GCM"
  },
  {
    no: "04",
    title: "Zero-Knowledge Cloud",
    subtitle: "Stored as raw ciphertext",
    desc: "MongoDB stores only encrypted bytes. Zero ability to read plaintext.",
    icon: Database,
    bg: "bg-[#ddd6fe]",
    badge: "Zero-Knowledge"
  }
];

export default function Security() {
  return (
    <section id="security" className="relative px-6 py-24 bg-[#faf6ea] border-y-3 border-[#18181b] font-comic">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#bbf7d0] border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b] text-xs font-heading-comic font-bold text-slate-950">
            <ShieldCheck className="size-3.5 text-emerald-800" />
            Zero-Knowledge Pipeline 🛡️
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading-comic font-black tracking-tight text-slate-950">
            Math, Not Promises! 📐
          </h2>
          <p className="text-base text-slate-700 font-comic font-bold leading-relaxed">
            Provable client-side cryptography that keeps your vault private forever.
          </p>
        </div>

        {/* 4-Step Comic Pipeline Diagram */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.no}
                className={`${step.bg} p-6 rounded-3xl border-3 border-[#18181b] shadow-[5px_5px_0px_#18181b] flex flex-col justify-between hover:-translate-y-1 transition-all space-y-4`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-heading-comic font-black text-slate-950 bg-white px-2 py-0.5 rounded-lg border border-[#18181b]">
                      #{step.no}
                    </span>
                    <span className="text-[0.68rem] font-heading-comic font-bold bg-white px-2 py-0.5 rounded-md border border-[#18181b]">
                      {step.badge}
                    </span>
                  </div>

                  <div className="size-12 rounded-2xl bg-white border-2 border-[#18181b] flex items-center justify-center text-slate-950 shadow-[1.5px_1.5px_0px_#18181b]">
                    <Icon className="size-6" />
                  </div>

                  <div>
                    <h4 className="text-lg font-heading-comic font-black text-slate-950">{step.title}</h4>
                    <p className="text-xs text-slate-700 font-bold mt-0.5">{step.subtitle}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-800 font-bold pt-3 border-t-2 border-[#18181b]">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Security Guarantee Card */}
        <div className="p-8 sm:p-12 bg-[#fffef7] border-3 border-[#18181b] rounded-3xl shadow-[7px_7px_0px_#18181b] space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef08a] border-2 border-[#18181b] text-xs font-heading-comic font-bold text-slate-950">
              <Shield className="size-4 text-slate-950" />
              Zero-Knowledge Guarantee
            </div>

            <h3 className="text-2xl sm:text-4xl font-heading-comic font-black text-slate-950">
              Why Zero-Knowledge is the ONLY Way! 💥
            </h3>

            <p className="text-slate-700 text-sm sm:text-base font-bold leading-relaxed max-w-2xl">
              Even if our backend servers were completely compromised, attackers would only see encrypted garbled noise. Without your Master Password derived key, it is impossible to decrypt!
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                "No plaintext stored in MongoDB",
                "Client-side PBKDF2 Key Derivation",
                "Sub-millisecond WebCrypto speed",
                "Open and transparent cryptographic standard",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-heading-comic font-bold text-slate-900 bg-[#fef08a]/60 p-2.5 rounded-xl border border-[#18181b]">
                  <CheckCircle className="size-4 text-emerald-800 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
