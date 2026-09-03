import { Link } from "react-router-dom";
import HeroVideoBackground from "@/components/landing/HeroVideoBackground";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full bg-[#EFE6D8] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-16"
    >
      {/* Ambient Canvas Layer */}
      <HeroVideoBackground />

      {/* Gentle Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(139,38,62,0.14)_100%)]"
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="hero-content relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 sm:space-y-10">
        {/* Massive Kinetic Typography */}
        <h1 className="w-full text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7.5vw] font-black uppercase tracking-tight leading-none text-[#1a1a1a] select-none flex flex-col items-center justify-center">
          <div className="overflow-hidden">
            <span className="hero-anim block" style={{ animationDelay: "0.15s" }}>
              YOUR DIGITAL LIFE.
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-anim block text-[#8B263E]" style={{ animationDelay: "0.35s" }}>
              UNCOMPROMISED.
            </span>
          </div>
        </h1>

        {/* Minimalist Secondary Text */}
        <p
          className="hero-anim hero-anim--soft text-[#6B6560] text-sm sm:text-base md:text-lg font-medium tracking-wide uppercase max-w-2xl px-4"
          style={{ animationDelay: "0.55s" }}
        >
          Zero-knowledge architecture. Absolute privacy &amp; control.
        </p>

        {/* Luxury Rounded Actions */}
        <div
          className="hero-anim hero-anim--soft pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
          style={{ animationDelay: "0.75s" }}
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
        </div>
      </div>

      {/* Technical Footer Indicator */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-between items-center px-6 sm:px-12 text-[0.7rem] font-medium uppercase tracking-widest text-[#6B6560] pointer-events-none hidden sm:flex">
        <span>LOC // 00.00.00</span>
        <span className="text-[#8B263E] font-bold">STATE // SECURE</span>
        <span>PROTOCOL // AES-256-GCM</span>
      </div>
    </section>
  );
}
