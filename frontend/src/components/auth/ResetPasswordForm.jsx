import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, ShieldCheck, CheckCircle2, Loader2, ArrowLeft, Mail } from "lucide-react";
import * as authService from "@/services/auth.service";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await authService.resetPassword({ email, otp: code, password });
      toast.success("Password reset successfully! Please sign in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid code or the reset link has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="size-12 rounded-2xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] border border-white/20 text-white flex items-center justify-center mx-auto shadow-lg">
          <ShieldCheck className="size-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Set new password</h1>
        <p className="text-xs text-[#fda4b8]/80 font-normal">
          Enter your email, the verification code, and a strong new master password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-xs text-rose-200 font-medium">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#fda4b8]">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#fda4b8]/50" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="glass-input pl-9 pr-4 py-2.5 text-xs"
            />
          </div>
        </div>

        {/* Verification Code */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#fda4b8]">Reset Code</label>
          <input
            type="text"
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-digit code"
            className="glass-input text-center tracking-[0.3em] px-4 py-2.5 text-sm font-mono-code font-bold"
          />
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#fda4b8]">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#fda4b8]/50" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New secure password"
              className="glass-input pl-9 pr-10 py-2.5 text-xs font-mono-code"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fda4b8]/60 hover:text-white p-1"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#fda4b8]">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#fda4b8]/50" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="glass-input pl-9 pr-4 py-2.5 text-xs font-mono-code"
            />
          </div>
          {confirmPassword && (
            <div className="flex items-center gap-1.5 text-[0.65rem] mt-1">
              <CheckCircle2 className={`size-3 ${password === confirmPassword ? "text-emerald-400" : "text-rose-400"}`} />
              <span className={password === confirmPassword ? "text-emerald-300 font-semibold" : "text-rose-300 font-semibold"}>
                {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full glass-btn-primary py-3 text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <><CheckCircle2 className="size-4" /> Reset Password</>}
        </button>
      </form>

      <div className="text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs text-[#fda4b8] hover:text-white underline transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
