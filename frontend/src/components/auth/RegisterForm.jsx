import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Mail, Lock, User, ShieldCheck, ArrowRight,
  Loader2, CheckCircle2, XCircle,
} from "lucide-react";
import * as authService from "@/services/auth.service";
import { useAppAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

/* ── Password requirements ── */
const requirements = [
  { label: "8+ characters", test: (p) => p.length >= 8 },
  { label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "Number", test: (p) => /[0-9]/.test(p) },
  { label: "Special char", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

/* ── Strength meter ── */
function strengthScore(p) {
  return requirements.filter((r) => r.test(p)).length;
}
const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["", "bg-rose-500", "bg-amber-400", "bg-blue-500", "bg-emerald-500"];
const strengthTextColors = ["", "text-rose-500", "text-amber-500", "text-blue-600", "text-emerald-600"];

/* ── Framer variants ── */
const fieldVariant = {
  hidden: { opacity: 0, y: 14 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  }),
};

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

  const setRef = (el, i) => { inputRefs[i] = el; };

  const handleDigit = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits]; next[i] = val; setDigits(next);
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
    if (code.length !== 6) { setError("Enter all 6 digits."); return; }
    setError(""); setLoading(true);
    try {
      const res = await authService.verifyOTP({ email, otp: code });
      const { user, vaultKeySalt } = res.data || {};
      if (user) {
        await saveSession(user, vaultKeySalt, masterPassword);
        toast.success("Email verified! Welcome to PassGuardian.");
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid code. Try again.");
    } finally { setLoading(false); }
  };

  const handleResend = async () => {
    if (resending) return;
    setResending(true); setError("");
    try {
      await authService.resendOTP({ email, type: "EMAIL_VERIFICATION" });
      setResent(true); setDigits(["", "", "", "", "", ""]);
      inputRefs[0]?.focus();
      setTimeout(() => setResent(false), 3000);
    } catch { setError("Failed to resend. Try again."); }
    finally { setResending(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full space-y-6"
    >
      {/* Header */}
      <div className="space-y-1.5">
        <div className="size-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-lg shadow-indigo-500/25">
          <Mail className="size-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Check your inbox</h2>
        <p className="text-sm text-slate-500">
          We sent a 6-digit code to <strong className="text-slate-700">{email}</strong>
        </p>
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-center gap-2">
            <XCircle className="size-4 shrink-0" /> {error}
          </motion.div>
        )}
        {resent && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-medium flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0" /> New code sent!
          </motion.div>
        )}
      </AnimatePresence>

      {/* OTP boxes */}
      <div className="flex justify-center gap-2" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <motion.input
            key={i}
            ref={(el) => setRef(el, i)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleDigit(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="size-12 text-center text-xl font-bold font-mono rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-150"
          />
        ))}
      </div>

      {/* Verify button */}
      <motion.button
        onClick={handleVerify}
        disabled={digits.join("").length !== 6 || loading}
        whileHover={{ scale: 1.015, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-soft-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? <Loader2 className="size-4.5 animate-spin" /> : <><ShieldCheck className="size-4.5" /> Verify & Access Vault</>}
      </motion.button>

      <div className="text-center">
        <button onClick={handleResend} disabled={resending}
          className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors disabled:opacity-50">
          {resending ? "Sending…" : "Resend code"}
        </button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════ */

export default function RegisterForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(null);
  const [pendingVerification, setPendingVerification] = useState(false);

  const score = password ? strengthScore(password) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await authService.register({ name, email, password });
      setPendingVerification(true);
      toast.success("Verification code sent!");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally { setLoading(false); }
  };

  if (pendingVerification) {
    return <OTPVerify email={email} password={password} />;
  }

  return (
    <div className="w-full space-y-6">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-1.5"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3">
          <ShieldCheck className="size-3.5 text-indigo-600" />
          <span className="text-[0.68rem] font-bold text-indigo-600 uppercase tracking-wider">Create Your Vault</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Create free account
        </h1>
        <p className="text-sm text-slate-500">Zero-knowledge vault — your secrets stay yours</p>
      </motion.div>

      {/* ── Error ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium"
          >
            <span className="size-1.5 rounded-full bg-rose-500 shrink-0 mt-1" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <motion.div custom={0} variants={fieldVariant} initial="hidden" animate="show" className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 tracking-wide">Full name</label>
          <div className={`relative transition-all duration-200 ${focused === "name" ? "scale-[1.01]" : ""}`}>
            <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 size-4 transition-colors ${focused === "name" ? "text-indigo-500" : "text-slate-400"}`} />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              placeholder="Alex Guardian"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/8 transition-all duration-200"
            />
          </div>
        </motion.div>

        {/* Email */}
        <motion.div custom={1} variants={fieldVariant} initial="hidden" animate="show" className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 tracking-wide">Email address</label>
          <div className={`relative transition-all duration-200 ${focused === "email" ? "scale-[1.01]" : ""}`}>
            <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 size-4 transition-colors ${focused === "email" ? "text-indigo-500" : "text-slate-400"}`} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/8 transition-all duration-200"
            />
          </div>
        </motion.div>

        {/* Password */}
        <motion.div custom={2} variants={fieldVariant} initial="hidden" animate="show" className="space-y-2">
          <label className="text-xs font-bold text-slate-700 tracking-wide">Master password</label>
          <div className={`relative transition-all duration-200 ${focused === "password" ? "scale-[1.01]" : ""}`}>
            <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 size-4 transition-colors ${focused === "password" ? "text-indigo-500" : "text-slate-400"}`} />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              placeholder="Create a strong master password"
              className="w-full pl-10 pr-11 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/8 transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors p-0.5"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          {/* Strength meter */}
          <AnimatePresence>
            {password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                {/* Bar */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((n) => (
                    <motion.div
                      key={n}
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-400 ${score >= n ? strengthColors[score] : "bg-slate-200"}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: n * 0.05, duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                  ))}
                </div>
                {/* Label + requirements */}
                <div className="flex items-center justify-between">
                  <span className={`text-[0.68rem] font-bold ${strengthTextColors[score]}`}>
                    {strengthLabels[score]}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {requirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-1.5 text-[0.65rem]">
                      <CheckCircle2
                        className={`size-3 transition-colors ${req.test(password) ? "text-emerald-500" : "text-slate-300"}`}
                      />
                      <span className={req.test(password) ? "text-emerald-700" : "text-slate-400"}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submit */}
        <motion.div custom={3} variants={fieldVariant} initial="hidden" animate="show" className="pt-1">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.015, y: loading ? 0 : -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative overflow-hidden btn-soft-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {!loading && (
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
              />
            )}
            {loading ? <Loader2 className="size-4.5 animate-spin" /> : <><ArrowRight className="size-4.5" /> Create Encrypted Account</>}
          </motion.button>
        </motion.div>

        {/* Terms */}
        <motion.p custom={4} variants={fieldVariant} initial="hidden" animate="show"
          className="text-center text-[0.65rem] text-slate-400">
          By creating an account you agree to our{" "}
          <Link to="/terms" className="text-indigo-600 underline">Terms</Link> and{" "}
          <Link to="/privacy" className="text-indigo-600 underline">Privacy Policy</Link>.
        </motion.p>
      </form>

      {/* ── Sign-in CTA ── */}
      <motion.div custom={5} variants={fieldVariant} initial="hidden" animate="show" className="text-center space-y-2">
        <p className="text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            Sign in
          </Link>
        </p>
        <div className="inline-flex items-center gap-1.5 text-[0.65rem] text-slate-400 font-medium">
          <ShieldCheck className="size-3 text-emerald-500" />
          256-bit encrypted · Zero knowledge · No tracking
        </div>
      </motion.div>
    </div>
  );
}
