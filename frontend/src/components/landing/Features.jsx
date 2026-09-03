import { ShieldCheck, Lock, Cpu, Database, Key } from "lucide-react";

const timelineItems = [
  {
    number: "01",
    tag: "CORE PROTOCOL",
    metric: "PBKDF2 // 600K ROUNDS",
    title: "Zero-Knowledge Vault Architecture",
    desc: "Your master password never crosses any network or host buffer. Cryptographic keys derive strictly inside client browser memory.",
    spec: "AES-256-GCM CIPHER",
    icon: Key,
    status: "STATUS // SECURE",
  },
  {
    number: "02",
    tag: "ENTROPY ENGINE",
    metric: "HARDWARE CSPRNG",
    title: "Autonomous Hardware Key Generator",
    desc: "Generate mathematically uncrackable secrets derived directly from physical hardware entropy via native W3C WebCrypto API.",
    spec: "128+ BITS ENTROPY",
    icon: Cpu,
    status: "STATUS // ACTIVE",
  },
  {
    number: "03",
    tag: "BREACH MONITOR",
    metric: "k-ANONYMITY HASHES",
    title: "k-Anonymity Exposure Sentinel",
    desc: "Continuous surveillance against public credential dumps using 5-character SHA-1 prefixes without transmitting full password hashes.",
    spec: "SHA-1 PREFIX MATCHING",
    icon: ShieldCheck,
    status: "STATUS // ONLINE",
  },
  {
    number: "04",
    tag: "IDENTITY DEFENSE",
    metric: "RFC-6238 COMPLIANT",
    title: "Multi-Factor Authenticator & Backup",
    desc: "Integrated Time-Based One-Time Password engine compatible with standard RFC-6238 mobile apps and hardware tokens.",
    spec: "TIME-BASED TOKENS",
    icon: Lock,
    status: "STATUS // READY",
  },
  {
    number: "05",
    tag: "LIFECYCLE CONTROL",
    metric: "EPHEMERAL HEAP",
    title: "Volatile Memory Zeroization",
    desc: "Decrypted secret buffers are overwritten with cryptographic null bytes immediately upon session expiration or tab closure.",
    spec: "IMMEDIATE ZEROIZATION",
    icon: Database,
    status: "STATUS // ARMED",
  },
];

export function FeatureCard({
  number,
  icon: Icon,
  title,
  desc,
  tag,
  spec,
  metric,
  status = "STATUS // OK",
  className = "",
}) {
  return (
    <div className={`bg-[#111111] border border-[#222222] hover:border-[#00FF66] transition-colors duration-100 rounded-none p-6 sm:p-8 flex flex-col justify-between space-y-6 cursor-default group ${className}`}>
      {/* Top Row: Technical Numbering & Stark White Icon */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-4">
        <div className="flex items-center gap-3 font-mono">
          {number && (
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00FF66]">
              {number} //
            </span>
          )}
          {metric && (
            <span className="text-[0.65rem] tracking-wider text-neutral-500 uppercase">
              {metric}
            </span>
          )}
        </div>
        {Icon && (
          <div className="size-8 bg-black border border-[#222222] group-hover:border-[#00FF66] transition-colors duration-100 flex items-center justify-center text-white">
            <Icon className="size-4 text-white" />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="space-y-3">
        {tag && (
          <span className="font-mono text-[0.62rem] tracking-wider text-neutral-500 uppercase block">
            {tag}
          </span>
        )}
        <h3 className="text-xl sm:text-2xl font-black text-[#F8F9FA] uppercase tracking-tight leading-snug">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
          {desc}
        </p>
      </div>

      {/* Bottom Technical Spec Footer */}
      {(spec || status) && (
        <div className="pt-4 border-t border-[#222222] flex items-center justify-between font-mono text-[0.68rem] text-neutral-500 uppercase tracking-wider">
          <span>{spec || "SPEC // CRYPTOGRAPHIC"}</span>
          <span className="text-neutral-600 group-hover:text-[#00FF66] transition-colors duration-100">
            {status}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="w-full bg-black py-24 px-6 sm:px-10 lg:px-16 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] border border-[#222222] text-[#00FF66] text-xs font-mono font-bold uppercase tracking-widest">
            <ShieldCheck className="size-3.5 text-[#00FF66]" />
            <span>[ ARCHITECTURAL MANIFESTO ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F8F9FA] tracking-tighter uppercase leading-none">
            Zero-Knowledge <span className="text-[#00FF66]">Timeline</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] font-mono uppercase tracking-wide">
            Every system layer is strictly decoupled from server trust.
          </p>
        </div>

        {/* Brutalist Grid Layout (Zero Hook Errors, 100% Reliable Responsive Design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timelineItems.map((item, index) => (
            <FeatureCard key={item.number || index} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}