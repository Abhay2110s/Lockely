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
  "guardian-silk-blush-cream-77",
  "zero-knowledge-shield-2026",
  "pbkdf2-gcm-encrypted-99",
  "vault-fortress-burgundy-42",
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
    <section id="interactive-demo" className="relative scroll-mt-24 px-4 py-16 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="max-w-2xl space-y-3 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blush/35 border border-[#E6E0D5] text-[#8B263E] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="size-3.5 text-[#8B263E]" />
            <span>Live Crypto Sandbox</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1a1a1a] tracking-tight leading-[1.05] uppercase">
            Try the <span className="text-[#8B263E]">Key Generator</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6B6560]">
            Experiment with entropy parameters and client-side password strength in real time.
          </p>
        </div>

        {/* Studio Card — Clean White & Blush with Rounded Corners */}
        <div className="relative p-6 sm:p-8 bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#E6E0D5] shadow-xl space-y-6">
          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#E6E0D5]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMode("random");
                  setCurrentPass(generateRandomPass());
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  mode === "random"
                    ? "bg-[#8B263E] text-white border-[#8B263E] shadow-button"
                    : "bg-[#FDFBF7] text-[#6B6560] border-[#E6E0D5] hover:text-[#8B263E] hover:bg-blush/20"
                }`}
              >
                Complex Random Key
              </button>
              <button
                onClick={() => {
                  setMode("passphrase");
                  setCurrentPass(samplePassphrases[0]);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  mode === "passphrase"
                    ? "bg-[#8B263E] text-white border-[#8B263E] shadow-button"
                    : "bg-[#FDFBF7] text-[#6B6560] border-[#E6E0D5] hover:text-[#8B263E] hover:bg-blush/20"
                }`}
              >
                Memorable Passphrase
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8B263E] font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                <Terminal className="size-3.5 text-[#8B263E]" />
                WebCrypto CSPRNG
              </span>
            </div>
          </div>

          {/* Key Output Window */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blush/25 border border-[#E6E0D5] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="w-full overflow-hidden text-center sm:text-left">
              <span className="text-[0.68rem] font-bold uppercase tracking-widest text-[#6B6560] block mb-1">
                Generated Cipher Text
              </span>
              <p className="text-lg sm:text-xl font-bold font-mono-code text-[#8B263E] tracking-wider truncate selection:bg-blush selection:text-[#8B263E]">
                {currentPass}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end shrink-0">
              <button
                onClick={() => handleRegenerate()}
                className="p-2.5 rounded-full bg-white border border-[#E6E0D5] text-[#6B6560] hover:text-[#8B263E] hover:border-[#8B263E] transition-colors shadow-xs"
                title="Regenerate"
              >
                <RefreshCw className="size-4" />
              </button>
              <button
                onClick={handleCopy}
                className="glass-btn-primary py-2.5 px-5 text-xs font-bold uppercase tracking-wider rounded-full"
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span>{copied ? "Copied" : "Copy Password"}</span>
              </button>
            </div>
          </div>

          {/* Controls */}
          {mode === "random" && (
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              {/* Length Slider */}
              <div className="space-y-2 p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6E0D5]">
                <div className="flex items-center justify-between text-xs text-[#6B6560] font-semibold">
                  <span className="uppercase tracking-wider">Length</span>
                  <span className="font-bold text-[#8B263E]">{passLength} Characters</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={40}
                  value={passLength}
                  onChange={(e) => {
                    const nextLen = Number(e.target.value);
                    setPassLength(nextLen);
                    handleRegenerate(nextLen, includeUpper, includeNumbers, includeSymbols);
                  }}
                  className="w-full accent-[#8B263E] cursor-pointer h-2 rounded-lg bg-[#E6E0D5]"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => {
                    const nextVal = !includeUpper;
                    setIncludeUpper(nextVal);
                    handleRegenerate(passLength, nextVal, includeNumbers, includeSymbols);
                  }}
                  className={`p-3 text-center text-xs font-bold rounded-2xl border transition-all cursor-pointer uppercase ${
                    includeUpper
                      ? "bg-blush/40 border-[#8B263E] text-[#8B263E] shadow-xs"
                      : "bg-white border-[#E6E0D5] text-[#6B6560] hover:border-[#8B263E]"
                  }`}
                >
                  <span className="block font-mono-code text-sm font-black mb-0.5">A-Z</span>
                  Uppercase
                </button>

                <button
                  onClick={() => {
                    const nextVal = !includeNumbers;
                    setIncludeNumbers(nextVal);
                    handleRegenerate(passLength, includeUpper, nextVal, includeSymbols);
                  }}
                  className={`p-3 text-center text-xs font-bold rounded-2xl border transition-all cursor-pointer uppercase ${
                    includeNumbers
                      ? "bg-blush/40 border-[#8B263E] text-[#8B263E] shadow-xs"
                      : "bg-white border-[#E6E0D5] text-[#6B6560] hover:border-[#8B263E]"
                  }`}
                >
                  <span className="block font-mono-code text-sm font-black mb-0.5">0-9</span>
                  Numbers
                </button>

                <button
                  onClick={() => {
                    const nextVal = !includeSymbols;
                    setIncludeSymbols(nextVal);
                    handleRegenerate(passLength, includeUpper, includeNumbers, nextVal);
                  }}
                  className={`p-3 text-center text-xs font-bold rounded-2xl border transition-all cursor-pointer uppercase ${
                    includeSymbols
                      ? "bg-blush/40 border-[#8B263E] text-[#8B263E] shadow-xs"
                      : "bg-white border-[#E6E0D5] text-[#6B6560] hover:border-[#8B263E]"
                  }`}
                >
                  <span className="block font-mono-code text-sm font-black mb-0.5">!@#</span>
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
