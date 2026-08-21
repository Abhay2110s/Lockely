import { useState, useEffect, useCallback } from "react";
import { Wand2, Copy, Check, RefreshCw, Sparkles, Zap } from "lucide-react";
import toast from "react-hot-toast";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if (useLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      setGeneratedPassword("");
      return;
    }

    let pass = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      pass += chars[array[i] % chars.length];
    }
    setGeneratedPassword(pass);
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleCopy = () => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    toast.success("Password copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  // Strength score
  const getStrength = () => {
    if (length < 8) return { label: "Weak 💥", color: "bg-[#fb7185]", width: "w-1/4" };
    if (length < 12) return { label: "Fair ⚡", color: "bg-[#fde047]", width: "w-2/4" };
    if (length < 16) return { label: "Strong 🛡️", color: "bg-[#38bdf8]", width: "w-3/4" };
    return { label: "Hero Grade! 🦸‍♂️", color: "bg-[#4ade80]", width: "w-full" };
  };

  const strength = getStrength();

  return (
    <div className="max-w-2xl mx-auto space-y-6 font-comic">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="size-14 rounded-2xl bg-[#fef08a] border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b] flex items-center justify-center mx-auto text-slate-950">
          <Wand2 className="size-7" />
        </div>
        <h1 className="text-3xl font-heading-comic font-black text-slate-950">
          Super Password Generator ✨
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-comic font-bold">
          Hardware-randomized CSPRNG entropy for unbreakable keys!
        </p>
      </div>

      {/* Main Password Output Display */}
      <div className="bg-[#fffef7] p-6 sm:p-8 rounded-3xl border-3 border-[#18181b] shadow-[6px_6px_0px_#18181b] space-y-6">
        <div className="relative p-4.5 rounded-2xl bg-[#fef08a] border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b] text-slate-950 flex items-center justify-between gap-4 font-mono text-sm sm:text-lg break-all font-black">
          <span className="tracking-wider select-all">
            {generatedPassword || "Select at least one option below"}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={generate}
              className="p-2 rounded-xl bg-white border-2 border-[#18181b] text-slate-900 shadow-[1.5px_1.5px_0px_#18181b] hover:-translate-y-0.5 transition-all"
              title="Regenerate Password"
            >
              <RefreshCw className="size-4" />
            </button>
            <button
              onClick={handleCopy}
              className="btn-comic btn-comic-primary px-3.5 py-2 text-xs gap-1.5 font-heading-comic"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-emerald-300" /> Copied!
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
          <div className="flex justify-between text-xs font-heading-comic font-bold">
            <span className="text-slate-700">Entropy Level:</span>
            <span className="text-slate-950 flex items-center gap-1">
              <Zap className="size-3.5 fill-amber-400 text-slate-950" /> {strength.label}
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 border-2 border-[#18181b] rounded-full overflow-hidden p-0.5">
            <div className={`h-full ${strength.color} border border-[#18181b] rounded-full transition-all duration-300 ${strength.width}`} />
          </div>
        </div>

        {/* Password Length Slider */}
        <div className="space-y-3 pt-2 bg-white p-4 rounded-2xl border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b]">
          <div className="flex justify-between text-xs font-heading-comic font-bold text-slate-900">
            <span>Password Length</span>
            <span className="font-mono bg-[#fef08a] text-slate-950 px-2.5 py-0.5 rounded-lg border border-[#18181b] text-xs">
              {length} characters
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={48}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-3 bg-slate-100 border-2 border-[#18181b] rounded-lg appearance-none cursor-pointer accent-[#6366f1]"
          />
        </div>

        {/* Character Rules Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {[
            { label: "Uppercase (A-Z)", state: useUppercase, set: setUseUppercase, bg: "bg-[#bae6fd]" },
            { label: "Lowercase (a-z)", state: useLowercase, set: setUseLowercase, bg: "bg-[#bbf7d0]" },
            { label: "Numbers (0-9)", state: useNumbers, set: setUseNumbers, bg: "bg-[#fef08a]" },
            { label: "Symbols (!@#$)", state: useSymbols, set: setUseSymbols, bg: "bg-[#ddd6fe]" },
          ].map((opt, i) => (
            <label
              key={i}
              className={`flex items-center gap-3 p-3 rounded-2xl border-2 border-[#18181b] ${
                opt.state ? `${opt.bg} shadow-[2px_2px_0px_#18181b]` : "bg-white opacity-70"
              } cursor-pointer transition-all text-xs font-heading-comic font-bold text-slate-950 select-none hover:-translate-y-0.5`}
            >
              <input
                type="checkbox"
                checked={opt.state}
                onChange={(e) => opt.set(e.target.checked)}
                className="size-4.5 rounded text-indigo-600 focus:ring-0 accent-[#18181b]"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
