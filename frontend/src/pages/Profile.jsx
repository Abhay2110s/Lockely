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
    <div className="w-full max-w-3xl mx-auto space-y-6 py-2 font-comic">
      {/* Profile Card */}
      <div className="bg-[#fffef7] rounded-3xl border-3 border-[#18181b] shadow-[6px_6px_0px_#18181b] p-6 sm:p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="size-18 rounded-2xl bg-[#6366f1] text-white flex items-center justify-center font-heading-comic font-black text-3xl border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b]">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading-comic font-black text-slate-950">{displayName}</h1>
            <p className="text-xs font-mono font-bold text-slate-600 mt-0.5">{user?.email}</p>
            <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-[#bbf7d0] text-emerald-950 border-2 border-[#18181b] text-xs font-heading-comic font-bold shadow-[1.5px_1.5px_0px_#18181b]">
              <CheckCircle2 className="size-3.5 text-emerald-800" /> Active Comic Vault
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#fef08a] border-2 border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white border border-[#18181b] flex items-center justify-center shrink-0">
              <User className="size-5 text-slate-950" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.68rem] font-heading-comic font-bold text-slate-700 uppercase tracking-wide">Name</p>
              <p className="text-sm font-heading-comic font-black text-slate-950 truncate">{user?.name || "—"}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#bae6fd] border-2 border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white border border-[#18181b] flex items-center justify-center shrink-0">
              <Mail className="size-5 text-slate-950" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.68rem] font-heading-comic font-bold text-slate-700 uppercase tracking-wide">Email</p>
              <p className="text-xs font-mono font-bold text-slate-950 truncate">{user?.email || "—"}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#ddd6fe] border-2 border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white border border-[#18181b] flex items-center justify-center shrink-0">
              <Shield className="size-5 text-slate-950" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.68rem] font-heading-comic font-bold text-slate-700 uppercase tracking-wide">Auth Method</p>
              <p className="text-xs font-heading-comic font-bold text-slate-950">Email + Master Key</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#bbf7d0] border-2 border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white border border-[#18181b] flex items-center justify-center shrink-0">
              <Key className="size-5 text-slate-950" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.68rem] font-heading-comic font-bold text-slate-700 uppercase tracking-wide">Cipher</p>
              <p className="text-xs font-heading-comic font-bold text-slate-950">AES-256-GCM (Client)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-[#fffef7] rounded-3xl border-3 border-[#18181b] shadow-[6px_6px_0px_#18181b] p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-heading-comic font-black text-slate-950">Vault Actions</h2>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="w-full flex items-center gap-3.5 p-4 rounded-2xl border-2.5 border-[#18181b] bg-white hover:bg-[#fef08a] shadow-[3px_3px_0px_#18181b] hover:-translate-y-0.5 transition-all text-left disabled:opacity-60"
        >
          {exporting ? <Loader2 className="size-6 text-indigo-600 animate-spin shrink-0" /> : <Download className="size-6 text-indigo-600 shrink-0" />}
          <div>
            <p className="text-sm font-heading-comic font-black text-slate-950">Export Vault Data</p>
            <p className="text-xs font-comic font-bold text-slate-600">Download an encrypted backup file of all your vault credentials</p>
          </div>
        </button>

        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="w-full flex items-center gap-3.5 p-4 rounded-2xl border-2.5 border-[#18181b] bg-[#fda4af] shadow-[3px_3px_0px_#18181b] hover:-translate-y-0.5 transition-all text-left disabled:opacity-60"
        >
          {deleting ? <Loader2 className="size-6 text-rose-800 animate-spin shrink-0" /> : <Trash2 className="size-6 text-rose-800 shrink-0" />}
          <div>
            <p className="text-sm font-heading-comic font-black text-rose-950">Delete Entire Account</p>
            <p className="text-xs font-comic font-bold text-rose-900">Permanently wipe your account and all zero-knowledge keys</p>
          </div>
        </button>
      </div>
    </div>
  );
}
