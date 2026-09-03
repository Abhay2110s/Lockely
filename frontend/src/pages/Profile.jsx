import { useState } from "react";
import { useAppAuth } from "@/context/AuthContext";
import * as userService from "@/services/user.service";
import toast from "react-hot-toast";
import { User, Mail, Shield, Key, Trash2, Download, Loader2, CheckCircle2 } from "lucide-react";

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
      <div className="bg-white/95 rounded-3xl border border-[#E6E0D5] shadow-xl p-6 sm:p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="size-20 rounded-3xl bg-blush/40 text-[#8B263E] flex items-center justify-center font-extrabold text-3xl border border-[#E6E0D5] shadow-xs">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] tracking-tight">{displayName}</h1>
            <p className="text-xs font-mono text-[#6B6560] mt-0.5">{user?.email}</p>
            <span className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full glass-badge-emerald text-xs font-semibold">
              <CheckCircle2 className="size-3.5 text-emerald-600" /> Active Zero-Knowledge Vault
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#FDFBF7] flex items-center gap-3.5 border border-[#E6E0D5]">
            <div className="size-10 rounded-2xl bg-blush/35 border border-[#E6E0D5] text-[#8B263E] flex items-center justify-center shrink-0">
              <User className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.68rem] uppercase font-bold text-[#6B6560]">Name</p>
              <p className="text-sm font-bold text-[#1a1a1a] truncate">{user?.name || "—"}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FDFBF7] flex items-center gap-3.5 border border-[#E6E0D5]">
            <div className="size-10 rounded-2xl bg-blush/35 border border-[#E6E0D5] text-[#8B263E] flex items-center justify-center shrink-0">
              <Mail className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.68rem] uppercase font-bold text-[#6B6560]">Email</p>
              <p className="text-xs font-mono text-[#1a1a1a] truncate font-medium">{user?.email || "—"}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FDFBF7] flex items-center gap-3.5 border border-[#E6E0D5]">
            <div className="size-10 rounded-2xl bg-blush/35 border border-[#E6E0D5] text-[#8B263E] flex items-center justify-center shrink-0">
              <Shield className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.68rem] uppercase font-bold text-[#6B6560]">Auth Method</p>
              <p className="text-xs font-semibold text-[#1a1a1a]">Email + Client Master Key</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FDFBF7] flex items-center gap-3.5 border border-[#E6E0D5]">
            <div className="size-10 rounded-2xl bg-blush/35 border border-[#E6E0D5] text-[#8B263E] flex items-center justify-center shrink-0">
              <Key className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.68rem] uppercase font-bold text-[#6B6560]">Cipher</p>
              <p className="text-xs font-semibold text-[#1a1a1a]">AES-256-GCM (Client-side)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white/95 rounded-3xl border border-[#E6E0D5] shadow-xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Vault Actions</h2>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6E0D5] hover:border-[#8B263E] hover:bg-blush/20 transition-all text-left disabled:opacity-60 cursor-pointer shadow-xs"
        >
          {exporting ? <Loader2 className="size-6 text-[#8B263E] animate-spin shrink-0" /> : <Download className="size-6 text-[#8B263E] shrink-0" />}
          <div>
            <p className="text-sm font-bold text-[#1a1a1a]">Export Vault Data</p>
            <p className="text-xs text-[#6B6560] mt-0.5">Download an encrypted backup file of all your vault credentials</p>
          </div>
        </button>

        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="w-full flex items-center gap-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all text-left disabled:opacity-60 cursor-pointer shadow-xs"
        >
          {deleting ? <Loader2 className="size-6 text-rose-600 animate-spin shrink-0" /> : <Trash2 className="size-6 text-rose-600 shrink-0" />}
          <div>
            <p className="text-sm font-bold text-rose-800">Delete Entire Account</p>
            <p className="text-xs text-rose-700/80 mt-0.5">Permanently wipe your account and all zero-knowledge keys</p>
          </div>
        </button>
      </div>
    </div>
  );
}
