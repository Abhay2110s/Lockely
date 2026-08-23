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
    <div className="bg-white p-5 sm:p-7 lg:p-8 border-[3px] border-[#191510] shadow-[5px_5px_0px_#191510] space-y-6">
      {/* Header / Trigger Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div
            className={`size-11 sm:size-12 border-2 border-[#191510] flex items-center justify-center font-bold shadow-[2px_2px_0px_#191510] shrink-0 ${
              isEnabled ? "bg-[#86efac] text-emerald-950" : "bg-[#ffe066] text-[#191510]"
            }`}
          >
            <Smartphone className="size-5 sm:size-6 text-[#191510]" />
          </div>
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="ca-display text-lg sm:text-xl text-[#191510]">
                Two-Factor Authentication (2FA)
              </h2>
              <span
                className={`px-2.5 py-0.5 border border-[#191510] ca-mono text-[0.6rem] shrink-0 ${
                  isEnabled
                    ? "bg-[#86efac] text-emerald-950 font-bold"
                    : "bg-slate-100 text-[#191510]/60"
                }`}
              >
                {isEnabled ? "ACTIVE 🛡️" : "DISABLED"}
              </span>
            </div>
            <p className="ca-mono text-[0.68rem] text-[#191510]/60 leading-relaxed">
              Require a 6-digit TOTP authenticator code whenever you unlock your account.
            </p>
          </div>
        </div>

        {/* Action Button - Responsive full width on mobile, auto on tablet/desktop */}
        <div className="w-full sm:w-auto shrink-0">
          {isEnabled ? (
            <button
              type="button"
              onClick={() => {
                setError("");
                setIsDisableModalOpen(true);
              }}
              className="btn-comic btn-comic-coral w-full sm:w-auto text-xs px-5 py-2.5"
            >
              Disable 2FA
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStartSetup}
              disabled={loading}
              className="btn-comic btn-comic-yellow w-full sm:w-auto text-xs px-5 py-2.5 gap-2"
            >
              {loading ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <ShieldCheck className="size-4" />
              )}
              Enable 2FA ⚡
            </button>
          )}
        </div>
      </div>

      {/* ================================================================ */}
      {/* SETUP MODAL                                                       */}
      {/* ================================================================ */}
      {isSetupModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#191510]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-white border-[3px] border-[#191510] shadow-[8px_8px_0px_#191510] p-5 sm:p-7 space-y-5 my-auto max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 border-b-2 border-[#191510] pb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-9 bg-[#ffe066] border-2 border-[#191510] flex items-center justify-center shadow-[1.5px_1.5px_0px_#191510] shrink-0">
                  <ShieldCheck className="size-4 text-[#191510]" />
                </div>
                <h3 className="ca-display text-lg text-[#191510] truncate">
                  Set Up 2FA Authenticator
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsSetupModalOpen(false);
                  setBackupCodes(null);
                  setConfirmCode("");
                }}
                className="p-1.5 border-2 border-[#191510] hover:bg-[#191510] hover:text-[#ffe066] transition-colors shrink-0"
              >
                <X className="size-4" />
              </button>
            </div>

            {backupCodes ? (
              <div className="space-y-4">
                <div className="p-3.5 bg-[#86efac] border-2 border-[#191510] text-emerald-950 text-xs space-y-1">
                  <p className="ca-display text-sm flex items-center gap-1.5">
                    <Check className="size-4 text-emerald-800" /> 2FA is now super active!
                  </p>
                  <p className="ca-mono text-[0.65rem] leading-relaxed">
                    Save these one-time backup codes safely. They let you recover your vault if you ever lose your phone.
                  </p>
                </div>

                <div className="p-3.5 bg-[#faf6ea] border-2 border-[#191510] grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-[#191510]">
                  {backupCodes.map((code, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-[#ffe066] border border-[#191510] text-center font-black shadow-[1px_1px_0px_#191510]"
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
                    className="btn-comic btn-comic-white w-full sm:w-auto text-xs px-4 py-2.5 gap-1.5"
                  >
                    {copied ? (
                      <Check className="size-3.5 text-emerald-700" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    {copied ? "Copied All!" : "Copy Codes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSetupModalOpen(false);
                      setBackupCodes(null);
                    }}
                    className="btn-comic btn-comic-primary w-full sm:w-auto px-5 py-2.5 text-xs"
                  >
                    I Have Saved These
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerifySetup} className="space-y-4">
                <p className="ca-mono text-[0.68rem] text-[#191510]/80">
                  1. Scan this QR code with Google Authenticator, Authy, or Ente:
                </p>

                {setupData?.otpAuthUrl && (
                  <div className="flex justify-center p-3 sm:p-4 bg-white border-2 border-[#191510] shadow-[3px_3px_0px_#191510]">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        setupData.otpAuthUrl
                      )}`}
                      alt="2FA QR Code"
                      className="size-36 sm:size-44 border border-[#191510] p-2 bg-white object-contain"
                    />
                  </div>
                )}

                <div>
                  <p className="ca-mono text-[0.62rem] text-[#191510]/60 uppercase mb-1">
                    Or enter this secret key manually:
                  </p>
                  <div className="p-2.5 bg-[#faf6ea] border-2 border-[#191510] flex items-center justify-between font-mono text-xs font-black text-[#191510] shadow-[1.5px_1.5px_0px_#191510] gap-2">
                    <span className="break-all text-[0.72rem] select-all">{setupData?.secret}</span>
                    <button
                      type="button"
                      onClick={() => {
                        copy(setupData?.secret);
                        toast.success("Secret copied!");
                      }}
                      className="p-1.5 bg-[#ffe066] border border-[#191510] text-[#191510] shrink-0 hover:bg-[#191510] hover:text-[#ffe066] transition-colors"
                      title="Copy Secret"
                    >
                      {copied ? (
                        <Check className="size-3.5 text-emerald-700" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="ca-mono text-[0.68rem] text-[#191510] block font-bold">
                    2. Enter the 6-digit code shown in your app:
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={confirmCode}
                    onChange={(e) => setConfirmCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="comic-input w-full text-center tracking-widest ca-display text-2xl py-2.5 text-[#191510]"
                  />
                </div>

                {error && (
                  <div className="p-2.5 bg-[#fda4af] border-2 border-[#191510] ca-mono text-[0.68rem] text-[#191510] text-center">
                    ⚠️ {error}
                  </div>
                )}

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSetupModalOpen(false)}
                    className="btn-comic btn-comic-white w-full sm:w-auto px-4 py-2.5 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || confirmCode.length !== 6}
                    className="btn-comic btn-comic-mint w-full sm:w-auto px-5 py-2.5 text-xs gap-2"
                  >
                    {loading && <Loader2 className="size-3.5 animate-spin" />}
                    Confirm &amp; Enable ➔
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* DISABLE MODAL                                                     */}
      {/* ================================================================ */}
      {isDisableModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#191510]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-sm bg-white border-[3px] border-[#191510] shadow-[8px_8px_0px_#191510] p-5 sm:p-7 space-y-4 my-auto">
            <div className="flex items-center justify-between border-b-2 border-[#191510] pb-3">
              <div className="flex items-center gap-2 text-rose-700">
                <AlertTriangle className="size-5" />
                <h3 className="ca-display text-lg text-[#191510]">Disable 2FA</h3>
              </div>
              <button
                onClick={() => setIsDisableModalOpen(false)}
                className="p-1.5 border-2 border-[#191510] hover:bg-[#191510] hover:text-[#ffe066] transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="ca-mono text-[0.68rem] text-[#191510]/70 leading-relaxed">
              To turn off two-factor authentication, confirm with your 6-digit TOTP code or a backup code.
            </p>

            <form onSubmit={handleDisable2FA} className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="ca-mono text-[0.65rem] text-[#191510] font-bold">
                    {disableUseBackup ? "Backup Code" : "Authenticator Code"}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setDisableUseBackup(!disableUseBackup);
                      setDisableCode("");
                    }}
                    className="ca-mono text-[0.62rem] text-indigo-700 hover:underline font-bold"
                  >
                    {disableUseBackup ? "Use TOTP Code" : "Use Backup Code"}
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={disableCode}
                  onChange={(e) => setDisableCode(e.target.value)}
                  placeholder={disableUseBackup ? "XXXX-XXXX" : "123456"}
                  className="comic-input w-full text-center font-mono font-black py-2.5 text-xs text-[#191510]"
                />
              </div>

              {error && (
                <div className="p-2.5 bg-[#fda4af] border-2 border-[#191510] ca-mono text-[0.68rem] text-[#191510] text-center">
                  ⚠️ {error}
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDisableModalOpen(false)}
                  className="btn-comic btn-comic-white w-full sm:w-auto px-4 py-2.5 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !disableCode}
                  className="btn-comic btn-comic-coral w-full sm:w-auto px-5 py-2.5 text-xs gap-2"
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
