import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useAppAuth } from "@/context/AuthContext";
import * as authService from "@/services/auth.service";
import toast from "react-hot-toast";

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
      const { user, vaultKeySalt, requires2FA, pendingUserId, token } = res.data;

      if (requires2FA) {
        // 2FA is enabled — redirect to the TOTP challenge step.
        // Pass the password in state so the vault key can be derived
        // AFTER the 2FA code is confirmed (never stored anywhere else).
        navigate("/verify-2fa", {
          state: { pendingUserId, vaultKeySalt, password },
        });
        return;
      }

      await saveSession(user, vaultKeySalt, password, token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Invalid email or password. Please try again.";

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
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-3">
          <ShieldCheck className="size-3.5 text-indigo-600" />
          <span className="text-[0.68rem] font-bold text-indigo-600 uppercase tracking-wider">
            Secure Sign In
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500">
          Sign in to your encrypted vault
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          <span className="size-1.5 rounded-full bg-rose-500 shrink-0 mt-1" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 tracking-wide">
            Email address
          </label>

          <div
            className={`relative transition-all duration-200 ${
              focused === "email" ? "scale-[1.01]" : ""
            }`}
          >
            <Mail
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 size-4 transition-colors duration-200 ${
                focused === "email" ? "text-indigo-500" : "text-slate-400"
              }`}
            />
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
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 tracking-wide">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-[0.72rem] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <div
            className={`relative transition-all duration-200 ${
              focused === "password" ? "scale-[1.01]" : ""
            }`}
          >
            <Lock
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 size-4 transition-colors duration-200 ${
                focused === "password"
                  ? "text-indigo-500"
                  : "text-slate-400"
              }`}
            />

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
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors p-0.5"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-1">
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-soft-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="size-4.5 animate-spin" />
            ) : (
              <>
                Sign In to Vault
                <ArrowRight className="size-4.5" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider">
          or
        </span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <div className="text-center space-y-3">
        <p className="text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Create free account
          </Link>
        </p>

        <div className="inline-flex items-center gap-1.5 text-[0.65rem] text-slate-400 font-medium">
          <ShieldCheck className="size-3 text-emerald-500" />
          256-bit encrypted · Zero knowledge · No tracking
        </div>
      </div>
    </div>
  );
}
