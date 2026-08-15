import { UserButton } from "@clerk/react";
import { Menu, Search, Bell } from "lucide-react";

/**
 * Topbar — dashboard header bar with search, notifications, and user menu.
 * @param {Function} onMenuClick - mobile menu open handler
 */
export default function Topbar({ onMenuClick }) {
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
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-indigo-600" />
        </button>

        {/* Clerk User Button */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox:
                "size-9 border-2 border-indigo-500/20 shadow-xs hover:scale-105 transition-transform",
            },
          }}
        />
      </div>
    </header>
  );
}
