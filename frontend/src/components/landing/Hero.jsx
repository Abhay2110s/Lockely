import { useState, useMemo } from "react";
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
  Cpu, 
  Zap, 
  Eye, 
  EyeOff,
  Code2,
  ShieldAlert,
  UserCheck,
  CreditCard,
  Mail
} from "lucide-react";
import ShinyText from "@/components/animations/ShinyText";
import DecryptedText from "@/components/animations/DecryptedText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import SpotlightCard from "@/components/animations/SpotlightCard";
import { ShineBorder } from "@/components/ui/shine-border";

export default function Hero() {
  const [length, setLength] = useState(16);
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

  // Calculate dynamic entropy score
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
    { name: "Google Personal Account", username: "alex.dev@gmail.com", strength: "Unbreakable", category: "Personal" },
    { name: "Online Banking Portal", username: "alex.savings@chase.com", strength: "AES-256", category: "Finance" },
    { name: "Family Streaming & Entertainment", username: "alex.family@netflix.com", strength: "256-Bit GCM", category: "Entertainment" },
  ];

  return (
    <section id="top" className="relative px-6 pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Soft Ambient Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-200/40 via-purple-100/30 to-teal-100/20 blur-3xl -z-20 rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Top Hero Header Content Container with Centered Colorful Ring */}
        <div className="text-center max-w-3xl mx-auto space-y-6 relative py-4">
          {/* ========================================================================= */}
          {/* COLORFUL GRADIENT RING PERFECTLY ALIGNED WITH CONTENT                     */}
          {/* ========================================================================= */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 select-none w-full h-full flex items-center justify-center">
            <div className="relative size-[380px] sm:size-[520px] md:size-[620px] flex items-center justify-center">
              {/* Outer Vibrant Colorful Gradient Ring */}
              <div 
                className="absolute inset-0 rounded-full border-[2.5px] border-indigo-400/45 shadow-[0_0_50px_rgba(99,102,241,0.25)]" 
                style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12), rgba(236, 72, 153, 0.12))',
                }} 
              />

              {/* Inner Soft Accent Halo Ring */}
              <div className="absolute inset-6 sm:inset-8 rounded-full border border-purple-300/35 opacity-70" />

              {/* Soft Radial Color Glow */}
              <div className="absolute inset-12 sm:inset-14 rounded-full bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-pink-500/15 blur-2xl opacity-75 animate-pulse" />
            </div>
          </div>
          {/* ========================================================================= */}

          <ScrollReveal direction="up" delay={0.1}>
            <div className="relative rounded-full p-[2.5px] inline-block mx-auto overflow-hidden shadow-sm">
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} borderWidth={2.5} duration={5} />
              <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-800">
                <ShieldCheck className="size-3.5 text-indigo-600" />
                <span>Military-Grade Security • Zero-Knowledge Vault</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.12] font-extrabold tracking-tight text-slate-900">
              Your digital life, protected with{" "}
              <ShinyText text="military-grade zero-knowledge encryption." className="font-extrabold" />
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg md:text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto font-normal">
              Store, generate, and autofill your personal passwords with absolute privacy. Your master key is derived locally and never leaves your browser.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <MagneticButton>
                <Link to="/sign-up" className="btn-soft-primary px-7 py-3.5 text-sm font-bold flex items-center gap-2 shadow-md shadow-indigo-500/15">
                  Create Free Account
                  <ArrowRight className="size-4" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a href="#interactive-demo" className="btn-soft-secondary px-7 py-3.5 text-sm font-semibold flex items-center gap-2">
                  <ShieldCheck className="size-4 text-indigo-600" />
                  Try Live Sandbox
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>

        {/* Hero Interactive SaaS Showcase Dashboard */}
        <ScrollReveal direction="up" delay={0.5}>
          <SpotlightCard className="p-4 sm:p-7 bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-3xl">
            {/* Top SaaS App Header Bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-rose-400/80" />
                  <div className="size-3 rounded-full bg-amber-400/80" />
                  <div className="size-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
                <span className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                  <Lock className="size-3 text-emerald-600" />
                  app.passguardian.io/my-vault
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowEncryptedMock(!showEncryptedMock)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors border border-indigo-200/60"
                >
                  {showEncryptedMock ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  {showEncryptedMock ? "Show Raw Ciphertext" : "Show Decrypted View"}
                </button>
                <span className="text-[0.72rem] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                  ● 100% Encrypted
                </span>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
              {/* Left Column: Live Password Generator Widget */}
              <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/70 space-y-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                        <KeyRound className="size-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Personal Key Generator</h3>
                        <p className="text-[0.7rem] text-slate-500 font-medium">AES-256 Client Encryption</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      <Zap className="size-3 inline mr-1" />
                      {entropyBits} Bits Entropy
                    </span>
                  </div>

                  {/* Password Display */}
                  <div className="space-y-2">
                    <label className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">
                      Generated Strong Password
                    </label>
                    <div className="flex items-center gap-2 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <span className="font-mono text-sm sm:text-base font-bold text-slate-900 tracking-wider flex-1 truncate">
                        <DecryptedText key={password} text={password} speed={25} maxIterations={5} />
                      </span>
                      <button
                        onClick={() => setSeed((s) => s + 1)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Regenerate"
                      >
                        <RefreshCw className="size-4" />
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                          copied
                            ? "bg-emerald-600 text-white"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                        }`}
                      >
                        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>

                  {/* Length Slider */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Password Length</span>
                      <span className="text-indigo-600 font-mono">{length} Characters</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="32"
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                  </div>

                  {/* Option Toggles */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <button
                      onClick={() => setUseUpper(!useUpper)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        useUpper
                          ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                          : "bg-white border-slate-200 text-slate-400"
                      }`}
                    >
                      A-Z Upper
                    </button>
                    <button
                      onClick={() => setUseNumbers(!useNumbers)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        useNumbers
                          ? "bg-purple-50 border-purple-300 text-purple-700"
                          : "bg-white border-slate-200 text-slate-400"
                      }`}
                    >
                      0-9 Digits
                    </button>
                    <button
                      onClick={() => setUseSymbols(!useSymbols)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        useSymbols
                          ? "bg-pink-50 border-pink-300 text-pink-700"
                          : "bg-white border-slate-200 text-slate-400"
                      }`}
                    >
                      !@# Symbols
                    </button>
                  </div>
                </div>

                {/* Strength Meter Bar */}
                <div className="pt-2 border-t border-slate-200/60">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span>Cryptographic Resistance</span>
                    <span className="text-indigo-600 font-bold">100% Uncrackable</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex gap-1">
                    <div className="h-full flex-1 bg-indigo-500 rounded-full" />
                    <div className={`h-full flex-1 rounded-full ${length > 12 ? "bg-purple-500" : "bg-slate-300"}`} />
                    <div className={`h-full flex-1 rounded-full ${length > 16 ? "bg-emerald-500" : "bg-slate-300"}`} />
                  </div>
                </div>
              </div>

              {/* Right Column: Encrypted Personal Vault Items Mockup */}
              <div className="space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Personal Vault Items
                    </span>
                    <span className="text-xs text-indigo-600 font-semibold">Protected</span>
                  </div>

                  <div className="space-y-2.5">
                    {mockVaultItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white rounded-xl border border-slate-200/90 hover:border-indigo-300 transition-all flex items-center justify-between shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                            {idx === 0 ? <Mail className="size-4" /> : idx === 1 ? <CreditCard className="size-4" /> : <UserCheck className="size-4" />}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                            <p className="text-[0.7rem] text-slate-400 font-mono">{item.username}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[0.7rem] font-mono font-bold block text-slate-800">
                            {showEncryptedMock ? "U2FsdGVkX19x..." : "••••••••••••"}
                          </span>
                          <span className="text-[0.65rem] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            {item.strength}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Security Badge */}
                <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900 font-medium">
                  <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
                  <span>Your master password is never stored or sent anywhere — only you hold the decryption key.</span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>

        {/* Partner / Standard Trust Proof Bar */}
        <ScrollReveal direction="up" delay={0.6}>
          <div className="pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-6 text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Military-Grade Cryptographic Standards
            </span>
            <div className="flex flex-wrap items-center gap-8 text-slate-600 text-xs font-mono font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-indigo-600" /> AES-256-GCM
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="size-4 text-purple-600" /> Argon2id Key KDF
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="size-4 text-emerald-600" /> Zero-Knowledge Proofs
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="size-4 text-pink-600" /> k-Anonymity Leak Check
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
