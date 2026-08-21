import { useState, useEffect } from "react";
import * as userService from "@/services/user.service";
import toast from "react-hot-toast";
import { Lock, Shield, Check, Loader2 } from "lucide-react";

export default function SecuritySettings() {
  const [autoLockMinutes, setAutoLockMinutes] = useState(15);
  const [clipboardClearSeconds, setClipboardClearSeconds] = useState(30);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    userService
      .getSecurityPreferences()
      .then((res) => {
        const prefs = res?.data || {};
        if (prefs.autoLockMinutes !== undefined) setAutoLockMinutes(prefs.autoLockMinutes);
        if (prefs.clipboardClearSeconds !== undefined) setClipboardClearSeconds(prefs.clipboardClearSeconds);
      })
      .catch((err) => {
        console.warn("Failed to load security preferences:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await userService.updateSecurityPreferences({
        autoLockMinutes: Number(autoLockMinutes),
        clipboardClearSeconds: Number(clipboardClearSeconds),
      });
      setSavedSuccess(true);
      toast.success("Security preferences saved!");
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save security preferences.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex justify-center py-12">
        <Loader2 className="size-6 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
          <Lock className="size-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900">Session & Auto-Lock</h2>
          <p className="text-[0.75rem] text-slate-500">Manage automatic vault locking and clipboard clearing</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Vault Auto-Lock Timer
            </label>
            <select
              value={autoLockMinutes}
              onChange={(e) => setAutoLockMinutes(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value={5}>5 Minutes</option>
              <option value={15}>15 Minutes (Recommended)</option>
              <option value={30}>30 Minutes</option>
              <option value={60}>1 Hour</option>
              <option value={0}>Never (Unsafe)</option>
            </select>
            <p className="text-[0.68rem] text-slate-400 mt-1">Locks encryption keys in memory after inactivity.</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Auto-Clear Clipboard
            </label>
            <select
              value={clipboardClearSeconds}
              onChange={(e) => setClipboardClearSeconds(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value={15}>15 Seconds</option>
              <option value={30}>30 Seconds (Default)</option>
              <option value={60}>60 Seconds</option>
            </select>
            <p className="text-[0.68rem] text-slate-400 mt-1">Clears copied passwords to prevent paste hijacking.</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check className="size-4" /> Saved!
            </span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="btn-soft-primary px-5 py-2.5 text-xs font-semibold shadow-sm inline-flex items-center gap-2 disabled:opacity-60"
          >
            {saving && <Loader2 className="size-3.5 animate-spin" />}
            Save Session Rules
          </button>
        </div>
      </form>
    </div>
  );
}
