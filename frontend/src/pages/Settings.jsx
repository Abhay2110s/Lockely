import { useState } from "react";
import {
  Settings as SettingsIcon,
  Shield,
  Smartphone,
  User,
  Palette,
  HardDrive,
  Sparkles,
} from "lucide-react";
import SecuritySettings from "@/components/settings/SecuritySettings";
import TwoFactorSettings from "@/components/settings/TwoFactorSettings";
import AccountSettings from "@/components/settings/AccountSettings";
import ProfileSettings from "@/components/settings/ProfileSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";

const TABS = [
  { id: "security", label: "Security & 2FA", icon: Shield, bg: "bg-[#fef08a]" },
  { id: "profile", label: "Profile", icon: User, bg: "bg-[#bae6fd]" },
  { id: "appearance", label: "Appearance", icon: Palette, bg: "bg-[#bbf7d0]" },
  { id: "account", label: "Account & Data", icon: HardDrive, bg: "bg-[#ddd6fe]" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("security");

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-comic">
      <div className="bg-[#fffef7] p-6 rounded-3xl border-3 border-[#18181b] shadow-[5px_5px_0px_#18181b]">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#fef08a] border-2 border-[#18181b] text-xs font-heading-comic font-bold text-slate-950 mb-2">
          <Sparkles className="size-3 text-amber-600 fill-amber-400" />
          Vault Preferences
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading-comic font-black text-slate-950 flex items-center gap-2">
          <SettingsIcon className="size-7 text-[#6366f1]" />
          Settings &amp; Security Shield
        </h1>
        <p className="text-xs text-slate-600 font-comic font-bold mt-1">
          Manage your two-factor authentication, master password, data exports, and theme preferences.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2.5 pb-2 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-heading-comic font-bold whitespace-nowrap transition-all border-2.5 border-[#18181b] ${
                isActive
                  ? `${tab.bg} text-slate-950 shadow-[3px_3px_0px_#18181b] -translate-y-0.5`
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="size-4 text-slate-950" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">
        {activeTab === "security" && (
          <div className="space-y-6">
            <TwoFactorSettings />
            <SecuritySettings />
          </div>
        )}

        {activeTab === "profile" && <ProfileSettings />}

        {activeTab === "appearance" && <AppearanceSettings />}

        {activeTab === "account" && <AccountSettings />}
      </div>
    </div>
  );
}
