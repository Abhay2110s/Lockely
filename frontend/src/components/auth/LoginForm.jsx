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
  Sparkles,
  Zap,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authService.login({ email, password });
      const { user, vaultKeySalt, requires2FA, pendingUserId, token } = res.data;

      if (requires2FA) {
        navigate("/verify-2fa", {
          state: { pendingUserId, vaultKeySalt, password },
        });
        return;
      }

      await saveSession(user, vaultKeySalt, password, token);
      toast.success("Welcome back to your Comic Vault! 🚀");
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
    <div className="w-full space-y-6 font-comic">
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef08a] border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b] text-xs font-heading-comic font-bold text-slate-950">
          <Zap className="size-3.5 fill-amber-400 text-slate-950" />
          PassGuardian Vault
        </div>

        <h1 className="text-3xl sm:text-4xl font-heading-comic font-black text-slate-950 tracking-tight">
          Welcome Back! 🛡️
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-comic font-bold">
          Unlock your zero-knowledge encrypted vault
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-[#fda4af] border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b] text-xs text-slate-950 font-bold">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-heading-comic font-bold text-slate-900 tracking-wide block">
              Master Password 🔑
            </label>
            <Link
              to="/forgot-password"
              className="text-[0.72rem] font-heading-comic font-bold text-indigo-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your super secret master password"
              className="comic-input w-full pl-10 pr-11 py-3 text-xs font-bold text-slate-900 placeholder:text-slate-400 font-mono"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-950 p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-comic btn-comic-yellow py-3.5 text-sm gap-2"
          >
            {loading ? (
              <Loader2 className="size-4.5 animate-spin" />
            ) : (
              <>
                Unlock &amp; Sign In ➔
              </>
            )}
          </button>
        </div>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-0.5 bg-[#18181b]" />
        <span className="text-xs font-heading-comic font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-[#18181b]">
          OR
        </span>
        <div className="flex-1 h-0.5 bg-[#18181b]" />
      </div>

      <div className="text-center space-y-3">
        <p className="text-xs font-comic font-bold text-slate-700">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-heading-comic font-black text-indigo-700 hover:underline"
          >
            Create free vault! ✨
          </Link>
        </p>

        <div className="inline-flex items-center gap-1.5 text-[0.7rem] font-heading-comic font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-900">
          <ShieldCheck className="size-3.5 text-emerald-700" />
          AES-256-GCM · Client Decrypted
        </div>
      </div>
    </div>
  );
}
