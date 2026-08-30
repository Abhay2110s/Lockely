import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Copy,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
  Eye,
  EyeOff,
  Lock,
  Cpu,
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
    { name: "Google Personal", username: "alex.dev@gmail.com", strength: "HERO GRADE", category: "Personal" },
    { name: "Banking & Savings", username: "alex.savings@chase.com", strength: "AES-256-GCM", category: "Finance" },
    { name: "Streaming & Movies", username: "alex.family@netflix.com", strength: "AUTHENTICATED", category: "Entertainment" },
  ];

  return (
    <section
      id="top"
      className="relative flex flex-col justify-center overflow-hidden px-4 min-h-[90vh] pb-16 pt-10 sm:pt-16 sm:pb-24"
    >
      {/* Hero Content Container */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center pt-2 text-center z-10">
        
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-badge-blush mb-6 animate-in fade-in">
          <span className="size-2 rounded-full bg-[#f43f6e] animate-pulse" />
          <span className="text-xs font-semibold text-[#ffe4e9]">
            Zero-Knowledge Hardware-Accelerated Vault
          </span>
        </div>

        {/* Main Display Title with Gradient Highlight */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Protecting secrets that <br />
            <span className="text-gradient-blush">never leave your browser.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#fda4b8]/80 leading-relaxed font-normal pt-2">
            Military-grade client-side encryption powered by WebCrypto AES-256-GCM. 
            Your master key never crosses the internet, keeping your credentials safe from data breaches.
          </p>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            to="/register"
            className="glass-btn-primary py-3.5 px-7 text-sm shadow-xl"
          >
            <span>Create Free Vault</span>
            <ArrowRight className="size-4" />
          </Link>

          <a
            href="#interactive-demo"
            className="glass-btn-secondary py-3.5 px-6 text-sm"
          >
            <ShieldCheck className="size-4 text-[#f43f6e]" />
            Live Sandbox
          </a>
        </div>

        {/* Glassmorphic Interactive Sandbox Showcase Card */}
        <div className="relative mt-12 sm:mt-16 w-full max-w-4xl glass-panel p-5 sm:p-8 rounded-2xl border border-pink-500/20 shadow-2xl text-left space-y-6">
          
          {/* Card Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-pink-500/15">
            <div className="flex items-center gap-2.5">
              <span className="glass-badge-burgundy text-xs font-semibold">
                KEY SYNTHESIS
              </span>
              <span className="text-xs text-[#fda4b8]/80 font-mono-code">
                PBKDF2 (600,000 rounds) + AES-GCM
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEncryptedMock(!showEncryptedMock)}
                className="glass-btn-ghost text-xs py-1 px-2.5 flex items-center gap-1.5 cursor-pointer"
              >
                {showEncryptedMock ? <EyeOff className="size-3 text-[#f43f6e]" /> : <Eye className="size-3 text-[#f43f6e]" />}
                {showEncryptedMock ? "Decrypted View" : "Cipher View"}
              </button>
              <span className="glass-badge-emerald text-xs">
                ● ZERO-KNOWLEDGE
              </span>
            </div>
          </div>

          {/* Grid Generator & Mock Cards */}
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            {/* Left: Generator Sandbox */}
            <div className="glass-card-subtle p-5 sm:p-6 space-y-4 border border-pink-500/15">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#fff5f7] tracking-wider uppercase font-mono-code flex items-center gap-1.5">
                  <Lock className="size-3.5 text-[#f43f6e]" /> Secret Key
                </span>
                <span className="glass-badge-blush text-[0.65rem] font-mono-code font-bold">
                  {entropyBits} BITS ENTROPY
                </span>
              </div>

              {/* Password Display */}
              <div className="flex items-center gap-2 glass-input p-2.5 overflow-hidden">
                <div className="flex-1 min-w-0 overflow-hidden">
                  <DecryptedText
                    key={password}
                    text={password}
                    speed={25}
                    maxIterations={5}
                    className="font-mono-code text-sm sm:text-base font-bold text-white tracking-wider block w-full overflow-hidden truncate"
                  />
                </div>
                <button
                  onClick={() => setSeed((s) => s + 1)}
                  className="p-1.5 rounded-lg text-[#fda4b8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Regenerate"
                >
                  <RefreshCw className="size-4" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="glass-btn-primary py-1.5 px-3 text-xs flex items-center gap-1"
                >
                  {copied ? <Check className="size-3.5 text-emerald-200" /> : <Copy className="size-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Slider */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs text-[#fda4b8] font-mono-code">
                  <span>LENGTH</span>
                  <span className="font-bold text-white">{length} CHARS</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={32}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full accent-[#f43f6e] cursor-pointer h-1.5 bg-black/40 rounded-lg"
                />
              </div>
            </div>

            {/* Right: Mock Vault Items */}
            <div className="space-y-3 flex flex-col justify-center">
              {mockVaultItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl glass-card-interactive border border-pink-500/15 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{item.name}</span>
                    <span className="glass-badge-blush text-[0.62rem]">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-pink-500/10 text-xs font-mono-code text-[#fda4b8] truncate">
                    {showEncryptedMock
                      ? `{"iv":"e4b1...","cipher":"k8z0...","tag":"9f3a..."}`
                      : `${item.username} ••••••••••••`}
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
