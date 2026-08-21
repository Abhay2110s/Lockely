import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  KeyRound,
  Search,
  Plus,
  Copy,
  Check,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  X,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import {
  getPasswords,
  createPassword,
  softDeletePassword,
} from "@/services/password.service";
import {
  encryptSecret,
  decryptSecret,
  computePasswordHash,
} from "@/services/crypto.service";
import { useAppAuth } from "@/context/AuthContext";
import useDebounce from "@/hooks/useDebounce";
import useClipboard from "@/hooks/useClipboard";
import toast from "react-hot-toast";

const DEFAULT_CATEGORIES = ["Work", "Banking", "Social", "Shopping", "Gaming", "General"];

/** Simple client-side strength assessment for vault entry metadata */
function evaluateStrength(pwd) {
  let score = 0;
  if (pwd.length >= 16) score += 35;
  else if (pwd.length >= 12) score += 25;
  else if (pwd.length >= 8) score += 15;

  if (/[A-Z]/.test(pwd)) score += 15;
  if (/[a-z]/.test(pwd)) score += 15;
  if (/\d/.test(pwd)) score += 15;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 20;

  score = Math.min(100, Math.max(0, score));

  let label = "Weak";
  if (score >= 80) label = "Very Strong";
  else if (score >= 65) label = "Strong";
  else if (score >= 45) label = "Medium";
  else if (score < 25) label = "Very Weak";

  const poolSize = (/[a-z]/.test(pwd) ? 26 : 0) +
    (/[A-Z]/.test(pwd) ? 26 : 0) +
    (/\d/.test(pwd) ? 10 : 0) +
    (/[^A-Za-z0-9]/.test(pwd) ? 32 : 0);

  const entropy = poolSize > 0 ? Number((pwd.length * Math.log2(poolSize)).toFixed(2)) : 0;

  return { score, label, entropy };
}

