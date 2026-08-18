import { Copy, LogIn, Plus, Key, Eye, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const ACTIVITY_ICONS = {
  copy: { icon: Copy, color: "bg-indigo-50 text-indigo-600" },
  login: { icon: LogIn, color: "bg-emerald-50 text-emerald-600" },
  add: { icon: Plus, color: "bg-purple-50 text-purple-600" },
  generate: { icon: Key, color: "bg-amber-50 text-amber-600" },
  view: { icon: Eye, color: "bg-blue-50 text-blue-600" },
  security: { icon: Shield, color: "bg-rose-50 text-rose-500" },
};



/**
 * RecentActivity — activity feed showing recent vault events.
 * @param {Array} activities - list of activity objects
 * @param {number} limit - max items to show
 */
export default function RecentActivity({ activities, limit = 6 }) {
  const items = (activities || []).slice(0, limit);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
        <span className="text-[0.65rem] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
          Live
        </span>
      </div>

      <div className="divide-y divide-slate-50">
        {items.map((activity) => {
          const config = ACTIVITY_ICONS[activity.type] || ACTIVITY_ICONS.view;
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-slate-50/60 transition-colors"
            >
              <div className={cn("size-8 rounded-xl flex items-center justify-center shrink-0", config.color)}>
                <Icon className="size-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-700 truncate">{activity.description}</p>
                <p className="text-[0.65rem] text-slate-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="px-5 py-10 text-center">
          <Shield className="size-8 text-slate-200 mx-auto mb-2" />
          <p className="text-xs text-slate-400">No recent activity yet</p>
        </div>
      )}
    </div>
  );
}
