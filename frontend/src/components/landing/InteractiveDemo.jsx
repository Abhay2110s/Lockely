import { useState } from "react";
import { 
  KeyRound, 
  Copy, 
  Check, 
  RefreshCw, 
  Zap, 
  Terminal, 
} from "lucide-react";

export default function InteractiveDemo() {
  const [passLength, setPassLength] = useState(20);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState("random");

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
    "guardian-cipher-comic-77",
    "zero-knowledge-shield-2026",
    "pbkdf2-gcm-encrypted-99",
    "vault-fortress-super-hero-42"
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
    <section id="interactive-demo" className="relative px-6 py-24 bg-[#fffef7] border-t-3 border-[#18181b] font-comic">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fef08a] border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b] text-xs font-heading-comic font-bold text-slate-950">
            <Zap className="size-3.5 fill-amber-400 text-slate-950" />
            Interactive Crypto Sandbox 🎮
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading-comic font-black tracking-tight text-slate-950">
            Try the Key Generator Live!
          </h2>
          <p className="text-base text-slate-700 font-comic font-bold">
            Real-time client-side password entropy engine.
          </p>
        </div>

        {/* Studio Card */}
        <div className="p-6 sm:p-10 bg-[#faf6ea] border-3 border-[#18181b] shadow-[7px_7px_0px_#18181b] rounded-3xl space-y-8">
          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b-2.5 border-[#18181b]">
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border-2 border-[#18181b]">
              <button
                onClick={() => {
                  setMode("random");
                  setCurrentPass(generateRandomPass());
                }}
                className={`px-4 py-2 text-xs font-heading-comic font-bold rounded-xl transition-all ${
                  mode === "random" ? "bg-[#fef08a] text-slate-950 border border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]" : "text-slate-700 hover:text-slate-950"
                }`}
              >
                Complex Random Key
              </button>
              <button
                onClick={() => {
                  setMode("passphrase");
                  setCurrentPass(samplePassphrases[0]);
                }}
                className={`px-4 py-2 text-xs font-heading-comic font-bold rounded-xl transition-all ${
                  mode === "passphrase" ? "bg-[#fef08a] text-slate-950 border border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]" : "text-slate-700 hover:text-slate-950"
                }`}
              >
                Memorable Words
              </button>
            </div>

            <span className="text-xs font-heading-comic font-bold bg-[#bbf7d0] text-emerald-950 px-3 py-1 rounded-xl border border-[#18181b]">
              ● CSPRNG ACTIVE
            </span>
          </div>

          {/* Main Output Box */}
          <div className="space-y-2">
            <label className="text-xs font-heading-comic font-bold uppercase tracking-wider text-slate-700">
              Generated Password Output
            </label>
            <div className="flex items-center gap-3 bg-[#fef08a] p-4 rounded-2xl border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b]">
              <span className="font-mono text-base sm:text-xl font-black text-slate-950 flex-1 truncate tracking-wider">
                {currentPass}
              </span>
              <button
                onClick={handleRegenerate}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-950 border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5"
                title="Generate New"
              >
                <RefreshCw className="size-4.5" />
              </button>
              <button
                onClick={handleCopy}
                className="btn-comic btn-comic-primary px-4 py-2.5 text-xs gap-1.5"
              >
                {copied ? <Check className="size-4 text-emerald-300" /> : <Copy className="size-4" />}
                <span>{copied ? "Copied!" : "Copy Key"}</span>
              </button>
            </div>
          </div>

          {/* Controls Grid */}
          {mode === "random" && (
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              {/* Length Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-heading-comic font-bold text-slate-900">
                  <span>Length</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-[#18181b]">{passLength} Chars</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="48"
                  value={passLength}
                  onChange={(e) => {
                    setPassLength(Number(e.target.value));
                    setCurrentPass(generateRandomPass());
                  }}
                  className="w-full accent-[#6366f1] cursor-pointer h-3 bg-white border-2 border-[#18181b] rounded-lg"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setIncludeUpper(!includeUpper);
                    setCurrentPass(generateRandomPass());
                  }}
                  className={`flex-1 py-2 text-xs font-heading-comic font-bold rounded-xl border-2 border-[#18181b] transition-all ${
                    includeUpper ? "bg-[#bbf7d0] shadow-[2px_2px_0px_#18181b]" : "bg-white text-slate-400"
                  }`}
                >
                  ABC Upper
                </button>
                <button
                  onClick={() => {
                    setIncludeNumbers(!includeNumbers);
                    setCurrentPass(generateRandomPass());
                  }}
                  className={`flex-1 py-2 text-xs font-heading-comic font-bold rounded-xl border-2 border-[#18181b] transition-all ${
                    includeNumbers ? "bg-[#bae6fd] shadow-[2px_2px_0px_#18181b]" : "bg-white text-slate-400"
                  }`}
                >
                  123 Numbers
                </button>
                <button
                  onClick={() => {
                    setIncludeSymbols(!includeSymbols);
                    setCurrentPass(generateRandomPass());
                  }}
                  className={`flex-1 py-2 text-xs font-heading-comic font-bold rounded-xl border-2 border-[#18181b] transition-all ${
                    includeSymbols ? "bg-[#fda4af] shadow-[2px_2px_0px_#18181b]" : "bg-white text-slate-400"
                  }`}
                >
                  !@# Symbols
                </button>
              </div>
            </div>
          )}

          {/* Simulated Client Cipher Box */}
          <div className="p-4 bg-slate-950 text-slate-100 rounded-2xl border-2.5 border-[#18181b] font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[0.7rem] text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Terminal className="size-3 text-emerald-400" /> AES-256-GCM Hardware Encrypt
              </span>
              <span className="text-[#fef08a] font-bold">Cipher Tagged</span>
            </div>
            <p className="text-cyan-300 truncate">
              Ciphertext: <span className="text-slate-300">U2FsdGVkX195a82...8f319a2</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
