import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lock, Cpu, Database, Key, CheckCircle2 } from "lucide-react";

const steps = [
  {
    no: "01",
    title: "Master Password",
    subtitle: "Volatile RAM only",
    desc: "Your master password is never sent over any network. It stays exclusively inside browser volatile memory.",
    icon: Key,
    badge: "100% LOCAL",
    headline: ["Zero-Knowledge", "Protection"],
  },
  {
    no: "02",
    title: "PBKDF2 Key Derivation",
    subtitle: "Salted memory-hard rounds",
    desc: "Stretches your master password into a 256-bit AES encryption key immune to GPU cracking clusters.",
    icon: Cpu,
    badge: "600,000 ROUNDS",
    headline: ["Brute-Force", "Immune"],
  },
  {
    no: "03",
    title: "AES-256-GCM Cipher",
    subtitle: "Galois authenticated tag",
    desc: "Encrypts your credentials with unique initialization vectors (IVs) and cryptographic authentication tags.",
    icon: Lock,
    badge: "AUTHENTICATED",
    headline: ["Military-Grade", "Encryption"],
  },
  {
    no: "04",
    title: "Zero-Knowledge Cloud",
    subtitle: "Opaque ciphertext only",
    desc: "Cloud database stores exclusively encrypted bytes. Even the host servers have zero capability to read your secrets.",
    icon: Database,
    badge: "ZERO-SERVER ACCESS",
    headline: ["Server-Blind", "Architecture"],
  },
];

