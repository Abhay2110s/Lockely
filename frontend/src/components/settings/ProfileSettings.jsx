import { useState, useEffect } from "react";
import { useAppAuth } from "@/context/AuthContext";
import * as userService from "@/services/user.service";
import toast from "react-hot-toast";
import { User, Mail, Globe, Check, Loader2 } from "lucide-react";

export default function ProfileSettings() {
  const { user, updateUser } = useAppAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [preferredLanguage, setPreferredLanguage] = useState(user?.preferredLanguage || "en");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || user.name || "");
      setBio(user.bio || "");
      setPreferredLanguage(user.preferredLanguage || "en");
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await userService.updateUserProfile({
        displayName: displayName.trim(),
        bio: bio.trim(),
        preferredLanguage,
      });
      const updated = res?.data || { displayName, bio, preferredLanguage };
      updateUser(updated);
      setSavedSuccess(true);
      toast.success("Profile updated!");
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-pink-500/20 shadow-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-gradient-to-br from-[#7a1534] to-[#be2656] text-white flex items-center justify-center font-bold">
          <User className="size-5" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white">Personal Information</h2>
          <p className="text-xs text-[#fda4b8]/70">Update your profile details and preferred language</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-[#fda4b8] block mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#fda4b8]/50" />
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="glass-input pl-10 pr-4 py-2.5 text-xs text-[#fda4b8]/60 bg-black/40 cursor-not-allowed font-mono-code"
            />
          </div>
          <p className="text-[0.68rem] text-[#fda4b8]/50 mt-1">Email is tied to your cryptographic key derivation and cannot be changed.</p>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#fda4b8] block mb-1">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name or handle"
            className="glass-input text-xs"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#fda4b8] block mb-1">Bio / Notes</label>
          <textarea
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A short note about yourself..."
            className="glass-input text-xs"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#fda4b8] block mb-1">Preferred Language</label>
          <div className="relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#fda4b8]/50" />
            <select
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className="glass-input pl-10 pr-4 py-2.5 text-xs bg-[#1f050d]"
            >
              <option value="en" className="bg-[#1f050d] text-white">English (US)</option>
              <option value="es" className="bg-[#1f050d] text-white">Español</option>
              <option value="fr" className="bg-[#1f050d] text-white">Français</option>
              <option value="de" className="bg-[#1f050d] text-white">Deutsch</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <Check className="size-4" /> Saved!
            </span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="glass-btn-primary px-5 py-2.5 text-xs font-semibold shadow-sm inline-flex items-center gap-2 disabled:opacity-60"
          >
            {saving && <Loader2 className="size-3.5 animate-spin" />}
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
