import { useState } from "react";
import { KeyRound, Copy, Check, RefreshCw, Zap, Terminal } from "lucide-react";

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
    "guardian-cipher-artsy-77",
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
    <section id="interactive-demo" className="ca-grid relative scroll-mt-24 px-4 py-16 bg-[#faf6ea] border-t border-[#191510]/15">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="flex flex-col items-center text-[#191510]">
            <p className="ca-hand text-2xl sm:text-3xl">test our generator!</p>
            <svg
              viewBox="0 0 64 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="mt-1 h-3 w-24 text-[#191510]"
              aria-hidden="true"
            >
              <path d="M3 4c18-3 40-3 58 0" />
              <path d="M9 9c14-2.5 32-2.5 46 0" />
            </svg>
          </div>

          <h2 className="ca-display text-3xl sm:text-5xl text-[#191510] tracking-tight">
            LIVE SANDBOX
          </h2>
        </div>

        {/* Studio Card */}
        <div className="relative p-4 sm:p-7 lg:p-8 bg-white border-[3px] border-[#191510] shadow-[6px_6px_0_#191510] sm:shadow-[8px_8px_0_#191510] space-y-6 sm:space-y-8">
          <span aria-hidden="true" className="absolute -left-3 -top-2.5 z-10 h-5 w-20 sm:h-6 sm:w-24 -rotate-[12deg] bg-[#c4b5fd]/80 shadow-[0_1px_3px_rgba(17,18,18,0.15)] hidden sm:block" />
          <span aria-hidden="true" className="absolute -right-3 -top-2.5 z-10 h-5 w-20 sm:h-6 sm:w-24 rotate-[12deg] bg-[#ffe066]/80 shadow-[0_1px_3px_rgba(17,18,18,0.15)] hidden sm:block" />

          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b-2 border-[#191510]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMode("random");
                  setCurrentPass(generateRandomPass());
                }}
                className={`ca-mono px-4 py-2 text-xs font-bold transition-all border border-[#191510] ${
                  mode === "random" ? "bg-[#ffe066] shadow-[2px_2px_0_#191510]" : "bg-[#faf6ea] text-[#191510]/70"
                }`}
              >
                Complex Random Key
              </button>
              <button
                onClick={() => {
                  setMode("passphrase");
                  setCurrentPass(samplePassphrases[0]);
                }}
                className={`ca-mono px-4 py-2 text-xs font-bold transition-all border border-[#191510] ${
                  mode === "passphrase" ? "bg-[#ffe066] shadow-[2px_2px_0_#191510]" : "bg-[#faf6ea] text-[#191510]/70"
                }`}
              >
                Memorable Words
              </button>
            </div>

            <span className="ca-mono text-xs font-bold bg-[#a7f3d0] text-[#191510] px-3 py-1 border border-[#191510]">
              ● CSPRNG ACTIVE
            </span>
          </div>

          {/* Output Box */}
          <div className="space-y-2">
            <span className="ca-mono text-xs font-bold text-[#191510]/70">GENERATED OUTPUT</span>
            <div className="flex items-center gap-3 bg-[#faf6ea] p-4 border-2 border-[#191510] shadow-[3px_3px_0_#191510]">
              <span className="font-mono text-base sm:text-xl font-bold text-[#191510] flex-1 truncate tracking-wider">
                {currentPass}
              </span>
              <button
                onClick={handleRegenerate}
                className="p-2 bg-white hover:bg-[#ffe066] text-[#191510] border border-[#191510] transition-colors"
                title="Generate New"
              >
                <RefreshCw className="size-4" />
              </button>
              <button
                onClick={handleCopy}
                className="ca-mono px-4 py-2 bg-[#191510] text-white hover:bg-[#ffe066] hover:text-[#191510] border border-[#191510] text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="size-3.5 text-emerald-300" /> : <Copy className="size-3.5" />}
                <span>{copied ? "Copied" : "Copy Key"}</span>
              </button>
            </div>
          </div>

          {/* Controls */}
          {mode === "random" && (
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between ca-mono text-xs text-[#191510]">
                  <span>LENGTH</span>
                  <span>{passLength} CHARS</span>
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
                  className="w-full accent-[#191510] cursor-pointer h-2 bg-[#faf6ea] border border-[#191510]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIncludeUpper(!includeUpper);
                    setCurrentPass(generateRandomPass());
                  }}
                  className={`flex-1 py-2 text-xs ca-mono border border-[#191510] transition-all ${
                    includeUpper ? "bg-[#a7f3d0] shadow-[2px_2px_0_#191510]" : "bg-white text-slate-400"
                  }`}
                >
                  ABC
                </button>
                <button
                  onClick={() => {
                    setIncludeNumbers(!includeNumbers);
                    setCurrentPass(generateRandomPass());
                  }}
                  className={`flex-1 py-2 text-xs ca-mono border border-[#191510] transition-all ${
                    includeNumbers ? "bg-[#7dd3fc] shadow-[2px_2px_0_#191510]" : "bg-white text-slate-400"
                  }`}
                >
                  123
                </button>
                <button
                  onClick={() => {
                    setIncludeSymbols(!includeSymbols);
                    setCurrentPass(generateRandomPass());
                  }}
                  className={`flex-1 py-2 text-xs ca-mono border border-[#191510] transition-all ${
                    includeSymbols ? "bg-[#ff5e89] text-white shadow-[2px_2px_0_#191510]" : "bg-white text-slate-400"
                  }`}
                >
                  !@#
                </button>
              </div>
            </div>
          )}

          {/* Cipher Box */}
          <div className="p-4 bg-[#191510] text-[#faf6ea] rounded-xl font-mono text-xs space-y-1.5">
            <div className="flex items-center justify-between text-[0.68rem] text-slate-400 border-b border-slate-800 pb-1.5">
              <span className="flex items-center gap-1.5 text-[#a7f3d0]">
                <Terminal className="size-3" /> AES-256-GCM Hardware Cipher
              </span>
              <span className="text-[#ffe066]">Authenticated</span>
            </div>
            <p className="text-[#7dd3fc] truncate">
              Ciphertext: <span className="text-slate-300">U2FsdGVkX195a82...8f319a2</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
