import { useState, useEffect } from "react";
import { X, Eye, EyeOff, RefreshCw, Wand2, Lock, Globe, User, Tag, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_FORM = {
  title: "",
  username: "",
  password: "",
  url: "",
  category: "Logins",
};

const CATEGORIES = ["Logins", "Cards", "Notes", "Identity"];

function generatePassword(length = 16) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (n) => chars[n % chars.length]).join("");
}

/**
 * PasswordModal — Add or Edit vault entry modal.
 * @param {boolean} open - modal visibility
 * @param {Function} onClose - close handler
 * @param {Function} onSave - called with form data
 * @param {Object|null} editItem - existing item for edit mode, null for add mode
 */
export default function PasswordModal({ open, onClose, onSave, editItem = null }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEdit = !!editItem;

  // Pre-fill form in edit mode
  useEffect(() => {
    if (editItem) {
      setForm({ ...INITIAL_FORM, ...editItem });
    } else {
      setForm(INITIAL_FORM);
    }
    setShowPassword(false);
  }, [editItem, open]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    handleChange("password", generatePassword());
    setShowPassword(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.password) return;
    setLoading(true);
    try {
      await onSave?.({ ...form, id: editItem?.id || Date.now().toString(), updatedAt: "Just now" });
      onClose?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                  <Lock className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {isEdit ? "Edit Vault Entry" : "Add New Vault Entry"}
                  </h2>
                  <p className="text-[0.65rem] text-slate-400">
                    {isEdit ? "Update your stored credentials" : "Securely store your credentials"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Title / Account Name *
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="e.g. GitHub Account"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Username / Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    placeholder="user@example.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Password / Key *
                </label>
                <div className="relative flex gap-2">
                  <div className="relative flex-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      placeholder="Secret password"
                      className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    title="Generate strong password"
                    className="px-3 py-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors"
                  >
                    <Wand2 className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Website URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={form.url}
                    onChange={(e) => handleChange("url", e.target.value)}
                    placeholder="https://..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Category</label>
                <div className="flex gap-2 flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleChange("category", cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        form.category === cat
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex justify-end gap-3 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-soft-primary px-6 py-2 text-xs font-bold shadow-sm flex items-center gap-2 disabled:opacity-60"
                >
                  {loading && <Loader2 className="size-3.5 animate-spin" />}
                  {isEdit ? "Update Entry" : "Save Entry"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
