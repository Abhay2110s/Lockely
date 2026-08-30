import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  KeyRound,
  ShieldCheck,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Plus,
  ArrowRight,
  Copy,
  Check,
  Star,
  Clock3,
  ShieldAlert,
} from "lucide-react";
import { getDashboardStats, getPasswords } from "@/services/password.service";
import { decryptSecret } from "@/services/crypto.service";
import { useAppAuth } from "@/context/AuthContext";
import useClipboard from "@/hooks/useClipboard";
import { formatRelativeTime } from "@/lib/helpers";
import toast from "react-hot-toast";

const emptyStats = {
  totalPasswords: 0,
  favoritePasswords: 0,
  weakPasswords: 0,
  reusedPasswords: 0,
  reusedGroups: 0,
  securityScore: 100,
  averageEntropy: 0,
  expiredPasswords: 0,
  compromisedCount: 0,
  strengthBreakdown: {
    weak: 0,
    fair: 0,
    good: 0,
    strong: 0,
  },
};

function PasswordStrengthPie({ stats }) {
  const breakdown = stats?.strengthBreakdown || {
    weak: 0,
    fair: 0,
    good: 0,
    strong: 0,
  };
  const total =
    breakdown.weak + breakdown.fair + breakdown.good + breakdown.strong || 1;

  const weakPct = Math.round((breakdown.weak / total) * 100);
  const fairPct = Math.round((breakdown.fair / total) * 100);
  const goodPct = Math.round((breakdown.good / total) * 100);
  const strongPct = 100 - (weakPct + fairPct + goodPct);

  return (
    <div className="space-y-4">
      {/* Visual Bar Spectrum */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-[#120307] rounded-full overflow-hidden flex border border-pink-500/20">
          <div
            style={{ width: `${weakPct}%` }}
            className="h-full bg-rose-500 transition-all duration-500"
            title={`Weak: ${breakdown.weak}`}
          />
          <div
            style={{ width: `${fairPct}%` }}
            className="h-full bg-pink-400 transition-all duration-500"
            title={`Fair: ${breakdown.fair}`}
          />
          <div
            style={{ width: `${goodPct}%` }}
            className="h-full bg-pink-300 transition-all duration-500"
            title={`Good: ${breakdown.good}`}
          />
          <div
            style={{ width: `${strongPct}%` }}
            className="h-full bg-emerald-400 transition-all duration-500"
            title={`Strong: ${breakdown.strong}`}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="size-2.5 rounded-full bg-rose-500 shrink-0" />
            <span className="text-[#fda4b8]/70">Weak:</span>
            <span className="font-mono-code font-bold text-white">{breakdown.weak}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="size-2.5 rounded-full bg-pink-400 shrink-0" />
            <span className="text-[#fda4b8]/70">Fair:</span>
            <span className="font-mono-code font-bold text-white">{breakdown.fair}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="size-2.5 rounded-full bg-pink-300 shrink-0" />
            <span className="text-[#fda4b8]/70">Good:</span>
            <span className="font-mono-code font-bold text-white">{breakdown.good}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="size-2.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-[#fda4b8]/70">Strong:</span>
            <span className="font-mono-code font-bold text-white">{breakdown.strong}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { vaultKey, displayName } = useAppAuth();
  const [stats, setStats] = useState(emptyStats);
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { copied, copiedId, copy } = useClipboard(2000);

  const loadDashboard = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
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
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const [statsResponse, entriesResponse] = await Promise.all([
          getDashboardStats(),
          getPasswords({ limit: 5, sortBy: "latest" }),
        ]);
        if (!ignore) {
          setStats(statsResponse?.data || emptyStats);
          setRecentEntries(entriesResponse?.data?.entries || []);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err?.response?.data?.message ||
              "Couldn't load your dashboard. Please make sure the backend is running."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, []);

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
      copy(password, entry.id);
      toast.success("Decrypted password copied to clipboard! 📋");
    } catch {
      toast.error("Could not decrypt password with current key.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 lg:p-10 border border-pink-500/25 shadow-2xl bg-gradient-to-br from-[#280712] via-[#3c0b1a] to-[#581026]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-badge-blush text-xs mb-1">
              <Sparkles className="size-3.5 text-[#f43f6e]" />
              <span>Zero-Knowledge AES-256 Vault</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome, {displayName}!
            </h1>
            <p className="text-xs sm:text-sm text-[#ffe4e9]/80 max-w-xl font-normal leading-relaxed">
              Your cryptographic keys and passwords are safe, encrypted on device, and synchronized under zero-knowledge privacy.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/vault"
              className="glass-btn-primary py-3 px-5 text-xs font-semibold"
            >
              <Plus className="size-4" />
              <span>Add Password</span>
            </Link>
            <Link
              to="/generator"
              className="glass-btn-secondary py-3 px-4 text-xs font-semibold"
            >
              Key Generator
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-950 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => loadDashboard()}
            className="glass-btn-ghost text-xs px-3 py-1 text-rose-200 hover:text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
                    <span className="inline-block h-8 w-16 bg-[#160309] rounded-lg animate-pulse" />
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
                <div key={row} className="h-16 rounded-xl bg-[#160309] animate-pulse" />
              ))}
            </div>
          ) : recentEntries.length === 0 ? (
            <div className="py-12 text-center rounded-2xl bg-[#160309] border border-dashed border-pink-500/25 p-6">
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

          <div className="p-4 rounded-2xl bg-[#160309] border border-pink-500/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#fda4b8]">Security Level</span>
              <span className="text-sm font-bold text-white">
                {loading ? "—" : `${stats.securityScore}%`}
              </span>
            </div>
            <div className="h-2.5 bg-[#120307] rounded-full overflow-hidden border border-pink-500/15">
              <div
                className="h-full bg-gradient-to-r from-[#7a1534] via-[#f43f6e] to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, stats.securityScore))}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-[#160309] border border-pink-500/15 overflow-hidden">
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
