import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import HeroVideoBackground from "@/components/landing/HeroVideoBackground";

const rotatingWords = ["browser", "device", "vault", "hands"];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col justify-end overflow-hidden min-h-screen pb-12 pt-24 sm:pt-28"
    >
      {/* ── Animated Video Background ── */}
      <HeroVideoBackground />

      {/* Gradient overlays — blends canvas into surrounding sections */}
      <div className="hero-video-overlay" aria-hidden="true" />

      {/* Hero Content Container — left-aligned, RezonBio style */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col gap-8">

        {/* Main Display Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold tracking-tight text-white leading-[1.05]">
          Protecting <br className="hidden sm:block" />
          secrets that <br />
          never leave your{" "}
          {/* Rotating word */}
          <span className="hero-word-rotator text-gradient-warm">
            <ul className="hero-word-rotator__list">
              {rotatingWords.map((word) => (
                <li key={word} className="hero-word-rotator__item">
                  {word}.
                </li>
              ))}
            </ul>
          </span>
        </h1>

        {/* Bottom row — CTA buttons + scroll indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-2">

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="glass-btn-primary py-3.5 px-8 text-sm shadow-xl font-bold"
            >
              <ShieldCheck className="size-4" />
              <span>Create Free Vault</span>
              <ArrowRight className="size-4" />
            </Link>

            <a
              href="#interactive-demo"
              className="glass-btn-secondary py-3.5 px-7 text-sm font-semibold"
            >
              Live Sandbox
            </a>
          </div>

          {/* Scroll for more */}
          <button
            className="scroll-for-more hidden sm:flex"
            onClick={() => {
              const el = document.getElementById("features");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Scroll to features section"
          >
            Scroll for more
          </button>
        </div>
      </div>
    </section>
  );
}
