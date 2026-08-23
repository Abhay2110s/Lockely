import { useAppAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  Wand2,
  Plus,
  ArrowRight,
  TrendingUp,
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
    { label: "Super Strong", value: strong, color: "#4ade80", bg: "bg-[#4ade80]" },
    { label: "Weak / Needs Boost", value: weak, color: "#fb7185", bg: "bg-[#fb7185]" },
    { label: "Fair / Medium", value: other, color: "#fde047", bg: "bg-[#fde047]" },
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
    : { background: "conic-gradient(#e2e8f0 0% 100%)" };

  return (
    <div className="rounded-2xl bg-[#fffef7] border-2.5 border-[#191510] p-5 shadow-[3px_3px_0px_#191510]">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <p className="text-sm font-heading-comic font-bold text-slate-900">Strength Spectrum</p>
          <p className="text-xs text-slate-500 font-comic">Analyzed in memory</p>
        </div>
        <div className="text-xs font-heading-comic font-bold bg-[#fef08a] px-2.5 py-1 rounded-lg border-2 border-[#191510]">
          {loading ? "..." : `${total} Entries`}
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div
          className="relative size-28 shrink-0 rounded-full border-3 border-[#191510] shadow-[2.5px_2.5px_0px_#191510]"
          style={chartStyle}
          aria-label="Password strength distribution pie chart"
          role="img"
        >
          <div className="absolute inset-[18%] rounded-full bg-white border-2 border-[#191510] flex flex-col items-center justify-center shadow-inner">
            <span className="text-2xl font-black font-heading-comic text-slate-950">
              {loading ? "—" : stats.securityScore}
            </span>
            <span className="text-[0.6rem] font-bold uppercase tracking-wider text-slate-600 font-heading-comic">
              PTS
            </span>
          </div>
        </div>

        <div className="space-y-2 min-w-0 flex-1">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`size-3 rounded-md border border-[#191510] shrink-0 ${segment.bg}`} />
                <span className="text-slate-700 font-comic font-bold truncate">{segment.label}</span>
              </div>
              <span className="font-heading-comic font-bold text-slate-950 bg-white px-1.5 py-0.5 rounded border border-[#191510]">
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
        cardBg: "bg-[#fef08a]",
        iconBg: "bg-white",
        positive: true,
      },
      {
        label: "Security Score",
        value: `${stats.securityScore}%`,
        change:
          stats.securityScore >= 80
            ? "Super Fortress! 🛡️"
            : stats.securityScore >= 50
              ? "Good, needs tuning ⚠️"
              : "Vulnerable! 💥",
        icon: ShieldCheck,
        cardBg: "bg-[#bbf7d0]",
        iconBg: "bg-white",
        positive: stats.securityScore >= 80,
      },
      {
        label: "Weak Passwords",
        value: stats.weakPasswords,
        change: stats.weakPasswords === 0 ? "Rock Solid! 💎" : "Upgrade recommended",
        icon: AlertCircle,
        cardBg: "bg-[#fda4af]",
        iconBg: "bg-white",
        positive: stats.weakPasswords === 0,
      },
      {
        label: "Reused Passwords",
        value: stats.reusedPasswords,
        change:
          stats.reusedPasswords === 0
            ? "All unique! ✨"
            : `${stats.reusedGroups} reused group${stats.reusedGroups === 1 ? "" : "s"}`,
        icon: RotateCcw,
        cardBg: "bg-[#ddd6fe]",
        iconBg: "bg-white",
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
      <div className="relative overflow-hidden bg-[#ffe066] border-[3px] border-[#191510] text-[#191510] p-5 sm:p-7 lg:p-9 shadow-[6px_6px_0px_#191510]">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#191510] ca-mono text-[0.65rem] text-[#ffe066] border-2 border-[#191510]">
            <Zap className="size-3.5 fill-[#ffe066] text-[#ffe066]" />
            Zero-Knowledge Comic Vault
          </div>
          <h1 className="ca-display text-4xl sm:text-5xl text-[#191510] leading-none">
            Hey, {firstName}!
          </h1>
          <p className="ca-mono text-[0.72rem] text-[#191510]/70 leading-relaxed max-w-md">
            Secrets fortified with AES-256-GCM and zero-knowledge client encryption.
          </p>

          <div className="pt-1 flex flex-wrap gap-3">
            <Link
              to="/vault"
              className="btn-comic btn-comic-primary px-5 py-2.5 gap-2"
            >
              <Plus className="size-4" />
              Add New Password
            </Link>
            <Link
              to="/generator"
              className="btn-comic btn-comic-sky px-5 py-2.5 gap-2"
            >
              <Wand2 className="size-4" />
              Super Generator
            </Link>
            <button
              type="button"
              onClick={() => loadDashboard({ silent: true })}
              disabled={refreshing}
              className="btn-comic btn-comic-white px-4 py-2.5 gap-2"
            >
              {refreshing ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
              Sync Stats
            </button>
          </div>
        </div>

        <div className="absolute right-4 bottom-3 hidden lg:flex flex-col items-center rotate-6">
          <div className="size-24 bg-[#191510] border-[3px] border-[#191510] shadow-[4px_4px_0px_#191510] flex items-center justify-center text-[#ffe066]">
            <ShieldCheck className="size-14" />
          </div>
          <span className="ca-mono text-[0.6rem] bg-[#ffe066] px-2 py-0.5 border border-[#191510] -mt-2 shadow-[1px_1px_0px_#191510]">
            100% PROTECTED
          </span>
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-between gap-4 bg-[#fda4af] border-2.5 border-[#191510] text-slate-950 text-xs font-bold px-4 py-3 rounded-2xl shadow-[3px_3px_0px_#191510]">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => loadDashboard()}
            className="inline-flex items-center gap-1.5 shrink-0 bg-white px-2 py-1 rounded-lg border border-[#191510]"
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
              className={`${stat.cardBg} p-5 border-2 border-[#191510] shadow-[4px_4px_0px_#191510] flex items-center justify-between transition-transform hover:-translate-y-1`}
            >
              <div className="space-y-1.5">
                <p className="ca-mono text-[0.6rem] text-[#191510]/60 uppercase tracking-widest">
                  {stat.label}
                </p>
                <p className="ca-display text-3xl text-[#191510] leading-none">
                  {loading ? (
                    <span className="inline-block h-8 w-14 bg-white/60 animate-pulse border border-[#191510]" />
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="ca-mono text-[0.6rem] text-[#191510]/60 flex items-center gap-1">
                  {stat.change}
                </p>
              </div>
              <div className={`size-12 ${stat.iconBg} border-2 border-[#191510] shadow-[2px_2px_0px_#191510] flex items-center justify-center shrink-0`}>
                <Icon className="size-6 text-[#191510]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Recent Entries + Vault Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Entries */}
        <div className="lg:col-span-2 bg-white border-[3px] border-[#191510] p-6 sm:p-8 shadow-[5px_5px_0px_#191510] space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="ca-display text-xl text-[#191510]">
                Recent Credentials
              </h2>
              <p className="ca-mono text-[0.62rem] text-[#191510]/50 mt-1">
                Quick access to your latest saved passwords
              </p>
            </div>
            <Link
              to="/vault"
              className="ca-mono text-[0.65rem] bg-[#7dd3fc] text-[#191510] px-3 py-1.5 border-2 border-[#191510] shadow-[2px_2px_0px_#191510] hover:-translate-y-0.5 flex items-center gap-1 shrink-0 transition-transform"
            >
              Open Vault <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((row) => (
                <div key={row} className="h-16 bg-slate-100 border-2 border-[#191510] animate-pulse" />
              ))}
            </div>
          ) : recentEntries.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-[#191510] bg-[#faf6ea]">
              <KeyRound className="size-12 text-slate-400 mx-auto mb-3" />
              <h3 className="ca-display text-base text-[#191510]">Your vault is squeaky clean!</h3>
              <p className="ca-mono text-[0.62rem] text-[#191510]/50 mt-1 mb-4">Add your first login credential to see it here.</p>
              <Link
                to="/vault"
                className="btn-comic btn-comic-yellow py-2.5 px-4 gap-2"
              >
                <Plus className="size-4" /> Add First Entry
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3.5 bg-white border-2 border-[#191510] shadow-[2.5px_2.5px_0px_#191510] flex items-center justify-between gap-4 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="size-11 bg-[#ffe066] border-2 border-[#191510] text-[#191510] ca-display text-base flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#191510]">
                      {entry.title?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <h3 className="ca-mono text-[0.72rem] text-[#191510] truncate">
                          {entry.title}
                        </h3>
                        {entry.favorite && <Star className="size-3.5 text-amber-500 fill-amber-400 shrink-0" />}
                      </div>
                      <p className="ca-mono text-[0.62rem] text-[#191510]/50 truncate">
                        {entry.username || entry.email || entry.website || "No username"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="hidden sm:inline-block px-2.5 py-0.5 bg-[#c4b5fd] text-[#191510] border border-[#191510] ca-mono text-[0.6rem]">
                      {entry.category || "General"}
                    </span>
                    <span className="ca-mono text-[0.6rem] text-[#191510]/50 hidden md:inline-flex items-center gap-1">
                      <Clock3 className="size-3" />
                      {formatRelativeTime(entry.createdAt)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(entry)}
                      className="p-2 rounded-xl bg-[#fef08a] border-2 border-[#191510] shadow-[1.5px_1.5px_0px_#191510] text-slate-950 hover:-translate-y-0.5 transition-all"
                      title="Copy password"
                    >
                      {copied && copiedId === entry.id ? (
                        <Check className="size-4 text-emerald-700" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vault Health Column */}
        <div className="bg-white border-[3px] border-[#191510] p-6 sm:p-8 shadow-[5px_5px_0px_#191510] space-y-5">
          <div>
            <h2 className="ca-display text-xl text-[#191510]">
              Vault Health
            </h2>
            <p className="ca-mono text-[0.62rem] text-[#191510]/50 mt-1">
              Real-time security diagnostics
            </p>
          </div>

          <PasswordStrengthPie stats={stats} loading={loading} />

          <div className="bg-[#c4b5fd] border-2 border-[#191510] p-4 shadow-[3px_3px_0px_#191510]">
            <div className="flex items-center justify-between mb-2">
              <span className="ca-mono text-[0.62rem] text-[#191510]">Security Score</span>
              <span className="ca-display text-sm text-[#191510]">
                {loading ? "—" : `${stats.securityScore}%`}
              </span>
            </div>
            <div className="h-3 bg-white border-2 border-[#191510] overflow-hidden">
              <div
                className="h-full bg-[#86efac] border-r-2 border-[#191510] transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, stats.securityScore))}%` }}
              />
            </div>
          </div>

          <div className="space-y-0 bg-white border-2 border-[#191510] shadow-[2px_2px_0px_#191510]">
            {[
              { label: "Strong Passwords", val: stats.strongPasswords, ok: true },
              { label: "Weak Passwords", val: stats.weakPasswords, ok: stats.weakPasswords === 0 },
              { label: "Expired Passwords", val: stats.expiredPasswords, ok: stats.expiredPasswords === 0 },
              { label: "Reused Passwords", val: stats.reusedPasswords, ok: stats.reusedPasswords === 0 },
              { label: "Entropy Score", val: `${Number(stats.averageEntropy || 0).toFixed(1)} bits`, ok: true },
            ].map(({ label, val, ok }, i) => (
              <div key={label} className={`flex items-center justify-between px-4 py-2.5 ca-mono text-[0.65rem] ${i > 0 ? "border-t border-[#191510]/20" : ""}`}>
                <span className="text-[#191510]/60">{label}</span>
                <span className={`px-2 py-0.5 border border-[#191510] ${ok ? "bg-[#86efac] text-emerald-900" : "bg-[#fda4af] text-rose-900"}`}>
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
