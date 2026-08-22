import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Copy,
  RefreshCw,
  ShieldCheck,
  Eye,
  EyeOff,
  Terminal,
  Zap,
} from "lucide-react";
import DecryptedText from "@/components/animations/DecryptedText";

export default function Hero() {
  const [length, setLength]           = useState(18);
  const [useUpper, setUseUpper]       = useState(true);
  const [useNumbers, setUseNumbers]   = useState(true);
  const [useSymbols, setUseSymbols]   = useState(true);
  const [copied, setCopied]           = useState(false);
  const [seed, setSeed]               = useState(0);
  const [showEncryptedMock, setShowEncryptedMock] = useState(false);

  /* ── Cursor lens ───────────────────────────────────────────────────────── */
  const heroRef = useRef(null);
  const [cursorPos, setCursorPos]         = useState({ x: -200, y: -200 });
  const [isInsideHero, setIsInsideHero]   = useState(false);
  const [isHoverInteractive, setIsHoverInteractive] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove  = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setIsHoverInteractive(!!e.target?.closest("a, button, input, [role='button']"));
    };
    const onEnter = () => setIsInsideHero(true);
    const onLeave = () => { setIsInsideHero(false); setIsHoverInteractive(false); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── Password generation ───────────────────────────────────────────────── */
  const password = useMemo(() => {
    let pool = "abcdefghijklmnopqrstuvwxyz";
    if (useUpper)   pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) pool += "0123456789";
    if (useSymbols) pool += "!@#$%^&*()_+-=[]{}";
    let res = "";
    for (let i = 0; i < length; i++) res += pool.charAt(Math.floor(Math.random() * pool.length));
    return res;
  }, [length, useUpper, useNumbers, useSymbols, seed]);

  const entropyBits = useMemo(() => {
    let s = 26;
    if (useUpper)   s += 26;
    if (useNumbers) s += 10;
    if (useSymbols) s += 18;
    return Math.round(length * Math.log2(s));
  }, [length, useUpper, useNumbers, useSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mockVaultItems = [
    { name: "Google Personal",   username: "alex.dev@gmail.com",      category: "Personal" },
    { name: "Banking & Savings", username: "alex@chase.com",           category: "Finance"  },
    { name: "Streaming",         username: "alex.family@netflix.com",  category: "Media"    },
  ];

  return (
    <section
      ref={heroRef}
      id="top"
      className="ca-grid relative flex flex-col justify-center overflow-hidden px-4 min-h-[92vh] pb-20 pt-10 sm:pt-16 sm:pb-28 select-none bg-[#030b15]"
    >
      {/* ── Glowing radial orb behind hero ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
      />

      {/* ── Cursor lens — glowing ring ──────────────────────────────────────── */}
      {isInsideHero && (
        <div
          className="pointer-events-none fixed z-[100]"
          style={{
            left: `${cursorPos.x}px`,
            top:  `${cursorPos.y}px`,
            width:  isHoverInteractive ? "56px" : "36px",
            height: isHoverInteractive ? "56px" : "36px",
            transform: "translate(-50%, -50%)",
            transition: "width 0.18s ease, height 0.18s ease",
            borderRadius: "50%",
            border: `1px solid ${isHoverInteractive ? "rgba(0,212,255,0.8)" : "rgba(0,212,255,0.4)"}`,
            boxShadow: isHoverInteractive
              ? "0 0 16px rgba(0,212,255,0.5), inset 0 0 8px rgba(0,212,255,0.1)"
              : "0 0 8px rgba(0,212,255,0.3)",
          }}
        />
      )}

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">

        {/* Status pill */}
        <div className="pg-badge pg-badge-green mb-6">
          <span className="size-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
          Hardware CSPRNG · Client-Side Vault Sealed
        </div>

        {/* Main headline */}
        <h1 className="ca-display text-5xl sm:text-7xl lg:text-8xl leading-[0.93] tracking-tight text-white">
          <span className="block">Password</span>
          <span className="block text-[#00d4ff]">Security</span>
          <span className="block text-[#e2eaf8]/60 text-4xl sm:text-5xl lg:text-6xl font-light mt-2">
            Zero-Knowledge Architecture
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 max-w-xl text-[#e2eaf8]/55 text-base sm:text-lg leading-relaxed font-light">
          Your master password never leaves the browser. AES-256-GCM encryption,
          PBKDF2 key derivation, and mathematically provable privacy.
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/register"
            className="ca-mono inline-flex items-center gap-2.5 bg-[#00d4ff] px-6 py-3 text-xs font-bold text-[#030b15] hover:bg-[#00d4ff]/85 transition-colors tracking-widest"
          >
            <ArrowRight className="size-3.5" />
            Create Free Vault
          </Link>
          <a
            href="#interactive-demo"
            className="ca-mono inline-flex items-center gap-2.5 border border-white/[0.1] px-6 py-3 text-xs text-[#e2eaf8]/60 hover:text-white hover:border-white/20 transition-all tracking-widest"
          >
            <Terminal className="size-3.5" />
            Live Sandbox
          </a>
        </div>

        {/* Tech stat chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["AES-256-GCM", "PBKDF2 · 600k Rounds", "WebCrypto API", "Open Source"].map((t) => (
            <span key={t} className="ca-mono text-[0.62rem] px-3 py-1 border border-white/[0.07] text-[#e2eaf8]/35 tracking-widest">
              {t}
            </span>
          ))}
        </div>

        {/* ── Sandbox card ──────────────────────────────────────────────────── */}
        <div className="mt-16 w-full max-w-4xl text-left border border-white/[0.07] bg-[#040e1c]">

          {/* Card top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-[#030b15]/60">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-white/10" />
                <span className="size-2.5 rounded-full bg-white/10" />
                <span className="size-2.5 rounded-full bg-white/10" />
              </span>
              <span className="ca-mono text-[0.6rem] text-[#e2eaf8]/30 tracking-widest">
                KEY SYNTHESIS · PBKDF2 + AES-GCM
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowEncryptedMock(!showEncryptedMock)}
                className="ca-mono text-[0.6rem] px-2.5 py-1 border border-white/[0.08] text-[#e2eaf8]/40 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all flex items-center gap-1.5 tracking-widest"
              >
                {showEncryptedMock ? <EyeOff className="size-2.5" /> : <Eye className="size-2.5" />}
                {showEncryptedMock ? "DECRYPTED" : "CIPHER VIEW"}
              </button>
              <span className="pg-badge pg-badge-green text-[0.58rem] py-0.5">
                <span className="size-1 rounded-full bg-[#00ff9d] animate-pulse" />
                ZERO-KNOWLEDGE
              </span>
            </div>
          </div>

          {/* Card body */}
          <div className="grid lg:grid-cols-2 gap-0 items-stretch">

            {/* Left: Generator */}
            <div className="p-5 sm:p-6 border-r border-white/[0.05] space-y-4 overflow-hidden min-w-0">
              <div className="flex items-center justify-between">
                <span className="ca-mono text-[0.6rem] text-[#e2eaf8]/40 tracking-widest">SECRET KEY</span>
                <span className="ca-mono text-[0.6rem] text-[#00d4ff]/70 tracking-[0.08em]">
                  {entropyBits} BITS ENTROPY
                </span>
              </div>

              {/* Password display */}
              <div className="flex items-center gap-2 bg-[#030b15] px-3 py-2.5 border border-white/[0.07] w-full overflow-hidden">
                <div className="flex-1 min-w-0 overflow-hidden">
                  <DecryptedText
                    key={password}
                    text={password}
                    speed={25}
                    maxIterations={5}
                    className="font-mono text-sm text-[#00d4ff] tracking-widest block w-full overflow-hidden truncate"
                  />
                </div>
                <button
                  onClick={() => setSeed((s) => s + 1)}
                  className="p-1.5 text-[#e2eaf8]/30 hover:text-[#00d4ff] transition-colors shrink-0"
                  title="Regenerate"
                >
                  <RefreshCw className="size-3.5" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="ca-mono px-2.5 py-1 bg-[#00d4ff]/10 text-[#00d4ff] text-[0.6rem] hover:bg-[#00d4ff]/20 border border-[#00d4ff]/20 transition-colors flex items-center gap-1 shrink-0 tracking-widest"
                >
                  {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                  {copied ? "COPIED" : "COPY"}
                </button>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <div className="flex justify-between ca-mono text-[0.6rem] text-[#e2eaf8]/35 tracking-widest">
                  <span>LENGTH</span>
                  <span className="text-[#00d4ff]/60">{length} CHARS</span>
                </div>
                <input
                  type="range" min={8} max={32} value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full cursor-pointer h-px bg-white/10 accent-[#00d4ff]"
                />
              </div>

              {/* Charset toggles */}
              <div className="flex gap-2">
                {[
                  { label: "A–Z",   on: useUpper,   set: setUseUpper },
                  { label: "0–9",   on: useNumbers, set: setUseNumbers },
                  { label: "!@#",   on: useSymbols, set: setUseSymbols },
                ].map(({ label, on, set }) => (
                  <button
                    key={label}
                    onClick={() => { set(!on); setSeed(s => s + 1); }}
                    className={`flex-1 ca-mono py-1.5 text-[0.6rem] border transition-all tracking-widest ${
                      on
                        ? "border-[#00d4ff]/30 bg-[#00d4ff]/08 text-[#00d4ff]"
                        : "border-white/[0.07] text-[#e2eaf8]/25"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Mock Vault */}
            <div className="p-5 sm:p-6 space-y-2.5">
              <span className="ca-mono text-[0.6rem] text-[#e2eaf8]/30 tracking-widest block mb-3">VAULT PREVIEW</span>
              {mockVaultItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#030b15]/70 border border-white/[0.06] space-y-1.5 hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#e2eaf8]/80">{item.name}</span>
                    <span className="ca-mono text-[0.55rem] border border-white/[0.08] px-2 py-0.5 text-[#e2eaf8]/30 tracking-widest">
                      {item.category}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-[#e2eaf8]/35 truncate">
                    {showEncryptedMock
                      ? `{"iv":"e4b1...","cipher":"k8z0...","tag":"9f3a..."}`
                      : `${item.username}  ••••••••`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card footer — cipher strip */}
          <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.05] bg-[#030b15]/40">
            <span className="ca-mono text-[0.58rem] text-[#a5b4fc]/50 tracking-widest flex items-center gap-1.5">
              <Zap className="size-2.5 text-[#a5b4fc]" />
              AES-256-GCM · Ciphertext: U2FsdGVkX195a82...8f319a2
            </span>
            <span className="ca-mono text-[0.58rem] text-[#00ff9d]/50 tracking-widest">AUTHENTICATED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
