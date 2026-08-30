import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, ShieldCheck, Loader2, CheckCircle2, RefreshCw } from "lucide-react";
import * as authService from "@/services/auth.service";
import { useAppAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

/**
 * VerifyOTP Component — email verification code input (6 boxes).
 */
export default function VerifyOTP({ email: emailProp, onSuccess }) {
  const { saveSession } = useAppAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const email = emailProp || location.state?.email || "";
  const passwordFromState = location.state?.password || null;

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (index, rawValue) => {
    const value = rawValue.replace(/\D/g, "").slice(-1);

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
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
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
      const { user, vaultKeySalt, token } = res.data || {};
      if (user) {
        await saveSession(user, vaultKeySalt, passwordFromState, token);
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
      setLoading(false);
    }
  };

  const isComplete = digits.every((d) => d !== "");

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="size-12 rounded-2xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] border border-white/20 text-white flex items-center justify-center mx-auto shadow-lg">
          <Mail className="size-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-white">Verify your email</h2>
        {email && (
          <p className="text-xs text-[#fda4b8]/80 font-normal">
            We sent a 6-digit verification code to <strong className="text-white font-mono-code">{email}</strong>
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-xs text-rose-200 font-medium text-center">
          {error}
        </div>
      )}

      {resent && (
        <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-200 font-medium text-center flex items-center justify-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-400" /> New code sent to your email!
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
            onFocus={(e) => e.target.select()}
            className="size-11 sm:size-12 text-center text-lg font-mono-code font-bold rounded-xl glass-input border border-pink-500/25 focus:border-[#f43f6e] focus:outline-none transition-all"
          />
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={handleVerify}
        disabled={!isComplete || loading}
        className="w-full glass-btn-primary py-3 text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="inline-flex items-center gap-1.5 text-xs text-[#fda4b8] hover:text-white transition-colors disabled:opacity-50 underline cursor-pointer"
        >
          <RefreshCw className={`size-3.5 ${resending ? "animate-spin" : ""}`} />
          Resend code
        </button>
      </div>
    </div>
  );
}
