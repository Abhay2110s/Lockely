import { useState } from "react";
import { useAppAuth } from "@/context/AuthContext";
import * as userService from "@/services/user.service";
import toast from "react-hot-toast";
import { Download, Trash2, Shield, Loader2, AlertTriangle, X } from "lucide-react";
import { formatDate } from "@/lib/helpers";

export default function AccountSettings() {
  const { user, logout } = useAppAuth();
  const [exporting, setExporting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await userService.exportVault();
      toast.success("Encrypted vault backup downloaded.");
    } catch (error) {
      console.error("Vault export failed:", error);
      toast.error(error?.response?.data?.message || "Failed to export encrypted vault.");
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (deleteConfirmText !== "DELETE") return;
    setDeleting(true);
    try {
      await userService.deleteAccount();
      toast.success("Account permanently deleted.");
      logout();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete account. Please try again.");
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Encrypted Backup */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Download className="size-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Export Encrypted Backup</h2>
            <p className="text-[0.75rem] text-slate-500">Download your vault in encrypted JSON format</p>
          </div>
        </div>

        <p className="text-xs text-slate-600">
          Your backup contains all vault entries encrypted with your master-password derived key. It can only be decrypted by you.
        </p>

        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed text-xs font-semibold text-slate-700 flex items-center gap-2"
        >
          {exporting ? <Loader2 className="size-4 text-indigo-600 animate-spin" /> : <Download className="size-4 text-indigo-600" />}
          {exporting ? "Exporting…" : "Export Vault Data (.json)"}
        </button>
      </div>

      {/* Danger Zone: Delete Account */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Trash2 className="size-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-rose-900">Delete Account</h2>
            <p className="text-[0.75rem] text-rose-500">Permanently delete your PassGuardian account and vault</p>
          </div>
        </div>

        <p className="text-xs text-slate-600">
          Once deleted, all your passwords, folders, and settings will be permanently erased. This action cannot be reversed.
        </p>

        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-xs font-semibold text-rose-700 transition-colors"
        >
          Delete My Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="size-5" />
                <h3 className="text-base font-bold text-slate-900">Are you absolutely sure?</h3>
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              This will permanently delete your account (<strong className="text-slate-800">{user?.email}</strong>) and all encrypted vault entries. Type <span className="font-mono font-bold text-rose-600">DELETE</span> below to confirm:
            </p>

            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <input
                type="text"
                required
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="w-full text-center font-mono py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setDeleteConfirmText("");
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deleting || deleteConfirmText !== "DELETE"}
                  className="px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-sm inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting && <Loader2 className="size-3.5 animate-spin" />}
                  Permanently Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
