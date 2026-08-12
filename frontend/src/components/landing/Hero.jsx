import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Copy, KeyRound, RefreshCw, Shield, Sparkles, Zap } from "lucide-react";
import ShinyText from "@/components/animations/ShinyText";
import DecryptedText from "@/components/animations/DecryptedText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import TiltCard from "@/components/animations/TiltCard";

export default function Hero() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [seed, setSeed] = useState(0);

  // Generate password dynamically based on options
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

  return (
    <section id="top" className="relative px-6 pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        {/* Left Column with Scroll Reveal */}
        <div>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="pastel-badge mb-4">
              <Sparkles className="size-3.5 text-indigo-600" />
              <span>Zero-Knowledge Security Standard</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="text-5xl sm:text-6xl md:text-[3.75rem] leading-[1.08] font-extrabold tracking-tight text-slate-900">
              Every password{" "}
              <ShinyText text="protected," className="font-extrabold" />{" "}
              never exposed.
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
              PassGuardian keeps an unbreachable vault of your digital credentials —
              generated client-side, encrypted with AES-256-GCM, and owned strictly by you.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Link to="/sign-up" className="btn-soft-primary flex items-center gap-2 text-sm">
                  Open Free Vault
                  <ArrowRight className="size-4" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a href="#security" className="btn-soft-secondary text-sm flex items-center gap-2">
                  <Shield className="size-4 text-indigo-600" />
                  Architecture Proof
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Quick Metrics */}
          <ScrollReveal direction="up" delay={0.5}>
            <div className="mt-12 grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              <div>
                <span className="text-[0.7rem] uppercase font-bold tracking-wider text-slate-400 block">
                  Cipher Standard
                </span>
                <span className="text-sm font-extrabold text-indigo-600 mt-0.5 block">
                  AES-256-GCM
                </span>
              </div>
              <div>
                <span className="text-[0.7rem] uppercase font-bold tracking-wider text-slate-400 block">
                  Server Knowledge
                </span>
                <span className="text-sm font-extrabold text-emerald-600 mt-0.5 block">
                  Zero Knowledge
                </span>
              </div>
              <div>
                <span className="text-[0.7rem] uppercase font-bold tracking-wider text-slate-400 block">
                  Audit Record
                </span>
                <span className="text-sm font-extrabold text-purple-600 mt-0.5 block">
                  100% Unbreached
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column — 3D Tilt Interactive Password Studio Card */}
        <ScrollReveal direction="up" delay={0.3}>
          <TiltCard className="p-7 bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-soft-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <KeyRound className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Interactive Vault Studio</h3>
                  <p className="text-[0.7rem] font-medium text-slate-500">Live Client-side Encryption</p>
                </div>
              </div>
              <span className="pastel-badge-mint text-[0.72rem]">
                <Zap className="size-3" /> {entropyBits} Bits Entropy
              </span>
            </div>

            {/* Generated Password Box with Decrypted Text animation */}
            <div className="space-y-5">
              <div>
                <label className="text-[0.72rem] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
                  Generated Password
                </label>
                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
                  <span className="font-mono text-base font-bold text-indigo-950 tracking-wider flex-1 truncate px-1">
                    <DecryptedText key={password} text={password} speed={30} maxIterations={6} />
                  </span>
                  <button
                    onClick={() => setSeed((s) => s + 1)}
                    title="Generate New"
                    className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80 transition-transform active:rotate-180"
                  >
                    <RefreshCw className="size-4" />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      copied
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Slider for Password Length */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Password Length</span>
                  <span className="text-indigo-600 font-mono text-sm">{length} Characters</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="soft-range cursor-pointer"
                />
              </div>

              {/* Toggle Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setUseUpper(!useUpper)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    useUpper
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                      : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}
                >
                  ABC Uppercase
                </button>
                <button
                  type="button"
                  onClick={() => setUseNumbers(!useNumbers)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    useNumbers
                      ? "bg-purple-50 border-purple-200 text-purple-700"
                      : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}
                >
                  123 Numbers
                </button>
                <button
                  type="button"
                  onClick={() => setUseSymbols(!useSymbols)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    useSymbols
                      ? "bg-pink-50 border-pink-200 text-pink-700"
                      : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}
                >
                  !@# Symbols
                </button>
              </div>

              {/* Security Bar */}
              <div className="pt-2">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1 p-0.5">
                  <div className="h-full flex-1 rounded-full bg-indigo-500" />
                  <div className={`h-full flex-1 rounded-full ${length > 12 ? "bg-purple-500" : "bg-slate-200"}`} />
                  <div className={`h-full flex-1 rounded-full ${length > 16 ? "bg-emerald-500" : "bg-slate-200"}`} />
                </div>
              </div>
            </div>
          </TiltCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
