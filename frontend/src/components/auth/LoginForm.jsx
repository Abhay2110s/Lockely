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
      toast.success("Welcome back to your Vault! 🛡️");
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
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-badge-blush text-xs mb-1">
          <Sparkles className="size-3.5 text-[#f43f6e]" />
          <span>PassGuardian Security</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Welcome Back
        </h1>
        <p className="text-xs sm:text-sm text-[#fda4b8]/80 font-normal">
          Unlock your zero-knowledge encrypted vault
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#fda4b8] tracking-wide block">
              Master Password
            </label>
            <Link
              to="/forgot-password"
              className="text-[0.72rem] text-[#fda4b8] hover:text-white underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#fda4b8]/50" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your master password"
              className="glass-input pl-10 pr-11 py-3 text-xs font-mono-code"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#fda4b8]/60 hover:text-white p-1 transition-colors"
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
            className="w-full glass-btn-primary py-3.5 text-xs font-semibold gap-2"
          >
            {loading ? (
              <Loader2 className="size-4.5 animate-spin" />
            ) : (
              <>
                <span>Unlock &amp; Sign In</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-pink-500/20" />
        <span className="text-[0.65rem] font-mono-code uppercase font-semibold text-[#fda4b8]/60">
          Zero-Knowledge Access
        </span>
        <div className="flex-1 h-px bg-pink-500/20" />
      </div>

      <div className="text-center space-y-3">
        <p className="text-xs text-[#fda4b8]/80 font-normal">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-white hover:text-[#fda4b8] underline transition-colors ml-1"
          >
            Create free vault
          </Link>
        </p>

        <div className="inline-flex items-center gap-1.5 text-[0.7rem] glass-badge-blush">
          <ShieldCheck className="size-3.5 text-[#f43f6e]" />
          <span>AES-256-GCM · Client Decrypted</span>
        </div>
      </div>
    </div>
  );
}
