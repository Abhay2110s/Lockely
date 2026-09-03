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
  "guardian-cipher-brutalist-77",
  "zero-knowledge-shield-2026",
  "pbkdf2-gcm-encrypted-99",
  "vault-fortress-manifesto-42",
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
    <section id="interactive-demo" className="relative scroll-mt-24 px-4 py-16 bg-[#000000]">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header — Editorial Style */}
        <div className="max-w-2xl space-y-3 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] border border-[#222222] text-[#00FF66] text-xs font-bold font-mono-code uppercase tracking-widest">
            <Sparkles className="size-3.5 text-[#00FF66]" />
            <span>LIVE CRYPTO SANDBOX</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#F8F9FA] tracking-tighter leading-[1.05] uppercase">
            Try the <span className="text-[#00FF66]">Key Generator</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280]">
            Experiment with entropy parameters and client-side password strength in real time.
          </p>
        </div>

        {/* Studio Card — Deep Charcoal #111111 */}
        <div className="relative p-6 sm:p-8 bg-[#111111] border border-[#222222] space-y-6">
          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#222222]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMode("random");
                  setCurrentPass(generateRandomPass());
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                  mode === "random"
                    ? "bg-[#00FF66] text-[#000000] border-[#00FF66]"
                    : "bg-[#000000] text-[#6B7280] border-[#222222] hover:text-[#F8F9FA]"
                }`}
              >
                Complex Random Key
              </button>
              <button
                onClick={() => {
                  setMode("passphrase");
                  setCurrentPass(samplePassphrases[0]);
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                  mode === "passphrase"
                    ? "bg-[#00FF66] text-[#000000] border-[#00FF66]"
                    : "bg-[#000000] text-[#6B7280] border-[#222222] hover:text-[#F8F9FA]"
                }`}
              >
                Memorable Passphrase
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code text-[#00FF66] flex items-center gap-1.5 uppercase tracking-wider">
                <Terminal className="size-3 text-[#00FF66]" />
                WebCrypto CSPRNG
              </span>
            </div>
          </div>

          {/* Key Output Window */}
          <div className="p-4 sm:p-5 bg-[#000000] border border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full overflow-hidden text-center sm:text-left">
              <span className="text-[0.65rem] font-mono-code font-bold uppercase tracking-widest text-[#6B7280] block mb-1">
                Generated Cipher Text
              </span>
              <p className="text-lg sm:text-xl font-bold font-mono-code text-[#F8F9FA] tracking-wider truncate selection:bg-[#00FF66] selection:text-black">
                {currentPass}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end shrink-0">
              <button
                onClick={handleRegenerate}
                className="p-2.5 bg-[#111111] border border-[#222222] text-[#6B7280] hover:text-[#00FF66] hover:border-[#00FF66] transition-colors"
                title="Regenerate"
              >
                <RefreshCw className="size-4" />
              </button>
              <button
                onClick={handleCopy}
                className="glass-btn-primary py-2.5 px-4 text-xs font-bold uppercase tracking-wider"
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
              <div className="space-y-2 p-4 bg-[#000000] border border-[#222222]">
                <div className="flex items-center justify-between text-xs font-mono-code text-[#6B7280]">
                  <span className="uppercase tracking-wider">Length</span>
                  <span className="font-bold text-[#00FF66]">{passLength} Characters</span>
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
                  className="w-full accent-[#00FF66] cursor-pointer h-1.5 bg-[#111111]"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => {
                    setIncludeUpper(!includeUpper);
                    setTimeout(() => setCurrentPass(generateRandomPass()), 0);
                  }}
                  className={`p-3 text-center text-xs font-bold border transition-colors cursor-pointer uppercase ${
                    includeUpper
                      ? "bg-[#111111] border-[#00FF66] text-[#00FF66]"
                      : "bg-[#000000] border-[#222222] text-[#6B7280]"
                  }`}
                >
                  <span className="block font-mono-code text-sm font-black">A-Z</span>
                  Uppercase
                </button>

                <button
                  onClick={() => {
                    setIncludeNumbers(!includeNumbers);
                    setTimeout(() => setCurrentPass(generateRandomPass()), 0);
                  }}
                  className={`p-3 text-center text-xs font-bold border transition-colors cursor-pointer uppercase ${
                    includeNumbers
                      ? "bg-[#111111] border-[#00FF66] text-[#00FF66]"
                      : "bg-[#000000] border-[#222222] text-[#6B7280]"
                  }`}
                >
                  <span className="block font-mono-code text-sm font-black">0-9</span>
                  Numbers
                </button>

                <button
                  onClick={() => {
                    setIncludeSymbols(!includeSymbols);
                    setTimeout(() => setCurrentPass(generateRandomPass()), 0);
                  }}
                  className={`p-3 text-center text-xs font-bold border transition-colors cursor-pointer uppercase ${
                    includeSymbols
                      ? "bg-[#111111] border-[#00FF66] text-[#00FF66]"
                      : "bg-[#000000] border-[#222222] text-[#6B7280]"
                  }`}
                >
                  <span className="block font-mono-code text-sm font-black">!@#</span>
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
