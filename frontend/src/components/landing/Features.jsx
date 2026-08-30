import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Lock, Wand2, Key, ShieldAlert } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const featureProjects = [
  {
    id: "01",
    badge: "AES-256-GCM CIPHER",
    icon: Lock,
    title: "Zero-Knowledge Vault",
    desc: "Your master password is never sent across any network. Cryptographic keys are derived in browser RAM using PBKDF2 with 600,000 rounds before anything is stored.",
    tags: ["PBKDF2 Derivation", "256-Bit Key", "Hardware WebCrypto", "Zero Plaintext"],
    caption: "Galois Authenticated Integrity",
    illustrationText: "ENCRYPTED_BLOB",
    metaTitle: "100% Isolated Keys",
    gradient: "from-[#3c0b1a] via-[#581026] to-[#7a1534]",
  },
  {
    id: "02",
    badge: "HARDWARE CSPRNG",
    icon: Wand2,
    title: "Smart Key Generator",
    desc: "Generate uncrackable passwords tailored to custom length sliders, symbol exclusions, and pronounceable rules with real-time entropy calculation.",
    tags: ["Entropy Analyzer", "Auto-Clipboard Clear", "Custom Charsets", "Zero GPU Cracking"],
    caption: "Cryptographic Entropy Engine",
    illustrationText: "CSPRNG_ACTIVE",
    metaTitle: "128+ Bits Entropy",
    gradient: "from-[#581026] via-[#7a1534] to-[#9f1c44]",
  },
  {
    id: "03",
    badge: "k-ANONYMITY WATCH",
    icon: ShieldAlert,
    title: "Breach Sentinel",
    desc: "Checks anonymized SHA-1 hash prefixes against billions of exposed passwords in real-time. Detect duplicate and weak credentials instantly.",
    tags: ["k-Anonymity Hashes", "Duplicate Detection", "Strength Meter", "No Hash Exposure"],
    caption: "Zero-Exposure Hash Watcher",
    illustrationText: "BREACH_SHIELD",
    metaTitle: "Instant Alerting",
    gradient: "from-[#7a1534] via-[#9f1c44] to-[#be2656]",
  },
  {
    id: "04",
    badge: "RFC-6238 TOTP",
    icon: Key,
    title: "Authenticator 2FA",
    desc: "Integrated Time-Based One-Time Password engine compatible with Google Authenticator, Authy, and hardware tokens with backup recovery codes.",
    tags: ["TOTP Generator", "QR Provisioning", "Backup Codes", "Rate-Limited"],
    caption: "Two-Factor Authentication",
    illustrationText: "TOTP_AUTHENTICATED",
    metaTitle: "Ironclad Protection",
    gradient: "from-[#9f1c44] via-[#be2656] to-[#f43f6e]",
  },
];

export default function Features() {
  const sectionRef = useRef(null);
  const stackRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!section || !stack || cards.length < 2) return;

    const N = cards.length;
    const SCROLL_DISTANCE = (N - 1) * 750;

    const ctx = gsap.context(() => {
      const stepDuration = 1;
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      cards.forEach((card, idx) => {
        if (idx === 0) return;

        const startTime = (idx - 1) * stepDuration;

        tl.fromTo(
          card,
          {
            yPercent: 110,
            opacity: 0.8,
            scale: 0.96,
          },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: stepDuration,
            ease: "power2.out",
          },
          startTime
        );

        for (let prev = 0; prev < idx; prev++) {
          const depth = idx - prev;
          tl.to(
            cards[prev],
            {
              scale: 1 - depth * 0.04,
              yPercent: -(depth * 2),
              opacity: 1 - depth * 0.15,
              duration: stepDuration,
              ease: "power2.out",
            },
            startTime
          );
        }
      });

      ScrollTrigger.create({
        trigger: stack,
        pin: true,
        pinSpacing: true,
        start: "top top+=80",
        end: `+=${SCROLL_DISTANCE}`,
        scrub: 1.2,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="scroll-mt-20 pb-20 pt-10 relative">
      {/* Header */}
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-10 text-center sm:pb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-badge-blush mb-3">
          <ShieldCheck className="size-3.5 text-[#f43f6e]" />
          <span className="text-xs font-semibold text-[#ffe4e9]">VAULT CAPABILITIES</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Architected for <span className="text-gradient-blush">Absolute Privacy.</span>
        </h2>

        <p className="mt-3.5 max-w-lg text-sm sm:text-base text-[#fda4b8]/80 font-normal">
          Four powerful cryptographic instruments engineered for zero plaintext exposure and maximum speed.
        </p>
      </div>

      {/* ── PINNED CARD STACK ─────────────────────────────────────────────── */}
      <div
        ref={stackRef}
        className="relative px-4 sm:px-8 lg:px-16 max-w-5xl mx-auto"
        style={{ overflow: "visible" }}
      >
        {featureProjects.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              style={{
                position: idx === 0 ? "relative" : "absolute",
                top: idx === 0 ? undefined : 0,
                left: idx === 0 ? undefined : 0,
                right: idx === 0 ? undefined : 0,
                zIndex: idx + 1,
                willChange: "transform, opacity",
                transformOrigin: "top center",
              }}
            >
              {/* Tab Header */}
              <div className="flex">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-t-xl glass-badge-burgundy text-xs font-bold font-mono-code border-b-0">
                  <Icon className="size-3.5 text-[#f43f6e]" />
                  Feature {feat.id}
                </span>
              </div>

              {/* Card Body */}
              <div
                className={`grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:gap-8 rounded-2xl rounded-tl-none glass-panel border border-pink-500/25 shadow-2xl bg-gradient-to-br ${feat.gradient}`}
              >
                {/* Left: Text */}
                <div className="flex flex-col justify-between space-y-5">
                  <div>
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#fda4b8] font-mono-code">
                      <span className="size-2 rounded-full bg-[#f43f6e] animate-pulse" />
                      {feat.badge}
                    </span>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {feat.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#ffe4e9]/90 font-normal">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {feat.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-black/40 text-[#fda4b8] border border-pink-500/20 font-mono-code"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Glass Widget Showcase */}
                <div className="self-center w-full max-w-sm mx-auto">
                  <div className="p-6 rounded-2xl glass-card-subtle border border-pink-500/30 text-center space-y-3 shadow-xl bg-black/30 backdrop-blur-md">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#7a1534]/80 text-[#fda4b8] border border-pink-500/30 font-mono-code">
                      {feat.illustrationText}
                    </span>
                    <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {feat.metaTitle}
                    </p>
                    <p className="text-xs text-[#fda4b8]/75 font-mono-code">
                      100% CLIENT-SIDE ENCRYPTION
                    </p>
                    <div className="pt-2 border-t border-pink-500/15 text-xs text-[#ffe4e9] font-medium">
                      {feat.caption}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
