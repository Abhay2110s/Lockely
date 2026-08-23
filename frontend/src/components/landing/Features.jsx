import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Lock,
  Cpu,
  Smartphone,
  Check,
  Radio,
  QrCode,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const featureProjects = [
  {
    id: "01",
    tabColor: "bg-[#2563eb]",
    badge: "AES-256-GCM CIPHER",
    title: "Zero-Knowledge Vault",
    desc: "Your master password never touches any network or server log. High-security encryption keys are derived inside browser volatile memory with 600,000 PBKDF2 rounds.",
    tags: ["PBKDF2 Derivation", "256-Bit Key", "Hardware WebCrypto", "Zero Plaintext"],
    polaroidCaption: "Galois/Counter Mode Client Cipher",
    icon: Lock,
    accentColor: "bg-[#ffe066]",
    type: "vault",
  },
  {
    id: "02",
    tabColor: "bg-[#e11d48]",
    badge: "HARDWARE CSPRNG",
    title: "Smart Key Generator",
    desc: "Synthesize uncrackable passwords tailored with custom length sliders, symbol exclusions, pronounceable rules, and real-time entropy calculation.",
    tags: ["Entropy Analyzer", "Auto-Clipboard Clear", "Custom Charsets", "Zero GPU Cracking"],
    polaroidCaption: "Cryptographic Entropy Engine",
    icon: Cpu,
    accentColor: "bg-[#7dd3fc]",
    type: "generator",
  },
  {
    id: "03",
    tabColor: "bg-[#059669]",
    badge: "k-ANONYMITY WATCH",
    title: "Breach Sentinel",
    desc: "Checks anonymized 5-character SHA-1 hash prefixes against billions of exposed passwords in real-time. Detects duplicate and compromised credentials instantly.",
    tags: ["k-Anonymity Hashes", "Duplicate Detection", "Strength Meter", "No Hash Exposure"],
    polaroidCaption: "Zero-Exposure Hash Watcher",
    icon: Radio,
    accentColor: "bg-[#ffe066]",
    type: "sentinel",
  },
  {
    id: "04",
    tabColor: "bg-[#ea580c]",
    badge: "RFC-6238 TOTP",
    title: "Authenticator 2FA",
    desc: "Built-in Time-Based One-Time Password engine compatible with Google Authenticator, Authy, Ente, and hardware security keys with emergency recovery codes.",
    tags: ["TOTP Generator", "QR Provisioning", "Backup Codes", "Rate-Limited"],
    polaroidCaption: "Two-Factor Authentication",
    icon: Smartphone,
    accentColor: "bg-[#c4b5fd]",
    type: "totp",
  },
];

