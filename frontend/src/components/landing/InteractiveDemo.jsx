import { useState } from "react";
import { Copy, Check, RefreshCw, Terminal, Sparkles } from "lucide-react";

function generateRandomPass(passLength = 20, includeUpper = true, includeNumbers = true, includeSymbols = true) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let pool = lower;
  if (includeUpper) pool += upper;
  if (includeNumbers) pool += numbers;
  if (includeSymbols) pool += symbols;

  if (!pool) return "";

  let res = "";
  const array = new Uint32Array(passLength);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < passLength; i++) {
    res += pool.charAt(array[i] % pool.length);
  }
  return res;
}

const samplePassphrases = [
  "guardian-cipher-velvet-77",
  "zero-knowledge-shield-2026",
  "pbkdf2-gcm-encrypted-99",
  "vault-fortress-indigo-42",
];

export default function InteractiveDemo() {
  const [passLength, setPassLength] = useState(20);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState("random");
  const [currentPass, setCurrentPass] = useState(() => generateRandomPass(20, true, true, true));
  const [passphraseIdx, setPassphraseIdx] = useState(0);

  const handleRegenerate = (len = passLength, up = includeUpper, num = includeNumbers, sym = includeSymbols) => {
    if (mode === "random") {
      setCurrentPass(generateRandomPass(len, up, num, sym));
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
    <section id="interactive-demo" className="relative scroll-mt-24 px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header — left-aligned */}
        <div className="max-w-2xl space-y-3 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full landing-badge">
            <Sparkles className="size-3.5 text-[#8B7FF0]" />
            <span className="text-xs font-semibold text-[#D5D1FC]">LIVE CRYPTO SANDBOX</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Try the <span className="text-gradient-warm">Key Generator</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B4ADFA]">
            Experiment with entropy parameters and client-side password strength in real time.
          </p>
        </div>

        {/* Studio Card */}
        <div className="relative p-5 sm:p-8 glass-panel rounded-2xl border border-[#3F3AA5]/30 shadow-2xl space-y-6">
          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#3F3AA5]/20">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMode("random");
                  setCurrentPass(generateRandomPass());
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  mode === "random"
                    ? "glass-btn-primary text-[#1A126E]"
                    : "glass-btn-ghost"
                }`}
              >
                Complex Random Key
              </button>
              <button
                onClick={() => {
                  setMode("passphrase");
                  setCurrentPass(samplePassphrases[0]);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  mode === "passphrase"
                    ? "glass-btn-primary text-[#1A126E]"
                    : "glass-btn-ghost"
                }`}
              >
                Memorable Passphrase
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="landing-badge text-xs font-mono-code">
                <Terminal className="size-3 text-[#8B7FF0]" />
                WebCrypto CSPRNG
              </span>
            </div>
          </div>

          {/* Key Output Window */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0d0a3e] border border-[#3F3AA5]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full overflow-hidden text-center sm:text-left">
              <span className="text-[0.65rem] font-mono-code font-bold uppercase tracking-wider text-[#B4ADFA]/70 block mb-1">
                Generated Cipher Text
              </span>
              <p className="text-lg sm:text-xl font-bold font-mono-code text-white tracking-wider truncate selection:bg-[#6554DE] selection:text-white">
                {currentPass}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end shrink-0">
              <button
                onClick={handleRegenerate}
                className="glass-btn-secondary p-2.5 rounded-xl text-xs"
                title="Regenerate"
              >
                <RefreshCw className="size-4" />
              </button>
              <button
                onClick={handleCopy}
                className="glass-btn-primary py-2.5 px-4 text-xs font-semibold"
              >
                {copied ? <Check className="size-3.5 text-emerald-200" /> : <Copy className="size-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Controls */}
          {mode === "random" && (
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              {/* Length Slider */}
              <div className="space-y-2 p-4 rounded-xl glass-card-subtle">
                <div className="flex items-center justify-between text-xs font-mono-code text-[#B4ADFA]">
                  <span>LENGTH</span>
                  <span className="font-bold text-white">{passLength} Characters</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={40}
                  value={passLength}
                  onChange={(e) => {
                    setPassLength(Number(e.target.value));
                    setTimeout(() => setCurrentPass(generateRandomPass()), 0);
                  }}
                  className="w-full accent-[#6554DE] cursor-pointer h-1.5 bg-[#0d0a3e] rounded-lg"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => {
                    setIncludeUpper(!includeUpper);
                    setTimeout(() => setCurrentPass(generateRandomPass()), 0);
                  }}
                  className={`p-3 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer ${
                    includeUpper
                      ? "bg-[#1A126E] border-[#6554DE]/50 text-white shadow-md"
                      : "glass-card-subtle text-[#B4ADFA]/50"
                  }`}
                >
                  <span className="block font-mono-code text-sm font-bold">A-Z</span>
                  Uppercase
                </button>

                <button
                  onClick={() => {
                    setIncludeNumbers(!includeNumbers);
                    setTimeout(() => setCurrentPass(generateRandomPass()), 0);
                  }}
                  className={`p-3 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer ${
                    includeNumbers
                      ? "bg-[#1A126E] border-[#6554DE]/50 text-white shadow-md"
                      : "glass-card-subtle text-[#B4ADFA]/50"
                  }`}
                >
                  <span className="block font-mono-code text-sm font-bold">0-9</span>
                  Numbers
                </button>

                <button
                  onClick={() => {
                    setIncludeSymbols(!includeSymbols);
                    setTimeout(() => setCurrentPass(generateRandomPass()), 0);
                  }}
                  className={`p-3 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer ${
                    includeSymbols
                      ? "bg-[#1A126E] border-[#6554DE]/50 text-white shadow-md"
                      : "glass-card-subtle text-[#B4ADFA]/50"
                  }`}
                >
                  <span className="block font-mono-code text-sm font-bold">!@#</span>
                  Symbols
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
