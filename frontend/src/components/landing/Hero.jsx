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
      className="relative min-h-screen w-full bg-[#FDFBF7] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-16"
    >
      {/* Ambient Canvas Layer */}
      <HeroVideoBackground />

      {/* Gentle Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(244,194,194,0.18)_100%)]"
        aria-hidden="true"
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 sm:space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Massive Kinetic Typography */}
        <h1 className="w-full text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7.5vw] font-black uppercase tracking-tight leading-none text-[#1a1a1a] select-none flex flex-col items-center justify-center">
          <div className="overflow-hidden">
            <motion.span variants={textVariants} className="block">
              YOUR DIGITAL LIFE.
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span variants={textVariants} className="block text-[#8B263E]">
              UNCOMPROMISED.
            </motion.span>
          </div>
        </h1>

        {/* Minimalist Secondary Text */}
        <motion.p
          variants={itemVariants}
          className="text-[#6B6560] text-sm sm:text-base md:text-lg font-medium tracking-wide uppercase max-w-2xl px-4"
        >
          Zero-knowledge architecture. Absolute privacy &amp; control.
        </motion.p>

        {/* Luxury Rounded Actions */}
        <motion.div
          variants={itemVariants}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Link
            to="/register"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#8B263E] text-white hover:bg-[#A8324E] transition-all duration-200 font-bold text-xs sm:text-sm tracking-wider uppercase cursor-pointer shadow-button hover:shadow-button-hover transform hover:-translate-y-0.5"
          >
            INITIALIZE VAULT →
          </Link>

          <a
            href="#features"
            className="w-full sm:w-auto px-9 py-4 rounded-full border border-[#E6E0D5] bg-white/80 text-[#1a1a1a] hover:border-[#8B263E] hover:text-[#8B263E] hover:bg-blush/25 transition-all duration-200 font-bold text-xs sm:text-sm tracking-wider uppercase cursor-pointer shadow-xs"
          >
            EXPLORE ARCHITECTURE ↓
          </a>
        </motion.div>
      </motion.div>

      {/* Technical Footer Indicator */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-between items-center px-6 sm:px-12 text-[0.7rem] font-medium uppercase tracking-widest text-[#6B6560] pointer-events-none hidden sm:flex">
        <span>LOC // 00.00.00</span>
        <span className="text-[#8B263E] font-bold">STATE // SECURE</span>
        <span>PROTOCOL // AES-256-GCM</span>
      </div>
    </section>
  );
}
