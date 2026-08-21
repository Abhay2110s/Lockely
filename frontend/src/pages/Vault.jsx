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
  Zap,
  Sparkles,
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
import useClipboard from "@/hooks/useClipboard";
import useDebounce from "@/hooks/useDebounce";
import toast from "react-hot-toast";

const evaluateStrength = (password = "") => {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  const labels = ["Weak", "Weak", "Fair", "Good", "Strong"];
  return {
    score,
    label: labels[score] || "Weak",
    entropy: password.length * 4,
  };
};

const DEFAULT_CATEGORIES = [
  "General",
  "Social",
  "Work",
  "Finance",
  "Entertainment",
  "Personal",
];

const categoryColors = {
  General: "bg-[#fef08a] text-slate-950",
  Social: "bg-[#bae6fd] text-sky-950",
  Work: "bg-[#ddd6fe] text-purple-950",
  Finance: "bg-[#bbf7d0] text-emerald-950",
  Entertainment: "bg-[#fed7aa] text-amber-950",
  Personal: "bg-[#fce7f3] text-pink-950",
};

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
      toast.success("Vault unlocked! 🔓");
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
      toast.error("Failed to decrypt. May be encrypted with a different key.");
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
      toast.success("Password copied! 📋");
    }
  };

  const handleDelete = async (id) => {
    const prev = entries;
    setEntries((list) => list.filter((item) => item.id !== id));

    try {
      await softDeletePassword(id);
      toast.success("Moved to Trash 🗑️");
    } catch (err) {
      setEntries(prev);
      toast.error(err?.response?.data?.message || "Couldn't delete item.");
    }
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!newForm.title || !newForm.password) {
      setFormError("Title and password are required.");
      return;
    }

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
        toast.success("Saved to Comic Vault! 🛡️");
      }
      setNewForm({ title: "", username: "", password: "", url: "", category: "General" });
      setIsAddModalOpen(false);
    } catch (err) {
      setFormError(
        err?.response?.data?.message || "Couldn't save entry. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-comic">
      {/* Vault Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fffef7] p-6 rounded-3xl border-3 border-[#18181b] shadow-[5px_5px_0px_#18181b]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#fef08a] border-2 border-[#18181b] text-xs font-heading-comic font-bold text-slate-950 mb-2">
            <Sparkles className="size-3 text-amber-600 fill-amber-400" />
            Zero-Knowledge Store
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading-comic font-black text-slate-950 flex items-center gap-2">
            <KeyRound className="size-7 text-[#6366f1]" />
            Encrypted Password Vault
          </h1>
          <p className="text-xs text-slate-600 font-comic font-bold mt-1">
            Zero-knowledge client encrypted with AES-256-GCM. Decrypted purely in memory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isVaultUnlocked && (
            <button
              onClick={() => setIsUnlockModalOpen(true)}
              className="btn-comic btn-comic-yellow text-xs py-2.5 px-4 gap-2"
            >
              <Lock className="size-4" />
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
            className="btn-comic btn-comic-primary text-xs py-2.5 px-4 gap-2"
          >
            <Plus className="size-4" />
            Add New Vault Item
          </button>
        </div>
      </div>

      {/* Lock Notice Banner if Vault is locked */}
      {!isVaultUnlocked && (
        <div className="p-4 rounded-2xl bg-[#fef08a] border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white border-2 border-[#18181b] text-slate-950 flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#18181b]">
              <Lock className="size-5 text-amber-700" />
            </div>
            <div>
              <p className="font-heading-comic font-black text-slate-950 text-sm">Vault is currently locked!</p>
              <p className="text-slate-800 font-comic font-bold text-xs">
                Unlock with your Master Password to reveal passwords and encrypt new credentials.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUnlockModalOpen(true)}
            className="btn-comic btn-comic-white text-xs px-3.5 py-1.5 shrink-0"
          >
            Unlock Now 🔓
          </button>
        </div>
      )}

      {/* Filter and Search Control Bar */}
      <div className="bg-[#fffef7] p-4 rounded-2xl border-2.5 border-[#18181b] shadow-[4px_4px_0px_#18181b] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => {
            const value = cat.label === "All Items" ? "All" : cat.label;
            const isSelected = activeCategory === value;
            return (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(value)}
                className={`
                  flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-heading-comic font-bold whitespace-nowrap transition-all border-2 border-[#18181b]
                  ${
                    isSelected
                      ? "bg-[#6366f1] text-white shadow-[2px_2px_0px_#18181b] -translate-y-0.5"
                      : "bg-white text-slate-700 hover:bg-[#fef08a] hover:text-slate-950"
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search credentials..."
            className="comic-input w-full pl-9 pr-8 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400"
          />
          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-600 hover:text-slate-950 hover:bg-slate-200"
            >
              <X className="size-3.5" />
            </button>
          ) : isLoading ? (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-600 animate-spin" />
          ) : null}
        </div>
      </div>

      {error && (
        <div className="bg-[#fda4af] border-2.5 border-[#18181b] text-slate-950 text-xs font-bold px-4 py-3 rounded-2xl shadow-[3px_3px_0px_#18181b]">
          {error}
        </div>
      )}

      {/* Vault Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {!isLoading &&
          displayEntries.map((item) => {
            const isPasswordVisible = visibleId === item.id;
            const isRevealing = revealingId === item.id;
            const displayPassword = revealCache[item.id];
            const catBadgeClass = categoryColors[item.category] || "bg-[#fef08a] text-slate-950";

            return (
              <div
                key={item.id}
                className="bg-[#fffef7] p-5 rounded-3xl border-2.5 border-[#18181b] shadow-[4px_4px_0px_#18181b] hover:-translate-y-1 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-11 rounded-2xl bg-[#bae6fd] border-2 border-[#18181b] text-slate-950 flex items-center justify-center font-heading-comic font-black text-base shrink-0 shadow-[2px_2px_0px_#18181b]">
                      {item.title?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-heading-comic font-black text-slate-950 truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono truncate flex items-center gap-1">
                        {item.website || item.url ? (
                          <a
                            href={item.url?.startsWith("http") ? item.url : `https://${item.url || item.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-indigo-600 inline-flex items-center gap-0.5 font-bold"
                          >
                            {item.website || item.url} <ExternalLink className="size-2.5 inline" />
                          </a>
                        ) : (
                          "—"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full border border-[#18181b] text-[0.68rem] font-heading-comic font-bold ${catBadgeClass}`}>
                      {item.category}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-[#fda4af] hover:border hover:border-[#18181b] transition-colors"
                      title="Move to trash"
                    >
                      <Trash2 className="size-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                {/* Username Field */}
                <div className="p-2.5 rounded-2xl bg-white border-2 border-[#18181b] flex items-center justify-between gap-2 text-xs shadow-[1.5px_1.5px_0px_#18181b]">
                  <span className="text-slate-500 text-[0.7rem] uppercase font-heading-comic font-bold">User:</span>
                  <span className="font-mono font-bold text-slate-800 truncate">{item.username || "—"}</span>
                  <button
                    onClick={() => {
                      copy(item.username, `${item.id}-user`);
                      toast.success("Username copied!");
                    }}
                    disabled={!item.username}
                    className="p-1.5 rounded-lg bg-slate-100 border border-[#18181b] text-slate-900 hover:bg-[#fef08a] disabled:opacity-30 transition-colors"
                    title="Copy Username"
                  >
                    {copied && copiedId === `${item.id}-user` ? (
                      <Check className="size-3.5 text-emerald-700" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>

                {/* Password Field */}
                <div className="p-2.5 rounded-2xl bg-[#fef08a] border-2 border-[#18181b] flex items-center justify-between gap-2 text-xs shadow-[2px_2px_0px_#18181b]">
                  <span className="text-slate-900 text-[0.7rem] uppercase font-heading-comic font-black flex items-center gap-1">
                    <Lock className="size-3.5" /> Key:
                  </span>
                  <span className="font-mono text-slate-950 font-black truncate">
                    {isPasswordVisible && displayPassword ? displayPassword : "••••••••••••••••"}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleVisible(item)}
                      disabled={isRevealing}
                      className="p-1.5 rounded-lg bg-white border border-[#18181b] text-slate-900 hover:bg-[#bae6fd] disabled:opacity-50 transition-colors"
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
                      className="p-1.5 rounded-lg bg-white border border-[#18181b] text-slate-900 hover:bg-[#bbf7d0] transition-colors"
                      title="Copy Password"
                    >
                      {copied && copiedId === `${item.id}-pass` ? (
                        <Check className="size-3.5 text-emerald-700" />
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
          <div className="col-span-full bg-[#fffef7] p-12 rounded-3xl border-3 border-[#18181b] shadow-[5px_5px_0px_#18181b] text-center space-y-3">
            <Loader2 className="size-10 text-indigo-600 mx-auto animate-spin" />
            <p className="text-sm font-heading-comic font-bold text-slate-800">Loading your comic vault…</p>
          </div>
        )}

        {!isLoading && displayEntries.length === 0 && !error && (
          <div className="col-span-full bg-[#fffef7] p-12 rounded-3xl border-3 border-[#18181b] shadow-[5px_5px_0px_#18181b] text-center space-y-3">
            <ShieldAlert className="size-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-heading-comic font-black text-slate-950">
              {search ? `No credentials found matching "${search}"` : "No vault entries found"}
            </h3>
            <p className="text-xs font-comic font-bold text-slate-500">
              {search
                ? "Try a different search query or check spelling."
                : "Add your first secret credential using the button above."}
            </p>
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="btn-comic btn-comic-yellow text-xs px-4 py-2"
              >
                Clear Search ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* Unlock Vault Modal */}
      {isUnlockModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#fffef7] rounded-3xl border-3 border-[#18181b] shadow-[8px_8px_0px_#18181b] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-10 rounded-2xl bg-[#fef08a] border-2 border-[#18181b] text-slate-950 flex items-center justify-center font-bold shadow-[2px_2px_0px_#18181b]">
                  <Unlock className="size-5" />
                </div>
                <h2 className="text-xl font-heading-comic font-black text-slate-950">Unlock Vault</h2>
              </div>
              <button
                onClick={() => setIsUnlockModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-900 hover:bg-slate-200 border-2 border-[#18181b]"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-xs font-comic font-bold text-slate-600">
              Enter your Master Password to derive your AES encryption key. Never leaves your browser!
            </p>

            {unlockError && (
              <div className="bg-[#fda4af] border-2 border-[#18181b] text-slate-950 text-xs font-bold px-3.5 py-2.5 rounded-xl">
                {unlockError}
              </div>
            )}

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="text-xs font-heading-comic font-bold text-slate-800 block mb-1">
                  Master Password 🔑
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={unlockPassword}
                  onChange={(e) => setUnlockPassword(e.target.value)}
                  placeholder="Enter your master password"
                  className="comic-input w-full px-3.5 py-2.5 text-xs font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUnlockModalOpen(false)}
                  className="btn-comic btn-comic-white px-4 py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={unlocking || !unlockPassword}
                  className="btn-comic btn-comic-primary px-5 py-2 text-xs gap-2"
                >
                  {unlocking ? <Loader2 className="size-3.5 animate-spin" /> : <ShieldCheck className="size-3.5" />}
                  Unlock!
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#fffef7] rounded-3xl border-3 border-[#18181b] shadow-[8px_8px_0px_#18181b] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading-comic font-black text-slate-950">Add Secret Entry ✨</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-900 hover:bg-slate-200 border-2 border-[#18181b]"
              >
                <X className="size-4" />
              </button>
            </div>

            {formError && (
              <div className="bg-[#fda4af] border-2 border-[#18181b] text-slate-950 text-xs font-bold px-3.5 py-2.5 rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddEntry} className="space-y-3.5">
              <div>
                <label className="text-xs font-heading-comic font-bold text-slate-800 block mb-1">
                  Title / Service Name
                </label>
                <input
                  type="text"
                  required
                  value={newForm.title}
                  onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                  placeholder="e.g. GitHub, Google, Netflix"
                  className="comic-input w-full px-3.5 py-2 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-heading-comic font-bold text-slate-800 block mb-1">
                  Username / Email
                </label>
                <input
                  type="text"
                  value={newForm.username}
                  onChange={(e) => setNewForm({ ...newForm, username: e.target.value })}
                  placeholder="user@example.com"
                  className="comic-input w-full px-3.5 py-2 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-heading-comic font-bold text-slate-800 block mb-1">
                  Password / Secret Key
                </label>
                <input
                  type="password"
                  required
                  value={newForm.password}
                  onChange={(e) => setNewForm({ ...newForm, password: e.target.value })}
                  placeholder="Secret password"
                  className="comic-input w-full px-3.5 py-2 text-xs font-bold font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-heading-comic font-bold text-slate-800 block mb-1">
                  Website URL (Optional)
                </label>
                <input
                  type="text"
                  value={newForm.url}
                  onChange={(e) => setNewForm({ ...newForm, url: e.target.value })}
                  placeholder="https://github.com"
                  className="comic-input w-full px-3.5 py-2 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-heading-comic font-bold text-slate-800 block mb-1">
                  Category
                </label>
                <select
                  value={newForm.category}
                  onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                  className="comic-input w-full px-3.5 py-2 text-xs font-bold bg-white"
                >
                  {DEFAULT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-comic btn-comic-white px-4 py-2 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-comic btn-comic-primary px-5 py-2 text-xs gap-2"
                >
                  {isSaving && <Loader2 className="size-3.5 animate-spin" />}
                  Save Secret
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
