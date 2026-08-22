import { ShieldCheck, Lock, Cpu, Database, Key, CheckCircle } from "lucide-react";

const steps = [
  {
    no: "01",
    title: "Master Password",
    subtitle: "Stored in volatile RAM only",
    desc: "Your master password is never sent over any network. It stays exclusively inside browser memory.",
    icon: Key,
    accentColor: "#00d4ff",
    badge: "100% LOCAL",
  },
  {
    no: "02",
    title: "PBKDF2 Key Derivation",
    subtitle: "Salted memory-hard key derivation",
    desc: "Stretches your master password into a 256-bit AES encryption key immune to GPU cracking clusters.",
    icon: Cpu,
    accentColor: "#7c3aed",
    badge: "600,000 ROUNDS",
  },
  {
    no: "03",
    title: "AES-256-GCM Cipher",
    subtitle: "Galois/Counter Mode payload",
    desc: "Encrypts your credentials with unique IVs and cryptographic authentication tags.",
    icon: Lock,
    accentColor: "#00ff9d",
    badge: "AUTHENTICATED",
  },
  {
    no: "04",
    title: "Zero-Knowledge Cloud",
    subtitle: "Opaque ciphertext storage",
    desc: "MongoDB stores only encrypted bytes. Even our servers have zero capability to read your secrets.",
    icon: Database,
    accentColor: "#f59e0b",
    badge: "ZERO-SERVER ACCESS",
  },
];

export default function Security() {
  return (
    <section id="security" className="ca-grid relative scroll-mt-24 px-4 py-20 bg-[#030b15] border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="pg-badge">Cryptographic Mathematics</span>
          <h2 className="ca-display text-4xl sm:text-6xl text-white tracking-tight mt-4">
            Provable Security
          </h2>
          <p className="text-[#e2eaf8]/45 text-base font-light leading-relaxed">
            Not a marketing promise — mathematical end-to-end zero-knowledge.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.no}
                className="bg-[#040e1c] p-6 flex flex-col justify-between space-y-5 hover:bg-[#050f1f] transition-colors group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="ca-mono text-[0.6rem] tracking-widest"
                      style={{ color: step.accentColor }}
                    >
                      #{step.no}
                    </span>
                    <span
                      className="ca-mono text-[0.55rem] px-2 py-0.5 border tracking-widest"
                      style={{ color: step.accentColor, borderColor: `${step.accentColor}30`, background: `${step.accentColor}08` }}
                    >
                      {step.badge}
                    </span>
                  </div>

                  <div
                    className="size-10 flex items-center justify-center border"
                    style={{ borderColor: `${step.accentColor}25`, background: `${step.accentColor}08`, color: step.accentColor }}
                  >
                    <Icon className="size-4" />
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-white">{step.title}</h4>
                    <p className="ca-mono text-[0.58rem] text-[#e2eaf8]/35 mt-1 tracking-widest">{step.subtitle}</p>
                  </div>
                </div>

                <p className="text-xs text-[#e2eaf8]/40 leading-relaxed border-t border-white/[0.04] pt-4 font-light">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Security Guarantee */}
        <div className="relative p-8 sm:p-12 bg-[#040e1c] border border-white/[0.07]">
          {/* Cyan glow top-left */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 w-64 h-32 opacity-20"
            style={{ background: "radial-gradient(ellipse at top left, #00d4ff, transparent)" }}
          />

          <div className="relative space-y-5">
            <span className="pg-badge">Zero-Knowledge Standard</span>

            <h3 className="ca-display text-3xl sm:text-5xl text-white tracking-tight mt-4">
              Why Zero-Knowledge matters to your safety.
            </h3>

            <p className="text-[#e2eaf8]/50 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Even if our servers or databases were compromised, your vault data remains 100% unreadable
              ciphertext without your local master password key.
            </p>

            <div className="grid sm:grid-cols-2 gap-2 pt-2">
              {[
                "No plaintext stored in MongoDB",
                "Client-side PBKDF2 Key Derivation",
                "Sub-millisecond WebCrypto speed",
                "Open and transparent cryptographic standard",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#e2eaf8]/55 bg-[#030b15] px-4 py-3 border border-white/[0.05] font-light">
                  <CheckCircle className="size-3.5 text-[#00ff9d] shrink-0" />
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
