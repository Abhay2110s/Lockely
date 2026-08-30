import { useState } from "react";
import { useAppAuth } from "@/context/AuthContext";
import * as userService from "@/services/user.service";
import toast from "react-hot-toast";
import { User, Mail, Shield, Key, Trash2, Download, Loader2, CheckCircle2, Sparkles } from "lucide-react";

export default function Profile() {
  const { user, logout, displayName, initials } = useAppAuth();
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await userService.exportVault();
      toast.success("Vault exported successfully! 📦");
    } catch {
      toast.error("Failed to export vault.");
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you absolutely sure? This will permanently delete your account and all vault data.")) return;
    setDeleting(true);
    try {
      await userService.deleteAccount();
      toast.success("Account deleted.");
      logout();
    } catch {
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 py-2">
      {/* Profile Card */}
      <div className="glass-panel rounded-3xl border border-pink-500/20 shadow-2xl p-6 sm:p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="size-18 rounded-2xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] text-white flex items-center justify-center font-bold text-3xl border border-white/30 shadow-lg shadow-[#be2656]/30">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{displayName}</h1>
            <p className="text-xs font-mono-code text-[#fda4b8] mt-0.5">{user?.email}</p>
            <span className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full glass-badge-emerald text-xs font-semibold">
              <CheckCircle2 className="size-3.5 text-emerald-400" /> Active Zero-Knowledge Vault
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl glass-card-subtle flex items-center gap-3.5 border border-pink-500/15">
            <div className="size-10 rounded-xl bg-gradient-to-br from-[#7a1534] to-[#be2656] text-[#fda4b8] flex items-center justify-center shrink-0">
              <User className="size-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-mono-code uppercase font-semibold text-[#fda4b8]/70">Name</p>
              <p className="text-sm font-bold text-white truncate">{user?.name || "—"}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card-subtle flex items-center gap-3.5 border border-pink-500/15">
            <div className="size-10 rounded-xl bg-gradient-to-br from-[#7a1534] to-[#be2656] text-[#fda4b8] flex items-center justify-center shrink-0">
              <Mail className="size-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-mono-code uppercase font-semibold text-[#fda4b8]/70">Email</p>
              <p className="text-xs font-mono-code text-white truncate font-medium">{user?.email || "—"}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card-subtle flex items-center gap-3.5 border border-pink-500/15">
            <div className="size-10 rounded-xl bg-gradient-to-br from-[#7a1534] to-[#be2656] text-[#fda4b8] flex items-center justify-center shrink-0">
              <Shield className="size-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-mono-code uppercase font-semibold text-[#fda4b8]/70">Auth Method</p>
              <p className="text-xs font-semibold text-white">Email + Client Master Key</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card-subtle flex items-center gap-3.5 border border-pink-500/15">
            <div className="size-10 rounded-xl bg-gradient-to-br from-[#7a1534] to-[#be2656] text-[#fda4b8] flex items-center justify-center shrink-0">
              <Key className="size-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-mono-code uppercase font-semibold text-[#fda4b8]/70">Cipher</p>
              <p className="text-xs font-semibold text-white">AES-256-GCM (Client-side)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="glass-panel rounded-3xl border border-pink-500/20 shadow-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-white">Vault Actions</h2>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="w-full flex items-center gap-4 p-4 rounded-2xl glass-card-interactive border border-pink-500/15 text-left disabled:opacity-60 cursor-pointer"
        >
          {exporting ? <Loader2 className="size-6 text-[#f43f6e] animate-spin shrink-0" /> : <Download className="size-6 text-[#f43f6e] shrink-0" />}
          <div>
            <p className="text-sm font-bold text-white">Export Vault Data</p>
            <p className="text-xs text-[#fda4b8]/80 mt-0.5">Download an encrypted backup file of all your vault credentials</p>
          </div>
        </button>

        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="w-full flex items-center gap-4 p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 hover:bg-rose-950/50 transition-all text-left disabled:opacity-60 cursor-pointer"
        >
          {deleting ? <Loader2 className="size-6 text-rose-400 animate-spin shrink-0" /> : <Trash2 className="size-6 text-rose-400 shrink-0" />}
          <div>
            <p className="text-sm font-bold text-rose-200">Delete Entire Account</p>
            <p className="text-xs text-rose-300/80 mt-0.5">Permanently wipe your account and all zero-knowledge keys</p>
          </div>
        </button>
      </div>
    </div>
  );
}
