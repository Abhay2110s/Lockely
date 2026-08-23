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
      <div className="bg-white border-[3px] border-[#191510] p-6 shadow-[5px_5px_0px_#191510]">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffe066] border-2 border-[#191510] ca-mono text-[0.6rem] text-[#191510] mb-3">
          <Sparkles className="size-3 text-[#191510]" />
          Vault Preferences
        </div>
        <h1 className="ca-display text-3xl sm:text-4xl text-[#191510] flex items-center gap-3">
          <SettingsIcon className="size-7 text-[#191510]" />
          Settings
        </h1>
        <p className="ca-mono text-[0.65rem] text-[#191510]/50 mt-2">
          Manage two-factor authentication, master password, data exports, and theme preferences.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 pb-2 overflow-x-auto [scrollbar-width:none] -mx-1 px-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              title={tab.label}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 ca-mono text-[0.62rem] sm:text-[0.68rem] whitespace-nowrap transition-all border-2 border-[#191510] shrink-0 ${
                isActive
                  ? `${tab.bg} text-[#191510] shadow-[3px_3px_0px_#191510] -translate-y-0.5 font-bold`
                  : "bg-white text-[#191510]/60 hover:text-[#191510] hover:bg-slate-50"
              }`}
            >
              <Icon className="size-3.5 sm:size-4 text-[#191510] shrink-0" />
              <span>{tab.label}</span>
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
