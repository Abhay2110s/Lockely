import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, ShieldCheck, Loader2, CheckCircle2, RefreshCw } from "lucide-react";
import * as authService from "@/services/auth.service";
import { useAppAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

/**
 * VerifyOTP Component — email verification code input (6 boxes).
 * Used after registration to verify email address via the backend OTP service.
 */
export default function VerifyOTP({ email: emailProp, onSuccess }) {
  const { saveSession } = useAppAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Allow email to be passed as a prop or via router state (from login redirect)
  const email = emailProp || location.state?.email || "";

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) {
      const newDigits = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
      setDigits(newDigits);
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = digits.join("");
    if (code.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await authService.verifyOTP({ email, otp: code });
      if (res.data?.token) {
        saveSession(res.data.token, res.data.user);
        onSuccess?.(res.data);
        toast.success("Email verified! Welcome to PassGuardian.");
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resending) return;
    setResending(true);
    setError("");
    try {
      await authService.resendOTP({ email, type: "EMAIL_VERIFICATION" });
      setResent(true);
      setDigits(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setTimeout(() => setResent(false), 3000);
    } catch {
      setError("Failed to resend code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const isComplete = digits.every((d) => d !== "");

  return (
    <div className="w-full max-w-md space-y-6 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-2xl p-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="size-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20">
          <Mail className="size-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Verify your email</h2>
        {email && (
          <p className="text-xs text-slate-500">
            We sent a 6-digit code to <strong className="text-slate-700">{email}</strong>
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium text-center">
          {error}
        </div>
      )}

      {resent && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-medium text-center flex items-center justify-center gap-2">
          <CheckCircle2 className="size-4" /> New code sent to your email!
        </div>
      )}

      {/* 6-Box OTP Input */}
      <div className="flex justify-center gap-2" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleDigitChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="size-12 text-center text-lg font-bold font-mono rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={handleVerify}
        disabled={!isComplete || loading}
        className="w-full btn-soft-primary py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-indigo-500/15 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <><ShieldCheck className="size-4" /> Verify &amp; Continue</>
        )}
      </button>

      {/* Resend */}
      <div className="text-center">
        <button
          onClick={handleResend}
          disabled={resending}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`size-3.5 ${resending ? "animate-spin" : ""}`} />
          Resend code
        </button>
      </div>
    </div>
  );
}
