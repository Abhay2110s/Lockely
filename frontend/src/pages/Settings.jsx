import { useState } from "react";
import {
  Settings as SettingsIcon,
  Shield,
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
  { id: "security", label: "Security & 2FA", icon: Shield },
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "account", label: "Account & Data", icon: HardDrive },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("security");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="rounded-3xl p-6 sm:p-8 border border-[#E6E0D5] shadow-lg bg-gradient-to-br from-white via-white to-blush/35">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blush/35 border border-[#E6E0D5] text-xs font-semibold text-[#8B263E] mb-2">
          <Sparkles className="size-3.5 text-[#8B263E]" />
          <span>Vault Preferences</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a] flex items-center gap-3 tracking-tight">
          <SettingsIcon className="size-7 text-[#8B263E]" />
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6560] mt-1 font-normal">
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer border ${
                isActive
                  ? "bg-[#8B263E] text-white border-[#8B263E] shadow-button"
                  : "bg-white text-[#6B6560] border-[#E6E0D5] hover:text-[#8B263E] hover:bg-blush/20"
              }`}
            >
              <Icon className="size-3.5 sm:size-4 shrink-0" />
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
