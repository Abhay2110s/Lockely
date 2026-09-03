import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroVideoBackground from "@/components/landing/HeroVideoBackground";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const textVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 24,
      stiffness: 65,
      duration: 1.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 24,
      stiffness: 80,
      duration: 1.0,
    },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-16"
    >
      {/* Ambient Canvas Layer */}
      <HeroVideoBackground />

      {/* Cinematic Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_40%,#000000_100%)]"
        aria-hidden="true"
      />

      {/* Hero Content — Centered Brutalist Manifesto */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 sm:space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Massive Kinetic Typography */}
        <h1 className="w-full text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7.5vw] font-black uppercase tracking-tighter leading-none text-[#F8F9FA] select-none flex flex-col items-center justify-center">
          <div className="overflow-hidden">
            <motion.span variants={textVariants} className="block">
              YOUR DIGITAL LIFE.
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span variants={textVariants} className="block text-[#00FF66]">
              UNCOMPROMISED.
            </motion.span>
          </div>
        </h1>

        {/* Minimalist Secondary Text */}
        <motion.p
          variants={itemVariants}
          className="text-neutral-400 text-sm sm:text-base md:text-lg font-mono tracking-widest uppercase max-w-2xl px-4"
        >
          Zero-knowledge architecture. Absolute control.
        </motion.p>

        {/* Brutalist Rectangular Actions — Harsh Hover Inversion */}
        <motion.div
          variants={itemVariants}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 border border-[#00FF66] text-[#00FF66] bg-transparent hover:bg-[#00FF66] hover:text-black transition-colors duration-150 font-mono font-bold text-xs sm:text-sm tracking-widest uppercase cursor-pointer"
          >
            INITIALIZE VAULT →
          </Link>

          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 border border-[#222222] text-neutral-400 bg-transparent hover:border-[#F8F9FA] hover:text-[#F8F9FA] transition-colors duration-150 font-mono font-bold text-xs sm:text-sm tracking-widest uppercase cursor-pointer"
          >
            [ READ MANIFESTO ]
          </a>
        </motion.div>
      </motion.div>

      {/* Technical Footer Indicator */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-between items-center px-6 sm:px-12 text-[0.65rem] font-mono uppercase tracking-widest text-neutral-600 pointer-events-none hidden sm:flex">
        <span>LOC // 00.00.00</span>
        <span className="text-[#00FF66] font-bold">STATE // SECURE</span>
        <span>PROTOCOL // AES-256-GCM</span>
      </div>
    </section>
  );
}
