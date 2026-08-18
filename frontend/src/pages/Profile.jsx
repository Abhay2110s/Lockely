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
      toast.success("Vault exported successfully!");
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
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="size-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-indigo-500/20">
            {initials}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{displayName}</h1>
            <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
            <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[0.68rem] font-semibold">
              <CheckCircle2 className="size-3" /> Verified Account
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
            <div className="size-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <User className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider">Name</p>
              <p className="text-xs font-semibold text-slate-800 truncate">{user?.name || "—"}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
            <div className="size-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Mail className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider">Email</p>
              <p className="text-xs font-semibold text-slate-800 truncate">{user?.email || "—"}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
            <div className="size-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Shield className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider">Auth Method</p>
              <p className="text-xs font-semibold text-slate-800">Email + Password</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
            <div className="size-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Key className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider">Encryption</p>
              <p className="text-xs font-semibold text-slate-800">AES-256-GCM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Account Actions</h2>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="w-full flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-left disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {exporting ? <Loader2 className="size-5 text-indigo-600 animate-spin shrink-0" /> : <Download className="size-5 text-indigo-600 shrink-0" />}
          <div>
            <p className="text-xs font-semibold text-slate-800">Export Vault Data</p>
            <p className="text-[0.68rem] text-slate-500">Download an encrypted backup of all your vault entries</p>
          </div>
        </button>

        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="w-full flex items-center gap-3 p-4 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 transition-colors text-left disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {deleting ? <Loader2 className="size-5 text-rose-500 animate-spin shrink-0" /> : <Trash2 className="size-5 text-rose-500 shrink-0" />}
          <div>
            <p className="text-xs font-semibold text-rose-700">Delete Account</p>
            <p className="text-[0.68rem] text-rose-500">Permanently remove your account and all vault data</p>
          </div>
        </button>
      </div>
    </div>
  );
}
