import { useState, useEffect, useCallback } from "react";
import { Wand2, Copy, Check, RefreshCw, ShieldCheck, Zap } from "lucide-react";

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
    setTimeout(() => setCopied(false), 2000);
  };

  // Strength score
  const getStrength = () => {
    if (length < 8) return { label: "Weak", color: "bg-rose-500 text-rose-700", width: "w-1/4" };
    if (length < 12) return { label: "Fair", color: "bg-amber-500 text-amber-700", width: "w-2/4" };
    if (length < 16) return { label: "Strong", color: "bg-emerald-500 text-emerald-700", width: "w-3/4" };
    return { label: "Military Grade (AES-256)", color: "bg-indigo-600 text-indigo-700", width: "w-full" };
  };

  const strength = getStrength();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="size-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
          <Wand2 className="size-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Secure Password Generator</h1>
        <p className="text-xs text-slate-500">
          Generate cryptographically strong passwords using hardware-based CSPRNG entropy.
        </p>
      </div>

      {/* Main Password Output Display */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
        <div className="relative p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4 font-mono text-sm sm:text-base break-all">
          <span className="tracking-widest text-indigo-300 select-all">
            {generatedPassword || "Select at least one character set"}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={generate}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
              title="Regenerate Password"
            >
              <RefreshCw className="size-4" />
            </button>
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5 text-xs font-sans font-bold"
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
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-500">Entropy Strength</span>
            <span className="text-slate-800 flex items-center gap-1">
              <Zap className="size-3.5 text-amber-500" /> {strength.label}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${strength.color} transition-all duration-300 ${strength.width}`} />
          </div>
        </div>

        {/* Password Length Slider */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between text-xs font-semibold text-slate-700">
            <span>Password Length</span>
            <span className="font-mono bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-md text-sm">
              {length} characters
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={48}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Character Rules Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            { label: "Uppercase Letters (A-Z)", state: useUppercase, set: setUseUppercase },
            { label: "Lowercase Letters (a-z)", state: useLowercase, set: setUseLowercase },
            { label: "Numbers (0-9)", state: useNumbers, set: setUseNumbers },
            { label: "Symbols (!@#$%^&*)", state: useSymbols, set: setUseSymbols },
          ].map((opt, i) => (
            <label
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer transition-colors text-xs font-medium text-slate-700 select-none"
            >
              <input
                type="checkbox"
                checked={opt.state}
                onChange={(e) => opt.set(e.target.checked)}
                className="size-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
