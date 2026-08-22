import { ShieldCheck, Lock, Cpu, Database, Key, CheckCircle } from "lucide-react";

const steps = [
  {
    no: "01",
    title: "Master Password",
    subtitle: "Stored in volatile RAM only",
    desc: "Your master password is never sent over any network. It stays exclusively inside browser memory.",
    icon: Key,
    bg: "bg-[#ffe066]",
    badge: "100% LOCAL",
  },
  {
    no: "02",
    title: "PBKDF2 Key Derivation",
    subtitle: "Salted memory-hard key derivation",
    desc: "Stretches your master password into a 256-bit AES encryption key immune to GPU cracking clusters.",
    icon: Cpu,
    bg: "bg-[#7dd3fc]",
    badge: "600,000 ROUNDS",
  },
  {
    no: "03",
    title: "AES-256-GCM Cipher",
    subtitle: "Galois/Counter Mode payload",
    desc: "Encrypts your credentials with unique IVs and cryptographic authentication tags.",
    icon: Lock,
    bg: "bg-[#a7f3d0]",
    badge: "AUTHENTICATED",
  },
  {
    no: "04",
    title: "Zero-Knowledge Cloud",
    subtitle: "Opaque ciphertext storage",
    desc: "MongoDB stores only encrypted bytes. Even our servers have zero capability to read your secrets.",
    icon: Database,
    bg: "bg-[#c4b5fd]",
    badge: "ZERO-SERVER ACCESS",
  },
];

export default function Security() {
  return (
    <section id="security" className="ca-grid relative scroll-mt-24 px-4 py-16 bg-[#faf6ea] border-t border-[#191510]/15">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="flex flex-col items-center text-[#191510]">
            <p className="ca-hand text-2xl sm:text-3xl">cryptographic mathematics!</p>
            <svg
              viewBox="0 0 64 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="mt-1 h-3 w-24 text-[#191510]"
              aria-hidden="true"
            >
              <path d="M3 4c18-3 40-3 58 0" />
              <path d="M9 9c14-2.5 32-2.5 46 0" />
            </svg>
          </div>

          <h2 className="ca-display text-3xl sm:text-5xl text-[#191510] tracking-tight">
            PROVABLE SECURITY
          </h2>

          <div className="inline-block -rotate-1">
            <span className="ca-tape inline-block px-5 py-1.5 text-sm font-bold text-[#191510] bg-[#a7f3d0] border border-[#191510]/30 shadow-sm [clip-path:polygon(1.5%_0,100%_8%,98.5%_100%,0_92%)]">
              Not a marketing promise — mathematical end-to-end zero-knowledge.
            </span>
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.no}
                className={`${step.bg} p-6 border-3 border-[#191510] shadow-[5px_5px_0_#191510] flex flex-col justify-between space-y-5 hover:-translate-y-1 transition-transform`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="ca-mono text-sm font-black bg-white px-2.5 py-0.5 border border-[#191510]">
                      #{step.no}
                    </span>
                    <span className="ca-mono text-[0.65rem] bg-white px-2 py-0.5 border border-[#191510]">
                      {step.badge}
                    </span>
                  </div>

                  <div className="size-11 rounded-xl bg-white border-2 border-[#191510] flex items-center justify-center shadow-[1.5px_1.5px_0_#191510]">
                    <Icon className="size-5 text-[#191510]" />
                  </div>

                  <div>
                    <h4 className="ca-display text-xl text-[#191510]">{step.title}</h4>
                    <p className="ca-mono text-[0.68rem] text-[#191510]/80 mt-1">{step.subtitle}</p>
                  </div>
                </div>

                <p className="text-xs text-[#191510] font-medium pt-3 border-t-2 border-[#191510]/40 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Security Guarantee */}
        <div className="relative p-6 sm:p-10 bg-white border-3 border-[#191510] shadow-[8px_8px_0_#191510] rounded-2xl">
          <span aria-hidden="true" className="absolute -left-5 -top-3 z-10 h-6 w-24 -rotate-[12deg] bg-[#ffe066]/80 shadow-[0_1px_3px_rgba(17,18,18,0.15)]" />
          <span aria-hidden="true" className="absolute -right-5 -top-3 z-10 h-6 w-24 rotate-[12deg] bg-[#ff5e89]/80 shadow-[0_1px_3px_rgba(17,18,18,0.15)]" />

          <div className="space-y-5">
            <span className="ca-mono text-xs font-bold bg-[#ffe066] px-3 py-1 border border-[#191510] inline-block">
              ZERO-KNOWLEDGE STANDARD
            </span>

            <h3 className="ca-display text-2xl sm:text-4xl text-[#191510] tracking-tight">
              Why Zero-Knowledge matters to your safety.
            </h3>

            <p className="text-slate-700 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              Even if our servers or databases were compromised, your vault data remains 100% unreadable ciphertext without your local master password key.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                "No plaintext stored in MongoDB",
                "Client-side PBKDF2 Key Derivation",
                "Sub-millisecond WebCrypto speed",
                "Open and transparent cryptographic standard",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#191510] bg-[#faf6ea] p-3 border border-[#191510]">
                  <CheckCircle className="size-4 text-emerald-600 shrink-0" />
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
