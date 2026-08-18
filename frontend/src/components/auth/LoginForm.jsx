import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Mail, Lock, ShieldCheck, ArrowRight, Loader2,
} from "lucide-react";
import { useAppAuth } from "@/context/AuthContext";
import * as authService from "@/services/auth.service";
import toast from "react-hot-toast";

/* ── Framer Motion micro-variants ── */
const fieldVariant = {
  hidden: { opacity: 0, y: 14 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function LoginForm() {
  const { saveSession } = useAppAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authService.login({ email, password });
      saveSession(res.data.token, res.data.user);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password. Please try again.";
      if (err.response?.status === 403) {
        toast.error(msg);
        navigate("/verify-otp", { state: { email } });
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-7">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-1.5"
      >
        {/* Icon badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3">
          <ShieldCheck className="size-3.5 text-indigo-600" />
          <span className="text-[0.68rem] font-bold text-indigo-600 uppercase tracking-wider">Secure Sign In</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500">Sign in to your encrypted vault</p>
      </motion.div>

      {/* ── Error Banner ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium"
          >
            <span className="size-1.5 rounded-full bg-rose-500 shrink-0 mt-1" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <motion.div custom={0} variants={fieldVariant} initial="hidden" animate="show" className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 tracking-wide">Email address</label>
          <div className={`relative transition-all duration-200 ${focused === "email" ? "scale-[1.01]" : ""}`}>
            <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 size-4 transition-colors duration-200 ${focused === "email" ? "text-indigo-500" : "text-slate-400"}`} />
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
        <motion.div custom={1} variants={fieldVariant} initial="hidden" animate="show" className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 tracking-wide">Password</label>
            <Link
              to="/forgot-password"
              className="text-[0.72rem] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className={`relative transition-all duration-200 ${focused === "password" ? "scale-[1.01]" : ""}`}>
            <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 size-4 transition-colors duration-200 ${focused === "password" ? "text-indigo-500" : "text-slate-400"}`} />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              placeholder="Your master password"
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
        </motion.div>

        {/* Submit */}
        <motion.div
          custom={2}
          variants={fieldVariant}
          initial="hidden"
          animate="show"
          className="pt-1"
        >
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.015, y: loading ? 0 : -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative overflow-hidden btn-soft-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {/* Animated shimmer sweep */}
            {!loading && (
              <motion.span
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
              />
            )}
            {loading ? (
              <Loader2 className="size-4.5 animate-spin" />
            ) : (
              <>
                Sign In to Vault
                <ArrowRight className="size-4.5" />
              </>
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* ── Divider ── */}
      <motion.div
        custom={3}
        variants={fieldVariant}
        initial="hidden"
        animate="show"
        className="flex items-center gap-3"
      >
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider">or</span>
        <div className="flex-1 h-px bg-slate-200" />
      </motion.div>

      {/* ── Register CTA ── */}
      <motion.div
        custom={4}
        variants={fieldVariant}
        initial="hidden"
        animate="show"
        className="text-center space-y-3"
      >
        <p className="text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Create free account
          </Link>
        </p>

        {/* Security micro-badge */}
        <div className="inline-flex items-center gap-1.5 text-[0.65rem] text-slate-400 font-medium">
          <ShieldCheck className="size-3 text-emerald-500" />
          256-bit encrypted · Zero knowledge · No tracking
        </div>
      </motion.div>
    </div>
  );
}
