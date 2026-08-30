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
const strengthLabels = ["", "Weak", "Fair", "Good", "Fortress Grade! 🛡️"];
const strengthColors = ["", "bg-rose-500", "bg-pink-400", "bg-emerald-400", "bg-emerald-400"];

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
        toast.success("Email verified! Welcome to PassGuardian Vault. 🛡️");
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
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center sm:text-left">
        <div className="size-12 rounded-2xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] border border-white/20 flex items-center justify-center mb-3 text-white shadow-lg">
          <Mail className="size-6" />
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Check Your Inbox</h2>
        <p className="text-xs sm:text-sm text-[#fda4b8]/80">
          We sent a 6-digit verification code to <strong className="text-white font-mono-code">{email}</strong>
        </p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-500/30 text-xs text-rose-200 font-medium flex items-center gap-2"
          >
            <XCircle className="size-4 shrink-0 text-rose-400" /> {error}
          </motion.div>
        )}
        {resent && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-200 font-medium flex items-center gap-2"
          >
            <CheckCircle2 className="size-4 shrink-0 text-emerald-400" /> Fresh verification code sent!
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
            className="size-11 sm:size-12 text-center text-xl font-mono-code font-bold rounded-xl glass-input border border-pink-500/25 focus:border-[#f43f6e] focus:outline-none transition-all"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        disabled={digits.join("").length !== 6 || loading}
        className="w-full glass-btn-primary py-3.5 text-xs font-semibold gap-2"
      >
        {loading ? <Loader2 className="size-4.5 animate-spin" /> : <><ShieldCheck className="size-4.5" /> Verify &amp; Open Vault</>}
      </button>

      <div className="text-center">
        <button
          onClick={handleResend}
          disabled={resending}
          className="text-xs text-[#fda4b8] hover:text-white underline disabled:opacity-50 cursor-pointer"
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
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-badge-blush text-xs mb-1">
          <Sparkles className="size-3.5 text-[#f43f6e]" />
          <span>Zero-Knowledge Security</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Create Free Vault
        </h1>
        <p className="text-xs sm:text-sm text-[#fda4b8]/80 font-normal">
          Client-encrypted with AES-256-GCM before touching any servers
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#fda4b8] tracking-wide block">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#fda4b8]/50" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="glass-input pl-10 pr-4 py-3 text-xs"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#fda4b8] tracking-wide block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#fda4b8]/50" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="glass-input pl-10 pr-4 py-3 text-xs"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#fda4b8] tracking-wide block">
            Master Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#fda4b8]/50" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong master password"
              className="glass-input pl-10 pr-11 py-3 text-xs font-mono-code"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#fda4b8]/60 hover:text-white p-1 transition-colors"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          {/* Strength Meter */}
          {password && (
            <div className="space-y-2 p-3.5 rounded-2xl glass-card-subtle border border-pink-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#fda4b8]">
                  Strength Meter:
                </span>
                <span className="text-xs font-bold text-white">
                  {strengthLabels[score]}
                </span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      score >= n ? strengthColors[score] : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {requirements.map((req) => (
                  <div key={req.label} className="flex items-center gap-1.5 text-[0.68rem]">
                    <CheckCircle2
                      className={`size-3.5 ${
                        req.test(password) ? "text-emerald-400" : "text-white/20"
                      }`}
                    />
                    <span className={req.test(password) ? "text-white font-semibold" : "text-[#fda4b8]/50"}>
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
            className="w-full glass-btn-primary py-3.5 text-xs font-semibold gap-2"
          >
            {loading ? (
              <Loader2 className="size-4.5 animate-spin" />
            ) : (
              <>
                <span>Create My Vault</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </div>

        <p className="text-center text-[0.68rem] text-[#fda4b8]/60 font-normal">
          By signing up you agree to zero-knowledge encryption &amp; privacy policies.
        </p>
      </form>

      {/* Sign-in CTA */}
      <div className="text-center space-y-2 border-t border-pink-500/15 pt-4">
        <p className="text-xs text-[#fda4b8]/80">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-white hover:text-[#fda4b8] underline ml-1">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
