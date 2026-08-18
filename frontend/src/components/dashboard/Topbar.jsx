import { useAppAuth } from "@/context/AuthContext";
import { Menu, Search, Bell, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Topbar — dashboard header bar with search, notifications, and user menu.
 * @param {Function} onMenuClick - mobile menu open handler
 */
export default function Topbar({ onMenuClick }) {
  const { initials, logout } = useAppAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Hamburger + Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
        >
          <Menu className="size-5" />
        </button>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 text-slate-400 text-xs w-64 border border-slate-200/60 cursor-text">
          <Search className="size-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-400">Search vault entries...</span>
          <kbd className="ml-auto text-[0.6rem] bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Status + Notifications + User */}
      <div className="flex items-center gap-4">
        {/* Vault Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[0.7rem] font-semibold">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Vault Secured
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 border border-slate-200 transition-colors">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-indigo-600" />
        </button>

        {/* User Avatar + Dropdown */}
        <div className="relative group">
          <button className="size-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm border-2 border-indigo-500/20 shadow-xs hover:scale-105 transition-transform">
            {initials}
          </button>
          <div className="absolute right-0 top-11 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <Link
              to="/profile"
              className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <User className="size-3.5 text-slate-400" />
              Profile
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="size-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
