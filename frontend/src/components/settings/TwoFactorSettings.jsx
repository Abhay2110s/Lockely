import { useState, useEffect } from "react";
import { useAppAuth } from "@/context/AuthContext";
import * as authService from "@/services/auth.service";
import toast from "react-hot-toast";
import {
  ShieldCheck,
  Smartphone,
  Copy,
  Check,
  Loader2,
  X,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import useClipboard from "@/hooks/useClipboard";

export default function TwoFactorSettings() {
  const { user, updateUser } = useAppAuth();
  const [isEnabled, setIsEnabled] = useState(Boolean(user?.twoFactorEnabled));
  const [setupData, setSetupData] = useState(null); // { otpAuthUrl, secret }
  const [confirmCode, setConfirmCode] = useState("");
  const [backupCodes, setBackupCodes] = useState(null);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [disableCode, setDisableCode] = useState("");
  const [disableUseBackup, setDisableUseBackup] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { copied, copy } = useClipboard(2000);

  useEffect(() => {
    setIsEnabled(Boolean(user?.twoFactorEnabled));
  }, [user?.twoFactorEnabled]);

  const handleStartSetup = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await authService.setup2FA();
      setSetupData(res.data);
      setIsSetupModalOpen(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to initiate 2FA setup.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySetup = async (e) => {
    e.preventDefault();
    if (!confirmCode.trim()) return;
    setError("");
    setLoading(true);
    try {
      const res = await authService.verifySetup2FA({ token: confirmCode.trim() });
      const codes = res.data?.backupCodes || [];
      setBackupCodes(codes);
      setIsEnabled(true);
      updateUser({ twoFactorEnabled: true });
      toast.success("2FA enabled successfully! 🛡️");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid verification code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async (e) => {
    e.preventDefault();
    if (!disableCode.trim()) return;
    setError("");
    setLoading(true);
    try {
      const payload = disableUseBackup
        ? { backupCode: disableCode.trim() }
        : { token: disableCode.trim() };

      await authService.disable2FA(payload);
      setIsEnabled(false);
      updateUser({ twoFactorEnabled: false });
      setIsDisableModalOpen(false);
      setDisableCode("");
      toast.success("2FA has been disabled.");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to disable 2FA. Check your code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-pink-500/20 shadow-2xl space-y-6">
      {/* Header / Trigger Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div
            className={`size-12 rounded-2xl flex items-center justify-center font-bold shadow-lg shrink-0 ${
              isEnabled
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                : "bg-gradient-to-br from-[#7a1534] to-[#be2656] border border-white/20 text-white"
            }`}
          >
            <Smartphone className="size-6" />
          </div>
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Two-Factor Authentication (2FA)
              </h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                  isEnabled
                    ? "glass-badge-emerald"
                    : "glass-badge-blush"
                }`}
              >
                {isEnabled ? "ACTIVE 🛡️" : "DISABLED"}
              </span>
            </div>
            <p className="text-xs text-[#fda4b8]/80 leading-relaxed font-normal">
              Require a 6-digit TOTP authenticator code whenever you log in or unlock your account.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto shrink-0">
          {isEnabled ? (
            <button
              type="button"
              onClick={() => {
                setError("");
                setIsDisableModalOpen(true);
              }}
              className="glass-btn-ghost text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 border border-rose-500/30 w-full sm:w-auto text-xs px-5 py-2.5"
            >
              Disable 2FA
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStartSetup}
              disabled={loading}
              className="glass-btn-primary w-full sm:w-auto text-xs px-5 py-2.5 gap-2"
            >
              {loading ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <ShieldCheck className="size-4" />
              )}
              <span>Enable 2FA</span>
            </button>
          )}
        </div>
      </div>

      {/* SETUP MODAL */}
      {isSetupModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#120307]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-md glass-panel rounded-3xl border border-pink-500/30 shadow-2xl p-6 sm:p-7 space-y-5 my-auto max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 border-b border-pink-500/15 pb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-9 rounded-xl bg-gradient-to-br from-[#7a1534] to-[#f43f6e] flex items-center justify-center text-white shrink-0">
                  <ShieldCheck className="size-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white truncate">
                  Set Up 2FA Authenticator
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsSetupModalOpen(false);
                  setBackupCodes(null);
                  setConfirmCode("");
                }}
                className="p-1.5 rounded-lg glass-card-subtle text-[#fda4b8] hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {backupCodes ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl glass-card border-emerald-500/30 text-emerald-200 text-xs space-y-1">
                  <p className="text-sm font-bold flex items-center gap-1.5 text-white">
                    <Check className="size-4 text-emerald-400" /> 2FA is now active!
                  </p>
                  <p className="text-xs text-[#fda4b8]/90 leading-relaxed font-normal">
                    Save these one-time backup codes safely. They let you recover your vault if you lose your authenticator.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-pink-500/20 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono-code text-xs text-white">
                  {backupCodes.map((code, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-[#3c0b1a]/70 border border-pink-500/20 text-center font-bold"
                    >
                      {code}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      copy(backupCodes.join("\n"));
                      toast.success("All backup codes copied!");
                    }}
                    className="glass-btn-secondary w-full sm:w-auto text-xs px-4 py-2.5 gap-1.5"
                  >
                    {copied ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    <span>{copied ? "Copied All!" : "Copy Codes"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSetupModalOpen(false);
                      setBackupCodes(null);
                    }}
                    className="glass-btn-primary w-full sm:w-auto px-5 py-2.5 text-xs"
                  >
                    I Have Saved These
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerifySetup} className="space-y-4">
                <p className="text-xs text-[#fda4b8]">
                  1. Scan this QR code with Google Authenticator, Authy, or Microsoft Authenticator:
                </p>

                {setupData?.otpAuthUrl && (
                  <div className="flex justify-center p-4 bg-white rounded-2xl border border-pink-500/30">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        setupData.otpAuthUrl
                      )}`}
                      alt="2FA QR Code"
                      className="size-36 sm:size-44 object-contain"
                    />
                  </div>
                )}

                {setupData?.secret && (
                  <div className="space-y-1">
                    <p className="text-[0.65rem] text-[#fda4b8]/70 uppercase font-mono-code font-semibold">Manual Secret Key:</p>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-pink-500/20 flex items-center justify-between gap-2 text-xs font-mono-code">
                      <span className="truncate text-white font-bold">{setupData.secret}</span>
                      <button
                        type="button"
                        onClick={() => {
                          copy(setupData.secret);
                          toast.success("Secret copied!");
                        }}
                        className="glass-btn-secondary py-1 px-2 text-xs"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-[#fda4b8] block mb-1">
                    2. Enter the 6-digit TOTP verification code:
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={confirmCode}
                    onChange={(e) => setConfirmCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="glass-input text-center text-lg font-mono-code font-bold tracking-widest"
                  />
                </div>

                {error && (
                  <div className="bg-rose-950/50 border border-rose-500/30 text-rose-200 text-xs px-3.5 py-2.5 rounded-xl">
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSetupModalOpen(false)}
                    className="glass-btn-ghost text-xs px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || confirmCode.length !== 6}
                    className="glass-btn-primary px-5 py-2 text-xs gap-1.5"
                  >
                    {loading && <Loader2 className="size-3.5 animate-spin" />}
                    Verify &amp; Activate
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* DISABLE MODAL */}
      {isDisableModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#120307]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-sm glass-panel rounded-3xl border border-rose-500/30 shadow-2xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-300">
                <AlertTriangle className="size-5" />
                <h3 className="text-base font-bold text-white">Disable 2FA</h3>
              </div>
              <button
                onClick={() => setIsDisableModalOpen(false)}
                className="p-1.5 rounded-lg glass-card-subtle text-[#fda4b8] hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-xs text-[#fda4b8]/80 leading-relaxed font-normal">
              Enter a verification code or emergency backup code to confirm disabling two-factor authentication.
            </p>

            {error && (
              <div className="bg-rose-950/50 border border-rose-500/30 text-rose-200 text-xs px-3.5 py-2.5 rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleDisable2FA} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  value={disableCode}
                  onChange={(e) => setDisableCode(e.target.value)}
                  placeholder={disableUseBackup ? "Enter 8-digit backup code" : "Enter 6-digit TOTP code"}
                  className="glass-input text-center text-sm font-mono-code font-bold"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setDisableUseBackup(!disableUseBackup)}
                  className="text-xs text-[#fda4b8] hover:text-white underline cursor-pointer"
                >
                  {disableUseBackup ? "Use Authenticator Code" : "Use Backup Code"}
                </button>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDisableModalOpen(false)}
                  className="glass-btn-ghost text-xs px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !disableCode.trim()}
                  className="glass-btn-primary bg-rose-600 hover:bg-rose-700 px-5 py-2 text-xs"
                >
                  {loading && <Loader2 className="size-3.5 animate-spin" />}
                  Confirm Disable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
