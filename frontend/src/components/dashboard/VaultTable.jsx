import { useState } from "react";
import { Copy, Check, Eye, EyeOff, Lock, Trash2, Globe, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * VaultTable — table view of password vault entries.
 * @param {Array} entries - list of vault items
 * @param {Function} onDelete - called with entry.id
 * @param {Function} onEdit - called with entry object
 */
export default function VaultTable({ entries = [], onDelete, onEdit }) {
  const [copiedField, setCopiedField] = useState(null);
  const [visibleId, setVisibleId] = useState(null);

  const handleCopy = (id, text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(`${id}-${field}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-2">
        <Lock className="size-10 text-slate-200 mx-auto" />
        <p className="text-sm font-semibold text-slate-500">No entries to display</p>
        <p className="text-xs text-slate-400">Add your first vault entry to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="text-left px-5 py-3 font-semibold text-slate-500 uppercase tracking-wider">
                Account
              </th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                Username
              </th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500 uppercase tracking-wider">
                Password
              </th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                Category
              </th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                Updated
              </th>
              <th className="px-5 py-3 text-right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {entries.map((entry) => {
              const isVisible = visibleId === entry.id;
              return (
                <tr
                  key={entry.id}
                  className="hover:bg-slate-50/60 transition-colors group"
                >
                  {/* Account */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-100">
                        {entry.title?.[0]?.toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 truncate">{entry.title}</p>
                        {entry.url && (
                          <a
                            href={entry.url.startsWith("http") ? entry.url : `https://${entry.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[0.65rem] text-slate-400 hover:text-indigo-500 flex items-center gap-0.5 truncate"
                          >
                            <Globe className="size-2.5" /> {entry.url}
                          </a>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Username */}
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-600 truncate max-w-[160px]">{entry.username}</span>
                      <button
                        onClick={() => handleCopy(entry.id, entry.username, "user")}
                        className="text-slate-300 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        {copiedField === `${entry.id}-user`
                          ? <Check className="size-3.5 text-emerald-500" />
                          : <Copy className="size-3.5" />}
                      </button>
                    </div>
                  </td>

                  {/* Password */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-800 font-semibold">
                        {isVisible ? entry.password : "••••••••••"}
                      </span>
                      <button
                        onClick={() => setVisibleId(isVisible ? null : entry.id)}
                        className="text-slate-300 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        {isVisible ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                      </button>
                      <button
                        onClick={() => handleCopy(entry.id, entry.password, "pass")}
                        className="text-slate-300 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        {copiedField === `${entry.id}-pass`
                          ? <Check className="size-3.5 text-emerald-500" />
                          : <Copy className="size-3.5" />}
                      </button>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[0.62rem] font-semibold">
                      {entry.category}
                    </span>
                  </td>

                  {/* Updated */}
                  <td className="px-5 py-3.5 text-slate-400 hidden sm:table-cell">{entry.updatedAt}</td>

                  {/* Actions */}
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit?.(entry)}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 opacity-0 group-hover:opacity-100 transition-all"
                        title="Edit"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete?.(entry.id)}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
