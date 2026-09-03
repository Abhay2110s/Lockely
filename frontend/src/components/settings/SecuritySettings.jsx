import { useState, useEffect } from "react";
import * as userService from "@/services/user.service";
import toast from "react-hot-toast";
import { Lock, Check, Loader2 } from "lucide-react";

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
      <div className="bg-white/95 p-8 rounded-3xl border border-[#E6E0D5] shadow-xl flex justify-center py-12">
        <Loader2 className="size-6 text-[#8B263E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white/95 p-6 sm:p-8 rounded-3xl border border-[#E6E0D5] shadow-xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-2xl bg-blush/35 border border-[#E6E0D5] text-[#8B263E] flex items-center justify-center font-bold">
          <Lock className="size-5" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#1a1a1a]">Session &amp; Auto-Lock</h2>
          <p className="text-xs text-[#6B6560]">Manage automatic vault locking and clipboard clearing</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#1a1a1a] block mb-1.5">
              Vault Auto-Lock Timer
            </label>
            <select
              value={autoLockMinutes}
              onChange={(e) => setAutoLockMinutes(Number(e.target.value))}
              className="glass-input text-xs bg-white text-[#1a1a1a] rounded-2xl"
            >
              <option value={5} className="bg-white text-[#1a1a1a]">5 Minutes</option>
              <option value={15} className="bg-white text-[#1a1a1a]">15 Minutes (Recommended)</option>
              <option value={30} className="bg-white text-[#1a1a1a]">30 Minutes</option>
              <option value={60} className="bg-white text-[#1a1a1a]">1 Hour</option>
              <option value={0} className="bg-white text-[#1a1a1a]">Never (Unsafe)</option>
            </select>
            <p className="text-[0.68rem] text-[#6B6560] mt-1">Locks encryption keys in memory after inactivity.</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1a1a1a] block mb-1.5">
              Auto-Clear Clipboard
            </label>
            <select
              value={clipboardClearSeconds}
              onChange={(e) => setClipboardClearSeconds(Number(e.target.value))}
              className="glass-input text-xs bg-white text-[#1a1a1a] rounded-2xl"
            >
              <option value={15} className="bg-white text-[#1a1a1a]">15 Seconds</option>
              <option value={30} className="bg-white text-[#1a1a1a]">30 Seconds (Default)</option>
              <option value={60} className="bg-white text-[#1a1a1a]">60 Seconds</option>
            </select>
            <p className="text-[0.68rem] text-[#6B6560] mt-1">Clears copied passwords to prevent paste hijacking.</p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="glass-btn-primary px-6 py-2.5 text-xs font-semibold gap-2 rounded-full cursor-pointer shadow-button hover:shadow-button-hover"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : savedSuccess ? (
              <>
                <Check className="size-4" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Preferences</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
