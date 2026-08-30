import { useState } from "react";
import { useAppAuth } from "@/context/AuthContext";
import * as userService from "@/services/user.service";
import toast from "react-hot-toast";
import { Download, Trash2, Loader2, AlertTriangle, X } from "lucide-react";

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
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-pink-500/20 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-[#7a1534] to-[#be2656] text-white flex items-center justify-center font-bold">
            <Download className="size-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white">Export Encrypted Backup</h2>
            <p className="text-xs text-[#fda4b8]/70">Download your vault in encrypted JSON format</p>
          </div>
        </div>

        <p className="text-xs text-[#ffe4e9]/80 leading-relaxed font-normal">
          Your backup contains all vault entries encrypted with your master-password derived key. It can only be decrypted by you.
        </p>

        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="glass-btn-secondary text-xs py-2.5 px-4 flex items-center gap-2"
        >
          {exporting ? <Loader2 className="size-4 text-[#f43f6e] animate-spin" /> : <Download className="size-4 text-[#f43f6e]" />}
          <span>{exporting ? "Exporting…" : "Export Vault Data (.json)"}</span>
        </button>
      </div>

      {/* Danger Zone: Delete Account */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 shadow-2xl space-y-4 bg-rose-950/20">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 flex items-center justify-center font-bold">
            <Trash2 className="size-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-rose-200">Delete Account</h2>
            <p className="text-xs text-rose-300/70">Permanently delete your PassGuardian account and vault</p>
          </div>
        </div>

        <p className="text-xs text-rose-200/80 leading-relaxed font-normal">
          Once deleted, all your passwords, folders, and settings will be permanently erased. This action cannot be reversed.
        </p>

        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-xs font-semibold text-rose-200 transition-colors cursor-pointer"
        >
          Delete My Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#120307]/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm glass-panel rounded-3xl border border-rose-500/30 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-300">
                <AlertTriangle className="size-5" />
                <h3 className="text-base font-bold text-white">Are you absolutely sure?</h3>
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="p-1.5 rounded-lg glass-card-subtle text-[#fda4b8] hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="text-xs text-[#fda4b8]/90 leading-relaxed font-normal">
              This will permanently delete your account (<strong className="text-white">{user?.email}</strong>) and all encrypted vault entries. Type <span className="font-mono-code font-bold text-rose-400">DELETE</span> below to confirm:
            </p>

            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <input
                type="text"
                required
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="glass-input text-center font-mono-code text-xs"
              />

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setDeleteConfirmText("");
                  }}
                  className="glass-btn-ghost text-xs px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deleting || deleteConfirmText !== "DELETE"}
                  className="glass-btn-primary bg-rose-600 hover:bg-rose-700 px-5 py-2 text-xs font-semibold inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