export default function Features() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, idx) => {
        const isEven = idx % 2 === 0;
        const initialRotate = isEven ? -2 : 2;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 70,
            scale: 0.94,
            rotate: initialRotate,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="ca-grid scroll-mt-24 pb-24 pt-8 bg-[#faf6ea]">
      {/* Hand-drawn Curved Wave Divider */}
      <svg
        viewBox="0 0 1440 130"
        fill="none"
        preserveAspectRatio="none"
        className="h-16 w-full sm:h-24 text-[#191510]/20"
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
          <span className="ca-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight text-[#191510]">
            VAULT ARSENAL
          </span>
        </span>

        <div className="mt-5 max-w-md -rotate-2">
          <span className="ca-tape inline-block px-5 py-1.5 text-xs sm:text-sm font-bold text-[#191510] shadow-sm [clip-path:polygon(1.5%_0,100%_8%,98.5%_100%,0_92%)] bg-[#ffe066] border border-[#191510]/30">
            Four powerful instruments engineered for absolute privacy and speed.
          </span>
        </div>
      </div>

      {/* ── NATURAL SEQUENTIAL CARDS (Smooth Entrance & Exit on Scroll Up/Down) ── */}
      <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto px-3 sm:px-6">
        {featureProjects.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="will-change-transform"
            >
              {/* Tab Header with Index Stamp */}
              <div className="flex items-center justify-between">
                <div className="flex">
                  <span
                    className={`ca-mono inline-flex items-center gap-2 py-2.5 pr-10 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white pl-5 [clip-path:polygon(0_0,calc(100%-36px)_0,100%_100%,0_100%)] sm:pl-8 sm:[clip-path:polygon(0_0,calc(100%-55px)_0,100%_100%,0_100%)] ${feat.tabColor} border-t-[3px] border-l-[3px] border-r-[3px] border-[#191510] shadow-sm`}
                  >
                    <Icon className="size-4 text-white" />
                    Feature {feat.id}
                  </span>
                </div>

                <span className="ca-mono text-xs font-black bg-[#191510] text-[#ffe066] px-3 py-1 border-2 border-[#191510] shadow-[2px_2px_0_#191510] hidden sm:inline-block">
                  0{idx + 1} / 04
                </span>
              </div>

              {/* Card Body */}
              <div
                className={`grid grid-cols-1 gap-6 p-5 sm:p-7 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:p-9 border-[3px] border-[#191510] shadow-[6px_6px_0_#191510] sm:shadow-[9px_9px_0_#191510] ${feat.tabColor} relative overflow-hidden`}
              >
                {/* Subtle Background Pattern Stamp */}
                <div className="absolute right-0 bottom-0 pointer-events-none opacity-10 select-none">
                  <span className="ca-display text-9xl text-white leading-none">
                    {feat.id}
                  </span>
                </div>

                {/* Left: Text & Features */}
                <div className="flex flex-col justify-between space-y-4 sm:space-y-6 relative z-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="ca-mono inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white bg-[#191510] px-3 py-1 border border-white/40 shadow-[1.5px_1.5px_0_#191510]">
                        <span className="size-2 rounded-full bg-[#86efac] animate-pulse" />
                        {feat.badge}
                      </span>
                    </div>

                    <h2 className="mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white ca-display leading-tight">
                      {feat.title}
                    </h2>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/95 font-medium">
                      {feat.desc}
                    </p>
                  </div>

                  {/* Tech Specs Badges */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-3">
                    {feat.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="ca-mono px-2.5 py-1 text-[0.65rem] sm:text-xs font-bold uppercase tracking-wide bg-white text-[#191510] border border-[#191510] shadow-[2px_2px_0_#191510] hover:-translate-y-0.5 transition-transform"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Bespoke Polaroid Visual Widget */}
                <div className="self-center w-full max-w-sm sm:max-w-md mx-auto relative z-10">
                  <div className="relative">
                    {/* Washi tape stickers */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-3 -top-2.5 z-10 h-5 w-20 sm:h-6 sm:w-24 -rotate-[12deg] bg-white/85 shadow-[0_1px_3px_rgba(17,18,18,0.2)] hidden sm:block"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 -top-2.5 z-10 h-5 w-20 sm:h-6 sm:w-24 rotate-[12deg] bg-white/85 shadow-[0_1px_3px_rgba(17,18,18,0.2)] hidden sm:block"
                    />

                    <figure className="relative bg-white p-3 sm:p-4 pb-2.5 sm:pb-3 shadow-[0_8px_24px_rgba(17,18,18,0.3)] border-[2.5px] border-[#191510]">
                      {/* Visual 1: Zero-Knowledge Encryption Flow */}
                      {feat.type === "vault" && (
                        <div className="p-4 sm:p-5 bg-[#faf6ea] border-2 border-[#191510] flex flex-col justify-between space-y-3 min-h-[160px]">
                          <div className="flex items-center justify-between border-b border-[#191510]/20 pb-2">
                            <span className="ca-mono text-[0.62rem] font-bold text-[#191510] uppercase">
                              Client RAM Sandbox
                            </span>
                            <span className="ca-mono text-[0.6rem] bg-[#86efac] text-emerald-950 px-2 py-0.5 border border-[#191510] font-bold">
                              ZERO NETWORK LEAK
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-1.5 py-1">
                            <div className="bg-white p-2 border border-[#191510] text-center flex-1 shadow-[1.5px_1.5px_0_#191510]">
                              <p className="ca-mono text-[0.55rem] text-[#191510]/60 uppercase">Input</p>
                              <p className="ca-mono text-[0.65rem] font-black text-[#191510] truncate">Master Key</p>
                            </div>
                            <span className="text-[#191510] font-bold text-xs">➔</span>
                            <div className="bg-[#ffe066] p-2 border border-[#191510] text-center flex-1 shadow-[1.5px_1.5px_0_#191510]">
                              <p className="ca-mono text-[0.55rem] text-[#191510]/60 uppercase">PBKDF2</p>
                              <p className="ca-mono text-[0.65rem] font-black text-[#191510]">600k Hash</p>
                            </div>
                            <span className="text-[#191510] font-bold text-xs">➔</span>
                            <div className="bg-[#86efac] p-2 border border-[#191510] text-center flex-1 shadow-[1.5px_1.5px_0_#191510]">
                              <p className="ca-mono text-[0.55rem] text-[#191510]/60 uppercase">Store</p>
                              <p className="ca-mono text-[0.65rem] font-black text-emerald-950">AES-GCM</p>
                            </div>
                          </div>

                          <div className="p-2 bg-[#191510] text-white font-mono text-[0.62rem] truncate rounded-none border border-[#191510]">
                            <span className="text-[#86efac]">Cipher:</span> 9f8a2b7c4d0e1f3a5b6c...
                          </div>
                        </div>
                      )}

                      {/* Visual 2: CSPRNG Entropy Engine */}
                      {feat.type === "generator" && (
                        <div className="p-4 sm:p-5 bg-[#faf6ea] border-2 border-[#191510] flex flex-col justify-between space-y-3 min-h-[160px]">
                          <div className="flex items-center justify-between border-b border-[#191510]/20 pb-2">
                            <span className="ca-mono text-[0.62rem] font-bold text-[#191510] uppercase">
                              Entropy Meter
                            </span>
                            <span className="ca-mono text-[0.6rem] bg-[#ffe066] text-[#191510] px-2 py-0.5 border border-[#191510] font-bold">
                              128+ BITS (MILITARY)
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between ca-mono text-[0.65rem] text-[#191510]">
                              <span className="font-bold">Strength Score</span>
                              <span className="font-black text-emerald-700">100% HERO GRADE</span>
                            </div>
                            <div className="h-3 bg-white border border-[#191510] overflow-hidden p-0.5">
                              <div className="h-full bg-[#86efac] border-r border-[#191510] w-full animate-pulse" />
                            </div>
                          </div>

                          <div className="p-2 bg-white border border-[#191510] flex items-center justify-between font-mono text-[0.65rem] shadow-[1.5px_1.5px_0_#191510]">
                            <span className="font-bold text-[#191510] truncate">K#9x$mP@2!vL7*qW</span>
                            <span className="ca-mono text-[0.55rem] bg-[#7dd3fc] px-1.5 py-0.5 border border-[#191510] font-bold">
                              CSPRNG
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Visual 3: Breach Sentinel Radar */}
                      {feat.type === "sentinel" && (
                        <div className="p-4 sm:p-5 bg-[#faf6ea] border-2 border-[#191510] flex flex-col justify-between space-y-3 min-h-[160px]">
                          <div className="flex items-center justify-between border-b border-[#191510]/20 pb-2">
                            <span className="ca-mono text-[0.62rem] font-bold text-[#191510] uppercase">
                              k-Anonymity Scanner
                            </span>
                            <span className="ca-mono text-[0.6rem] bg-[#86efac] text-emerald-950 px-2 py-0.5 border border-[#191510] font-bold flex items-center gap-1">
                              <span className="size-1.5 rounded-full bg-emerald-600 animate-ping" />
                              LIVE SENTINEL
                            </span>
                          </div>

                          <div className="space-y-1.5 font-mono text-[0.62rem] bg-white p-2 border border-[#191510] shadow-[1.5px_1.5px_0_#191510]">
                            <div className="flex justify-between text-[#191510]">
                              <span>SHA-1 Prefix:</span>
                              <span className="font-bold bg-[#ffe066] px-1">5BAA6</span>
                            </div>
                            <div className="flex justify-between text-[#191510]/60">
                              <span>Exposed Records:</span>
                              <span className="font-bold text-emerald-700">0 Matches Found</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-center gap-1.5 ca-mono text-[0.6rem] text-emerald-900 bg-[#86efac] py-1 border border-emerald-900 font-bold">
                            <Check className="size-3 text-emerald-900" />
                            Vault Credentials Fully Secure
                          </div>
                        </div>
                      )}

                      {/* Visual 4: Authenticator 2FA */}
                      {feat.type === "totp" && (
                        <div className="p-4 sm:p-5 bg-[#faf6ea] border-2 border-[#191510] flex flex-col justify-between space-y-3 min-h-[160px]">
                          <div className="flex items-center justify-between border-b border-[#191510]/20 pb-2">
                            <span className="ca-mono text-[0.62rem] font-bold text-[#191510] uppercase">
                              TOTP Authenticator
                            </span>
                            <span className="ca-mono text-[0.6rem] bg-[#c4b5fd] text-purple-950 px-2 py-0.5 border border-[#191510] font-bold">
                              RFC-6238 READY
                            </span>
                          </div>

                          <div className="flex items-center justify-between bg-white p-2.5 border border-[#191510] shadow-[1.5px_1.5px_0_#191510]">
                            <div>
                              <p className="ca-mono text-[0.55rem] text-[#191510]/60">TIME-BASED OTP</p>
                              <p className="font-mono text-base font-black text-[#191510] tracking-widest">
                                839 204
                              </p>
                            </div>
                            <div className="size-8 bg-[#ffe066] border border-[#191510] flex items-center justify-center font-bold text-xs">
                              30s
                            </div>
                          </div>

                          <div className="flex items-center justify-between ca-mono text-[0.6rem] text-[#191510]/70 px-1">
                            <span className="flex items-center gap-1">
                              <QrCode className="size-3" /> QR Setup
                            </span>
                            <span>Backup Codes Active</span>
                          </div>
                        </div>
                      )}

                      <figcaption className="ca-hand mt-2 text-center text-sm sm:text-base text-[#191510] font-bold">
                        {feat.polaroidCaption}
                      </figcaption>
                    </figure>
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
