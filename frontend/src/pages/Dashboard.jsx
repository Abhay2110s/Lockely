import { useAppAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  Wand2,
  Plus,
  ArrowRight,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Loader2,
  RotateCcw,
  Star,
  Clock3,
  Zap,
  Sparkles,
} from "lucide-react";
import { getDashboardStats, getPasswords } from "@/services/password.service";
import { decryptSecret } from "@/services/crypto.service";
import useClipboard from "@/hooks/useClipboard";
import toast from "react-hot-toast";

const formatRelativeTime = (dateValue) => {
  if (!dateValue) return "Recently";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Recently";

  const diffMs = Date.now() - date.getTime();
  const diffSeconds = Math.max(0, Math.floor(diffMs / 1000));

  if (diffSeconds < 60) return "Just now";

  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
};

const emptyStats = {
  totalPasswords: 0,
  weakPasswords: 0,
  strongPasswords: 0,
  favoritePasswords: 0,
  averageEntropy: 0,
  reusedPasswords: 0,
  reusedGroups: 0,
  expiredPasswords: 0,
  securityScore: 0,
};

function PasswordStrengthPie({ stats, loading }) {
  const total = Number(stats.totalPasswords || 0);
  const strong = Math.min(total, Math.max(0, Number(stats.strongPasswords || 0)));
  const weak = Math.min(Math.max(0, total - strong), Math.max(0, Number(stats.weakPasswords || 0)));
  const other = Math.max(0, total - strong - weak);

  const segments = [
    { label: "Super Strong", value: strong, color: "#10b981", bg: "bg-emerald-400" },
    { label: "Weak / Vulnerable", value: weak, color: "#f43f6e", bg: "bg-rose-500" },
    { label: "Fair / Medium", value: other, color: "#fda4b8", bg: "bg-pink-300" },
  ];

  let cursor = 0;
  const gradientStops = segments.map((segment) => {
    const start = total ? (cursor / total) * 100 : 0;
    cursor += segment.value;
    const end = total ? (cursor / total) * 100 : 0;
    return `${segment.color} ${start}% ${end}%`;
  });

  const chartStyle = total
    ? { background: `conic-gradient(${gradientStops.join(", ")})` }
    : { background: "conic-gradient(rgba(253,164,184,0.15) 0% 100%)" };

  return (
    <div className="glass-card-subtle p-5 border border-pink-500/15 rounded-2xl">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <p className="text-sm font-bold text-white">Strength Spectrum</p>
          <p className="text-xs text-[#fda4b8]/70">Analyzed locally in memory</p>
        </div>
        <div className="glass-badge-blush text-xs">
          {loading ? "..." : `${total} Entries`}
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div
          className="relative size-28 shrink-0 rounded-full border border-pink-400/30 shadow-lg shadow-pink-950/50"
          style={chartStyle}
          aria-label="Password strength distribution pie chart"
          role="img"
        >
          <div className="absolute inset-[18%] rounded-full bg-[#1f050d] border border-pink-500/20 flex flex-col items-center justify-center shadow-inner">
            <span className="text-2xl font-extrabold text-white">
              {loading ? "—" : stats.securityScore}
            </span>
            <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[#fda4b8] font-mono-code">
              SCORE
            </span>
          </div>
        </div>

        <div className="space-y-2 min-w-0 flex-1">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`size-2.5 rounded-full shrink-0 ${segment.bg}`} />
                <span className="text-[#ffe4e9] truncate font-medium">{segment.label}</span>
              </div>
              <span className="font-mono-code font-bold text-white px-2 py-0.5 rounded-md bg-black/40 border border-pink-500/15">
                {loading ? "—" : segment.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, vaultKey, isVaultUnlocked } = useAppAuth();
  const [stats, setStats] = useState(emptyStats);
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const { copied, copiedId, copy } = useClipboard(2000);

  const loadDashboard = useCallback(async ({ silent = false } = {}) => {
    if (silent) setRefreshing(true);
    else setLoading(true);
    setError("");

    try {
      const [statsResponse, entriesResponse] = await Promise.all([
        getDashboardStats(),
        getPasswords({ limit: 5, sortBy: "latest" }),
      ]);

      setStats(statsResponse?.data || emptyStats);
      setRecentEntries(entriesResponse?.data?.entries || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Couldn't load your dashboard. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const statCards = useMemo(
    () => [
      {
        label: "Total Vault Items",
        value: stats.totalPasswords,
        change:
          stats.totalPasswords === 0
            ? "No items yet"
            : `${stats.favoritePasswords} Starred ⭐`,
        icon: KeyRound,
        positive: true,
      },
      {
        label: "Security Score",
        value: `${stats.securityScore}%`,
        change:
          stats.securityScore >= 80
            ? "Fortress Grade 🛡️"
            : stats.securityScore >= 50
              ? "Needs Attention ⚠️"
              : "Vulnerable! 💥",
        icon: ShieldCheck,
        positive: stats.securityScore >= 80,
      },
      {
        label: "Weak Passwords",
        value: stats.weakPasswords,
        change: stats.weakPasswords === 0 ? "Rock Solid 💎" : "Upgrade recommended",
        icon: AlertCircle,
        positive: stats.weakPasswords === 0,
      },
      {
        label: "Reused Passwords",
        value: stats.reusedPasswords,
        change:
          stats.reusedPasswords === 0
            ? "All unique ✨"
            : `${stats.reusedGroups} reused group${stats.reusedGroups === 1 ? "" : "s"}`,
        icon: RotateCcw,
        positive: stats.reusedPasswords === 0,
      },
    ],
    [stats]
  );

  const handleCopy = async (entry) => {
    try {
      if (!vaultKey) {
        toast.error("Vault is locked. Visit the Vault page to unlock with Master Key.");
        return;
      }
      if (!entry.cipherText || !entry.iv || !entry.authTag) {
        toast.error("Password not available.");
        return;
      }
      const password = await decryptSecret(
        { cipherText: entry.cipherText, iv: entry.iv, authTag: entry.authTag },
        vaultKey
      );
      if (!password) return;

      copy(password, entry.id);
      toast.success("Copied to clipboard! 📋");
    } catch (err) {
      console.error("Failed to copy/decrypt:", err);
      toast.error("Couldn't decrypt this password.");
    }
  };

  const firstName = user?.name?.trim()?.split(" ")[0] || "Guardian";

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-pink-500/25 shadow-2xl bg-gradient-to-br from-[#3c0b1a]/90 via-[#581026]/80 to-[#7a1534]/70">
        
        {/* Glow ambient background */}
        <div className="absolute -top-16 right-0 size-72 rounded-full bg-[#f43f6e]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-badge-blush text-xs">
            <Zap className="size-3.5 text-[#f43f6e] fill-current" />
            <span>Zero-Knowledge Cyber Vault</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Welcome, <span className="text-gradient-blush">{firstName}</span>!
          </h1>
          <p className="text-xs sm:text-sm text-[#ffe4e9]/85 leading-relaxed max-w-md font-normal">
            Your secrets are fortified with AES-256-GCM and zero-knowledge client encryption in memory.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/vault"
              className="glass-btn-primary py-2.5 px-5 text-xs shadow-lg"
            >
              <Plus className="size-4" />
              <span>Add Password</span>
            </Link>
            <Link
              to="/generator"
              className="glass-btn-secondary py-2.5 px-5 text-xs"
            >
              <Wand2 className="size-4 text-[#f43f6e]" />
              <span>Generator</span>
            </Link>
            <button
              type="button"
              onClick={() => loadDashboard({ silent: true })}
              disabled={refreshing}
              className="glass-btn-ghost text-xs py-2.5 px-4"
            >
              {refreshing ? <Loader2 className="size-4 animate-spin text-[#f43f6e]" /> : <RefreshCw className="size-4" />}
              <span>Sync</span>
            </button>
          </div>
        </div>

        <div className="absolute right-8 bottom-6 hidden lg:flex flex-col items-center">
          <div className="size-24 rounded-2xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] border border-white/30 shadow-2xl flex items-center justify-center text-white">
            <ShieldCheck className="size-12" />
          </div>
          <span className="glass-badge-emerald -mt-3 text-[0.6rem] font-bold font-mono-code shadow-md">
            100% PROTECTED
          </span>
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-between gap-4 glass-card p-4 rounded-xl border-rose-500/40 text-rose-200 text-xs">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => loadDashboard()}
            className="inline-flex items-center gap-1.5 shrink-0 glass-btn-secondary text-xs py-1 px-2.5"
          >
            <RefreshCw className="size-3.5" /> Retry
          </button>
        </div>
      )}

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="glass-card p-5 flex items-center justify-between transition-all hover:border-pink-400/40"
            >
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#fda4b8]/70 font-mono-code">
                  {stat.label}
                </p>
                <p className="text-3xl font-extrabold text-white tracking-tight">
                  {loading ? (
                    <span className="inline-block h-8 w-16 bg-white/10 rounded-lg animate-pulse" />
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="text-xs text-[#fda4b8]/80 font-medium">
                  {stat.change}
                </p>
              </div>
              <div className="size-12 rounded-xl bg-gradient-to-br from-[#7a1534] to-[#be2656] border border-white/20 shadow-lg shadow-[#be2656]/20 flex items-center justify-center shrink-0 text-white">
                <Icon className="size-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Recent Entries + Vault Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Entries */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-pink-500/20 shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">
                Recent Credentials
              </h2>
              <p className="text-xs text-[#fda4b8]/70 mt-0.5">
                Quick access to your latest saved passwords
              </p>
            </div>
            <Link
              to="/vault"
              className="glass-btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 shrink-0"
            >
              <span>Open Vault</span>
              <ArrowRight className="size-3.5 text-[#f43f6e]" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((row) => (
                <div key={row} className="h-16 rounded-xl glass-card-subtle animate-pulse" />
              ))}
            </div>
          ) : recentEntries.length === 0 ? (
            <div className="py-12 text-center rounded-2xl glass-card-subtle border border-dashed border-pink-500/25 p-6">
              <KeyRound className="size-12 text-[#fda4b8]/50 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">Your vault is clean</h3>
              <p className="text-xs text-[#fda4b8]/70 mt-1 mb-4">Add your first login credential to see it here.</p>
              <Link
                to="/vault"
                className="glass-btn-primary text-xs py-2 px-4"
              >
                <Plus className="size-4" /> Add First Entry
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3.5 rounded-2xl glass-card-interactive flex items-center justify-between gap-4 border border-pink-500/15"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="size-11 rounded-xl bg-gradient-to-br from-[#7a1534] to-[#f43f6e] border border-white/20 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-md">
                      {entry.title?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">
                          {entry.title}
                        </h3>
                        {entry.favorite && <Star className="size-3.5 text-amber-400 fill-amber-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-[#fda4b8]/70 truncate font-mono-code">
                        {entry.username || entry.email || entry.website || "No username"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full glass-badge-blush text-[0.65rem]">
                      {entry.category || "General"}
                    </span>
                    <span className="text-[0.65rem] text-[#fda4b8]/60 hidden md:inline-flex items-center gap-1 font-mono-code">
                      <Clock3 className="size-3" />
                      {formatRelativeTime(entry.createdAt)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(entry)}
                      className="p-2 rounded-xl glass-btn-secondary text-xs"
                      title="Copy password"
                    >
                      {copied && copiedId === entry.id ? (
                        <Check className="size-4 text-emerald-300" />
                      ) : (
                        <Copy className="size-4 text-[#fda4b8]" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vault Health Column */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-pink-500/20 shadow-2xl">
          <div>
            <h2 className="text-xl font-bold text-white">
              Vault Health
            </h2>
            <p className="text-xs text-[#fda4b8]/70 mt-0.5">
              Real-time security diagnostics
            </p>
          </div>

          <PasswordStrengthPie stats={stats} loading={loading} />

          <div className="p-4 rounded-2xl glass-card-subtle border border-pink-500/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#fda4b8]">Security Level</span>
              <span className="text-sm font-bold text-white">
                {loading ? "—" : `${stats.securityScore}%`}
              </span>
            </div>
            <div className="h-2.5 bg-black/40 rounded-full overflow-hidden border border-pink-500/15">
              <div
                className="h-full bg-gradient-to-r from-[#7a1534] via-[#f43f6e] to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, stats.securityScore))}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl glass-card-subtle border border-pink-500/15 overflow-hidden">
            {[
              { label: "Strong Passwords", val: stats.strongPasswords, ok: true },
              { label: "Weak Passwords", val: stats.weakPasswords, ok: stats.weakPasswords === 0 },
              { label: "Expired Passwords", val: stats.expiredPasswords, ok: stats.expiredPasswords === 0 },
              { label: "Reused Passwords", val: stats.reusedPasswords, ok: stats.reusedPasswords === 0 },
              { label: "Entropy Score", val: `${Number(stats.averageEntropy || 0).toFixed(1)} bits`, ok: true },
            ].map(({ label, val, ok }, i) => (
              <div key={label} className={`flex items-center justify-between px-4 py-3 text-xs ${i > 0 ? "border-t border-pink-500/10" : ""}`}>
                <span className="text-[#fda4b8]/80">{label}</span>
                <span className={`px-2.5 py-0.5 rounded-full font-mono-code font-bold text-xs ${
                  ok ? "glass-badge-emerald" : "glass-badge-blush text-rose-300"
                }`}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
