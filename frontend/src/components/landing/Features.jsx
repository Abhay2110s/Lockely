import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Cpu, Database, Key, ArrowUpRight } from "lucide-react";

const timelineItems = [
  {
    number: "01",
    tag: "CORE PROTOCOL",
    metric: "PBKDF2 // 600K ROUNDS",
    title: "Zero-Knowledge Vault Architecture",
    desc: "Your master password never crosses any network or host buffer. Cryptographic keys derive strictly inside client browser memory, rendering database breaches mathematically harmless to your personal plaintext.",
    spec: "AES-256-GCM CIPHER",
    icon: Key,
    status: "STATUS // SECURE",
  },
  {
    number: "02",
    tag: "ENTROPY ENGINE",
    metric: "HARDWARE CSPRNG",
    title: "Autonomous Hardware Key Generator",
    desc: "Generate mathematically uncrackable secrets derived directly from physical hardware entropy via the native W3C WebCrypto API. Real-time Shannon entropy meters calculate dictionary exhaustion intervals instantly.",
    spec: "128+ BITS ENTROPY",
    icon: Cpu,
    status: "STATUS // ACTIVE",
  },
  {
    number: "03",
    tag: "BREACH MONITOR",
    metric: "k-ANONYMITY HASHES",
    title: "k-Anonymity Exposure Sentinel",
    desc: "Continuous surveillance against billions of public credential dumps. Using 5-character SHA-1 prefixes, PassGuardian verifies compromised credentials without ever transmitting your full password hash.",
    spec: "SHA-1 PREFIX MATCHING",
    icon: ShieldCheck,
    status: "STATUS // ONLINE",
  },
  {
    number: "04",
    tag: "IDENTITY DEFENSE",
    metric: "RFC-6238 COMPLIANT",
    title: "Multi-Factor Authenticator & Backup Recovery",
    desc: "Integrated Time-Based One-Time Password engine compatible with standard RFC-6238 mobile apps and hardware keys. Provision single-use cryptographically salted backup recovery codes for catastrophic lockout prevention.",
    spec: "TIME-BASED TOKENS",
    icon: Lock,
    status: "STATUS // READY",
  },
  {
    number: "05",
    tag: "LIFECYCLE CONTROL",
    metric: "EPHEMERAL HEAP",
    title: "Volatile Memory Zeroization",
    desc: "Decrypted secret buffers are overwritten with cryptographic null bytes immediately upon session expiration or tab closure. No caching, no disk residue, and absolute immunity against cold-boot scrapers.",
    spec: "IMMEDIATE ZEROIZATION",
    icon: Database,
    status: "STATUS // ARMED",
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const activeItem = hoveredIndex !== null ? timelineItems[hoveredIndex] : null;
  const IconComponent = activeItem ? activeItem.icon : null;

  return (
    <section 
      id="features" 
      onMouseMove={handleMouseMove}
      className="w-full bg-[#FDFBF7] py-28 px-6 sm:px-10 lg:px-16 border-t border-[#E6E0D5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E6E0D5] pb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blush/35 border border-[#E6E0D5] text-[#8B263E] text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="size-3.5 text-[#8B263E]" />
              <span>Architectural Manifesto</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-[#1a1a1a] tracking-tight uppercase leading-none">
              Zero-Knowledge <span className="text-[#8B263E]">Timeline</span>
            </h2>
          </div>
          <div className="text-xs font-semibold text-[#6B6560] uppercase tracking-widest">
            INTERACTIVE SECURITY PROTOCOL // v2.0
          </div>
        </div>

        {/* Spread Rows */}
        <div className="w-full border-t border-[#E6E0D5] divide-y divide-[#E6E0D5]">
          {timelineItems.map((item, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.number}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`w-full py-8 px-6 sm:px-10 rounded-2xl flex items-center justify-between transition-all duration-200 cursor-default ${
                  isHovered ? "bg-blush/30 shadow-sm" : "bg-[#FDFBF7] hover:bg-blush/15"
                }`}
              >
                {/* Row Content */}
                <div className="flex items-center gap-6 sm:gap-12">
                  <span className={`font-mono text-sm sm:text-base font-bold tracking-widest transition-colors ${
                    isHovered ? "text-[#8B263E]" : "text-[#6B6560]"
                  }`}>
                     {item.number}
                  </span>
                  <div>
                    <span className="text-[0.68rem] tracking-wider text-[#6B6560] uppercase font-semibold block">
                      {item.tag}
                    </span>
                    <h3 className={`text-2xl sm:text-3xl font-extrabold uppercase tracking-tight transition-colors ${
                      isHovered ? "text-[#8B263E]" : "text-[#1a1a1a]"
                    }`}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className={`size-10 rounded-full border flex items-center justify-center transition-all ${
                  isHovered ? "bg-[#8B263E] text-white border-[#8B263E] shadow-sm" : "text-[#6B6560] bg-white border-[#E6E0D5]"
                }`}>
                  <ArrowUpRight className={`size-5 transition-transform duration-200 ${isHovered ? "rotate-45" : ""}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Cursor-Following Floating Popover Card */}
        <AnimatePresence>
          {hoveredIndex !== null && activeItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                top: mousePosition.y + 20,
                left: mousePosition.x + 20,
              }}
              className="fixed z-50 w-[360px] sm:w-[400px] bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#E6E0D5] p-6 shadow-xl pointer-events-none hidden lg:block"
            >
              {/* Top Metric & Status */}
              <div className="flex items-center justify-between border-b border-[#E6E0D5] pb-4 mb-4 text-xs">
                <span className="text-[#8B263E] font-bold tracking-wider">{activeItem.metric}</span>
                <span className="text-[#6B6560] font-semibold uppercase tracking-wider">{activeItem.status}</span>
              </div>

              {/* Card Body */}
              <div className="space-y-4">
                {IconComponent && (
                  <div className="size-9 rounded-2xl bg-blush/35 border border-[#E6E0D5] flex items-center justify-center text-[#8B263E]">
                    <IconComponent className="size-4.5" />
                  </div>
                )}
                <p className="text-xs sm:text-sm text-[#1a1a1a] leading-relaxed font-normal">
                  {activeItem.desc}
                </p>
              </div>

              {/* Bottom Cryptographic Spec */}
              <div className="mt-6 pt-4 border-t border-[#E6E0D5] flex items-center justify-between text-[0.7rem] text-[#6B6560] uppercase tracking-wider">
                <span>SPECIFICATION</span>
                <span className="text-[#8B263E] font-bold">{activeItem.spec}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}