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
  },
  {
    no: "02",
    title: "PBKDF2 Key Derivation",
    subtitle: "Salted memory-hard rounds",
    desc: "Stretches your master password into a 256-bit AES encryption key immune to GPU cracking clusters.",
    icon: Cpu,
    badge: "600,000 ROUNDS",
  },
  {
    no: "03",
    title: "AES-256-GCM Cipher",
    subtitle: "Galois authenticated tag",
    desc: "Encrypts your credentials with unique initialization vectors (IVs) and cryptographic authentication tags.",
    icon: Lock,
    badge: "AUTHENTICATED",
  },
  {
    no: "04",
    title: "Zero-Knowledge Cloud",
    subtitle: "Opaque ciphertext only",
    desc: "Cloud database stores exclusively encrypted bytes. Even the host servers have zero capability to read your secrets.",
    icon: Database,
    badge: "ZERO-SERVER ACCESS",
  },
];

export default function Security() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Card Y-axis sliding & scaling animations
  const card1Scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.92]);

  const card2Y = useTransform(scrollYProgress, [0.1, 0.25], ["100vh", "0vh"]);
  const card2Scale = useTransform(scrollYProgress, [0.25, 0.5], [1, 0.92]);

  const card3Y = useTransform(scrollYProgress, [0.35, 0.5], ["100vh", "0vh"]);
  const card3Scale = useTransform(scrollYProgress, [0.5, 0.75], [1, 0.92]);

  const card4Y = useTransform(scrollYProgress, [0.6, 0.75], ["100vh", "0vh"]);

  // Progressive corner text reveals
  const text1Op = useTransform(scrollYProgress, [0.02, 0.10], [0, 1]);
  const text2Op = useTransform(scrollYProgress, [0.20, 0.30], [0, 1]);
  const text3Op = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const text4Op = useTransform(scrollYProgress, [0.70, 0.80], [0, 1]);

  const cardsTransforms = [
    { scale: card1Scale, y: "0vh" },
    { scale: card2Scale, y: card2Y },
    { scale: card3Scale, y: card3Y },
    { scale: 1, y: card4Y },
  ];

  const cornerTexts = [
    { op: text1Op, pos: "top-24 left-10", text: "Zero-Knowledge Encryption" },
    { op: text2Op, pos: "bottom-10 left-10", text: "Vault Synchronization" },
    { op: text3Op, pos: "top-24 right-10 text-right", text: "Biometric Access" },
    { op: text4Op, pos: "bottom-10 right-10 text-right", text: "Breach Sentinel" },
  ];

  return (
    <section ref={containerRef} className="h-[300vh] sm:h-[400vh] bg-[#FDFBF7] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-4">

        {/* Mobile Top Banner — same four labels as the desktop corner
            texts, but stacked in one spot at the top of the pinned
            viewport. Each label shares the exact opacity timeline as its
            matching card, so as a card scales in, its label crossfades
            into the same spot the previous label just faded out of. */}
        <div className="md:hidden absolute top-5 inset-x-4 text-center pointer-events-none">
          {cornerTexts.map((item, i) => (
            <motion.h2
              key={i}
              style={{ opacity: item.op }}
              className="absolute inset-x-0 top-0 text-lg sm:text-xl font-black text-[#1a1a1a] uppercase tracking-tight leading-tight"
            >
              {item.text}
            </motion.h2>
          ))}
        </div>

        {/* Corner Text Elements — decorative scroll flourishes, desktop
            only (the mobile banner above replaces them on small screens
            since there's no room beside the card without overlapping it). */}
        {cornerTexts.map((item, i) => (
          <motion.div
            key={i}
            style={{ opacity: item.op }}
            className={`hidden md:block absolute ${item.pos} max-w-[220px] lg:max-w-[300px] pointer-events-none`}
          >
            <h2 className="text-2xl lg:text-5xl font-black text-[#1a1a1a] uppercase tracking-tight leading-none">
              {item.text}
            </h2>
          </motion.div>
        ))}

        {/* Central Card Stack — width/height scale with the viewport
            (vw-based with a max-w cap) instead of a fixed px size, so it
            never overflows narrow phone screens. */}
        <div className="relative w-full max-w-[360px] sm:max-w-[400px] md:w-[420px] h-[440px] sm:h-[480px] md:h-[500px]">
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
                className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between bg-white/95 backdrop-blur-2xl border border-[#E6E0D5] rounded-3xl shadow-card hover:shadow-card-hover"
              >
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between border-b border-[#E6E0D5] pb-3 sm:pb-4">
                    <div className="size-10 sm:size-12 bg-blush/35 border border-[#E6E0D5] rounded-2xl flex items-center justify-center text-[#8B263E]">
                      <Icon className="size-5 sm:size-6" />
                    </div>
                    <span className="text-[0.7rem] sm:text-xs font-bold text-[#8B263E] font-mono-code">
                      STEP {step.no}
                    </span>
                  </div>

                  <div>
                    <span className="text-[0.62rem] sm:text-[0.68rem] tracking-wider text-[#8B263E] uppercase font-bold block mb-2 px-3 py-1 rounded-full bg-blush/30 border border-[#E6E0D5] w-fit">
                      {step.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#1a1a1a] uppercase tracking-tight leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[0.7rem] sm:text-xs text-[#8B263E] mt-1.5 uppercase font-bold tracking-wide">
                      {step.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6B6560] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-[#E6E0D5] flex items-center gap-2 text-[#1a1a1a] text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="size-3.5 sm:size-4 text-[#8B263E] shrink-0" />
                  <span>Hardware Cryptographically Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}