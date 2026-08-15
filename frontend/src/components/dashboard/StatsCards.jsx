import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * StatsCards — reusable grid of stat metric cards.
 * @param {Array} stats - Array of { label, value, change, changeTrend, icon, colorClass }
 */
export default function StatsCards({ stats = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        const isPositive = stat.changeTrend !== "down";
        return (
          <div
            key={i}
            className="relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between overflow-hidden group"
          >
            {/* Subtle hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

            <div className="relative space-y-1">
              <p className="text-[0.68rem] font-semibold text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
              <p className={cn(
                "text-[0.68rem] font-semibold flex items-center gap-1",
                isPositive ? "text-emerald-600" : "text-rose-500"
              )}>
                {isPositive
                  ? <TrendingUp className="size-3" />
                  : <TrendingDown className="size-3" />}
                {stat.change}
              </p>
            </div>

            <div className={cn(
              "relative size-12 rounded-2xl flex items-center justify-center shrink-0",
              stat.colorClass || "bg-indigo-50 text-indigo-600"
            )}>
              {Icon && <Icon className="size-6" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
