import { cn } from "@/lib/utils";
import { KeyRound, Globe, CreditCard, FileText, User, Plus, FolderOpen } from "lucide-react";

const DEFAULT_FOLDERS = [
  { id: "all", label: "All Items", icon: KeyRound, count: null },
  { id: "Logins", label: "Logins", icon: Globe, count: null },
  { id: "Cards", label: "Cards", icon: CreditCard, count: null },
  { id: "Notes", label: "Notes", icon: FileText, count: null },
  { id: "Identity", label: "Identity", icon: User, count: null },
];

/**
 * FolderList — sidebar category/folder navigation list.
 * @param {string} active - currently selected folder/category id
 * @param {Function} onChange - called with folder id when selection changes
 * @param {Object} counts - { [folderId]: number } entry counts per folder
 */
export default function FolderList({ active = "all", onChange, counts = {} }) {
  return (
    <div className="space-y-1">
      {/* Section header */}
      <div className="px-3 mb-3 flex items-center justify-between">
        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
          Categories
        </span>
        <button
          className="p-1 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          title="Add folder"
        >
          <Plus className="size-3.5" />
        </button>
      </div>

      {DEFAULT_FOLDERS.map((folder) => {
        const Icon = folder.icon;
        const isActive = active === folder.id;
        const count = folder.id === "all"
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : counts[folder.id] ?? 0;

        return (
          <button
            key={folder.id}
            onClick={() => onChange?.(folder.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all",
              isActive
                ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
            )}
          >
            <Icon className={cn("size-4", isActive ? "text-white" : "text-slate-400")} />
            <span className="flex-1 text-left">{folder.label}</span>
            {count > 0 && (
              <span
                className={cn(
                  "text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}

      {/* Custom Folders Placeholder */}
      <div className="mt-4 px-3">
        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
          My Folders
        </span>
        <div className="mt-2 py-4 flex flex-col items-center gap-1 text-center">
          <FolderOpen className="size-6 text-slate-200" />
          <p className="text-[0.65rem] text-slate-400">No custom folders yet</p>
          <button className="text-[0.65rem] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            <Plus className="size-3" /> Create folder
          </button>
        </div>
      </div>
    </div>
  );
}