export default function Security() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── Card Y-axis sliding & scaling (unchanged) ──────────────────── */
  const card1Scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.92]);

  const card2Y = useTransform(scrollYProgress, [0.1, 0.25], ["100vh", "0vh"]);
  const card2Scale = useTransform(scrollYProgress, [0.25, 0.5], [1, 0.92]);

  const card3Y = useTransform(scrollYProgress, [0.35, 0.5], ["100vh", "0vh"]);
  const card3Scale = useTransform(scrollYProgress, [0.5, 0.75], [1, 0.92]);

  const card4Y = useTransform(scrollYProgress, [0.6, 0.75], ["100vh", "0vh"]);

  const cardsTransforms = [
    { scale: card1Scale, y: "0vh" },
    { scale: card2Scale, y: card2Y },
    { scale: card3Scale, y: card3Y },
    { scale: 1, y: card4Y },
  ];

  /* ── Left-side crossfade: each block fades in → holds → fades out ─ */
  const left1Op = useTransform(
    scrollYProgress,
    [0, 0.05, 0.18, 0.25],
    [0, 1, 1, 0],
  );
  const left2Op = useTransform(
    scrollYProgress,
    [0.2, 0.28, 0.43, 0.5],
    [0, 1, 1, 0],
  );
  const left3Op = useTransform(
    scrollYProgress,
    [0.45, 0.53, 0.68, 0.75],
    [0, 1, 1, 0],
  );
  const left4Op = useTransform(
    scrollYProgress,
    [0.7, 0.78, 1, 1],
    [0, 1, 1, 1],
  );

  /* Subtle Y slide for the left content (parallax feel) */
  const left1Y = useTransform(
    scrollYProgress,
    [0, 0.05, 0.18, 0.25],
    [40, 0, 0, -40],
  );
  const left2Y = useTransform(
    scrollYProgress,
    [0.2, 0.28, 0.43, 0.5],
    [40, 0, 0, -40],
  );
  const left3Y = useTransform(
    scrollYProgress,
    [0.45, 0.53, 0.68, 0.75],
    [40, 0, 0, -40],
  );
  const left4Y = useTransform(
    scrollYProgress,
    [0.7, 0.78, 1, 1],
    [40, 0, 0, 0],
  );

  const leftTransforms = [
    { opacity: left1Op, y: left1Y },
    { opacity: left2Op, y: left2Y },
    { opacity: left3Op, y: left3Y },
    { opacity: left4Op, y: left4Y },
  ];

  /* ── Progress dots ────────────────────────────────────────────────── */
  const dotOpacities = [
    useTransform(scrollYProgress, [0, 0.05, 0.24], [0.25, 1, 1]),
    useTransform(scrollYProgress, [0.2, 0.28, 0.49], [0.25, 1, 1]),
    useTransform(scrollYProgress, [0.45, 0.53, 0.74], [0.25, 1, 1]),
    useTransform(scrollYProgress, [0.7, 0.78, 1], [0.25, 1, 1]),
  ];

  return (
    <section
      id="security"
      ref={containerRef}
      className="h-[300vh] sm:h-[400vh] bg-[#FDFBF7] relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-8 lg:px-16">
        {/* ─── Desktop: side-by-side ─────────────────────────────────── */}
        <div className="hidden md:flex items-center w-full max-w-7xl h-full gap-10 lg:gap-20">
          {/* Left — editorial crossfading content */}
          <div className="flex-1 relative flex items-center min-h-[420px]">
            {/* Vertical progress indicator */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {dotOpacities.map((op, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: op }}
                  className="size-2 rounded-full bg-[#8B263E]"
                />
              ))}
            </div>

            {/* Content blocks */}
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.no}
                  style={{
                    opacity: leftTransforms[i].opacity,
                    y: leftTransforms[i].y,
                  }}
                  className="absolute inset-0 flex flex-col justify-center pl-8"
                >
                  {/* Step chip */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="size-10 bg-blush/35 border border-[#E6E0D5] rounded-2xl flex items-center justify-center text-[#8B263E]">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-[0.7rem] font-bold text-[#8B263E] font-mono-code tracking-widest">
                      STEP {step.no} / 04
                    </span>
                  </div>

                  {/* Large headline */}
                  <h2 className="text-4xl lg:text-[3.5rem] xl:text-6xl font-black text-[#1a1a1a] uppercase tracking-tight leading-[0.95]">
                    {step.headline.map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>
                </motion.div>
              );
            })}
          </div>

          {/* Right — card stack */}
          <div className="relative w-[340px] lg:w-[400px] xl:w-[420px] h-[420px] lg:h-[480px] xl:h-[500px] shrink-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.no}
                  style={{
                    y: cardsTransforms[index].y,
                    scale: cardsTransforms[index].scale,
                    zIndex: index,
                  }}
                  className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between bg-white/95 backdrop-blur-2xl border border-[#E6E0D5] rounded-3xl shadow-card hover:shadow-card-hover"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-[#E6E0D5] pb-4">
                      <div className="size-11 bg-blush/35 border border-[#E6E0D5] rounded-2xl flex items-center justify-center text-[#8B263E]">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-xs font-bold text-[#8B263E] font-mono-code">
                        STEP {step.no}
                      </span>
                    </div>

                    <div>
                      <span className="text-[0.68rem] tracking-wider text-[#8B263E] uppercase font-bold block mb-2 px-3 py-1 rounded-full bg-blush/30 border border-[#E6E0D5] w-fit">
                        {step.badge}
                      </span>
                      <h3 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-tight leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[#8B263E] mt-1.5 uppercase font-bold tracking-wide">
                        {step.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-[#6B6560] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E6E0D5] flex items-center gap-2 text-[#1a1a1a] text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="size-4 text-[#8B263E] shrink-0" />
                    <span>Hardware Cryptographically Verified</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── Mobile: stacked (text top, cards below) ───────────────── */}
        <div className="md:hidden flex flex-col items-center w-full">
          {/* Mobile crossfading text */}
          <div className="relative w-full h-24 mb-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.no}
                  style={{
                    opacity: leftTransforms[i].opacity,
                    y: leftTransforms[i].y,
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="size-7 bg-blush/35 border border-[#E6E0D5] rounded-xl flex items-center justify-center text-[#8B263E]">
                      <Icon className="size-3.5" />
                    </div>
                    <span className="text-[0.6rem] font-bold text-[#8B263E] font-mono-code tracking-widest">
                      STEP {step.no} / 04
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-[#1a1a1a] uppercase tracking-tight leading-tight">
                    {step.headline.join(" ")}
                  </h2>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile dots */}
          <div className="flex gap-2 mb-3">
            {dotOpacities.map((op, i) => (
              <motion.div
                key={i}
                style={{ opacity: op }}
                className="size-1.5 rounded-full bg-[#8B263E]"
              />
            ))}
          </div>

          {/* Mobile card stack */}
          <div className="relative w-full max-w-[360px] h-[400px] sm:h-[440px]">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.no}
                  style={{
                    y: cardsTransforms[index].y,
                    scale: cardsTransforms[index].scale,
                    zIndex: index,
                  }}
                  className="absolute inset-0 p-5 flex flex-col justify-between bg-white/95 backdrop-blur-2xl border border-[#E6E0D5] rounded-3xl shadow-card hover:shadow-card-hover"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E6E0D5] pb-3">
                      <div className="size-10 bg-blush/35 border border-[#E6E0D5] rounded-2xl flex items-center justify-center text-[#8B263E]">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-[0.7rem] font-bold text-[#8B263E] font-mono-code">
                        STEP {step.no}
                      </span>
                    </div>

                    <div>
                      <span className="text-[0.62rem] tracking-wider text-[#8B263E] uppercase font-bold block mb-2 px-3 py-1 rounded-full bg-blush/30 border border-[#E6E0D5] w-fit">
                        {step.badge}
                      </span>
                      <h3 className="text-xl font-black text-[#1a1a1a] uppercase tracking-tight leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-[0.7rem] text-[#8B263E] mt-1.5 uppercase font-bold tracking-wide">
                        {step.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-[#6B6560] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6E0D5] flex items-center gap-2 text-[#1a1a1a] text-[0.68rem] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="size-3.5 text-[#8B263E] shrink-0" />
                    <span>Hardware Cryptographically Verified</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}