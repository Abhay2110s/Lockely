import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignIn } from "@clerk/react";
import { Mail, ShieldCheck, ArrowRight, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordForm() {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setError("");
    setLoading(true);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSent(true);
    } catch (err) {
      setError(err.errors?.[0]?.message || "Could not find an account with that email.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="w-full max-w-md text-center space-y-6 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-2xl p-8">
        <div className="size-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="size-7" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Check your inbox</h2>
          <p className="text-xs text-slate-500 mt-2">
            We sent a password reset link to <strong>{email}</strong>. It expires in 10 minutes.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-[0.7rem] text-slate-400">
            Didn't receive it? Check your spam folder or{" "}
            <button
              onClick={() => setSent(false)}
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              try again
            </button>.
          </p>
          <Link
            to="/sign-in"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 mt-2"
          >
            <ArrowLeft className="size-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-6 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-2xl p-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="size-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20">
          <ShieldCheck className="size-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reset your password</h1>
        <p className="text-xs text-slate-500">
          Enter your email and we'll send you a secure reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !isLoaded}
          className="w-full btn-soft-primary py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-indigo-500/15 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <><ArrowRight className="size-4" /> Send Reset Link</>}
        </button>
      </form>

      <div className="text-center">
        <Link
          to="/sign-in"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
