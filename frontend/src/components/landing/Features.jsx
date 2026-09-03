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
    gradient: "from-[#120e52] via-[#1A126E] to-[#241C7F]",
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
    gradient: "from-[#1A126E] via-[#241C7F] to-[#2A2292]",
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
    gradient: "from-[#241C7F] via-[#2A2292] to-[#3F3AA5]",
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
    gradient: "from-[#2A2292] via-[#3F3AA5] to-[#6554DE]",
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
            opacity: 1,
            scale: 0.98,
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
              scale: 1 - depth * 0.03,
              yPercent: -(depth * 2),
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
      {/* Header — left-aligned RezonBio style */}
      <div className="mx-auto flex max-w-5xl flex-col items-start px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full landing-badge mb-4">
          <ShieldCheck className="size-3.5 text-[#8B7FF0]" />
          <span className="text-xs font-semibold text-[#D5D1FC]">VAULT CAPABILITIES</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
          Architected for <br className="hidden sm:block" />
          <span className="text-gradient-warm">Absolute Privacy.</span>
        </h2>

        <p className="mt-4 max-w-lg text-sm sm:text-base text-[#B4ADFA] font-normal leading-relaxed">
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
              className="bg-[#0d0a3e]"
              style={{
                position: idx === 0 ? "relative" : "absolute",
                top: idx === 0 ? undefined : 0,
                left: idx === 0 ? undefined : 0,
                right: idx === 0 ? undefined : 0,
                zIndex: idx + 1,
                willChange: "transform",
                transformOrigin: "top center",
              }}
            >
              {/* Tab Header */}
              <div className="flex">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-t-xl bg-[#120e52] text-[#B4ADFA] text-xs font-bold font-mono-code border border-b-0 border-[#3F3AA5]/40">
                  <Icon className="size-3.5 text-[#8B7FF0]" />
                  Feature {feat.id}
                </span>
              </div>

              {/* Card Body */}
              <div
                className={`grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:gap-8 rounded-2xl rounded-tl-none border border-[#3F3AA5]/40 shadow-2xl bg-gradient-to-br ${feat.gradient}`}
              >
                {/* Left: Text */}
                <div className="flex flex-col justify-between space-y-5">
                  <div>
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B4ADFA] font-mono-code">
                      <span className="size-2 rounded-full bg-[#8B7FF0] animate-pulse" />
                      {feat.badge}
                    </span>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {feat.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#D5D1FC]/95 font-normal">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {feat.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0d0a3e] text-[#B4ADFA] border border-[#3F3AA5]/30 font-mono-code"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Widget Showcase */}
                <div className="self-center w-full max-w-sm mx-auto">
                  <div className="p-6 rounded-2xl bg-[#0d0a3e] border border-[#3F3AA5]/40 text-center space-y-3 shadow-xl">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#1A126E] text-[#B4ADFA] border border-[#3F3AA5]/40 font-mono-code">
                      {feat.illustrationText}
                    </span>
                    <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {feat.metaTitle}
                    </p>
                    <p className="text-xs text-[#B4ADFA]/80 font-mono-code">
                      100% CLIENT-SIDE ENCRYPTION
                    </p>
                    <div className="pt-2 border-t border-[#3F3AA5]/30 text-xs text-[#D5D1FC] font-medium">
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
