import { useState } from "react";
import { useAppAuth } from "@/context/AuthContext";
import * as userService from "@/services/user.service";
import toast from "react-hot-toast";
import { Download, Trash2, Loader2, AlertTriangle, X } from "lucide-react";

export default function AccountSettings() {
  const { logout } = useAppAuth();
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
      <div className="bg-white/95 p-6 sm:p-8 rounded-3xl border border-[#E6E0D5] shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-blush/35 border border-[#E6E0D5] text-[#8B263E] flex items-center justify-center font-bold">
            <Download className="size-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#1a1a1a]">Export Encrypted Backup</h2>
            <p className="text-xs text-[#6B6560]">Download your vault in encrypted JSON format</p>
          </div>
        </div>

        <p className="text-xs text-[#6B6560] leading-relaxed font-normal">
          Your backup contains all vault entries encrypted with your master-password derived key. It can only be decrypted by you.
        </p>

        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="glass-btn-secondary text-xs py-2.5 px-5 rounded-full flex items-center gap-2 cursor-pointer"
        >
          {exporting ? <Loader2 className="size-4 text-[#8B263E] animate-spin" /> : <Download className="size-4 text-[#8B263E]" />}
          <span>{exporting ? "Exporting…" : "Export Vault Data (.json)"}</span>
        </button>
      </div>

      {/* Danger Zone: Delete Account */}
      <div className="rounded-3xl border border-rose-200 p-6 sm:p-8 space-y-4 bg-rose-50/60 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-rose-100 border border-rose-300 text-rose-700 flex items-center justify-center font-bold">
            <Trash2 className="size-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-rose-900">Delete Account</h2>
            <p className="text-xs text-rose-700">Permanently delete your Lockely account and vault</p>
          </div>
        </div>

        <p className="text-xs text-rose-800 leading-relaxed font-normal">
          Once deleted, all your passwords, folders, and settings will be permanently erased. This action cannot be reversed.
        </p>

        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white transition-colors cursor-pointer shadow-xs"
        >
          Delete My Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl border border-rose-200 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-700">
                <AlertTriangle className="size-5" />
                <h3 className="text-base font-bold text-[#1a1a1a]">Confirm Deletion</h3>
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="p-1.5 rounded-xl bg-white text-[#6B6560] hover:text-[#1a1a1a] border border-[#E6E0D5] cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-xs text-[#6B6560] leading-relaxed">
              Type <strong className="text-rose-600 font-mono">DELETE</strong> below to permanently erase your account, all credentials, and encryption keys.
            </p>

            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <input
                type="text"
                required
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE"
                className="glass-input text-center text-xs font-mono font-bold tracking-widest rounded-2xl border-rose-200"
              />

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="glass-btn-ghost text-xs px-4 py-2 rounded-full cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deleteConfirmText !== "DELETE" || deleting}
                  className="rounded-full bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 text-xs font-semibold disabled:opacity-40 cursor-pointer shadow-xs"
                >
                  {deleting ? <Loader2 className="size-3.5 animate-spin" /> : "Delete Forever"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
