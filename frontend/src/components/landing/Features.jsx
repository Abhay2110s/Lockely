import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
} from "lucide-react";

const featureProjects = [
  {
    id: "01",
    tabColor: "bg-[#3b82f6]",
    cardBg: "bg-[#3b82f6]",
    textColor: "text-white",
    subTextColor: "text-white/90",
    badgeBg: "bg-white",
    badgeText: "text-[#191510]",
    borderColor: "border-white",
    tabMargin: "0%",
    tagBg: "bg-white",
    tagText: "text-[#191510]",
    badge: "AES-256-GCM CIPHER",
    date: "Client-Side Core",
    title: "Zero-Knowledge Vault",
    desc: "Your master password is never sent across any network. Cryptographic keys are derived in browser RAM using PBKDF2 with 600,000 rounds before anything is stored.",
    tags: ["PBKDF2 Derivation", "256-Bit Key", "Hardware WebCrypto", "Zero Plaintext"],
    polaroidCaption: "AES-256-GCM Galois Authenticated",
    illustrationTitle: "ISOLATED VAULT",
    illustrationSub: "PBKDF2 600k Rounds",
    illustrationIcon: "🔒",
  },
  {
    id: "02",
    tabColor: "bg-[#191510]",
    cardBg: "bg-[#191510]",
    textColor: "text-white",
    subTextColor: "text-white/90",
    badgeBg: "bg-white",
    badgeText: "text-[#191510]",
    borderColor: "border-white",
    tabMargin: "22%",
    tagBg: "bg-white",
    tagText: "text-[#191510]",
    badge: "HARDWARE CSPRNG",
    date: "Sub-Millisecond",
    title: "Smart Key Generator",
    desc: "Generate uncrackable passwords tailored to custom length sliders, symbol exclusions, and pronounceable rules with real-time entropy calculation.",
    tags: ["Entropy Analyzer", "Auto-Clipboard Clear", "Custom Charsets", "Zero GPU Cracking"],
    polaroidCaption: "Cryptographic Entropy Engine",
    illustrationTitle: "CSPRNG ACTIVE",
    illustrationSub: "128+ Bits True Entropy",
    illustrationIcon: "⚡",
  },
  {
    id: "03",
    tabColor: "bg-[#ffe066]",
    cardBg: "bg-[#ffe066]",
    textColor: "text-[#191510]",
    subTextColor: "text-[#191510]/85",
    badgeBg: "bg-[#191510]",
    badgeText: "text-white",
    borderColor: "border-[#191510]",
    tabMargin: "44%",
    tagBg: "bg-[#191510]",
    tagText: "text-white",
    badge: "k-ANONYMITY WATCH",
    date: "Proactive Monitor",
    title: "Breach Sentinel",
    desc: "Checks anonymized SHA-1 hash prefixes against billions of exposed passwords in real-time. Detect duplicate and weak credentials instantly.",
    tags: ["k-Anonymity Hashes", "Duplicate Detection", "Strength Meter", "No Hash Exposure"],
    polaroidCaption: "Zero-Exposure Hash Watcher",
    illustrationTitle: "BREACH SHIELD",
    illustrationSub: "SHA-1 Prefix Lookup",
    illustrationIcon: "🛡️",
  },
  {
    id: "04",
    tabColor: "bg-[#ff5e89]",
    cardBg: "bg-[#ff5e89]",
    textColor: "text-white",
    subTextColor: "text-white/90",
    badgeBg: "bg-white",
    badgeText: "text-[#191510]",
    borderColor: "border-white",
    tabMargin: "66%",
    tagBg: "bg-white",
    tagText: "text-[#191510]",
    badge: "RFC-6238 TOTP",
    date: "Two-Factor Auth",
    title: "Authenticator 2FA",
    desc: "Integrated Time-Based One-Time Password engine compatible with Google Authenticator, Authy, and hardware tokens with backup recovery codes.",
    tags: ["TOTP Generator", "QR Provisioning", "Backup Codes", "Rate-Limited"],
    polaroidCaption: "Two-Factor Authentication",
    illustrationTitle: "TOTP AUTH",
    illustrationSub: "RFC-6238 Compliant",
    illustrationIcon: "🔑",
  },
];

