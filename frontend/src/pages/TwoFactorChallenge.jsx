import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Loader2, KeyRound, Smartphone, Zap } from "lucide-react";
import { useAppAuth } from "@/context/AuthContext";
import { verify2FA } from "@/services/auth.service";
import toast from "react-hot-toast";

export default function TwoFactorChallenge() {
  const { saveSession } = useAppAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { pendingUserId, vaultKeySalt, password } = location.state || {};

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [useBackup, setUseBackup] = useState(false);
  const [backupCode, setBackupCode] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!pendingUserId) {
      navigate("/login", { replace: true });
      return;
    }
    inputRefs.current[0]?.focus();
  }, [pendingUserId, navigate]);

  const handleDigitChange = (index, rawValue) => {
    const value = rawValue.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) {
      const next = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
      setDigits(next);
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);

    const token = useBackup ? undefined : digits.join("");
    const backup = useBackup ? backupCode.trim() : undefined;

    if (!useBackup && token.length !== 6) {
      setError("Enter all 6 digits.");
      setLoading(false);
      return;
    }
    if (useBackup && !backup) {
      setError("Enter your backup code.");
      setLoading(false);
      return;
    }

    try {
      const res = await verify2FA({ pendingUserId, token, backupCode: backup });
      const { user, vaultKeySalt: returnedSalt, token: authToken } = res.data;

      await saveSession(user, returnedSalt ?? vaultKeySalt, password, authToken);
      toast.success("2FA Verified! Welcome to your vault. 🛡️");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6ea] flex items-center justify-center p-4 font-comic">
      <div className="w-full max-w-sm bg-[#fffef7] rounded-3xl border-3 border-[#18181b] shadow-[6px_6px_0px_#18181b] p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="size-14 rounded-2xl bg-[#fef08a] border-2.5 border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] flex items-center justify-center mx-auto text-slate-950">
            <Smartphone className="size-7" />
          </div>
          <h1 className="text-2xl font-heading-comic font-black text-slate-950">
            2FA Verification ⚡
          </h1>
          <p className="text-xs text-slate-600 font-comic font-bold">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-2xl bg-[#fda4af] border-2 border-[#18181b] text-xs text-slate-950 font-bold text-center">
            ⚠️ {error}
          </div>
        )}

        {!useBackup ? (
          <div className="space-y-4">
            {/* TOTP digit input */}
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
                  className="size-12 text-center text-xl font-heading-comic font-black rounded-2xl bg-white border-2.5 border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] focus:bg-[#fef08a] focus:shadow-[4px_4px_0px_#18181b] focus:outline-none transition-all"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || digits.join("").length !== 6}
              className="w-full btn-comic btn-comic-primary py-3.5 text-sm gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <><ShieldCheck className="size-4" /> Verify Code ➔</>}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Backup code input */}
            <div className="space-y-1.5">
              <label className="text-xs font-heading-comic font-bold text-slate-900">Backup Recovery Code</label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
                <input
                  type="text"
                  value={backupCode}
                  onChange={(e) => setBackupCode(e.target.value)}
                  placeholder="XXXX-XXXX"
                  className="comic-input w-full pl-10 pr-4 py-3 text-xs font-mono font-black"
                />
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || !backupCode.trim()}
              className="w-full btn-comic btn-comic-yellow py-3.5 text-sm gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : "Use Backup Code"}
            </button>
          </div>
        )}

        {/* Toggle between TOTP and backup */}
        <div className="text-center pt-2">
          <button
            onClick={() => { setUseBackup((b) => !b); setError(""); }}
            className="text-xs font-heading-comic font-bold text-indigo-700 hover:underline"
          >
            {useBackup ? "Use authenticator app instead" : "Use a backup recovery code instead"}
          </button>
        </div>
      </div>
    </div>
  );
}
