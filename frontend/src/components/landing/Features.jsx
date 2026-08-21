import {
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
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
    tabMargin: "0px",
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
    tabMargin: "min(calc(21% - 30px), calc(100% - 280px))",
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
    tabMargin: "min(calc(42% - 30px), calc(100% - 280px))",
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
    tabMargin: "min(calc(63% - 30px), calc(100% - 280px))",
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

export default function Features() {
  return (
    <section id="features" className="ca-grid scroll-mt-24 pb-36 pt-8">
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

      {/* Sticky Stacking Deck of Feature Cards (Reference: Creative-Artsy Sticky Card Stack) */}
      <div className="flex flex-col gap-16 px-4 sm:px-8 lg:px-20 max-w-6xl mx-auto lg:gap-[12vh]">
        {featureProjects.map((feat, idx) => (
          <article
            key={feat.id}
            className="lg:sticky lg:top-28 transition-all duration-300 group"
          >
            {/* Staggered Folder Tab Header with Clip Path */}
            <div
              className="flex transition-transform duration-300 group-hover:-translate-y-1"
              style={{
                marginLeft: feat.tabMargin,
              }}
            >
              <span
                className={`ca-mono inline-flex items-center gap-2 py-3 pr-10 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:gap-3 sm:py-4 sm:pr-16 ${feat.tabColor} ${feat.textColor} pl-10 [clip-path:polygon(32px_0,calc(100%-32px)_0,100%_100%,0_100%)] sm:pl-14 sm:[clip-path:polygon(48px_0,calc(100%-48px)_0,100%_100%,0_100%)] shadow-md`}
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

            {/* Main Full-Height Card Body with Sticky Depth */}
            <div
              className={`grid grid-cols-1 gap-6 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-14 lg:min-h-[calc(100vh-14rem)] ${feat.cardBg} border-3 border-[#191510] shadow-[8px_8px_0_#191510] group-hover:shadow-[12px_12px_0_#191510] transition-shadow duration-300`}
            >
              {/* Left Column: Details & Information */}
              <div className="flex flex-col justify-between">
                <div>
                  <span
                    className={`ca-mono inline-flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] ${feat.textColor}`}
                  >
                    <span className="h-3 w-3 rounded-full bg-white animate-pulse" />
                    {feat.badge}
                  </span>

                  <h2
                    className={`mt-6 text-4xl sm:text-6xl xl:text-7xl font-semibold tracking-tight ${feat.textColor} ca-display leading-tight`}
                  >
                    {feat.title}
                  </h2>

                  <p
                    className={`mt-5 max-w-lg text-base sm:text-lg leading-relaxed ${feat.subTextColor}`}
                  >
                    {feat.desc}
                  </p>

                  <a
                    href="#interactive-demo"
                    className={`ca-mono mt-8 inline-flex items-center gap-2.5 self-start border-b-2 pb-1 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] ${feat.textColor} border-current hover:translate-x-1 transition-transform`}
                  >
                    Try in live sandbox
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>

                {/* Bottom Cutout Tags */}
                <div className="mt-8 flex flex-wrap gap-2.5 pt-8 border-t border-current/20">
                  {feat.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`ca-mono px-3.5 pb-1.5 pt-2 text-xs sm:text-sm font-bold uppercase tracking-wide [clip-path:polygon(0_28%,12%_0,100%_0,100%_100%,0_100%)] ${feat.tagBg} ${feat.tagText} shadow-[1.5px_1.5px_0_#191510] hover:-translate-y-0.5 transition-transform cursor-default`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Creative Artsy Polaroid Graphic with Corner Washi Tapes */}
              <div className="lg:self-center">
                <div className="relative group/polaroid">
                  {/* Washi Tape Strips on Top Corners */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-5 -top-3 z-10 h-6 w-24 -rotate-[9deg] bg-white/60 shadow-[0_1px_3px_rgba(17,18,18,0.15)] group-hover/polaroid:-rotate-[14deg] transition-transform duration-300"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -right-5 -top-3 z-10 h-6 w-24 rotate-[9deg] bg-white/60 shadow-[0_1px_3px_rgba(17,18,18,0.15)] group-hover/polaroid:rotate-[14deg] transition-transform duration-300"
                  />

                  {/* Frame Container */}
                  <div
                    className={`relative overflow-hidden border-4 ${feat.borderColor} bg-[#faf6ea] aspect-square w-full lg:aspect-auto lg:h-[calc(100vh-21rem)] flex flex-col items-center justify-center p-8 text-center shadow-[0_8px_24px_rgba(17,18,18,0.2)] transition-transform duration-500 group-hover/polaroid:scale-[1.02]`}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <span className="text-5xl sm:text-6xl animate-bounce">
                        {feat.illustrationIcon}
                      </span>
                      <span className="ca-mono text-xs font-black bg-[#ffe066] text-[#191510] px-3.5 py-1.5 border-2 border-[#191510] shadow-[2px_2px_0_#191510]">
                        {feat.illustrationTitle}
                      </span>
                      <p className="ca-display text-2xl sm:text-3xl text-[#191510] tracking-tight">
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
          </article>
        ))}
      </div>
    </section>
  );
}
