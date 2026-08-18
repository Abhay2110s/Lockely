import { useAppAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  KeyRound,
  Wand2,
  Lock,
  Plus,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAppAuth();
  const [copiedId, setCopiedId] = useState(null);

  const stats = [
    { label: "Total Vault Logins", value: "24", change: "+4 this month", icon: KeyRound, color: "text-indigo-600 bg-indigo-50" },
    { label: "Security Health Score", value: "98%", change: "Optimal", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" },
    { label: "Compromised Alerts", value: "0", change: "Clean scan", icon: Lock, color: "text-blue-600 bg-blue-50" },
    { label: "Weak Passwords", value: "1", change: "Action advised", icon: AlertCircle, color: "text-amber-600 bg-amber-50" },
  ];

  const recentEntries = [
    { id: 1, title: "GitHub Master Account", username: user?.email || "user@passguardian.dev", category: "Developer", date: "2 mins ago" },
    { id: 2, title: "Google Workspace Admin", username: "admin@company.com", category: "Work", date: "1 hour ago" },
    { id: 3, title: "Stripe Billing Dashboard", username: "finance@startup.io", category: "Finance", date: "Yesterday" },
    { id: 4, title: "AWS Cloud Infrastructure", username: "root-dev", category: "Infrastructure", date: "3 days ago" },
  ];

  const handleCopy = (id) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="size-3.5 text-indigo-300" />
            Zero-Knowledge Session Active
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {user?.name?.split(" ")[0] || "Guardian"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 leading-relaxed">
            Your secrets are encrypted client-side with military-grade AES-256 bit encryption. No unencrypted data ever leaves your device.
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
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-16 -bottom-16 size-72 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-[0.7rem] font-semibold text-slate-400 flex items-center gap-1">
                  <TrendingUp className="size-3 text-emerald-500" /> {stat.change}
                </p>
              </div>
              <div className={`size-12 rounded-2xl ${stat.color} flex items-center justify-center`}>
                <Icon className="size-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Vault Entries Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Vault Entries</h2>
            <p className="text-xs text-slate-500">Quick access to your saved passwords and credentials</p>
          </div>
          <Link
            to="/vault"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            View All Vault Items <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {recentEntries.map((entry) => (
            <div
              key={entry.id}
              className="py-4 flex items-center justify-between gap-4 hover:bg-slate-50/80 px-3 rounded-2xl transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="size-10 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center shrink-0">
                  {entry.title[0]}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 truncate">{entry.title}</h3>
                  <p className="text-[0.7rem] text-slate-500 truncate">{entry.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[0.65rem] font-semibold">
                  {entry.category}
                </span>
                <span className="text-[0.65rem] text-slate-400 hidden sm:inline-block">{entry.date}</span>
                <button
                  onClick={() => handleCopy(entry.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  title="Copy Password"
                >
                  {copiedId === entry.id ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}