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
        <div className="size-12 rounded-2xl bg-blush/35 border border-[#E6E0D5] text-[#8B263E] flex items-center justify-center mx-auto shadow-xs">
          <ShieldCheck className="size-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#1a1a1a] tracking-tight">Set new password</h1>
        <p className="text-xs text-[#6B6560] font-normal">
          Enter your email, the verification code, and a strong new master password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#1a1a1a]">Email address</label>
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

        {/* Verification Code */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#1a1a1a]">Reset Code</label>
          <input
            type="text"
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-digit code"
            className="glass-input text-center tracking-[0.3em] px-4 py-3 text-sm font-mono-code font-bold rounded-2xl"
          />
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#1a1a1a]">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#6B6560]" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New secure password"
              className="glass-input pl-10 pr-11 py-3 text-xs font-mono-code"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6560] hover:text-[#1a1a1a] p-1 cursor-pointer"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#1a1a1a]">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#6B6560]" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="glass-input pl-10 pr-4 py-3 text-xs font-mono-code"
            />
          </div>
          {confirmPassword && (
            <div className="flex items-center gap-1.5 text-[0.68rem] mt-1">
              <CheckCircle2 className={`size-3.5 ${password === confirmPassword ? "text-emerald-600" : "text-rose-600"}`} />
              <span className={password === confirmPassword ? "text-emerald-700 font-semibold" : "text-rose-700 font-semibold"}>
                {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full glass-btn-primary py-3.5 text-xs font-semibold rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-button hover:shadow-button-hover disabled:opacity-60"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <><CheckCircle2 className="size-4" /> Reset Password</>}
        </button>
      </form>

      <div className="text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs text-[#8B263E] hover:underline transition-colors font-medium"
        >
          <ArrowLeft className="size-3.5" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
