import { useRef, useState, useEffect } from "react";
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
  const [setActiveStepIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active step for indicator pills
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) {
        setActiveStepIndex(0);
      } else if (latest < 0.55) {
        setActiveStepIndex(1);
      } else if (latest < 0.82) {
        setActiveStepIndex(2);
      } else {
        setActiveStepIndex(3);
      }
    });
  }, [scrollYProgress]);

  // Card 1: starts centered at 0, smoothly translates up & scales down as subsequent cards stack on top
  const card1Y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.52, 0.70, 0.82, 0.95],
    ["0px", "0px", "-24px", "-24px", "-40px", "-40px", "-52px"]
  );
  const card1Scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.52, 0.70, 0.82, 0.95],
    [1, 1, 0.95, 0.95, 0.90, 0.90, 0.86]
  );
  const card1Opacity = useTransform(
    scrollYProgress,
    [0, 0.70, 0.95],
    [1, 1, 0.75]
  );

  // Card 2: enters smoothly from bottom (0.15 to 0.35), then stacks
  const card2Y = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.52, 0.70, 0.82, 0.95],
    ["100vh", "0px", "0px", "-18px", "-18px", "-28px"]
  );
  const card2Scale = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.52, 0.70, 0.82, 0.95],
    [1, 1, 1, 0.95, 0.95, 0.91]
  );
  const card2Opacity = useTransform(
    scrollYProgress,
    [0.12, 0.18, 0.82, 0.95],
    [0, 1, 1, 0.85]
  );

  // Card 3: enters smoothly (0.48 to 0.70), then stacks
  const card3Y = useTransform(
    scrollYProgress,
    [0.48, 0.70, 0.82, 0.95],
    ["100vh", "0px", "0px", "-14px"]
  );
  const card3Scale = useTransform(
    scrollYProgress,
    [0.48, 0.70, 0.82, 0.95],
    [1, 1, 1, 0.96]
  );
  const card3Opacity = useTransform(
    scrollYProgress,
    [0.45, 0.52, 1],
    [0, 1, 1]
  );

  // Card 4: enters smoothly (0.75 to 0.95), resting through the end
  const card4Y = useTransform(
    scrollYProgress,
    [0.75, 0.95],
    ["100vh", "0px"]
  );
  const card4Scale = useTransform(
    scrollYProgress,
    [0.75, 0.95],
    [1, 1]
  );
  const card4Opacity = useTransform(
    scrollYProgress,
    [0.72, 0.78, 1],
    [0, 1, 1]
  );

  // Desktop Corner Texts reveals
  const text1Op = useTransform(scrollYProgress, [0, 0.15], [0.35, 1]);
  const text2Op = useTransform(scrollYProgress, [0.20, 0.35], [0, 1]);
  const text3Op = useTransform(scrollYProgress, [0.50, 0.68], [0, 1]);
  const text4Op = useTransform(scrollYProgress, [0.75, 0.92], [0, 1]);

  // Mobile Top Banner Crossfades (smooth in & out per step, no overlap collisions)
  const mobileText1Op = useTransform(scrollYProgress, [0, 0.15, 0.28], [1, 1, 0]);
  const mobileText2Op = useTransform(scrollYProgress, [0.20, 0.32, 0.48, 0.60], [0, 1, 1, 0]);
  const mobileText3Op = useTransform(scrollYProgress, [0.52, 0.65, 0.78, 0.88], [0, 1, 1, 0]);
  const mobileText4Op = useTransform(scrollYProgress, [0.80, 0.92, 1.0], [0, 1, 1]);

  const cardsTransforms = [
    { scale: card1Scale, y: card1Y, opacity: card1Opacity },
    { scale: card2Scale, y: card2Y, opacity: card2Opacity },
    { scale: card3Scale, y: card3Y, opacity: card3Opacity },
    { scale: card4Scale, y: card4Y, opacity: card4Opacity },
  ];

  const cornerTexts = [
    { op: text1Op, mobOp: mobileText1Op, pos: "top-24 left-8 lg:left-12", text: "Zero-Knowledge Encryption" },
    { op: text2Op, mobOp: mobileText2Op, pos: "bottom-14 left-8 lg:left-12", text: "Vault Synchronization" },
    { op: text3Op, mobOp: mobileText3Op, pos: "top-24 right-8 lg:right-12 text-right", text: "Biometric Access" },
    { op: text4Op, mobOp: mobileText4Op, pos: "bottom-14 right-8 lg:right-12 text-right", text: "Breach Sentinel" },
  ];

  return (
    <section
      id="security"
      ref={containerRef}
      className="scroll-mt-0 h-[320vh] sm:h-[400vh] bg-[#FDFBF7] relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 pt-16 pb-8 sm:py-0">

        {/* Mobile Top Banner — clean crossfade between labels as cards advance */}
        <div className="md:hidden absolute top-20 inset-x-4 h-12 text-center pointer-events-none">
          {cornerTexts.map((item, i) => (
            <motion.h2
              key={i}
              style={{ opacity: item.mobOp }}
              className="absolute inset-x-0 top-0 text-base sm:text-lg font-black text-[#1a1a1a] uppercase tracking-tight leading-snug"
            >
              {item.text}
            </motion.h2>
          ))}
        </div>

        {/* Desktop Corner Text Elements */}
        {cornerTexts.map((item, i) => (
          <motion.div
            key={i}
            style={{ opacity: item.op }}
            className={`hidden md:block absolute ${item.pos} max-w-[220px] lg:max-w-[300px] pointer-events-none transition-transform duration-300`}
          >
            <span className="text-[0.68rem] font-bold text-[#8B263E] uppercase tracking-widest font-mono-code block mb-1">
              LAYER 0{i + 1}
            </span>
            <h2 className="text-2xl lg:text-4xl xl:text-5xl font-black text-[#1a1a1a] uppercase tracking-tight leading-none">
              {item.text}
            </h2>
          </motion.div>
        ))}

        {/* Central Card Stack Deck */}
        <div className="relative w-full max-w-[340px] xs:max-w-[370px] sm:max-w-[400px] md:w-[420px] h-[430px] xs:h-[450px] sm:h-[480px] md:h-[500px]">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.no}
                style={{
                  y: cardsTransforms[index].y,
                  scale: cardsTransforms[index].scale,
                  opacity: cardsTransforms[index].opacity,
                  zIndex: index + 10,
                }}
                className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between bg-white/95 backdrop-blur-2xl border border-[#E6E0D5] rounded-3xl shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="space-y-3 sm:space-y-5">
                  <div className="flex items-center justify-between border-b border-[#E6E0D5] pb-3 sm:pb-4">
                    <div className="size-10 sm:size-12 bg-blush/35 border border-[#E6E0D5] rounded-2xl flex items-center justify-center text-[#8B263E] shadow-xs">
                      <Icon className="size-5 sm:size-6" />
                    </div>
                    <span className="text-[0.7rem] sm:text-xs font-bold text-[#8B263E] font-mono-code bg-blush/20 px-2.5 py-1 rounded-full border border-[#E6E0D5]">
                      STEP {step.no} // 04
                    </span>
                  </div>

                  <div>
                    <span className="text-[0.62rem] sm:text-[0.68rem] tracking-wider text-[#8B263E] uppercase font-bold block mb-2 px-3 py-1 rounded-full bg-blush/30 border border-[#E6E0D5] w-fit shadow-xs">
                      {step.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#1a1a1a] uppercase tracking-tight leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[0.7rem] sm:text-xs text-[#8B263E] mt-1.5 uppercase font-bold tracking-wide font-mono-code">
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

        {/* Interactive Step Progress Indicator / Navigation Pills */}
        

      </div>
    </section>
  );
}