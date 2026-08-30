import { useState, useCallback } from "react";
import { Wand2, Copy, Check, RefreshCw, Zap } from "lucide-react";
import toast from "react-hot-toast";

function generatePasswordString(length, useUppercase, useLowercase, useNumbers, useSymbols) {
  let chars = "";
  if (useLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (useUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useNumbers) chars += "0123456789";
  if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (!chars) return "";

  let pass = "";
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    pass += chars[array[i] % chars.length];
  }
  return pass;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState(() =>
    generatePasswordString(16, true, true, true, true)
  );
  const [copied, setCopied] = useState(false);

  const generate = useCallback(
    (len = length, up = useUppercase, low = useLowercase, num = useNumbers, sym = useSymbols) => {
      setGeneratedPassword(generatePasswordString(len, up, low, num, sym));
    },
    [length, useUppercase, useLowercase, useNumbers, useSymbols]
  );

  const updateLength = (newLen) => {
    setLength(newLen);
    generate(newLen, useUppercase, useLowercase, useNumbers, useSymbols);
  };

  const toggleOption = (key, val) => {
    const nextUp = key === "up" ? val : useUppercase;
    const nextLow = key === "low" ? val : useLowercase;
    const nextNum = key === "num" ? val : useNumbers;
    const nextSym = key === "sym" ? val : useSymbols;
    if (key === "up") setUseUppercase(val);
    if (key === "low") setUseLowercase(val);
    if (key === "num") setUseNumbers(val);
    if (key === "sym") setUseSymbols(val);
    generate(length, nextUp, nextLow, nextNum, nextSym);
  };

  const handleCopy = () => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    toast.success("Password copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  // Strength score
  const getStrength = () => {
    if (length < 8) return { label: "Weak 💥", color: "bg-rose-500", width: "w-1/4" };
    if (length < 12) return { label: "Fair ⚡", color: "bg-pink-400", width: "w-2/4" };
    if (length < 16) return { label: "Strong 🛡️", color: "bg-emerald-400", width: "w-3/4" };
    return { label: "Fortress Grade! 🦸‍♂️", color: "bg-emerald-400", width: "w-full" };
  };

  const strength = getStrength();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2.5">
        <div className="size-14 rounded-2xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] border border-white/30 shadow-lg shadow-[#be2656]/30 flex items-center justify-center mx-auto text-white">
          <Wand2 className="size-7" />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Password Generator
        </h1>
        <p className="text-xs sm:text-sm text-[#fda4b8]/80 font-normal">
          Hardware-randomized CSPRNG entropy for unbreakable keys
        </p>
      </div>

      {/* Main Password Output Display */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-pink-500/20 shadow-2xl space-y-6">
        <div className="relative p-4 rounded-2xl bg-[#3c0b1a]/60 border border-pink-500/25 text-white flex items-center justify-between gap-4 font-mono-code text-sm sm:text-base break-all">
          <span className="tracking-wider select-all font-bold">
            {generatedPassword || "Select at least one option below"}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={generate}
              className="p-2 rounded-xl glass-card-subtle text-[#fda4b8] hover:text-white transition-all cursor-pointer"
              title="Regenerate Password"
            >
              <RefreshCw className="size-4" />
            </button>
            <button
              onClick={handleCopy}
              className="glass-btn-primary px-4 py-2 text-xs gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-emerald-200" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="size-4" /> Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Strength meter bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#fda4b8]">Entropy Level:</span>
            <span className="text-white flex items-center gap-1">
              <Zap className="size-3.5 text-[#f43f6e] fill-current" /> {strength.label}
            </span>
          </div>
          <div className="h-2 w-full bg-black/40 border border-pink-500/20 rounded-full overflow-hidden p-0.5">
            <div className={`h-full ${strength.color} rounded-full transition-all duration-300 ${strength.width}`} />
          </div>
        </div>

        {/* Password Length Slider */}
        <div className="space-y-3 pt-1 p-4 rounded-2xl glass-card-subtle border border-pink-500/15">
          <div className="flex justify-between text-xs font-semibold text-white font-mono-code">
            <span>Password Length</span>
            <span className="glass-badge-blush text-xs">
              {length} characters
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={48}
            value={length}
            onChange={(e) => updateLength(Number(e.target.value))}
            className="w-full h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-[#f43f6e]"
          />
        </div>

        {/* Character Rules Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {[
            { label: "Uppercase (A-Z)", state: useUppercase, key: "up" },
            { label: "Lowercase (a-z)", state: useLowercase, key: "low" },
            { label: "Numbers (0-9)", state: useNumbers, key: "num" },
            { label: "Symbols (!@#$)", state: useSymbols, key: "sym" },
          ].map((opt, i) => (
            <label
              key={i}
              className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-xs font-semibold cursor-pointer select-none ${
                opt.state
                  ? "bg-[#7a1534]/50 border-pink-400/40 text-white shadow-md"
                  : "glass-card-subtle text-[#fda4b8]/50 border-pink-500/10"
              }`}
            >
              <input
                type="checkbox"
                checked={opt.state}
                onChange={(e) => toggleOption(opt.key, e.target.checked)}
                className="size-4 rounded accent-[#f43f6e] cursor-pointer"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
