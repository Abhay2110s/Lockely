import { useState } from "react";
import { 
  KeyRound, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Zap, 
  Terminal, 
  Sliders 
} from "lucide-react";
import ShinyText from "@/components/animations/ShinyText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SpotlightCard from "@/components/animations/SpotlightCard";

export default function InteractiveDemo() {
  const [passLength, setPassLength] = useState(20);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState("random"); // 'random' | 'passphrase'

  const generateRandomPass = () => {
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let pool = lower;
    if (includeUpper) pool += upper;
    if (includeNumbers) pool += numbers;
    if (includeSymbols) pool += symbols;

    let res = "";
    for (let i = 0; i < passLength; i++) {
      res += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    return res;
  };

  const samplePassphrases = [
    "guardian-cipher-quantum-77",
    "zero-knowledge-shield-2026",
    "argonsalt-gcm-encrypted-99",
    "vault-fortress-key-alpha-42"
  ];

  const [currentPass, setCurrentPass] = useState(generateRandomPass());
  const [passphraseIdx, setPassphraseIdx] = useState(0);

  const handleRegenerate = () => {
    if (mode === "random") {
      setCurrentPass(generateRandomPass());
    } else {
      const nextIdx = (passphraseIdx + 1) % samplePassphrases.length;
      setPassphraseIdx(nextIdx);
      setCurrentPass(samplePassphrases[nextIdx]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="interactive-demo" className="relative px-6 py-28 bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 text-xs font-semibold text-purple-700">
              <Zap className="size-3.5 text-purple-600" />
              Live Interactive Sandbox
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Test our generator & entropy engine{" "}
              <ShinyText text="right now." className="font-extrabold" />
            </h2>
            <p className="text-base text-slate-600">
              Experience instant client-side key synthesis. Adjust length and rules to see entropy bits change in real-time.
            </p>
          </div>
        </ScrollReveal>

        {/* Studio Card */}
        <ScrollReveal direction="up" delay={0.2}>
          <SpotlightCard className="p-6 sm:p-10 bg-white border border-slate-200/90 shadow-xl rounded-3xl space-y-8">
            {/* Mode Switcher */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => {
                    setMode("random");
                    setCurrentPass(generateRandomPass());
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    mode === "random" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Complex Key Mode
                </button>
                <button
                  onClick={() => {
                    setMode("passphrase");
                    setCurrentPass(samplePassphrases[0]);
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    mode === "passphrase" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Memorable Passphrase
                </button>
              </div>

              <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                ● Client Entropy Active
              </span>
            </div>

            {/* Main Output Box */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Generated Key Output
              </label>
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="font-mono text-base sm:text-xl font-bold text-slate-900 flex-1 truncate tracking-wider">
                  {currentPass}
                </span>
                <button
                  onClick={handleRegenerate}
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-transform active:rotate-180"
                  title="Generate New"
                >
                  <RefreshCw className="size-4.5" />
                </button>
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    copied
                      ? "bg-emerald-600 text-white"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  <span>{copied ? "Copied!" : "Copy Key"}</span>
                </button>
              </div>
            </div>

            {/* Controls Grid */}
            {mode === "random" && (
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                {/* Length Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Password Length</span>
                    <span className="text-indigo-600 font-mono text-sm">{passLength} Characters</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="64"
                    value={passLength}
                    onChange={(e) => {
                      setPassLength(Number(e.target.value));
                      setCurrentPass(generateRandomPass());
                    }}
                    className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                </div>

                {/* Toggles */}
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setIncludeUpper(!includeUpper);
                      setCurrentPass(generateRandomPass());
                    }}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      includeUpper ? "bg-indigo-50 border-indigo-300 text-indigo-700" : "bg-white border-slate-200 text-slate-400"
                    }`}
                  >
                    ABC Upper
                  </button>
                  <button
                    onClick={() => {
                      setIncludeNumbers(!includeNumbers);
                      setCurrentPass(generateRandomPass());
                    }}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      includeNumbers ? "bg-purple-50 border-purple-300 text-purple-700" : "bg-white border-slate-200 text-slate-400"
                    }`}
                  >
                    123 Numbers
                  </button>
                  <button
                    onClick={() => {
                      setIncludeSymbols(!includeSymbols);
                      setCurrentPass(generateRandomPass());
                    }}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      includeSymbols ? "bg-pink-50 border-pink-300 text-pink-700" : "bg-white border-slate-200 text-slate-400"
                    }`}
                  >
                    !@# Symbols
                  </button>
                </div>
              </div>
            )}

            {/* Simulated Client Cipher Box */}
            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[0.7rem] text-slate-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <Terminal className="size-3 text-indigo-400" /> AES-256-GCM Simulation Output
                </span>
                <span className="text-emerald-400">Cipher Verified</span>
              </div>
              <p className="text-indigo-300 truncate">
                Ciphertext: <span className="text-slate-400">U2FsdGVkX195a82...8f319a2</span>
              </p>
              <p className="text-purple-300 truncate">
                Auth Tag: <span className="text-slate-400">a8f27b9c1d304ef...</span>
              </p>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
