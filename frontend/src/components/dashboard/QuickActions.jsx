import { Link } from "react-router-dom";
import { Plus, Wand2, Download, Shield, FileSearch, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    label: "Add Password",
    description: "Store new credentials",
    icon: Plus,
    href: "/vault",
    color: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20",
    iconColor: "text-white",
  },
  {
    label: "Generate Key",
    description: "Create strong password",
    icon: Wand2,
    href: "/generator",
    color: "bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-indigo-300",
    iconColor: "text-indigo-600",
  },
  {
    label: "Security Scan",
    description: "Check for breaches",
    icon: FileSearch,
    href: "/vault",
    color: "bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-emerald-300",
    iconColor: "text-emerald-600",
  },
  {
    label: "Export Vault",
    description: "Encrypted backup",
    icon: Download,
    href: "/settings",
    color: "bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-purple-300",
    iconColor: "text-purple-600",
  },
  {
    label: "Security Settings",
    description: "2FA & timeouts",
    icon: Shield,
    href: "/settings",
    color: "bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-rose-300",
    iconColor: "text-rose-500",
  },
  {
    label: "Sync Vault",
    description: "Force sync to cloud",
    icon: RefreshCw,
    href: "/dashboard",
    color: "bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-blue-300",
    iconColor: "text-blue-500",
  },
];

/**
 * QuickActions — grid of quick action shortcut buttons.
 * @param {Function} onAddPassword - optional override for Add Password click
 */
export default function QuickActions({ onAddPassword }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
        <p className="text-[0.65rem] text-slate-400 mt-0.5">Common vault operations at your fingertips</p>
      </div>

      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {actions.map((action, i) => {
          const Icon = action.icon;
          const isFirst = i === 0 && !!onAddPassword;

          if (isFirst) {
            return (
              <button
                key={i}
                onClick={onAddPassword}
                className={cn(
                  "flex flex-col items-start gap-2.5 p-4 rounded-xl text-left transition-all",
                  action.color
                )}
              >
                <div className={cn("size-7 rounded-lg flex items-center justify-center bg-white/20")}>
                  <Icon className={cn("size-4", action.iconColor)} />
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">{action.label}</p>
                  <p className={cn("text-[0.62rem] mt-0.5", i === 0 ? "text-indigo-200" : "text-slate-400")}>
                    {action.description}
                  </p>
                </div>
              </button>
            );
          }

          return (
            <Link
              key={i}
              to={action.href}
              className={cn(
                "flex flex-col items-start gap-2.5 p-4 rounded-xl transition-all",
                action.color
              )}
            >
              <div className="size-7 rounded-lg bg-slate-100/70 flex items-center justify-center">
                <Icon className={cn("size-4", action.iconColor)} />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">{action.label}</p>
                <p className="text-[0.62rem] text-slate-400 mt-0.5">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
