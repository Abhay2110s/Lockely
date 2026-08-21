import { useState } from "react";
import {
  Settings as SettingsIcon,
  Shield,
  Smartphone,
  User,
  Palette,
  HardDrive,
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
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <SettingsIcon className="size-6 text-indigo-600" />
          Settings &amp; Security
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your vault security, two-factor authentication, account, and preferences.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200/60"
              }`}
            >
              <Icon className="size-4" />
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
