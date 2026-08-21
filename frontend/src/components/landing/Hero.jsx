import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Copy,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";
import DecryptedText from "@/components/animations/DecryptedText";

export default function Hero() {
  const [length, setLength] = useState(18);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [seed, setSeed] = useState(0);
  const [showEncryptedMock, setShowEncryptedMock] = useState(false);

  // Square Cursor effect states (Only active inside Hero section)
  const heroRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isInsideHero, setIsInsideHero] = useState(false);
  const [isHoverInteractive, setIsHoverInteractive] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      if (target && target.closest("a, button, input, [role='button']")) {
        setIsHoverInteractive(true);
      } else {
        setIsHoverInteractive(false);
      }
    };

    const handleMouseEnter = () => setIsInsideHero(true);
    const handleMouseLeave = () => {
      setIsInsideHero(false);
      setIsHoverInteractive(false);
    };

    heroEl.addEventListener("mousemove", handleMouseMove);
    heroEl.addEventListener("mouseenter", handleMouseEnter);
    heroEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      heroEl.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("mouseenter", handleMouseEnter);
      heroEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Generate password dynamically
  const password = useMemo(() => {
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+-=[]{}";

    let pool = lower;
    if (useUpper) pool += upper;
    if (useNumbers) pool += numbers;
    if (useSymbols) pool += symbols;

    let res = "";
    for (let i = 0; i < length; i++) {
      res += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    return res;
  }, [length, useUpper, useNumbers, useSymbols, seed]);

  const entropyBits = useMemo(() => {
    let poolSize = 26;
    if (useUpper) poolSize += 26;
    if (useNumbers) poolSize += 10;
    if (useSymbols) poolSize += 18;
    return Math.round(length * Math.log2(poolSize));
  }, [length, useUpper, useNumbers, useSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mockVaultItems = [
    { name: "Google Personal", username: "alex.dev@gmail.com", strength: "HERO GRADE 🦸‍♂️", category: "Personal", bg: "bg-[#ffe066]" },
    { name: "Banking & Savings", username: "alex.savings@chase.com", strength: "AES-256-GCM 🛡️", category: "Finance", bg: "bg-[#a7f3d0]" },
    { name: "Streaming & Movies", username: "alex.family@netflix.com", strength: "UNBREAKABLE ✨", category: "Personal", bg: "bg-[#7dd3fc]" },
  ];

  return (
    <section
      ref={heroRef}
      id="top"
      className="ca-grid relative flex flex-col justify-center overflow-hidden px-4 min-h-[90vh] pb-16 pt-8 sm:pt-14 sm:pb-24 select-none"
    >
      {/* ========================================================================= */}
      {/* SQUARE INVERTING CURSOR LENS (Only active inside Hero section)            */}
      {/* ========================================================================= */}
      {isInsideHero && (
        <div
          className="pointer-events-none fixed z-[100] rounded-2xl border-3 border-[#faf6ea] bg-[#faf6ea] mix-blend-difference shadow-2xl"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            width: isHoverInteractive ? "140px" : "110px",
            height: isHoverInteractive ? "140px" : "110px",
            transform: "translate(-50%, -50%)",
            transition: "width 0.15s ease, height 0.15s ease",
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-[#faf6ea]" />
        </div>
      )}

      {/* Hero Content Container */}
      <div className="relative mx-auto flex max-w-5xl flex-col items-center pt-2 text-center">
        {/* Top Handwritten Intro */}
        <div className="flex flex-col items-center text-[#191510]">
          <p className="ca-hand text-2xl sm:text-3xl">the zero-knowledge vault!</p>
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

        {/* Floating Tape Notes for Mobile */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 lg:hidden">
          <span className="ca-mono inline-block rounded-full border-[3px] border-white px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#191510] shadow-[0_4px_10px_rgba(25,21,16,0.2)] bg-[#c4b5fd] -rotate-3">
            Zero-Knowledge
          </span>
          <span className="ca-mono inline-block rounded-full border-[3px] border-white px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#191510] shadow-[0_4px_10px_rgba(25,21,16,0.2)] bg-[#ffe066] rotate-3">
            AES-256-GCM
          </span>
        </div>

        {/* Giant Main Display Title with Creative-Artsy Doodle Box & Floating Tags */}
        <div className="relative mt-6">
          <div className="ca-doodle-box relative inline-block border-[3.5px] border-[#fb923c] px-6 py-2 sm:px-12 sm:py-3 bg-white/70 shadow-[3px_4px_0px_#191510]">
            <span className="ca-display text-5xl sm:text-8xl lg:text-[7.5rem] leading-[0.92] tracking-tight text-[#191510]">
              PASSGUARDIAN
            </span>
          </div>

          {/* Desktop Surrounding Washi Stickers */}
          <div className="pointer-events-none absolute -inset-x-20 -inset-y-6 hidden lg:block">
            {/* Top Left Tape */}
            <div className="pointer-events-auto absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
              <span className="ca-mono inline-block rounded-full border-[3px] border-white px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-[#191510] shadow-[0_4px_10px_rgba(25,21,16,0.25)] -rotate-12 bg-[#c4b5fd]">
                Zero-Knowledge
              </span>
            </div>

            {/* Top Right Tape */}
            <div className="pointer-events-auto absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
              <span className="ca-mono inline-block rounded-full border-[3px] border-white px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-[#191510] shadow-[0_4px_10px_rgba(25,21,16,0.25)] rotate-12 bg-[#ffe066]">
                AES-256-GCM
              </span>
            </div>

            {/* Bottom Left Note */}
            <div className="pointer-events-auto absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/2">
              <span className="relative inline-block">
                <span className="ca-hand inline-block px-4 py-1.5 leading-snug text-[#191510] shadow-[2px_3px_8px_rgba(17,18,18,0.18)] text-2xl -rotate-6 bg-[#ffe066] border border-[#191510]/30">
                  Client-Side Keys 🛡️
                </span>
              </span>
            </div>

            {/* Bottom Right Note */}
            <div className="pointer-events-auto absolute bottom-0 right-0 translate-x-1/3 translate-y-1/2">
              <span className="relative inline-block">
                <span className="ca-hand inline-block px-4 py-1.5 leading-snug text-[#191510] shadow-[2px_3px_8px_rgba(17,18,18,0.18)] text-2xl rotate-6 bg-[#a7f3d0] border border-[#191510]/30">
                  Open Source ✨
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Operational Status Pill */}
        <p className="ca-mono mt-6 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#191510] sm:text-sm">
          <span className="size-3 rounded-full bg-[#60a5fa] animate-pulse" />
          Hardware CSPRNG &amp; Client-Side Vault Sealed
        </p>

        {/* Headline with Spinning Flower SVGs */}
        <h1 className="mt-8 max-w-3xl text-3xl font-semibold leading-[1.2] tracking-tight text-[#191510] sm:text-5xl lg:text-6xl">
          I protect secrets that{" "}
          <span className="inline-block">
            <svg viewBox="0 0 40 40" className="inline-block align-[-0.08em] ca-spin-slow h-[0.85em] w-[0.85em]" aria-hidden="true">
              <circle cx="20" cy="20" r="18" fill="#86efac" stroke="#191510" strokeWidth="2" />
              <circle cx="20" cy="20" r="11" fill="#faf6ea" />
              <circle cx="20" cy="20" r="5" fill="#86efac" />
              <circle cx="14" cy="9" r="2.4" fill="#191510" />
            </svg>
          </span>{" "}
          never leave your browser.{" "}
          <span className="inline-block">
            <svg viewBox="0 0 40 40" className="inline-block align-[-0.08em] ca-spin-slow h-[0.85em] w-[0.85em]" aria-hidden="true">
              <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff5e89" transform="rotate(0 20 20)" />
              <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff5e89" transform="rotate(45 20 20)" />
              <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff5e89" transform="rotate(90 20 20)" />
              <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff5e89" transform="rotate(135 20 20)" />
              <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff5e89" transform="rotate(180 20 20)" />
              <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff5e89" transform="rotate(225 20 20)" />
              <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff5e89" transform="rotate(270 20 20)" />
              <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff5e89" transform="rotate(315 20 20)" />
              <circle cx="20" cy="20" r="4" fill="#191510" />
            </svg>
          </span>
        </h1>

        {/* Primary Call to Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            to="/register"
            className="group/cta ca-mono relative inline-flex items-center gap-3 border-2 border-[#191510] bg-[#191510] py-3 pl-3 pr-8 text-sm font-bold uppercase tracking-[0.2em] text-white hover:bg-transparent hover:text-[#191510] transition-colors"
          >
            <span className="flex size-9 items-center justify-center bg-[#60a5fa] text-[#191510] transition-colors group-hover/cta:bg-[#ff5e89] group-hover/cta:text-white">
              <ArrowRight className="size-4" />
            </span>
            Create Free Vault
          </Link>

          <a
            href="#interactive-demo"
            className="ca-mono inline-flex items-center gap-2.5 border-2 border-[#191510] bg-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#191510] shadow-[2.5px_2.5px_0_#191510] hover:-translate-y-0.5 transition-transform"
          >
            <ShieldCheck className="size-4 text-[#ff5e89]" />
            Live Playground
          </a>
        </div>

        {/* Artsy Interactive Sandbox Showcase Card */}
        <div className="relative mt-14 w-full max-w-4xl p-6 sm:p-10 bg-white border-3 border-[#191510] shadow-[8px_8px_0_#191510] rounded-2xl text-left space-y-6">
          {/* Top Tape Stickers on Corners */}
          <span aria-hidden="true" className="absolute -left-6 -top-3 z-10 h-6 w-24 -rotate-[12deg] bg-[#7dd3fc]/80 shadow-[0_1px_3px_rgba(17,18,18,0.15)]" />
          <span aria-hidden="true" className="absolute -right-6 -top-3 z-10 h-6 w-24 rotate-[12deg] bg-[#ffe066]/80 shadow-[0_1px_3px_rgba(17,18,18,0.15)]" />

          {/* Card Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[#191510]">
            <div className="flex items-center gap-2.5">
              <span className="ca-mono px-3 py-1 bg-[#ffe066] text-[#191510] text-xs font-bold border border-[#191510]">
                KEY SYNTHESIS
              </span>
              <span className="ca-mono text-xs text-[#191510]/70">
                PBKDF2 + AES-GCM
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEncryptedMock(!showEncryptedMock)}
                className="ca-mono text-xs font-bold px-3 py-1 bg-[#faf6ea] border border-[#191510] hover:bg-[#ffe066] transition-colors flex items-center gap-1.5"
              >
                {showEncryptedMock ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                {showEncryptedMock ? "Decrypted" : "Cipher View"}
              </button>
              <span className="ca-mono text-xs font-bold bg-[#a7f3d0] text-[#191510] px-3 py-1 border border-[#191510]">
                ● ZERO-KNOWLEDGE
              </span>
            </div>
          </div>

          {/* Grid Generator & Mock Cards */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: Generator */}
            <div className="bg-[#faf6ea] p-5 sm:p-6 border-2 border-[#191510] space-y-4">
              <div className="flex items-center justify-between">
                <span className="ca-mono text-xs font-bold text-[#191510]">SECRET KEY</span>
                <span className="ca-mono text-xs font-bold bg-white px-2 py-0.5 border border-[#191510]">
                  {entropyBits} BITS ENTROPY
                </span>
              </div>

              {/* Password Display */}
              <div className="flex items-center gap-2 bg-white p-3 border-2 border-[#191510] shadow-[2px_2px_0_#191510]">
                <span className="font-mono text-sm sm:text-base font-bold text-[#191510] flex-1 truncate tracking-wider">
                  <DecryptedText key={password} text={password} speed={25} maxIterations={5} />
                </span>
                <button
                  onClick={() => setSeed((s) => s + 1)}
                  className="p-1.5 bg-[#faf6ea] border border-[#191510] hover:bg-[#ffe066]"
                  title="Regenerate"
                >
                  <RefreshCw className="size-4" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="ca-mono px-3 py-1.5 bg-[#191510] text-white text-xs font-bold hover:bg-[#ffe066] hover:text-[#191510] border border-[#191510] transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="size-3.5 text-emerald-300" /> : <Copy className="size-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Slider */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between ca-mono text-xs text-[#191510]">
                  <span>LENGTH</span>
                  <span>{length} CHARS</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={32}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full accent-[#191510] cursor-pointer h-2 bg-white border border-[#191510]"
                />
              </div>
            </div>

            {/* Right: Mock Vault Items */}
            <div className="space-y-3">
              {mockVaultItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 ${item.bg} border-2 border-[#191510] shadow-[2.5px_2.5px_0_#191510] space-y-1.5`}
                >
                  <div className="flex items-center justify-between">
                    <span className="ca-display text-base text-[#191510]">{item.name}</span>
                    <span className="ca-mono text-[0.65rem] bg-white px-2 py-0.5 border border-[#191510]">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-1.5 bg-white border border-[#191510] text-xs font-mono text-[#191510] truncate">
                    {showEncryptedMock
                      ? `{"iv":"e4b1...","cipher":"k8z0...","tag":"9f3a..."}`
                      : `${item.username} ••••••••`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
