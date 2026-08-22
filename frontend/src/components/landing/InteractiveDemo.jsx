import { useState } from "react";
import { KeyRound, Copy, Check, RefreshCw, Terminal } from "lucide-react";

export default function InteractiveDemo() {
  const [passLength, setPassLength]     = useState(20);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUpper, setIncludeUpper]   = useState(true);
  const [copied, setCopied]             = useState(false);
  const [mode, setMode]                 = useState("random");

  const generateRandomPass = () => {
    let pool = "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper)   pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) pool += "0123456789";
    if (includeSymbols) pool += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let res = "";
    for (let i = 0; i < passLength; i++) res += pool.charAt(Math.floor(Math.random() * pool.length));
    return res;
  };

  const samplePassphrases = [
    "guardian-cipher-artsy-77",
    "zero-knowledge-shield-2026",
    "pbkdf2-gcm-encrypted-99",
    "vault-fortress-super-hero-42",
  ];

  const [currentPass, setCurrentPass]   = useState(generateRandomPass());
  const [passphraseIdx, setPassphraseIdx] = useState(0);

  const handleRegenerate = () => {
    if (mode === "random") {
      setCurrentPass(generateRandomPass());
    } else {
      const next = (passphraseIdx + 1) % samplePassphrases.length;
      setPassphraseIdx(next);
      setCurrentPass(samplePassphrases[next]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="interactive-demo" className="ca-grid relative scroll-mt-24 px-4 py-24 bg-[#030b15] border-t border-white/[0.05]">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="pg-badge">Test Our Generator</span>
          <h2 className="ca-display text-4xl sm:text-6xl text-white tracking-tight mt-4">
            Live Sandbox
          </h2>
          <p className="text-[#e2eaf8]/45 text-base font-light leading-relaxed">
            Generate and test cryptographically secure keys in real time.
          </p>
        </div>

        {/* Terminal card */}
        <div className="border border-white/[0.07] bg-[#040e1c]">

          {/* Window bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-[#030b15]/60">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-white/10" />
                <span className="size-2.5 rounded-full bg-white/10" />
                <span className="size-2.5 rounded-full bg-white/10" />
              </span>
              <span className="ca-mono text-[0.6rem] text-[#e2eaf8]/25 tracking-widest">
                passg://key-generator
              </span>
            </div>
            <span className="pg-badge pg-badge-green text-[0.58rem] py-0.5">
              <span className="size-1 rounded-full bg-[#00ff9d] animate-pulse" />
              CSPRNG ACTIVE
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Mode switcher */}
            <div className="flex items-center gap-1 border-b border-white/[0.05] pb-5">
              {[
                { key: "random",     label: "Complex Random Key" },
                { key: "passphrase", label: "Memorable Words"    },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => {
                    setMode(key);
                    if (key === "random") setCurrentPass(generateRandomPass());
                    else setCurrentPass(samplePassphrases[0]);
                  }}
                  className={`ca-mono px-4 py-2 text-[0.62rem] border transition-all tracking-widest ${
                    mode === key
                      ? "border-[#00d4ff]/30 bg-[#00d4ff]/08 text-[#00d4ff]"
                      : "border-white/[0.06] text-[#e2eaf8]/30 hover:text-[#e2eaf8]/60"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Output */}
            <div className="space-y-2">
              <span className="ca-mono text-[0.6rem] text-[#e2eaf8]/30 tracking-widest">GENERATED OUTPUT</span>
              <div className="flex items-center gap-2 bg-[#030b15] px-4 py-3 border border-white/[0.07]">
                <span className="font-mono text-base sm:text-lg text-[#00d4ff] flex-1 truncate tracking-widest">
                  {currentPass}
                </span>
                <button
                  onClick={handleRegenerate}
                  className="p-2 text-[#e2eaf8]/25 hover:text-[#00d4ff] transition-colors"
                  title="Generate New"
                >
                  <RefreshCw className="size-3.5" />
                </button>
                <button
                  onClick={handleCopy}
                  className="ca-mono px-3 py-1.5 bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 text-[0.6rem] hover:bg-[#00d4ff]/18 transition-colors flex items-center gap-1.5 tracking-widest"
                >
                  {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                  {copied ? "COPIED" : "COPY KEY"}
                </button>
              </div>
            </div>

            {/* Controls */}
            {mode === "random" && (
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2.5">
                  <div className="flex justify-between ca-mono text-[0.6rem] text-[#e2eaf8]/30 tracking-widest">
                    <span>LENGTH</span>
                    <span className="text-[#00d4ff]/60">{passLength} CHARS</span>
                  </div>
                  <input
                    type="range" min="12" max="48" value={passLength}
                    onChange={(e) => { setPassLength(Number(e.target.value)); setCurrentPass(generateRandomPass()); }}
                    className="w-full cursor-pointer h-px bg-white/10 accent-[#00d4ff]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  {[
                    { label: "A–Z", state: includeUpper,   set: setIncludeUpper },
                    { label: "0–9", state: includeNumbers, set: setIncludeNumbers },
                    { label: "!@#", state: includeSymbols, set: setIncludeSymbols },
                  ].map(({ label, state, set }) => (
                    <button
                      key={label}
                      onClick={() => { set(!state); setCurrentPass(generateRandomPass()); }}
                      className={`flex-1 ca-mono py-2 text-[0.6rem] border transition-all tracking-widest ${
                        state
                          ? "border-[#00d4ff]/30 bg-[#00d4ff]/08 text-[#00d4ff]"
                          : "border-white/[0.06] text-[#e2eaf8]/25"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cipher strip */}
            <div className="px-4 py-3 bg-[#030b15] border border-white/[0.05] font-mono text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[0.6rem] text-[#e2eaf8]/25 border-b border-white/[0.04] pb-1.5">
                <span className="flex items-center gap-1.5 text-[#00ff9d]/60">
                  <Terminal className="size-2.5" /> AES-256-GCM Hardware Cipher
                </span>
                <span className="text-[#a5b4fc]/50">Authenticated</span>
              </div>
              <p className="text-[#e2eaf8]/25 truncate">
                Ciphertext: <span className="text-[#e2eaf8]/40">U2FsdGVkX195a82...8f319a2</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
