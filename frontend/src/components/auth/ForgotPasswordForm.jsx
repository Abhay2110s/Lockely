import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ShieldCheck, ArrowRight, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import * as authService from "@/services/auth.service";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.forgotPassword({ email });
      setSent(true);
      toast.success("Reset code sent to your email!");
    } catch (err) {
      setError(err.response?.data?.message || "Could not find an account with that email.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="w-full text-center space-y-6">
        <div className="size-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="size-7" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[#1a1a1a]">Check your inbox</h2>
          <p className="text-xs text-[#6B6560] mt-2">
            We sent a password reset code to <strong className="text-[#8B263E] font-mono">{email}</strong>. It expires in 10 minutes.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[0.72rem] text-[#6B6560]">
            Didn&apos;t receive it? Check your spam folder or{" "}
            <button
              onClick={() => setSent(false)}
              className="text-[#8B263E] font-semibold hover:underline cursor-pointer"
            >
              try again
            </button>.
          </p>
          <Link
            to="/reset-password"
            className="inline-flex items-center justify-center gap-2 w-full glass-btn-primary py-3.5 text-xs font-semibold rounded-full shadow-button hover:shadow-button-hover"
          >
            <ArrowRight className="size-4" />
            <span>Enter Reset Code</span>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-[#8B263E] hover:underline mt-2 font-medium"
          >
            <ArrowLeft className="size-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="size-12 rounded-2xl bg-blush/35 border border-[#E6E0D5] text-[#8B263E] flex items-center justify-center mx-auto shadow-xs">
          <ShieldCheck className="size-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#1a1a1a] tracking-tight">Reset your password</h1>
        <p className="text-xs text-[#6B6560] font-normal">
          Enter your email and we&apos;ll send you a secure verification reset code.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

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

        <button
          type="submit"
          disabled={loading}
          className="w-full glass-btn-primary py-3.5 text-xs font-semibold rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-button hover:shadow-button-hover disabled:opacity-60"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <><ArrowRight className="size-4" /> Send Reset Code</>}
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
