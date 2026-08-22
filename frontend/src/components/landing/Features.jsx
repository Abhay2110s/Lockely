import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const featureProjects = [
  {
    id: "01",
    accentColor: "#00d4ff",
    badge: "AES-256-GCM CIPHER",
    title: "Zero-Knowledge Vault",
    desc: "Your master password is never sent across any network. Cryptographic keys are derived in browser RAM using PBKDF2 with 600,000 rounds before anything is stored.",
    tags: ["PBKDF2 Derivation", "256-Bit Key", "Hardware WebCrypto", "Zero Plaintext"],
    polaroidCaption: "AES-256-GCM Galois Authenticated",
    illustrationText: "ENCRYPTED_BLOB",
    metaTitle: "100% Isolated Keys",
  },
  {
    id: "02",
    accentColor: "#7c3aed",
    badge: "HARDWARE CSPRNG",
    title: "Smart Key Generator",
    desc: "Generate uncrackable passwords tailored to custom length sliders, symbol exclusions, and pronounceable rules with real-time entropy calculation.",
    tags: ["Entropy Analyzer", "Auto-Clipboard Clear", "Custom Charsets", "Zero GPU Cracking"],
    polaroidCaption: "Cryptographic Entropy Engine",
    illustrationText: "CSPRNG_ACTIVE",
    metaTitle: "128+ Bits Entropy",
  },
  {
    id: "03",
    accentColor: "#00ff9d",
    badge: "k-ANONYMITY WATCH",
    title: "Breach Sentinel",
    desc: "Checks anonymized SHA-1 hash prefixes against billions of exposed passwords in real-time. Detect duplicate and weak credentials instantly.",
    tags: ["k-Anonymity Hashes", "Duplicate Detection", "Strength Meter", "No Hash Exposure"],
    polaroidCaption: "Zero-Exposure Hash Watcher",
    illustrationText: "BREACH_SHIELD",
    metaTitle: "Instant Alerting",
  },
  {
    id: "04",
    accentColor: "#f59e0b",
    badge: "RFC-6238 TOTP",
    title: "Authenticator 2FA",
    desc: "Integrated Time-Based One-Time Password engine compatible with Google Authenticator, Authy, and hardware tokens with backup recovery codes.",
    tags: ["TOTP Generator", "QR Provisioning", "Backup Codes", "Rate-Limited"],
    polaroidCaption: "Two-Factor Authentication",
    illustrationText: "TOTP_AUTHENTICATED",
    metaTitle: "Ironclad Protection",
  },
];

/*
 * GSAP ScrollTrigger pin animation — unchanged from previous implementation.
 * Only the card visual skin changed (dark glass instead of colored fills).
 */
export default function Features() {
  const sectionRef = useRef(null);
  const stackRef   = useRef(null);
  const cardRefs   = useRef([]);

  useEffect(() => {
    const stack = stackRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!stack || cards.length < 2) return;

    const N = cards.length;
    const SCROLL_PER_CARD = window.innerHeight;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      cards.forEach((card, idx) => {
        if (idx === 0) return;
        const segStart = (idx - 1) / (N - 1);
        tl.fromTo(card, { yPercent: 100 }, { yPercent: 0, duration: 1 }, segStart);
        for (let prev = 0; prev < idx; prev++) {
          const depth = idx - prev;
          tl.to(cards[prev], { scale: 1 - depth * 0.03, yPercent: -(depth * 2), duration: 1 }, segStart);
        }
      });

      ScrollTrigger.create({
        trigger: stack,
        pin: true,
        pinSpacing: true,
        start: "top top+=72",
        end: `+=${(N - 1) * SCROLL_PER_CARD}`,
        scrub: 1.5,
        animation: tl,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="ca-grid scroll-mt-24 pb-24 pt-8 bg-[#030b15]">
      {/* Hairline divider */}
      <div className="w-full border-t border-white/[0.05] mb-16" />

      {/* Header */}
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 text-center">
        <span className="pg-badge mb-4">Feature Set</span>
        <h2 className="ca-display text-5xl sm:text-7xl lg:text-8xl leading-[0.92] tracking-tight text-white">
          Vault Arsenal
        </h2>
        <p className="mt-4 max-w-md text-[#e2eaf8]/45 text-base leading-relaxed font-light">
          Four powerful instruments engineered for absolute privacy and speed.
        </p>
      </div>

      {/* Pinned card stack */}
      <div
        ref={stackRef}
        className="relative px-4 sm:px-8 lg:px-20 max-w-6xl mx-auto"
        style={{ overflow: "visible" }}
      >
        {featureProjects.map((feat, idx) => (
          <div
            key={feat.id}
            ref={(el) => (cardRefs.current[idx] = el)}
            style={{
              position: idx === 0 ? "relative" : "absolute",
              top:   idx === 0 ? undefined : 0,
              left:  idx === 0 ? undefined : 0,
              right: idx === 0 ? undefined : 0,
              zIndex: idx + 1,
              willChange: "transform",
              transformOrigin: "top center",
            }}
          >
            {/* Tab strip */}
            <div className="flex">
              <span
                className="ca-mono inline-flex items-center gap-2 py-2 pr-8 text-[0.62rem] tracking-widest pl-4 sm:pl-6"
                style={{
                  background: `rgba(${
                    feat.accentColor === "#00d4ff" ? "0,212,255" :
                    feat.accentColor === "#7c3aed" ? "124,58,237" :
                    feat.accentColor === "#00ff9d" ? "0,255,157" : "245,158,11"
                  }, 0.1)`,
                  color: feat.accentColor,
                  border: `1px solid ${feat.accentColor}30`,
                  clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 100%, 0 100%)",
                }}
              >
                <ShieldCheck className="size-3" />
                Feature {feat.id}
              </span>
            </div>

            {/* Card body */}
            <div
              className="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-12 bg-[#040e1c] border border-white/[0.07]"
              style={{ borderTop: `1px solid ${feat.accentColor}30` }}
            >
              {/* Left: Text */}
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <span
                    className="ca-mono inline-flex items-center gap-2 text-[0.62rem] tracking-widest"
                    style={{ color: feat.accentColor }}
                  >
                    <span className="size-1.5 rounded-full animate-pulse" style={{ background: feat.accentColor }} />
                    {feat.badge}
                  </span>
                  <h3 className="ca-display mt-4 text-4xl sm:text-5xl text-white tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#e2eaf8]/55 font-light">
                    {feat.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {feat.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="ca-mono px-3 py-1 text-[0.58rem] tracking-widest border border-white/[0.07] text-[#e2eaf8]/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Terminal card */}
              <div className="self-center">
                <div
                  className="bg-[#030b15] border p-6 space-y-3"
                  style={{ borderColor: `${feat.accentColor}20` }}
                >
                  <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
                    <span className="ca-mono text-[0.58rem] text-[#e2eaf8]/25 tracking-widest">
                      passg://{feat.illustrationText.toLowerCase()}
                    </span>
                    <span
                      className="ca-mono text-[0.58rem] tracking-widest"
                      style={{ color: feat.accentColor }}
                    >
                      {feat.metaTitle}
                    </span>
                  </div>
                  <div
                    className="font-mono text-xl font-bold tracking-wider"
                    style={{ color: feat.accentColor }}
                  >
                    {feat.illustrationText}
                  </div>
                  <p className="font-mono text-xs text-[#e2eaf8]/30">{feat.polaroidCaption}</p>
                  <div className="pt-2 font-mono text-[0.6rem] text-[#e2eaf8]/20">
                    100% CLIENT-SIDE ENCRYPTION
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
