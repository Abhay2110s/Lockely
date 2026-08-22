import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const featureProjects = [
  {
    id: "01",
    tabColor: "bg-[#3b82f6]",
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
    tabColor: "bg-[#ff5e89]",
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
    tabColor: "bg-[#86efac]",
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
    tabColor: "bg-[#fb923c]",
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
 * ─── HOW THE ANIMATION WORKS ────────────────────────────────────────────────
 *
 * The card stack wrapper is PINNED by GSAP for (N-1) * 100vh of scroll.
 * While it's pinned, a scrubbed timeline drives each card's entrance:
 *
 *   Card 1 — visible from the start
 *   Card 2 — slides UP from yPercent:100 → 0 in timeline segment [0, 0.33]
 *             Card 1 simultaneously scales 1 → 0.95 and nudges up slightly
 *   Card 3 — same in segment [0.33, 0.66]
 *   Card 4 — same in segment [0.66, 1.00]
 *
 * After all 4 are stacked, the section unpins and normal scroll resumes.
 * Scrolling back UP reverses the animation exactly (scrub: true).
 *
 * Cards 2–4 use position:absolute so they all overlap card 1 in the DOM.
 * Card 1 is in normal flow and gives the wrapper its height.
 * ────────────────────────────────────────────────────────────────────────────
 */
export default function Features() {
  const sectionRef = useRef(null);
  const stackRef   = useRef(null);           // the pinned wrapper
  const cardRefs   = useRef([]);             // individual card elements

  useEffect(() => {
    const stack = stackRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!stack || cards.length < 2) return;

    const N = cards.length;                  // 4
    const SCROLL_PER_CARD = window.innerHeight; // 1 card transition = 1vh of extra scroll

    const ctx = gsap.context(() => {
      // Master timeline — all card entrances happen inside this
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      cards.forEach((card, idx) => {
        if (idx === 0) return; // card 1 is already visible

        const segStart = (idx - 1) / (N - 1);  // 0, 0.33, 0.66

        // ── Slide card in from below
        tl.fromTo(
          card,
          { yPercent: 100 },
          { yPercent: 0, duration: 1 },
          segStart         // position in the timeline (0–1 scale)
        );

        // ── Push every card below this one deeper into the stack
        for (let prev = 0; prev < idx; prev++) {
          const depth = idx - prev;             // how many levels below
          tl.to(
            cards[prev],
            {
              scale: 1 - depth * 0.03,          // 0.97, 0.94, 0.91
              yPercent: -(depth * 2),            // -2%, -4%, -6%
              duration: 1,
            },
            segStart
          );
        }
      });

      // Pin the stack + scrub the timeline over (N-1) * 100vh of scroll
      ScrollTrigger.create({
        trigger: stack,
        pin: true,
        pinSpacing: true,
        start: "top top+=72",                  // 72 px = navbar height
        end: `+=${(N - 1) * SCROLL_PER_CARD}`,
        scrub: 1.5,
        animation: tl,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="ca-grid scroll-mt-24 pb-24 pt-8">
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

      {/* Header & Handwritten Subheading */}
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

        <div className="mt-6 max-w-md -rotate-2">
          <span className="ca-tape inline-block px-6 py-2 text-sm sm:text-base font-bold text-[#191510] shadow-sm [clip-path:polygon(1.5%_0,100%_8%,98.5%_100%,0_92%)] bg-[#ffe066] border border-[#191510]/20">
            Four powerful instruments engineered for absolute privacy and speed.
          </span>
        </div>
      </div>

      {/* ── PINNED CARD STACK ─────────────────────────────────────────────── */}
      <div
        ref={stackRef}
        className="relative px-4 sm:px-8 lg:px-20 max-w-6xl mx-auto"
        /* overflow:visible so cards can slide in from below without clipping */
        style={{ overflow: "visible" }}
      >
        {featureProjects.map((feat, idx) => (
          <div
            key={feat.id}
            ref={(el) => (cardRefs.current[idx] = el)}
            style={{
              /* Card 1 is in normal flow (gives wrapper its height).
                 Cards 2–4 are absolutely positioned, overlapping card 1.
                 GSAP will set their initial yPercent: 100 on mount.       */
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
              <span
                className={`ca-mono inline-flex items-center gap-2 py-2.5 pr-10 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white pl-5 [clip-path:polygon(0_0,calc(100%-36px)_0,100%_100%,0_100%)] sm:pl-8 sm:[clip-path:polygon(0_0,calc(100%-60px)_0,100%_100%,0_100%)] ${feat.tabColor}`}
              >
                <ShieldCheck className="size-3.5 sm:size-4" />
                Feature {feat.id}
              </span>
            </div>

            {/* Card Body */}
            <div
              className={`grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-12 border-3 border-[#191510] shadow-[8px_8px_0_#191510] ${feat.tabColor}`}
            >
              {/* Left: Text */}
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <span className="ca-mono inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white">
                    <span className="size-2.5 rounded-full bg-white animate-pulse" />
                    {feat.badge}
                  </span>
                  <h2 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-white ca-display">
                    {feat.title}
                  </h2>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/95 font-medium">
                    {feat.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {feat.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="ca-mono px-3 py-1.5 text-xs font-bold uppercase tracking-wide bg-white text-[#191510] border border-[#191510] shadow-[1.5px_1.5px_0_#191510]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Polaroid */}
              <div className="self-center">
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-5 -top-3 z-10 h-6 w-24 -rotate-[12deg] bg-white/70 shadow-[0_1px_3px_rgba(17,18,18,0.15)]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -right-5 -top-3 z-10 h-6 w-24 rotate-[12deg] bg-white/70 shadow-[0_1px_3px_rgba(17,18,18,0.15)]"
                  />
                  <figure className="relative bg-white p-4 pb-3 shadow-[0_8px_24px_rgba(17,18,18,0.25)] border-2 border-[#191510]">
                    <div className="p-6 bg-[#faf6ea] border-2 border-[#191510] flex flex-col items-center justify-center text-center space-y-3 min-h-[160px]">
                      <span className="ca-mono text-xs font-black bg-[#ffe066] px-3 py-1 border border-[#191510]">
                        {feat.illustrationText}
                      </span>
                      <p className="ca-display text-2xl text-[#191510] tracking-tight">
                        {feat.metaTitle}
                      </p>
                      <span className="ca-mono text-[0.7rem] text-[#191510]/80">
                        100% CLIENT-SIDE ENCRYPTION
                      </span>
                    </div>
                    <figcaption className="ca-hand mt-2 text-center text-base text-[#191510] font-bold">
                      {feat.polaroidCaption}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