function Card({ i, feat, progress, range, targetScale }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Entry transforms: card translates up and scales into position smoothly
  const translateY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scaleIn = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  
  // Stacking transform: as subsequent cards scroll over, smoothly scale down
  const scaleOut = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="min-h-[85vh] sm:min-h-[92vh] flex items-start justify-center sticky top-20 sm:top-24 lg:top-28 will-change-transform"
      style={{ zIndex: i + 1 }}
    >
      <motion.div
        style={{
          y: translateY,
          scale: i === featureProjects.length - 1 ? scaleIn : scaleOut,
          top: `calc(10px + ${i * 26}px)`,
          transformOrigin: "top center",
        }}
        className="relative w-full max-w-5xl"
      >
        {/* Staggered Folder Tab Header */}
        <div
          className="flex transition-transform duration-300 group-hover:-translate-y-1"
          style={{
            marginLeft: `min(${feat.tabMargin}, calc(100% - 240px))`,
          }}
        >
          <span
            className={`ca-mono inline-flex items-center gap-2 py-2.5 pr-8 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:gap-3 sm:py-3.5 sm:pr-14 ${feat.tabColor} ${feat.textColor} pl-8 [clip-path:polygon(28px_0,calc(100%-28px)_0,100%_100%,0_100%)] sm:pl-12 sm:[clip-path:polygon(42px_0,calc(100%-42px)_0,100%_100%,0_100%)] shadow-md`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              aria-hidden="true"
            >
              <path d="M12 2c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9Z" />
            </svg>
            Feature {feat.id}
          </span>
        </div>

        {/* Main Card Body */}
        <div
          className={`grid grid-cols-1 gap-6 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-12 min-h-[500px] sm:min-h-[540px] lg:min-h-[580px] ${feat.cardBg} border-3 border-[#191510] shadow-[8px_8px_0_#191510] transition-shadow duration-300`}
        >
          {/* Left Column: Details */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <span
                className={`ca-mono inline-flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] ${feat.textColor}`}
              >
                <span className="h-3 w-3 rounded-full bg-white animate-pulse" />
                {feat.badge}
              </span>

              <h2
                className={`mt-4 sm:mt-6 text-3xl sm:text-5xl xl:text-6xl font-semibold tracking-tight ${feat.textColor} ca-display leading-tight`}
              >
                {feat.title}
              </h2>

              <p
                className={`mt-4 max-w-lg text-sm sm:text-base lg:text-lg leading-relaxed ${feat.subTextColor}`}
              >
                {feat.desc}
              </p>

              <a
                href="#interactive-demo"
                className={`ca-mono mt-6 inline-flex items-center gap-2.5 self-start border-b-2 pb-1 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] ${feat.textColor} border-current hover:translate-x-1 transition-transform`}
              >
                Try in live sandbox
                <ArrowUpRight className="size-4" />
              </a>
            </div>

            {/* Bottom Cutout Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-current/20">
              {feat.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className={`ca-mono px-3 py-1.5 text-xs font-bold uppercase tracking-wide [clip-path:polygon(0_28%,12%_0,100%_0,100%_100%,0_100%)] ${feat.tagBg} ${feat.tagText} shadow-[1.5px_1.5px_0_#191510] hover:-translate-y-0.5 transition-transform cursor-default`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Polaroid Graphic */}
          <div className="self-center">
            <div className="relative group/polaroid">
              <span
                aria-hidden="true"
                className="absolute -left-5 -top-3 z-10 h-6 w-24 -rotate-[9deg] bg-white/60 shadow-[0_1px_3px_rgba(17,18,18,0.15)] group-hover/polaroid:-rotate-[14deg] transition-transform duration-300"
              />
              <span
                aria-hidden="true"
                className="absolute -right-5 -top-3 z-10 h-6 w-24 rotate-[9deg] bg-white/60 shadow-[0_1px_3px_rgba(17,18,18,0.15)] group-hover/polaroid:rotate-[14deg] transition-transform duration-300"
              />

              <div
                className={`relative overflow-hidden border-4 ${feat.borderColor} bg-[#faf6ea] aspect-square w-full sm:h-[340px] lg:h-[380px] flex flex-col items-center justify-center p-6 text-center shadow-[0_8px_24px_rgba(17,18,18,0.2)] transition-transform duration-500 group-hover/polaroid:scale-[1.02]`}
              >
                <div className="flex flex-col items-center space-y-4">
                  <span className="text-4xl sm:text-5xl animate-bounce">
                    {feat.illustrationIcon}
                  </span>
                  <span className="ca-mono text-xs font-black bg-[#ffe066] text-[#191510] px-3.5 py-1.5 border-2 border-[#191510] shadow-[2px_2px_0_#191510]">
                    {feat.illustrationTitle}
                  </span>
                  <p className="ca-display text-xl sm:text-2xl text-[#191510] tracking-tight">
                    {feat.polaroidCaption}
                  </p>
                  <p className="ca-mono text-xs text-[#191510]/70 font-bold">
                    {feat.illustrationSub}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Features() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="features" ref={container} className="ca-grid scroll-mt-24 pb-28 pt-8">
      {/* Hand-drawn Curved Wave Divider */}
      <svg
        viewBox="0 0 1440 130"
        fill="none"
        preserveAspectRatio="none"
        className="h-16 w-full sm:h-24 -mx-4 w-[calc(100%+2rem)] text-[#191510]/20"
        aria-hidden="true"
      >
        <path
          d="M-10 120C420 10 1030 4 1450 80"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </svg>

      {/* Section Header */}
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-14 text-center sm:pb-20">
        <div className="flex flex-col items-center text-[#191510]">
          <p className="ca-hand text-2xl sm:text-3xl">explore core features!</p>
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

        <span className="mt-4 block text-center">
          <span className="ca-display text-5xl sm:text-7xl lg:text-8xl leading-[0.92] tracking-tight text-[#191510]">
            VAULT ARSENAL
          </span>
        </span>

        {/* Washi Tape Description */}
        <div className="mt-6 max-w-md -rotate-2">
          <span className="ca-tape inline-block px-6 py-2 text-sm sm:text-base font-bold text-[#191510] shadow-sm [clip-path:polygon(1.5%_0,100%_8%,98.5%_100%,0_92%)] bg-[#ffe066] border border-[#191510]/20">
            Four powerful instruments engineered for absolute privacy and speed.
          </span>
        </div>
      </div>

      {/* Stacked Cards Deck with Exact Scroll-Driven Parallax */}
      <div className="relative px-4 sm:px-8 lg:px-20 max-w-6xl mx-auto">
        {featureProjects.map((feat, idx) => {
          const targetScale = 1 - (featureProjects.length - idx) * 0.04;
          return (
            <Card
              key={feat.id}
              i={idx}
              feat={feat}
              progress={scrollYProgress}
              range={[idx * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
