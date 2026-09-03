import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Loader2, KeyRound, Smartphone } from "lucide-react";
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
      inputRefs[Math.min(pasted.length, 5)]?.focus();
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
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 relative">
      {/* Ambient background glows */}
      <div className="aurora-orb-blush -top-20 -left-20 w-[500px] h-[500px]" />
      <div className="aurora-orb-burgundy -bottom-20 right-1/4 w-[450px] h-[450px]" />

      <div className="w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#E6E0D5] shadow-xl p-8 space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2.5">
          <div className="size-14 rounded-2xl bg-blush/35 border border-[#E6E0D5] flex items-center justify-center mx-auto text-[#8B263E] shadow-xs">
            <Smartphone className="size-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1a1a1a] tracking-tight">
            2FA Verification
          </h1>
          <p className="text-xs text-[#6B6560] font-normal">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 text-center font-medium">
            {error}
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
                  className="size-11 sm:size-12 text-center text-xl font-mono font-bold rounded-2xl bg-white border border-[#E6E0D5] focus:border-[#8B263E] text-[#1a1a1a] focus:outline-none shadow-xs transition-all"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || digits.join("").length !== 6}
              className="w-full glass-btn-primary py-3.5 text-xs font-semibold gap-2 rounded-full cursor-pointer shadow-button hover:shadow-button-hover"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <><ShieldCheck className="size-4" /> Verify Code</>}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Backup code input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1a1a1a]">Backup Recovery Code</label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#6B6560]" />
                <input
                  type="text"
                  value={backupCode}
                  onChange={(e) => setBackupCode(e.target.value)}
                  placeholder="XXXX-XXXX"
                  className="glass-input pl-10 pr-4 py-3 text-xs font-mono font-bold"
                />
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || !backupCode.trim()}
              className="w-full glass-btn-primary py-3.5 text-xs gap-2 rounded-full cursor-pointer shadow-button hover:shadow-button-hover"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : "Use Backup Code"}
            </button>
          </div>
        )}

        {/* Toggle between TOTP and backup */}
        <div className="text-center pt-2">
          <button
            onClick={() => { setUseBackup((b) => !b); setError(""); }}
            className="text-xs text-[#8B263E] hover:underline font-medium cursor-pointer"
          >
            {useBackup ? "Use authenticator app instead" : "Use a backup recovery code instead"}
          </button>
        </div>
      </div>
    </div>
  );
}
