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

  // High-Contrast Brutalist Strength Score
  const getStrength = () => {
    if (length < 8) return { label: "Weak Security", color: "bg-[#FF3366]", textColor: "text-[#FF3366]", width: "w-1/4" };
    if (length < 12) return { label: "Moderate Entropy", color: "bg-[#F8F9FA]", textColor: "text-[#F8F9FA]", width: "w-2/4" };
    if (length < 16) return { label: "Strong Defense", color: "bg-[#00FF66]", textColor: "text-[#00FF66]", width: "w-3/4" };
    return { label: "Fortress Grade", color: "bg-[#00FF66]", textColor: "text-[#00FF66]", width: "w-full" };
  };

  const strength = getStrength();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2.5">
        <div className="size-12 bg-[#111111] border border-[#222222] text-[#00FF66] flex items-center justify-center mx-auto">
          <Wand2 className="size-6" />
        </div>
        <h1 className="text-3xl font-black text-[#F8F9FA] tracking-tighter uppercase">
          Password Generator
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] font-mono-code uppercase tracking-wider">
          Hardware-randomized CSPRNG entropy for unbreakable keys
        </p>
      </div>

      {/* Main Password Output Display — Deep Charcoal #111111 with 1px Harsh Border */}
      <div className="bg-[#111111] p-6 sm:p-8 border border-[#222222] space-y-6">
        <div className="relative p-4 bg-[#000000] border border-[#222222] text-[#F8F9FA] flex items-center justify-between gap-4 font-mono-code text-sm sm:text-base break-all">
          <span className="tracking-wider select-all font-bold">
            {generatedPassword || "Select at least one option below"}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={generate}
              className="p-2 bg-[#111111] border border-[#222222] text-[#6B7280] hover:text-[#00FF66] hover:border-[#00FF66] transition-colors cursor-pointer"
              title="Regenerate Password"
            >
              <RefreshCw className="size-4" />
            </button>
            <button
              onClick={handleCopy}
              className="glass-btn-primary px-4 py-2 text-xs gap-1.5 font-bold uppercase tracking-wider"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-black" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="size-4" /> Copy Password
                </>
              )}
            </button>
          </div>
        </div>

        {/* Strength meter bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono-code uppercase tracking-wider">
            <span className="text-[#6B7280]">Entropy Level:</span>
            <span className={`${strength.textColor} font-bold flex items-center gap-1`}>
              <Zap className="size-3.5 fill-current" /> {strength.label}
            </span>
          </div>
          <div className="h-1.5 w-full bg-[#000000] border border-[#222222]">
            <div className={`h-full ${strength.color} transition-all duration-200 ${strength.width}`} />
          </div>
        </div>

        {/* Password Length Slider */}
        <div className="space-y-3 pt-1 p-4 bg-[#000000] border border-[#222222]">
          <div className="flex justify-between text-xs font-bold text-[#F8F9FA] font-mono-code uppercase tracking-wider">
            <span>Password Length</span>
            <span className="text-[#00FF66]">
              {length} characters
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={48}
            value={length}
            onChange={(e) => updateLength(Number(e.target.value))}
            className="w-full h-1 bg-[#222222] appearance-none cursor-pointer accent-[#00FF66]"
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
              className={`flex items-center gap-3 p-3 border transition-colors text-xs font-bold font-mono-code uppercase tracking-wider cursor-pointer select-none ${
                opt.state
                  ? "bg-[#000000] border-[#00FF66] text-[#00FF66]"
                  : "bg-[#000000] border-[#222222] text-[#6B7280]"
              }`}
            >
              <input
                type="checkbox"
                checked={opt.state}
                onChange={(e) => toggleOption(opt.key, e.target.checked)}
                className="size-4 accent-[#00FF66] cursor-pointer"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