export default function Vault() {
  const { vaultKey, isVaultUnlocked, unlockVault } = useAppAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("q") || searchParams.get("search") || "";
  const [search, setSearch] = useState(urlSearch);
  const debouncedSearch = useDebounce(search.trim(), 300);
  const [activeCategory, setActiveCategory] = useState("All");

  // Keep state in sync if URL search params change
  useEffect(() => {
    const q = searchParams.get("q") || searchParams.get("search") || "";
    if (q !== search) {
      setSearch(q);
    }
  }, [searchParams]);

  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { copied, copiedId, copy } = useClipboard(2000);
  const [visibleId, setVisibleId] = useState(null);
  const [revealCache, setRevealCache] = useState({}); // { [id]: decrypted plaintext }
  const [revealingId, setRevealingId] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [newForm, setNewForm] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    category: "General",
  });

  // Master password unlock dialog state
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  const fetchEntries = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = { limit: 100, sortBy: "latest" };
      if (debouncedSearch) params.search = debouncedSearch;
      if (activeCategory !== "All") params.category = activeCategory;

      const res = await getPasswords(params);
      setEntries(res?.data?.entries || []);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Couldn't load your vault. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, activeCategory]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // Instant real-time filtering on loaded entries
  const displayEntries = useMemo(() => {
    if (!search.trim()) return entries;
    const term = search.trim().toLowerCase();
    return entries.filter((e) =>
      e.title?.toLowerCase().includes(term) ||
      e.username?.toLowerCase().includes(term) ||
      e.website?.toLowerCase().includes(term) ||
      e.url?.toLowerCase().includes(term) ||
      e.email?.toLowerCase().includes(term) ||
      e.category?.toLowerCase().includes(term) ||
      e.notes?.toLowerCase().includes(term)
    );
  }, [entries, search]);

  const categories = [
    { label: "All Items" },
    ...DEFAULT_CATEGORIES.map((c) => ({ label: c })),
  ];

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!unlockPassword) return;
    setUnlockError("");
    setUnlocking(true);
    try {
      await unlockVault(unlockPassword);
      toast.success("Vault unlocked!");
      setIsUnlockModalOpen(false);
      setUnlockPassword("");
    } catch (err) {
      setUnlockError(err?.message || "Failed to unlock vault. Check your master password.");
    } finally {
      setUnlocking(false);
    }
  };

  const revealPassword = async (item) => {
    if (revealCache[item.id]) return revealCache[item.id];
    if (!vaultKey) {
      setIsUnlockModalOpen(true);
      return "";
    }

    setRevealingId(item.id);
    try {
      if (!item.cipherText || !item.iv || !item.authTag) {
        toast.error("Invalid encrypted entry.");
        return "";
      }
      const plain = await decryptSecret(
        {
          cipherText: item.cipherText,
          iv: item.iv,
          authTag: item.authTag,
        },
        vaultKey
      );
      setRevealCache((prev) => ({ ...prev, [item.id]: plain }));
      return plain;
    } catch (err) {
      console.error("Decryption failed:", err);
      toast.error("Failed to decrypt password. The entry may be corrupted or encrypted with a different key.");
      return "";
    } finally {
      setRevealingId(null);
    }
  };

  const handleToggleVisible = async (item) => {
    if (visibleId === item.id) {
      setVisibleId(null);
      return;
    }
    const plain = await revealPassword(item);
    if (plain) {
      setVisibleId(item.id);
    }
  };

  const handleCopyPassword = async (item) => {
    const plain = revealCache[item.id] || (await revealPassword(item));
    if (plain) {
      copy(plain, `${item.id}-pass`);
    }
  };

  const handleDelete = async (id) => {
    const prev = entries;
    setEntries(entries.filter((e) => e.id !== id));
    try {
      await softDeletePassword(id);
      toast.success("Item moved to trash.");
    } catch {
      setEntries(prev);
      setError("Couldn't delete that entry. Please try again.");
    }
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!newForm.title || !newForm.password) return;

    if (!vaultKey) {
      setIsUnlockModalOpen(true);
      return;
    }

    setIsSaving(true);
    try {
      // 1. Encrypt secret client-side
      const encryptedBlob = await encryptSecret(newForm.password, vaultKey);

      // 2. Compute SHA-256 reuse hash
      const passwordHash = await computePasswordHash(newForm.password);

      // 3. Compute strength assessment
      const strength = evaluateStrength(newForm.password);

      // 4. Send encrypted payload to server
      const res = await createPassword({
        title: newForm.title.trim(),
        username: newForm.username.trim(),
        website: newForm.url.trim(),
        url: newForm.url.trim(),
        cipherText: encryptedBlob.cipherText,
        iv: encryptedBlob.iv,
        authTag: encryptedBlob.authTag,
        passwordHash,
        strength,
        category: newForm.category || "General",
      });

      const created = res?.data;
      if (created) {
        setEntries((prev) => [created, ...prev]);
        setRevealCache((prev) => ({ ...prev, [created.id]: newForm.password }));
        toast.success("Vault item saved!");
      }
      setNewForm({ title: "", username: "", password: "", url: "", category: "General" });
      setIsAddModalOpen(false);
    } catch (err) {
      setFormError(
        err?.response?.data?.message || "Couldn't save that entry. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Vault Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <KeyRound className="size-6 text-indigo-600" />
            Encrypted Password Vault
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Zero-knowledge encrypted login credentials protected with AES-256-GCM.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isVaultUnlocked && (
            <button
              onClick={() => setIsUnlockModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 text-xs py-2 px-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-semibold hover:bg-amber-100 transition-colors shadow-xs"
            >
              <Lock className="size-3.5 text-amber-600" />
              Unlock Vault
            </button>
          )}

          <button
            onClick={() => {
              if (!isVaultUnlocked) {
                setIsUnlockModalOpen(true);
              } else {
                setIsAddModalOpen(true);
              }
            }}
            className="btn-soft-primary inline-flex items-center justify-center gap-2 text-xs py-2.5 px-4 shadow-sm"
          >
            <Plus className="size-4" />
            Add New Vault Item
          </button>
        </div>
      </div>

      {/* Lock Notice Banner if Vault is locked */}
      {!isVaultUnlocked && (
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Lock className="size-4" />
            </div>
            <div>
              <p className="font-bold text-amber-900">Vault is locked</p>
              <p className="text-amber-700 text-[0.7rem]">
                Enter your master password to decrypt passwords and add new entries.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUnlockModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors text-xs shrink-0"
          >
            Unlock Now
          </button>
        </div>
      )}

      {/* Filter and Search Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => {
            const value = cat.label === "All Items" ? "All" : cat.label;
            const isSelected = activeCategory === value;
            return (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(value)}
                className={`
                  flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all
                  ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                  }
                `}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search credentials..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
            >
              <X className="size-3.5" />
            </button>
          ) : isLoading ? (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-300 animate-spin" />
          ) : null}
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Vault Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!isLoading &&
          displayEntries.map((item) => {
            const isPasswordVisible = visibleId === item.id;
            const isRevealing = revealingId === item.id;
            const displayPassword = revealCache[item.id];

            return (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                      {item.title?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 truncate">{item.title}</h3>
                      <p className="text-[0.7rem] text-slate-400 truncate flex items-center gap-1">
                        {item.website || item.url ? (
                          <a
                            href={item.url?.startsWith("http") ? item.url : `https://${item.url || item.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-indigo-600 inline-flex items-center gap-0.5"
                          >
                            {item.website || item.url} <ExternalLink className="size-2.5 inline" />
                          </a>
                        ) : (
                          "—"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[0.65rem] font-semibold">
                      {item.category}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Move to trash"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Username Field */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400 text-[0.7rem] uppercase font-semibold">User:</span>
                  <span className="font-mono text-slate-700 truncate">{item.username || "—"}</span>
                  <button
                    onClick={() => copy(item.username, `${item.id}-user`)}
                    disabled={!item.username}
                    className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-30"
                    title="Copy Username"
                  >
                    {copied && copiedId === `${item.id}-user` ? (
                      <Check className="size-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>

                {/* Password Field */}
                <div className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between gap-2 text-xs">
                  <span className="text-indigo-600 text-[0.7rem] uppercase font-semibold flex items-center gap-1">
                    <Lock className="size-3" /> Key:
                  </span>
                  <span className="font-mono text-slate-900 font-bold truncate">
                    {isPasswordVisible && displayPassword ? displayPassword : "••••••••••••••••"}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleVisible(item)}
                      disabled={isRevealing}
                      className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 disabled:opacity-50"
                      title="Toggle Password Visibility"
                    >
                      {isRevealing ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : isPasswordVisible ? (
                        <EyeOff className="size-3.5" />
                      ) : (
                        <Eye className="size-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleCopyPassword(item)}
                      className="p-1 rounded-lg text-slate-400 hover:text-indigo-600"
                      title="Copy Password"
                    >
                      {copied && copiedId === `${item.id}-pass` ? (
                        <Check className="size-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        {isLoading && (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3">
            <Loader2 className="size-8 text-indigo-400 mx-auto animate-spin" />
            <p className="text-xs text-slate-400">Loading your vault…</p>
          </div>
        )}

        {!isLoading && displayEntries.length === 0 && !error && (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3">
            <ShieldAlert className="size-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">
              {search ? `No credentials found matching "${search}"` : "No vault entries found"}
            </h3>
            <p className="text-xs text-slate-400">
              {search
                ? "Try a different search term or check spelling."
                : "Add your first credential using the button above."}
            </p>
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 font-semibold text-xs hover:bg-indigo-100 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Unlock Vault Modal */}
      {isUnlockModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <Unlock className="size-5" />
                </div>
                <h2 className="text-base font-bold text-slate-900">Unlock Your Vault</h2>
              </div>
              <button
                onClick={() => setIsUnlockModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Enter your master password to decrypt your vault secrets in memory. Your password never leaves your browser.
            </p>

            {unlockError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-3.5 py-2.5 rounded-xl">
                {unlockError}
              </div>
            )}

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Master Password</label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={unlockPassword}
                  onChange={(e) => setUnlockPassword(e.target.value)}
                  placeholder="Enter your master password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUnlockModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={unlocking || !unlockPassword}
                  className="btn-soft-primary px-5 py-2 text-xs font-semibold shadow-sm inline-flex items-center gap-2 disabled:opacity-60"
                >
                  {unlocking ? <Loader2 className="size-3.5 animate-spin" /> : <ShieldCheck className="size-3.5" />}
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Add Vault Item</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="size-5" />
              </button>
            </div>

            {formError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-3.5 py-2.5 rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddEntry} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Title / Account Name</label>
                <input
                  type="text"
                  required
                  value={newForm.title}
                  onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                  placeholder="e.g. GitHub Account"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Username / Email</label>
                <input
                  type="text"
                  value={newForm.username}
                  onChange={(e) => setNewForm({ ...newForm, username: e.target.value })}
                  placeholder="user@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Password / Key</label>
                <input
                  type="password"
                  required
                  value={newForm.password}
                  onChange={(e) => setNewForm({ ...newForm, password: e.target.value })}
                  placeholder="Secret password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Website URL</label>
                <input
                  type="text"
                  value={newForm.url}
                  onChange={(e) => setNewForm({ ...newForm, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Category</label>
                <select
                  value={newForm.category}
                  onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  {DEFAULT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-soft-primary px-5 py-2 text-xs font-semibold shadow-sm inline-flex items-center gap-2 disabled:opacity-60"
                >
                  {isSaving && <Loader2 className="size-3.5 animate-spin" />}
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
