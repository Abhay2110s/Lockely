import { Copy, Check, Eye, EyeOff, Lock, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categoryColors = {
  Logins: "bg-indigo-50 text-indigo-600 border-indigo-100",
  Cards: "bg-purple-50 text-purple-600 border-purple-100",
  Notes: "bg-amber-50 text-amber-600 border-amber-100",
  Identity: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

/**
 * VaultCard — individual password entry card.
 * @param {Object} item - { id, title, username, password, url, category, updatedAt }
 * @param {Function} onDelete - called with item.id
 * @param {Function} onEdit - called with item
 */
export default function VaultCard({ item, onDelete, onEdit }) {
  const [copied, setCopied] = useState(null); // "user" | "pass"
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const initial = item.title?.[0]?.toUpperCase() || "?";
  const catColor = categoryColors[item.category] || "bg-slate-50 text-slate-600 border-slate-100";

  return (
    <div className="relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200/60 transition-all space-y-4 flex flex-col group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold text-sm shrink-0 border border-indigo-100">
            {initial}
          </div>
          <div className="min-w-0">
            <button
              onClick={() => onEdit?.(item)}
              className="text-sm font-bold text-slate-900 truncate block text-left hover:text-indigo-600 transition-colors"
            >
              {item.title}
            </button>
            <p className="text-[0.7rem] text-slate-400 truncate">{item.url}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <span className={cn("px-2 py-0.5 rounded-full text-[0.62rem] font-bold border", catColor)}>
            {item.category}
          </span>
          <button
            onClick={() => onDelete?.(item.id)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
            title="Delete"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Username */}
      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 text-xs">
        <span className="text-slate-400 text-[0.68rem] uppercase font-semibold shrink-0">User</span>
        <span className="font-mono text-slate-700 truncate flex-1 text-center">{item.username}</span>
        <button
          onClick={() => handleCopy(item.username, "user")}
          className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 shrink-0 transition-colors"
          title="Copy username"
        >
          {copied === "user" ? (
            <Check className="size-3.5 text-emerald-600" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>

      {/* Password */}
      <div className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between gap-2 text-xs">
        <span className="text-indigo-600 text-[0.68rem] uppercase font-semibold flex items-center gap-1 shrink-0">
          <Lock className="size-3" /> Key
        </span>
        <span className="font-mono text-slate-900 font-bold truncate flex-1 text-center">
          {showPassword ? item.password : "••••••••••••"}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
            title={showPassword ? "Hide" : "Reveal"}
          >
            {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
          <button
            onClick={() => handleCopy(item.password, "pass")}
            className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
            title="Copy password"
          >
            {copied === "pass" ? (
              <Check className="size-3.5 text-emerald-600" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[0.65rem] text-slate-400 pt-1 border-t border-slate-50">
        <span>Updated {item.updatedAt}</span>
        <button
          onClick={() => onEdit?.(item)}
          className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
