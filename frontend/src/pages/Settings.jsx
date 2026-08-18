import { useState } from "react";
import {
  Settings as SettingsIcon,
  Lock,
  Download,
  Bell,
  Check,
  Shield,
  Smartphone,
} from "lucide-react";

export default function Settings() {
  const [autoLockMinutes, setAutoLockMinutes] = useState("15");
  const [clipboardClearSeconds, setClipboardClearSeconds] = useState("30");
  const [enable2FA, setEnable2FA] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <SettingsIcon className="size-6 text-indigo-600" />
          Vault & Security Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure security timeouts, session rules, and export options.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Session & Auto-Lock Settings */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Lock className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Auto-Lock & Timeout</h2>
              <p className="text-[0.75rem] text-slate-500">Manage automatic vault locking when inactive</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Vault Auto-Lock Timer
              </label>
              <select
                value={autoLockMinutes}
                onChange={(e) => setAutoLockMinutes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="5">5 Minutes</option>
                <option value="15">15 Minutes (Recommended)</option>
                <option value="30">30 Minutes</option>
                <option value="60">1 Hour</option>
                <option value="0">Never (Unsafe)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Auto-Clear Clipboard
              </label>
              <select
                value={clipboardClearSeconds}
                onChange={(e) => setClipboardClearSeconds(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="15">15 Seconds</option>
                <option value="30">30 Seconds (Default)</option>
                <option value="60">60 Seconds</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Rules */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Shield className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Security Preferences</h2>
              <p className="text-[0.75rem] text-slate-500">Multi-factor authentication and session rules</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 cursor-pointer">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-800">Two-Factor Authentication (2FA)</p>
                <p className="text-[0.7rem] text-slate-500">Require TOTP or SMS verification on sign in</p>
              </div>
              <input
                type="checkbox"
                checked={enable2FA}
                onChange={(e) => setEnable2FA(e.target.checked)}
                className="size-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
            </label>
          </div>
        </div>

        {/* Export & Backup */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Download className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Export Encrypted Backup</h2>
              <p className="text-[0.75rem] text-slate-500">Download your vault in encrypted JSON format</p>
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-2"
          >
            <Download className="size-4 text-indigo-600" />
            Export Vault Data (.json)
          </button>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check className="size-4" /> Preferences saved!
            </span>
          )}
          <button
            type="submit"
            className="btn-soft-primary px-6 py-2.5 text-xs font-semibold shadow-sm"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
