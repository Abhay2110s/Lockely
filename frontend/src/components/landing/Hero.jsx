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
  Lock,
  Zap,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";
import DecryptedText from "@/components/animations/DecryptedText";

export default function Hero() {
  const [length, setLength] = useState(16);
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
    { name: "Google Personal", username: "alex.dev@gmail.com", strength: "HERO GRADE 🦸‍♂️", category: "Personal", bg: "bg-[#fef08a]" },
    { name: "Bank & Savings", username: "alex.savings@chase.com", strength: "AES-256-GCM 🛡️", category: "Finance", bg: "bg-[#bbf7d0]" },
    { name: "Streaming Vault", username: "alex.family@netflix.com", strength: "100% UNBREAKABLE ✨", category: "Entertainment", bg: "bg-[#bae6fd]" },
  ];

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative px-6 pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden font-comic select-none"
    >
      {/* ========================================================================= */}
      {/* SQUARE INVERTING CURSOR (Only active inside Hero section)                */}
      {/* ========================================================================= */}
      {isInsideHero && (
        <div
          className="pointer-events-none fixed z-[100] rounded-2xl border-3 border-white bg-white mix-blend-difference shadow-2xl"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            width: isHoverInteractive ? "140px" : "110px",
            height: isHoverInteractive ? "140px" : "110px",
            transform: "translate(-50%, -50%)",
            transition: "width 0.15s ease, height 0.15s ease",
          }}
        >
          {/* Exact Center Point Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-white" />
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Top Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fef08a] border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b] text-xs font-heading-comic font-black text-slate-950">
            <Zap className="size-4 fill-amber-400 text-slate-950" />
            ZERO-KNOWLEDGE COMIC PASSWORD VAULT 💥
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading-comic font-black tracking-tight text-slate-950 leading-[1.08]">
            Your secrets. <br />
            <span className="bg-[#fde047] px-3 py-1 rounded-2xl border-3 border-[#18181b] shadow-[4px_4px_0px_#18181b] inline-block mt-2">
              100% Protected! 🛡️
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-slate-800 max-w-2xl mx-auto font-comic font-bold">
            Store, generate, and autofill credentials with client-side AES-256-GCM encryption. Your master password never leaves your device!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="btn-comic btn-comic-primary px-8 py-3.5 text-sm gap-2 text-white"
            >
              Create Free Vault
              <ArrowRight className="size-4.5" />
            </Link>

            <a
              href="#interactive-demo"
              className="btn-comic btn-comic-yellow px-8 py-3.5 text-sm gap-2"
            >
              <ShieldCheck className="size-4.5" />
              Try Live Playground
            </a>
          </div>
        </div>

        {/* Hero Interactive Comic Showcase Card */}
        <div className="p-5 sm:p-8 bg-[#fffef7] border-3 border-[#18181b] shadow-[8px_8px_0px_#18181b] rounded-3xl space-y-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b-2.5 border-[#18181b]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="size-3.5 rounded-full bg-[#fb7185] border border-[#18181b]" />
                <div className="size-3.5 rounded-full bg-[#fde047] border border-[#18181b]" />
                <div className="size-3.5 rounded-full bg-[#4ade80] border border-[#18181b]" />
              </div>
              <span className="hidden sm:inline-block text-xs font-mono font-bold text-slate-800 bg-[#fef08a] px-3 py-0.5 rounded-lg border border-[#18181b]">
                vault.passguardian.io
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEncryptedMock(!showEncryptedMock)}
                className="btn-comic btn-comic-white text-xs px-3.5 py-1.5 gap-1.5"
              >
                {showEncryptedMock ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                {showEncryptedMock ? "Show Decrypted" : "Show Encrypted Cipher"}
              </button>
              <span className="text-xs font-heading-comic font-bold px-3 py-1 rounded-full bg-[#bbf7d0] text-emerald-950 border border-[#18181b]">
                ● Zero-Knowledge
              </span>
            </div>
          </div>

          {/* Grid Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: Generator Sandbox */}
            <div className="bg-white p-6 rounded-2xl border-2.5 border-[#18181b] shadow-[4px_4px_0px_#18181b] space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-[#fef08a] border-2 border-[#18181b] flex items-center justify-center">
                      <KeyRound className="size-5 text-slate-950" />
                    </div>
                    <div>
                      <h3 className="text-sm font-heading-comic font-black text-slate-950">Live Key Generator</h3>
                      <p className="text-[0.7rem] text-slate-500 font-comic font-bold">Hardware CSPRNG</p>
                    </div>
                  </div>
                  <span className="text-xs font-heading-comic font-bold text-slate-950 bg-[#bbf7d0] px-2.5 py-1 rounded-lg border border-[#18181b]">
                    <Zap className="size-3 inline mr-1 fill-current" />
                    {entropyBits} Bits
                  </span>
                </div>

                {/* Password Display */}
                <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-heading-comic font-bold uppercase tracking-wider text-slate-600">
                    Generated Secret Password
                  </label>
                  <div className="flex items-center gap-2 bg-[#fef08a] p-3.5 rounded-2xl border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b]">
                    <span className="font-mono text-sm sm:text-base font-black text-slate-950 tracking-wider flex-1 truncate">
                      <DecryptedText key={password} text={password} speed={25} maxIterations={5} />
                    </span>
                    <button
                      onClick={() => setSeed((s) => s + 1)}
                      className="p-1.5 rounded-lg bg-white border border-[#18181b] text-slate-950 hover:bg-slate-100 transition-colors"
                      title="Regenerate"
                    >
                      <RefreshCw className="size-4" />
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="btn-comic btn-comic-primary px-3 py-1.5 text-xs gap-1"
                    >
                      {copied ? <Check className="size-3.5 text-emerald-300" /> : <Copy className="size-3.5" />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Length Slider */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs font-heading-comic font-bold text-slate-900">
                    <span>Password Length</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-[#18181b]">{length} chars</span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={32}
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-3 bg-slate-100 border-2 border-[#18181b] rounded-lg appearance-none cursor-pointer accent-[#6366f1]"
                  />
                </div>
              </div>
            </div>

            {/* Right: Mock Vault Items */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-heading-comic font-black text-slate-950">
                  {showEncryptedMock ? "Raw Ciphertext in MongoDB (Server-side)" : "Decrypted Live Vault (Client-side)"}
                </h3>
                <span className="text-[0.68rem] font-heading-comic font-bold bg-[#ddd6fe] px-2.5 py-0.5 rounded-full border border-[#18181b]">
                  {showEncryptedMock ? "AES-GCM CIPHER" : "PLAINTEXT (IN MEMORY)"}
                </span>
              </div>

              {mockVaultItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b] ${item.bg} space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading-comic font-black text-sm text-slate-950">{item.name}</span>
                    <span className="text-[0.68rem] font-heading-comic font-bold bg-white px-2 py-0.5 rounded border border-[#18181b]">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-[#18181b] text-xs font-mono font-bold text-slate-900 truncate">
                    {showEncryptedMock
                      ? `{"iv":"3b2f...","cipherText":"k9A1zL...","authTag":"7f8d..."}`
                      : `${item.username} ••••••••`}
                  </div>
                  <div className="flex items-center justify-between text-[0.7rem] font-heading-comic font-bold text-slate-800">
                    <span>Protection:</span>
                    <span className="text-emerald-900 font-black">{item.strength}</span>
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
