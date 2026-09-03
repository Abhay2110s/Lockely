import { useState } from "react";
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
  const [prevUser, setPrevUser] = useState(user);

  if (user && user !== prevUser) {
    setPrevUser(user);
    setDisplayName(user.displayName || user.name || "");
    setBio(user.bio || "");
    setPreferredLanguage(user.preferredLanguage || "en");
  }

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
    <div className="bg-white/95 p-6 sm:p-8 rounded-3xl border border-[#E6E0D5] shadow-xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-2xl bg-blush/35 border border-[#E6E0D5] text-[#8B263E] flex items-center justify-center font-bold">
          <User className="size-5" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#1a1a1a]">Personal Information</h2>
          <p className="text-xs text-[#6B6560]">Update your profile details and preferred language</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-[#1a1a1a] block mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#6B6560]" />
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="glass-input pl-10 pr-4 py-2.5 text-xs text-[#6B6560] bg-[#FAF8F3] cursor-not-allowed font-mono rounded-2xl"
            />
          </div>
          <p className="text-[0.68rem] text-[#6B6560] mt-1">Email is tied to your cryptographic key derivation and cannot be changed.</p>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#1a1a1a] block mb-1">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name or handle"
            className="glass-input text-xs rounded-2xl"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#1a1a1a] block mb-1">Bio / Notes</label>
          <textarea
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A short note about yourself..."
            className="glass-input text-xs rounded-2xl"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#1a1a1a] block mb-1">Preferred Language</label>
          <div className="relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#6B6560]" />
            <select
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className="glass-input pl-10 pr-4 py-2.5 text-xs bg-white text-[#1a1a1a] rounded-2xl"
            >
              <option value="en" className="bg-white text-[#1a1a1a]">English (Default)</option>
              <option value="es" className="bg-white text-[#1a1a1a]">Español</option>
              <option value="fr" className="bg-white text-[#1a1a1a]">Français</option>
              <option value="de" className="bg-white text-[#1a1a1a]">Deutsch</option>
              <option value="ja" className="bg-white text-[#1a1a1a]">日本語</option>
            </select>
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
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
