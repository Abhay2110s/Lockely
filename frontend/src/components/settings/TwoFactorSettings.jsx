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
    <div className="bg-[#fffef7] p-6 sm:p-8 rounded-3xl border-3 border-[#18181b] shadow-[5px_5px_0px_#18181b] space-y-6 font-comic">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className={`size-12 rounded-2xl border-2 border-[#18181b] flex items-center justify-center font-bold shadow-[2px_2px_0px_#18181b] ${
            isEnabled ? "bg-[#bbf7d0] text-emerald-950" : "bg-[#fef08a] text-amber-950"
          }`}>
            <Smartphone className="size-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-heading-comic font-black text-slate-950">Two-Factor Authentication (2FA)</h2>
              <span className={`px-2.5 py-0.5 rounded-full border border-[#18181b] text-xs font-heading-comic font-bold ${
                isEnabled ? "bg-[#bbf7d0] text-emerald-950" : "bg-slate-200 text-slate-700"
              }`}>
                {isEnabled ? "ACTIVE 🛡️" : "DISABLED"}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-comic font-bold">
              Require a 6-digit TOTP authenticator code whenever you unlock your account.
            </p>
          </div>
        </div>

        {isEnabled ? (
          <button
            type="button"
            onClick={() => {
              setError("");
              setIsDisableModalOpen(true);
            }}
            className="btn-comic btn-comic-coral text-xs px-4 py-2 shrink-0"
          >
            Disable 2FA
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStartSetup}
            disabled={loading}
            className="btn-comic btn-comic-yellow text-xs px-4 py-2 shrink-0 gap-1.5"
          >
            {loading ? <Loader2 className="size-3.5 animate-spin" /> : <ShieldCheck className="size-3.5" />}
            Enable 2FA ⚡
          </button>
        )}
      </div>

      {/* Setup Modal */}
      {isSetupModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#fffef7] rounded-3xl border-3 border-[#18181b] shadow-[8px_8px_0px_#18181b] p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-xl bg-[#fef08a] border-2 border-[#18181b] flex items-center justify-center shadow-[1.5px_1.5px_0px_#18181b]">
                  <ShieldCheck className="size-5 text-slate-950" />
                </div>
                <h3 className="text-lg font-heading-comic font-black text-slate-950">Set Up 2FA Authenticator</h3>
              </div>
              <button
                onClick={() => {
                  setIsSetupModalOpen(false);
                  setBackupCodes(null);
                  setConfirmCode("");
                }}
                className="p-1.5 rounded-xl border-2 border-[#18181b] hover:bg-slate-200"
              >
                <X className="size-4" />
              </button>
            </div>

            {backupCodes ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#bbf7d0] border-2 border-[#18181b] text-emerald-950 text-xs space-y-1">
                  <p className="font-heading-comic font-black text-sm flex items-center gap-1.5">
                    <Check className="size-4 text-emerald-800" /> 2FA is now super active!
                  </p>
                  <p className="font-comic font-bold text-xs">
                    Save these one-time backup codes safely. They let you recover your vault if you ever lose your phone.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-[#18181b] grid grid-cols-2 gap-2 font-mono text-xs text-slate-950">
                  {backupCodes.map((code, idx) => (
                    <div key={idx} className="p-2 bg-[#fef08a] rounded-xl border border-[#18181b] text-center font-black shadow-[1px_1px_0px_#18181b]">
                      {code}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      copy(backupCodes.join("\n"));
                      toast.success("All backup codes copied!");
                    }}
                    className="btn-comic btn-comic-white text-xs px-3.5 py-2 gap-1.5"
                  >
                    {copied ? <Check className="size-3.5 text-emerald-700" /> : <Copy className="size-3.5" />}
                    {copied ? "Copied All!" : "Copy Codes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSetupModalOpen(false);
                      setBackupCodes(null);
                    }}
                    className="btn-comic btn-comic-primary px-5 py-2 text-xs"
                  >
                    I Have Saved These
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerifySetup} className="space-y-4">
                <p className="text-xs font-comic font-bold text-slate-700">
                  1. Scan this QR code with Google Authenticator, Authy, or Ente:
                </p>

                {setupData?.otpAuthUrl && (
                  <div className="flex justify-center p-4 bg-white rounded-2xl border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b]">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        setupData.otpAuthUrl
                      )}`}
                      alt="2FA QR Code"
                      className="size-44 rounded-xl border border-[#18181b] p-2 bg-white"
                    />
                  </div>
                )}

                <div>
                  <p className="text-[0.7rem] text-slate-600 uppercase font-heading-comic font-bold mb-1">
                    Or enter this secret key manually:
                  </p>
                  <div className="p-2.5 rounded-2xl bg-white border-2 border-[#18181b] flex items-center justify-between font-mono text-xs font-black text-slate-950 shadow-[1.5px_1.5px_0px_#18181b]">
                    <span className="truncate">{setupData?.secret}</span>
                    <button
                      type="button"
                      onClick={() => {
                        copy(setupData?.secret);
                        toast.success("Secret copied!");
                      }}
                      className="p-1 rounded-lg bg-[#fef08a] border border-[#18181b] text-slate-950"
                    >
                      {copied ? <Check className="size-3.5 text-emerald-700" /> : <Copy className="size-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-heading-comic font-bold text-slate-900 block">
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
                    className="comic-input w-full text-center tracking-widest font-heading-comic font-black text-xl py-2.5 text-slate-950"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-2xl bg-[#fda4af] border-2 border-[#18181b] text-xs text-slate-950 font-bold text-center">
                    ⚠️ {error}
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSetupModalOpen(false)}
                    className="btn-comic btn-comic-white px-4 py-2 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || confirmCode.length !== 6}
                    className="btn-comic btn-comic-mint px-5 py-2 text-xs gap-2"
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

      {/* Disable Modal */}
      {isDisableModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#fffef7] rounded-3xl border-3 border-[#18181b] shadow-[8px_8px_0px_#18181b] p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-700">
                <AlertTriangle className="size-5" />
                <h3 className="text-lg font-heading-comic font-black text-slate-950">Disable 2FA</h3>
              </div>
              <button
                onClick={() => setIsDisableModalOpen(false)}
                className="p-1.5 rounded-xl border-2 border-[#18181b] hover:bg-slate-200"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-xs font-comic font-bold text-slate-700">
              To turn off two-factor authentication, confirm with your 6-digit TOTP code or a backup code.
            </p>

            <form onSubmit={handleDisable2FA} className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-heading-comic font-bold text-slate-900">
                    {disableUseBackup ? "Backup Code" : "Authenticator Code"}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setDisableUseBackup(!disableUseBackup);
                      setDisableCode("");
                    }}
                    className="text-xs text-indigo-700 hover:underline font-bold"
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
                  className="comic-input w-full text-center font-mono font-black py-2.5 text-xs text-slate-950"
                />
              </div>

              {error && (
                <div className="p-3 rounded-2xl bg-[#fda4af] border-2 border-[#18181b] text-xs text-slate-950 font-bold text-center">
                  ⚠️ {error}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDisableModalOpen(false)}
                  className="btn-comic btn-comic-white px-4 py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !disableCode}
                  className="btn-comic btn-comic-coral px-5 py-2 text-xs gap-2"
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
