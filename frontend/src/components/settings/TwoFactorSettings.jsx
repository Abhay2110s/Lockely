import { useState } from "react";
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
} from "lucide-react";
import useClipboard from "@/hooks/useClipboard";

export default function TwoFactorSettings() {
  const { user, updateUser } = useAppAuth();
  const isEnabled = Boolean(user?.twoFactorEnabled);
  const [setupData, setSetupData] = useState(null);
  const [confirmCode, setConfirmCode] = useState("");
  const [backupCodes, setBackupCodes] = useState(null);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [disableCode, setDisableCode] = useState("");
  const [disableUseBackup, setDisableUseBackup] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { copied, copy } = useClipboard(2000);

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
    <div className="bg-white/95 p-6 sm:p-8 rounded-3xl border border-[#E6E0D5] shadow-xl space-y-6">
      {/* Header / Trigger Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div
            className={`size-12 rounded-2xl flex items-center justify-center font-bold shadow-xs shrink-0 ${
              isEnabled
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-blush/35 border border-[#E6E0D5] text-[#8B263E]"
            }`}
          >
            <Smartphone className="size-6" />
          </div>
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#1a1a1a]">
                Two-Factor Authentication (2FA)
              </h2>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                  isEnabled
                    ? "glass-badge-emerald"
                    : "glass-badge-blush"
                }`}
              >
                {isEnabled ? "ACTIVE 🛡️" : "DISABLED"}
              </span>
            </div>
            <p className="text-xs text-[#6B6560] leading-relaxed font-normal">
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
              className="rounded-full text-rose-700 hover:bg-rose-100 bg-rose-50 border border-rose-200 w-full sm:w-auto text-xs px-5 py-2.5 font-semibold transition-colors cursor-pointer"
            >
              Disable 2FA
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStartSetup}
              disabled={loading}
              className="glass-btn-primary w-full sm:w-auto text-xs px-5 py-2.5 gap-2 rounded-full cursor-pointer shadow-button hover:shadow-button-hover"
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
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#E6E0D5] shadow-2xl p-6 sm:p-7 space-y-5 my-auto max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 border-b border-[#E6E0D5] pb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-9 rounded-2xl bg-blush/35 border border-[#E6E0D5] flex items-center justify-center text-[#8B263E] shrink-0">
                  <ShieldCheck className="size-4" />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a1a] truncate">
                  Set Up 2FA Authenticator
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsSetupModalOpen(false);
                  setBackupCodes(null);
                  setConfirmCode("");
                }}
                className="p-1.5 rounded-xl bg-white text-[#6B6560] hover:text-[#1a1a1a] border border-[#E6E0D5] cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {backupCodes ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-1">
                  <p className="text-sm font-bold flex items-center gap-1.5 text-emerald-900">
                    <Check className="size-4 text-emerald-600" /> 2FA is now active!
                  </p>
                  <p className="text-xs text-emerald-800 leading-relaxed font-normal">
                    Save these one-time backup codes safely. They let you recover your vault if you lose your authenticator.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E6E0D5] grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-[#1a1a1a]">
                  {backupCodes.map((code, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-white border border-[#E6E0D5] text-center font-bold text-[#8B263E]"
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
                    className="glass-btn-secondary w-full sm:w-auto text-xs px-4 py-2.5 gap-1.5 rounded-full cursor-pointer"
                  >
                    {copied ? (
                      <Check className="size-3.5 text-emerald-600" />
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
                    className="glass-btn-primary w-full sm:w-auto px-5 py-2.5 text-xs rounded-full cursor-pointer shadow-button hover:shadow-button-hover"
                  >
                    I Have Saved These
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerifySetup} className="space-y-4">
                <p className="text-xs text-[#6B6560]">
                  1. Scan this QR code with Google Authenticator, Authy, or Microsoft Authenticator:
                </p>

                {setupData?.otpAuthUrl && (
                  <div className="flex justify-center p-4 bg-white rounded-2xl border border-[#E6E0D5] shadow-xs">
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
                    <p className="text-[0.68rem] text-[#6B6560] uppercase font-semibold">Manual Secret Key:</p>
                    <div className="p-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E6E0D5] flex items-center justify-between gap-2 text-xs font-mono">
                      <span className="truncate text-[#1a1a1a] font-bold">{setupData.secret}</span>
                      <button
                        type="button"
                        onClick={() => {
                          copy(setupData.secret);
                          toast.success("Secret copied!");
                        }}
                        className="glass-btn-secondary py-1 px-3 text-xs rounded-full cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-[#1a1a1a] block mb-1">
                    2. Enter the 6-digit TOTP verification code:
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={confirmCode}
                    onChange={(e) => setConfirmCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="glass-input text-center text-lg font-mono font-bold tracking-widest rounded-2xl"
                  />
                </div>

                {error && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3.5 py-2.5 rounded-2xl">
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSetupModalOpen(false)}
                    className="glass-btn-ghost text-xs px-4 py-2 rounded-full cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || confirmCode.length !== 6}
                    className="glass-btn-primary px-5 py-2.5 text-xs gap-1.5 rounded-full cursor-pointer shadow-button hover:shadow-button-hover"
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
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#E6E0D5] shadow-2xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-700">
                <AlertTriangle className="size-5" />
                <h3 className="text-base font-bold text-[#1a1a1a]">Disable 2FA</h3>
              </div>
              <button
                onClick={() => setIsDisableModalOpen(false)}
                className="p-1.5 rounded-xl bg-white text-[#6B6560] hover:text-[#1a1a1a] border border-[#E6E0D5] cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-xs text-[#6B6560] leading-relaxed font-normal">
              Enter a verification code or emergency backup code to confirm disabling two-factor authentication.
            </p>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3.5 py-2.5 rounded-2xl">
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
                  className="glass-input text-center text-sm font-mono font-bold rounded-2xl"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setDisableUseBackup(!disableUseBackup)}
                  className="text-xs text-[#8B263E] hover:underline cursor-pointer font-medium"
                >
                  {disableUseBackup ? "Use Authenticator Code" : "Use Backup Code"}
                </button>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDisableModalOpen(false)}
                  className="glass-btn-ghost text-xs px-4 py-2 rounded-full cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !disableCode.trim()}
                  className="rounded-full bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 text-xs font-semibold cursor-pointer shadow-xs"
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
