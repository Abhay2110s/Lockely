import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import * as authService from "@/services/auth.service";
import { useAppAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const requirements = [
  { label: "8+ chars", test: (p) => p.length >= 8 },
  { label: "Uppercase", test: (p) => /[A-Z]/.test(p) },
  { label: "Number", test: (p) => /[0-9]/.test(p) },
  { label: "Symbol", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

function strengthScore(p) {
  return requirements.filter((r) => r.test(p)).length;
}
const strengthLabels = ["", "Weak 💥", "Fair ⚡", "Good 🛡️", "Unbreakable! 🦸‍♂️"];
const strengthColors = ["", "bg-[#fb7185]", "bg-[#fde047]", "bg-[#38bdf8]", "bg-[#4ade80]"];

/* ── OTP verify view ── */
function OTPVerify({ email, password: masterPassword }) {
  const { saveSession } = useAppAuth();
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const [resending, setResending] = useState(false);

  const inputRefs = [];

  const setRef = (el, i) => {
    inputRefs[i] = el;
  };

  const handleDigit = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) inputRefs[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputRefs[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) {
      const next = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
      setDigits(next);
      inputRefs[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = digits.join("");
    if (code.length !== 6) {
      setError("Enter all 6 digits.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await authService.verifyOTP({ email, otp: code });
      const { user, vaultKeySalt, token } = res.data || {};
      if (user) {
        await saveSession(user, vaultKeySalt, masterPassword, token);
        toast.success("Email verified! Welcome to PassGuardian Comic Vault.");
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resending) return;
    setResending(true);
    setError("");
    try {
      await authService.resendOTP({ email, type: "EMAIL_VERIFICATION" });
      setResent(true);
      setDigits(["", "", "", "", "", ""]);
      inputRefs[0]?.focus();
      setTimeout(() => setResent(false), 3000);
    } catch {
      setError("Failed to resend. Try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full space-y-6 font-comic">
      <div className="space-y-2 text-center sm:text-left">
        <div className="size-12 rounded-2xl bg-[#fef08a] border-2.5 border-[#191510] shadow-[3px_3px_0px_#191510] flex items-center justify-center mb-3">
          <Mail className="size-6 text-slate-950" />
        </div>
        <h2 className="text-3xl font-heading-comic font-black text-slate-950">Check Your Inbox! ✉️</h2>
        <p className="text-xs sm:text-sm text-slate-600 font-comic font-bold">
          We sent a 6-digit code to <strong className="text-indigo-700 font-mono">{email}</strong>
        </p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 rounded-2xl bg-[#fda4af] border-2.5 border-[#191510] shadow-[3px_3px_0px_#191510] text-xs text-slate-950 font-bold flex items-center gap-2"
          >
            <XCircle className="size-4 shrink-0 text-rose-800" /> {error}
          </motion.div>
        )}
        {resent && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 rounded-2xl bg-[#bbf7d0] border-2.5 border-[#191510] shadow-[3px_3px_0px_#191510] text-xs text-slate-950 font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="size-4 shrink-0 text-emerald-800" /> Fresh code sent! 🚀
          </motion.div>
        )}
      </AnimatePresence>

      {/* OTP boxes */}
      <div className="flex justify-center gap-2" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => setRef(el, i)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleDigit(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="size-12 text-center text-2xl font-black font-heading-comic rounded-2xl bg-white border-2.5 border-[#191510] shadow-[2.5px_2.5px_0px_#191510] focus:shadow-[4px_4px_0px_#191510] focus:bg-[#fef08a] focus:outline-none transition-all"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        disabled={digits.join("").length !== 6 || loading}
        className="w-full btn-comic btn-comic-primary py-3.5 text-sm gap-2"
      >
        {loading ? <Loader2 className="size-4.5 animate-spin" /> : <><ShieldCheck className="size-4.5" /> Verify &amp; Open Vault ➔</>}
      </button>

      <div className="text-center">
        <button
          onClick={handleResend}
          disabled={resending}
          className="text-xs font-heading-comic font-bold text-slate-600 hover:text-indigo-700 underline disabled:opacity-50"
        >
          {resending ? "Sending fresh code…" : "Didn't receive it? Resend code"}
        </button>
      </div>
    </div>
  );
}

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const score = password ? strengthScore(password) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authService.register({ name, email, password });
      setPendingVerification(true);
      toast.success("Verification code sent to your inbox! ✉️");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return <OTPVerify email={email} password={password} />;
  }

  return (
    <div className="w-full space-y-6 font-comic">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bbf7d0] border-2 border-[#191510] shadow-[2px_2px_0px_#191510] text-xs font-heading-comic font-bold text-slate-950">
          <Sparkles className="size-3.5 fill-emerald-400 text-slate-950" />
          Join PassGuardian
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading-comic font-black text-slate-950 tracking-tight">
          Create Free Vault! 🛡️
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-comic font-bold">
          Zero-knowledge vault — client encrypted with AES-256-GCM
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-[#fda4af] border-2.5 border-[#191510] shadow-[3px_3px_0px_#191510] text-xs text-slate-950 font-bold">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-heading-comic font-bold text-slate-900 tracking-wide block">
            Full Name 👤
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Captain Guardian"
              className="comic-input w-full pl-10 pr-4 py-3 text-xs font-bold text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-heading-comic font-bold text-slate-900 tracking-wide block">
            Email Address ✉️
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="comic-input w-full pl-10 pr-4 py-3 text-xs font-bold text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-xs font-heading-comic font-bold text-slate-900 tracking-wide block">
            Master Password 🔑
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a tough master password"
              className="comic-input w-full pl-10 pr-11 py-3 text-xs font-bold text-slate-900 placeholder:text-slate-400 font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-950 p-1"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          {/* Strength Meter */}
          {password && (
            <div className="space-y-2 bg-[#fffef7] border-2 border-[#191510] rounded-2xl p-3 shadow-[2px_2px_0px_#191510]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-heading-comic font-bold text-slate-900">
                  Strength Meter:
                </span>
                <span className="text-xs font-heading-comic font-black text-slate-950">
                  {strengthLabels[score]}
                </span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`h-2 flex-1 rounded-full border border-[#191510] transition-colors duration-300 ${
                      score >= n ? strengthColors[score] : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {requirements.map((req) => (
                  <div key={req.label} className="flex items-center gap-1 text-[0.68rem] font-bold">
                    <CheckCircle2
                      className={`size-3.5 ${
                        req.test(password) ? "text-emerald-700" : "text-slate-300"
                      }`}
                    />
                    <span className={req.test(password) ? "text-emerald-900 font-black" : "text-slate-400"}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-comic btn-comic-mint py-3.5 text-sm gap-2"
          >
            {loading ? (
              <Loader2 className="size-4.5 animate-spin" />
            ) : (
              <>
                Create My Vault ➔
              </>
            )}
          </button>
        </div>

        <p className="text-center text-[0.68rem] font-comic font-bold text-slate-500">
          By signing up you agree to zero-knowledge storage and security policies.
        </p>
      </form>

      {/* Sign-in CTA */}
      <div className="text-center space-y-2 border-t-2 border-[#191510] pt-4">
        <p className="text-xs font-comic font-bold text-slate-700">
          Already have an account?{" "}
          <Link to="/login" className="font-heading-comic font-black text-indigo-700 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
