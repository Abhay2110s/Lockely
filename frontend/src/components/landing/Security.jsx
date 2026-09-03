import { ShieldCheck, Lock, Cpu, Database, Key, CheckCircle2 } from "lucide-react";

const steps = [
  {
    no: "01",
    title: "Master Password",
    subtitle: "Volatile RAM only",
    desc: "Your master password is never sent over any network. It stays exclusively inside browser volatile memory.",
    icon: Key,
    badge: "100% LOCAL",
  },
  {
    no: "02",
    title: "PBKDF2 Key Derivation",
    subtitle: "Salted memory-hard rounds",
    desc: "Stretches your master password into a 256-bit AES encryption key immune to GPU cracking clusters.",
    icon: Cpu,
    badge: "600,000 ROUNDS",
  },
  {
    no: "03",
    title: "AES-256-GCM Cipher",
    subtitle: "Galois authenticated tag",
    desc: "Encrypts your credentials with unique initialization vectors (IVs) and cryptographic authentication tags.",
    icon: Lock,
    badge: "AUTHENTICATED",
  },
  {
    no: "04",
    title: "Zero-Knowledge Cloud",
    subtitle: "Opaque ciphertext only",
    desc: "Cloud database stores exclusively encrypted bytes. Even the host servers have zero capability to read your secrets.",
    icon: Database,
    badge: "ZERO-SERVER ACCESS",
  },
];

export default function Security() {
  return (
    <section id="security" className="relative scroll-mt-24 px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Header — left-aligned RezonBio style */}
        <div className="max-w-2xl space-y-3 px-2 sm:px-6 lg:px-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full landing-badge">
            <ShieldCheck className="size-3.5 text-[#8B7FF0]" />
            <span className="text-xs font-semibold text-[#D5D1FC]">MATHEMATICAL ASSURANCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Provable{" "}
            <span className="text-gradient-warm">Zero-Knowledge</span>{" "}
            Architecture
          </h2>

          <p className="text-sm sm:text-base text-[#B4ADFA] font-normal leading-relaxed">
            Not a marketing claim — client-side WebCrypto mathematics that mathematically guarantees privacy.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 px-2 sm:px-6 lg:px-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.no}
                className="glass-card p-6 flex flex-col justify-between space-y-5 border border-[#3F3AA5]/30 hover:border-[#6554DE]/50 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono-code text-[#B4ADFA] px-2.5 py-1 rounded-lg bg-[#0d0a3e] border border-[#3F3AA5]/25">
                      STEP {step.no}
                    </span>
                    <span className="landing-badge text-[0.62rem]">
                      {step.badge}
                    </span>
                  </div>

                  <div className="size-12 rounded-xl bg-gradient-to-br from-[#3F3AA5] to-[#6554DE] border border-white/20 flex items-center justify-center text-white shadow-lg shadow-[#3F3AA5]/25 group-hover:scale-105 transition-transform">
                    <Icon className="size-5 text-white" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug">{step.title}</h3>
                    <p className="text-xs text-[#B4ADFA] mt-1 font-mono-code font-medium">{step.subtitle}</p>
                  </div>

                  <p className="text-xs text-[#D5D1FC]/80 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#3F3AA5]/20 flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="size-3.5 text-emerald-400" />
                  <span>Hardware Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cryptographic Trust Callout */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#3F3AA5]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 mx-2 sm:mx-6 lg:mx-12">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Open, Auditable, and Client-Autonomous</h3>
            <p className="text-xs sm:text-sm text-[#B4ADFA] max-w-2xl font-normal">
              PassGuardian uses standard W3C Web Cryptography API. We do not invent custom ciphers or rely on proprietary obfuscation.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="glass-badge-emerald px-4 py-2 text-xs font-bold font-mono-code">
              NIST SP 800-132 COMPLIANT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
