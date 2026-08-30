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
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-pink-500/25 shadow-2xl bg-gradient-to-br from-[#3c0b1a]/90 via-[#581026]/80 to-[#7a1534]/70">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-badge-blush text-xs mb-3">
          <Sparkles className="size-3 text-[#f43f6e]" />
          <span>Vault Preferences</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3 tracking-tight">
          <SettingsIcon className="size-7 text-[#f43f6e]" />
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#ffe4e9]/80 mt-1">
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
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "glass-btn-primary text-white"
                  : "glass-btn-ghost text-[#fda4b8]"
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
