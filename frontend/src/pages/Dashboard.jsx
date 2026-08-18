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
} from "lucide-react";
import { getDashboardStats, getPasswordById, getPasswords } from "@/services/password.service";

const formatRelativeTime = (dateValue) => {
  if (!dateValue) return "Recently";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Recently";

  const diffMs = Date.now() - date.getTime();
  const diffSeconds = Math.max(0, Math.floor(diffMs / 1000));

  if (diffSeconds < 60) return "Just now";

  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
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
    { label: "Strong", value: strong, className: "bg-emerald-500", color: "#10b981" },
    { label: "Weak", value: weak, className: "bg-amber-500", color: "#f59e0b" },
    { label: "Other", value: other, className: "bg-slate-300", color: "#cbd5e1" },
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
    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <p className="text-xs font-semibold text-slate-700">Password strength</p>
          <p className="text-[0.7rem] text-slate-400 mt-0.5">Based on your current vault</p>
        </div>
        <div className="text-[0.7rem] font-bold text-slate-500">
          {loading ? "Loading…" : `${total} item${total === 1 ? "" : "s"}`}
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div
          className="relative size-28 shrink-0 rounded-full"
          style={chartStyle}
          aria-label="Password strength distribution pie chart"
          role="img"
        >
          <div className="absolute inset-[18%] rounded-full bg-white flex flex-col items-center justify-center shadow-sm">
            <span className="text-xl font-extrabold text-slate-900">
              {loading ? "—" : stats.securityScore}
            </span>
            <span className="text-[0.58rem] font-semibold uppercase tracking-wider text-slate-400">
              score
            </span>
          </div>
        </div>

        <div className="space-y-2.5 min-w-0 flex-1">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center justify-between gap-3 text-[0.7rem]">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`size-2.5 rounded-full shrink-0 ${segment.className}`} />
                <span className="text-slate-500 truncate">{segment.label}</span>
              </div>
              <span className="font-bold text-slate-800">
                {loading ? "—" : segment.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {!loading && total === 0 && (
        <p className="mt-4 text-[0.68rem] text-slate-400">
          Add a vault entry to populate the chart.
        </p>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAppAuth();
  const [stats, setStats] = useState(emptyStats);
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

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
            : `${stats.favoritePasswords} favorite${stats.favoritePasswords === 1 ? "" : "s"}`,
        icon: KeyRound,
        color: "text-indigo-600 bg-indigo-50",
        positive: true,
      },
      {
        label: "Security Health",
        value: `${stats.securityScore}%`,
        change:
          stats.securityScore >= 80
            ? "Healthy vault"
            : stats.securityScore >= 50
              ? "Needs attention"
              : "Action required",
        icon: ShieldCheck,
        color: "text-emerald-600 bg-emerald-50",
        positive: stats.securityScore >= 80,
      },
      {
        label: "Weak Passwords",
        value: stats.weakPasswords,
        change: stats.weakPasswords === 0 ? "All clear" : "Action advised",
        icon: AlertCircle,
        color: "text-amber-600 bg-amber-50",
        positive: stats.weakPasswords === 0,
      },
      {
        label: "Reused Passwords",
        value: stats.reusedPasswords,
        change:
          stats.reusedPasswords === 0
            ? "No reuse detected"
            : `${stats.reusedGroups} reused group${stats.reusedGroups === 1 ? "" : "s"}`,
        icon: RotateCcw,
        color: "text-rose-600 bg-rose-50",
        positive: stats.reusedPasswords === 0,
      },
    ],
    [stats]
  );

  const handleCopy = async (id) => {
    try {
      const response = await getPasswordById(id, true);
      const password = response?.data?.password;
      if (!password) return;

      await navigator.clipboard.writeText(password);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't copy the password.");
    }
  };

  const firstName = user?.name?.trim()?.split(" ")[0] || "Guardian";

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="size-3.5 text-indigo-300" />
            Your secure vault
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 leading-relaxed">
            Manage your saved credentials, monitor password security, and keep your vault up to date.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/vault"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all"
            >
              <Plus className="size-4" />
              Add Vault Entry
            </Link>
            <Link
              to="/generator"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-5 py-2.5 rounded-xl backdrop-blur-md transition-all"
            >
              <Wand2 className="size-4 text-indigo-300" />
              Password Generator
            </Link>
            <button
              type="button"
              onClick={() => loadDashboard({ silent: true })}
              disabled={refreshing}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 disabled:opacity-60 text-white text-xs font-semibold px-4 py-2.5 rounded-xl backdrop-blur-md transition-all"
            >
              {refreshing ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
              Refresh
            </button>
          </div>
        </div>

        <div className="absolute -right-16 -bottom-16 size-72 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      {error && (
        <div className="flex items-center justify-between gap-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-4 py-3 rounded-xl">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => loadDashboard()}
            className="inline-flex items-center gap-1.5 shrink-0 hover:text-rose-900"
          >
            <RefreshCw className="size-3.5" /> Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">
                  {loading ? <span className="inline-block h-8 w-14 rounded-lg bg-slate-100 animate-pulse" /> : stat.value}
                </p>
                <p
                  className={`text-[0.7rem] font-semibold flex items-center gap-1 ${
                    stat.positive ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  <TrendingUp className="size-3" /> {stat.change}
                </p>
              </div>
              <div className={`size-12 rounded-2xl ${stat.color} flex items-center justify-center`}>
                <Icon className="size-6" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Vault Entries</h2>
              <p className="text-xs text-slate-500">Your latest saved credentials from the vault</p>
            </div>
            <Link
              to="/vault"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 shrink-0"
            >
              View All <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((row) => (
                <div key={row} className="h-16 rounded-2xl bg-slate-50 animate-pulse" />
              ))}
            </div>
          ) : recentEntries.length === 0 ? (
            <div className="py-12 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
              <KeyRound className="size-10 text-slate-200 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-700">Your vault is empty</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4">Add your first credential to see it here.</p>
              <Link
                to="/vault"
                className="inline-flex items-center gap-2 btn-soft-primary text-xs py-2.5 px-4"
              >
                <Plus className="size-4" /> Add First Entry
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="py-4 flex items-center justify-between gap-4 hover:bg-slate-50/80 px-3 rounded-2xl transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="size-10 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center shrink-0">
                      {entry.title?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="text-xs font-bold text-slate-900 truncate">{entry.title}</h3>
                        {entry.favorite && <Star className="size-3 text-amber-500 fill-amber-400 shrink-0" />}
                      </div>
                      <p className="text-[0.7rem] text-slate-500 truncate">
                        {entry.username || entry.email || entry.website || "No username"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[0.65rem] font-semibold">
                      {entry.category || "General"}
                    </span>
                    <span className="text-[0.65rem] text-slate-400 hidden md:inline-flex items-center gap-1">
                      <Clock3 className="size-3" />
                      {formatRelativeTime(entry.createdAt)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(entry.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      title="Copy password"
                    >
                      {copiedId === entry.id ? (
                        <Check className="size-4 text-emerald-600" />
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

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Vault Health</h2>
            <p className="text-xs text-slate-500">Live metrics calculated from your saved entries</p>
          </div>

          <PasswordStrengthPie stats={stats} loading={loading} />

          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-600">Security score</span>
              <span className="text-sm font-extrabold text-slate-900">{loading ? "—" : `${stats.securityScore}%`}</span>
            </div>
            <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, stats.securityScore))}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-slate-500">Strong passwords</span>
              <span className="text-xs font-bold text-slate-800">{stats.strongPasswords}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-slate-100">
              <span className="text-xs text-slate-500">Weak passwords</span>
              <span className={`text-xs font-bold ${stats.weakPasswords > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                {stats.weakPasswords}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-slate-100">
              <span className="text-xs text-slate-500">Expired passwords</span>
              <span className={`text-xs font-bold ${stats.expiredPasswords > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                {stats.expiredPasswords}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-slate-100">
              <span className="text-xs text-slate-500">Reused passwords</span>
              <span className={`text-xs font-bold ${stats.reusedPasswords > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                {stats.reusedPasswords}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-slate-100">
              <span className="text-xs text-slate-500">Average entropy</span>
              <span className="text-xs font-bold text-slate-800">{Number(stats.averageEntropy || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
