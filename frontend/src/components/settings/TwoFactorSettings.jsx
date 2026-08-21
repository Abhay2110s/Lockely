import { useState, useEffect } from "react";
import { useAppAuth } from "@/context/AuthContext";
import * as authService from "@/services/auth.service";
import toast from "react-hot-toast";
import {
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  Key,
  Copy,
  Check,
  Loader2,
  X,
  AlertTriangle,
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
      toast.success("2FA enabled successfully!");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid verification code. Please try again.");
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
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-xl flex items-center justify-center font-bold ${
            isEnabled ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
          }`}>
            <Smartphone className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Two-Factor Authentication (2FA)</h2>
              <span className={`px-2 py-0.5 rounded-full text-[0.65rem] font-bold ${
                isEnabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
              }`}>
                {isEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            <p className="text-[0.75rem] text-slate-500">
              Add a second layer of security by requiring a TOTP authenticator code at login
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
            className="px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition-colors shrink-0"
          >
            Disable 2FA
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStartSetup}
            disabled={loading}
            className="btn-soft-primary px-4 py-2 text-xs font-semibold shadow-xs shrink-0 inline-flex items-center gap-2"
          >
            {loading ? <Loader2 className="size-3.5 animate-spin" /> : <ShieldCheck className="size-3.5" />}
            Enable 2FA
          </button>
        )}
      </div>

      {/* Setup Modal */}
      {isSetupModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <ShieldCheck className="size-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Set Up Two-Factor Authentication</h3>
              </div>
              <button
                onClick={() => {
                  setIsSetupModalOpen(false);
                  setBackupCodes(null);
                  setConfirmCode("");
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="size-5" />
              </button>
            </div>

            {backupCodes ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Check className="size-4 text-emerald-600" /> 2FA is now active!
                  </p>
                  <p className="text-[0.72rem]">
                    Save these one-time backup codes in a safe place. If you lose access to your authenticator app, each code can be used once to sign in.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-2 font-mono text-xs text-slate-800">
                  {backupCodes.map((code, idx) => (
                    <div key={idx} className="p-1.5 bg-white rounded-lg border border-slate-200 text-center font-bold">
                      {code}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => copy(backupCodes.join("\n"))}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                    {copied ? "Copied All!" : "Copy Codes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSetupModalOpen(false);
                      setBackupCodes(null);
                    }}
                    className="btn-soft-primary px-5 py-2 text-xs font-semibold"
                  >
                    I Have Saved These
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerifySetup} className="space-y-5">
                <p className="text-xs text-slate-600">
                  1. Scan this QR code with Google Authenticator, Authy, or 1Password:
                </p>

                {setupData?.otpAuthUrl && (
                  <div className="flex justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        setupData.otpAuthUrl
                      )}`}
                      alt="2FA QR Code"
                      className="size-44 rounded-lg bg-white p-2 shadow-xs"
                    />
                  </div>
                )}

                <div>
                  <p className="text-[0.7rem] text-slate-400 uppercase font-semibold mb-1">
                    Or enter this secret key manually:
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-mono text-xs text-slate-800">
                    <span className="truncate">{setupData?.secret}</span>
                    <button
                      type="button"
                      onClick={() => copy(setupData?.secret)}
                      className="p-1 rounded-lg text-slate-400 hover:text-indigo-600"
                    >
                      {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
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
                    className="w-full text-center tracking-widest font-mono text-lg py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium text-center">
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSetupModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || confirmCode.length !== 6}
                    className="btn-soft-primary px-5 py-2 text-xs font-semibold shadow-sm inline-flex items-center gap-2 disabled:opacity-60"
                  >
                    {loading && <Loader2 className="size-3.5 animate-spin" />}
                    Confirm &amp; Enable
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Disable Modal */}
      {isDisableModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="size-5" />
                <h3 className="text-base font-bold text-slate-900">Disable 2FA</h3>
              </div>
              <button
                onClick={() => setIsDisableModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              To turn off two-factor authentication, confirm with a 6-digit TOTP code or a backup code.
            </p>

            <form onSubmit={handleDisable2FA} className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {disableUseBackup ? "Backup Code" : "Authenticator Code"}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setDisableUseBackup(!disableUseBackup);
                      setDisableCode("");
                    }}
                    className="text-[0.68rem] text-indigo-600 hover:underline font-semibold"
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
                  className="w-full text-center font-mono py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium text-center">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDisableModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !disableCode}
                  className="px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-sm inline-flex items-center gap-2 disabled:opacity-60"
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
