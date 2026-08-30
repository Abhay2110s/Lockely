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
        toast.success("Saved to Zero-Knowledge Vault! 🛡️");
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
    <div className="space-y-6">
      {/* Vault Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 sm:p-8 border border-pink-500/30 shadow-2xl bg-gradient-to-br from-[#280712] via-[#3c0b1a] to-[#581026]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-badge-blush text-xs mb-3">
            <Sparkles className="size-3.5 text-[#f43f6e]" />
            <span>Zero-Knowledge AES Store</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3 tracking-tight">
            <KeyRound className="size-8 text-[#f43f6e]" />
            Password Vault
          </h1>
          <p className="text-xs sm:text-sm text-[#ffe4e9]/90 mt-1 font-normal">
            Zero-knowledge client encrypted with AES-256-GCM. Decrypted purely in browser memory.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {!isVaultUnlocked && (
            <button
              onClick={() => setIsUnlockModalOpen(true)}
              className="glass-btn-secondary text-xs py-2.5 px-4"
            >
              <Lock className="size-4 text-[#f43f6e]" />
              <span>Unlock Vault</span>
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
            className="glass-btn-primary text-xs py-2.5 px-4"
          >
            <Plus className="size-4" />
            <span>Add New Vault Item</span>
          </button>
        </div>
      </div>

      {/* Lock Notice Banner if Vault is locked */}
      {!isVaultUnlocked && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#280712] border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs shadow-xl">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0">
              <Lock className="size-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Vault is currently locked</p>
              <p className="text-[#fda4b8] text-xs">
                Unlock with your Master Password to reveal stored passwords and encrypt new credentials.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUnlockModalOpen(true)}
            className="glass-btn-primary text-xs py-2 px-4 shrink-0"
          >
            Unlock Now 🔓
          </button>
        </div>
      )}

      {/* Filter and Search Control Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-pink-500/25 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
          {categories.map((cat) => {
            const value = cat.label === "All Items" ? "All" : cat.label;
            const isSelected = activeCategory === value;
            return (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(value)}
                className={`
                  flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer
                  ${isSelected
                    ? "glass-btn-primary text-white"
                    : "glass-btn-ghost text-[#fda4b8]"
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
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#fda4b8] pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search credentials..."
            className="glass-input pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-[#fda4b8]/50 bg-[#120307]"
          />
          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#fda4b8] hover:text-white"
            >
              <X className="size-3.5" />
            </button>
          ) : isLoading ? (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-[#fda4b8] animate-spin" />
          ) : null}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950 border border-rose-500/40 text-rose-200 text-xs">
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

            return (
              <div
                key={item.id}
                className="glass-card p-5 sm:p-6 space-y-4 border border-[#7a1534] hover:border-[#be2656] transition-all group"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between gap-3 border-b border-[#581026] pb-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-11 rounded-xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] border border-white/20 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-lg shadow-[#be2656]/20">
                      {item.title?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-white truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#fda4b8]/80 font-mono-code truncate flex items-center gap-1">
                        {item.website || item.url ? (
                          <a
                            href={item.url?.startsWith("http") ? item.url : `https://${item.url || item.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-white inline-flex items-center gap-0.5"
                          >
                            {item.website || item.url} <ExternalLink className="size-2.5 inline shrink-0" />
                          </a>
                        ) : (
                          "—"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="glass-badge-blush text-[0.65rem]">
                      {item.category || "General"}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-[#fda4b8]/70 hover:text-rose-300 hover:bg-rose-950 transition-colors shrink-0"
                      title="Move to trash"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Username Field */}
                <div className="p-2.5 rounded-xl bg-[#130207] border border-[#7a1534] flex items-center justify-between gap-2.5 text-xs">
                  <span className="text-[#fda4b8] text-[0.7rem] uppercase font-mono-code font-bold shrink-0">User:</span>
                  <span className="font-mono-code font-medium text-[#fff5f7] truncate flex-1 min-w-0">{item.username || "—"}</span>
                  <button
                    onClick={() => {
                      copy(item.username, `${item.id}-user`);
                      toast.success("Username copied!");
                    }}
                    disabled={!item.username}
                    className="p-1.5 rounded-lg bg-[#240610] text-[#fda4b8] hover:text-white disabled:opacity-30 transition-colors cursor-pointer border border-[#7a1534] shrink-0"
                    title="Copy Username"
                  >
                    {copied && copiedId === `${item.id}-user` ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>

                {/* Password Field */}
                <div className="p-2.5 rounded-xl bg-[#20050e] border border-[#7a1534] flex items-center justify-between gap-2.5 text-xs">
                  <span className="text-[#fda4b8] text-[0.7rem] uppercase font-mono-code font-bold flex items-center gap-1.5 shrink-0">
                    <Lock className="size-3.5 text-[#fb7193] shrink-0" /> Key:
                  </span>
                  <span className="font-mono-code text-white font-semibold truncate tracking-wider flex-1 min-w-0">
                    {isPasswordVisible && displayPassword ? displayPassword : "••••••••••••••••"}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleToggleVisible(item)}
                      disabled={isRevealing}
                      className="p-1.5 rounded-lg bg-[#2b0813] text-[#fda4b8] hover:text-white disabled:opacity-50 transition-colors cursor-pointer border border-[#7a1534]"
                      title="Toggle Password Visibility"
                    >
                      {isRevealing ? (
                        <Loader2 className="size-3.5 animate-spin text-[#fb7193]" />
                      ) : isPasswordVisible ? (
                        <EyeOff className="size-3.5" />
                      ) : (
                        <Eye className="size-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleCopyPassword(item)}
                      className="p-1.5 rounded-lg bg-[#2b0813] text-[#fda4b8] hover:text-white transition-colors cursor-pointer border border-[#7a1534]"
                      title="Copy Password"
                    >
                      {copied && copiedId === `${item.id}-pass` ? (
                        <Check className="size-3.5 text-emerald-400" />
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
          <div className="col-span-full glass-panel p-12 rounded-3xl border border-pink-500/25 text-center space-y-3">
            <div className="size-12 rounded-2xl bg-gradient-to-br from-[#7a1534] to-[#f43f6e] flex items-center justify-center mx-auto shadow-lg text-white">
              <Loader2 className="size-6 animate-spin" />
            </div>
            <p className="text-lg font-bold text-white">Loading your vault…</p>
            <p className="text-xs text-[#fda4b8]/70 font-mono-code">Decrypting zero-knowledge credentials</p>
          </div>
        )}

        {!isLoading && displayEntries.length === 0 && !error && (
          <div className="col-span-full glass-card p-12 rounded-3xl text-center space-y-3 border border-dashed border-pink-500/25">
            <ShieldAlert className="size-12 text-[#fda4b8]/50 mx-auto" />
            <h3 className="text-lg font-bold text-white">
              {search ? `No credentials found matching "${search}"` : "No vault entries found"}
            </h3>
            <p className="text-xs text-[#fda4b8]/80">
              {search
                ? "Try a different search query or check spelling."
                : "Add your first secret credential using the button above."}
            </p>
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="glass-btn-secondary text-xs px-4 py-2"
              >
                Clear Search ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* Unlock Vault Modal */}
      {isUnlockModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c0205]/85 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1a040b] rounded-3xl border border-pink-500/35 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-gradient-to-br from-[#7a1534] to-[#f43f6e] text-white flex items-center justify-center font-bold shadow-lg">
                  <Unlock className="size-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Unlock Vault</h2>
              </div>
              <button
                onClick={() => setIsUnlockModalOpen(false)}
                className="p-1.5 rounded-lg bg-[#280712] text-[#fda4b8] hover:text-white border border-pink-500/20"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-xs text-[#fda4b8] leading-relaxed">
              Enter your Master Password to derive your AES encryption key. Never leaves your browser memory.
            </p>

            {unlockError && (
              <div className="bg-rose-950 border border-rose-500/40 text-rose-200 text-xs px-3.5 py-2.5 rounded-xl">
                {unlockError}
              </div>
            )}

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#fda4b8] block mb-1.5">
                  Master Password 🔑
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={unlockPassword}
                  onChange={(e) => setUnlockPassword(e.target.value)}
                  placeholder="Enter your master password"
                  className="glass-input text-xs bg-[#120307]"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUnlockModalOpen(false)}
                  className="glass-btn-ghost text-xs px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={unlocking || !unlockPassword}
                  className="glass-btn-primary px-5 py-2 text-xs gap-2"
                >
                  {unlocking ? <Loader2 className="size-3.5 animate-spin" /> : <ShieldCheck className="size-3.5" />}
                  Unlock Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c0205]/85 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#1a040b] rounded-3xl border border-pink-500/35 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-gradient-to-br from-[#7a1534] to-[#f43f6e] flex items-center justify-center text-white">
                  <Plus className="size-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Add Secret Entry</h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-[#280712] text-[#fda4b8] hover:text-white border border-pink-500/20"
              >
                <X className="size-4" />
              </button>
            </div>

            {formError && (
              <div className="bg-rose-950 border border-rose-500/40 text-rose-200 text-xs px-3.5 py-2.5 rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddEntry} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-[#fda4b8] block mb-1">
                  Title / Service Name
                </label>
                <input
                  type="text"
                  required
                  value={newForm.title}
                  onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                  placeholder="e.g. GitHub, Google, Netflix"
                  className="glass-input text-xs bg-[#120307]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#fda4b8] block mb-1">
                  Username / Email
                </label>
                <input
                  type="text"
                  value={newForm.username}
                  onChange={(e) => setNewForm({ ...newForm, username: e.target.value })}
                  placeholder="user@example.com"
                  className="glass-input text-xs bg-[#120307]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#fda4b8] block mb-1">
                  Password / Secret Key
                </label>
                <input
                  type="password"
                  required
                  value={newForm.password}
                  onChange={(e) => setNewForm({ ...newForm, password: e.target.value })}
                  placeholder="Secret password"
                  className="glass-input text-xs font-mono-code bg-[#120307]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#fda4b8] block mb-1">
                  Website URL (Optional)
                </label>
                <input
                  type="text"
                  value={newForm.url}
                  onChange={(e) => setNewForm({ ...newForm, url: e.target.value })}
                  placeholder="https://github.com"
                  className="glass-input text-xs bg-[#120307]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#fda4b8] block mb-1">
                  Category
                </label>
                <select
                  value={newForm.category}
                  onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                  className="glass-input text-xs bg-[#120307] text-white"
                >
                  {DEFAULT_CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-[#120307] text-white">{c}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="glass-btn-ghost text-xs px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="glass-btn-primary px-5 py-2 text-xs gap-2"
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
