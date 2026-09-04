import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
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
          <Sparkles className="size-3.5 text-[#8B263E]" />
          <span>Lockely Security</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a] tracking-tight">
          Welcome Back
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6560] font-normal">
          Unlock your zero-knowledge encrypted vault
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#1a1a1a] tracking-wide block">
            Email Address
          </label>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#6B6560]" />
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
            <label className="text-xs font-semibold text-[#1a1a1a] tracking-wide block">
              Master Password
            </label>
            <Link
              to="/forgot-password"
              className="text-[0.72rem] text-[#8B263E] hover:text-[#A8324E] underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#6B6560]" />
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
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6560] hover:text-[#1a1a1a] p-1 transition-colors cursor-pointer"
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
            className="w-full glass-btn-primary py-3.5 text-xs font-semibold gap-2 cursor-pointer shadow-button hover:shadow-button-hover"
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

      <div className="text-center space-y-3">
        <p className="text-xs text-[#6B6560] font-normal">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-[#8B263E] hover:underline transition-colors ml-1"
          >
            Create free vault
          </Link>
        </p>
      </div>
    </div>
  );
}
