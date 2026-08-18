import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  LayoutDashboard,
  KeyRound,
  Wand2,
  User,
  Settings,
  Menu,
  X,
  Lock,
  Search,
  CheckCircle2,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Password Vault", href: "/vault", icon: KeyRound },
  { label: "Generator", href: "/generator", icon: Wand2 },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { displayName, initials, logout } = useAppAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 flex flex-col md:flex-row">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:sticky top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        h-screen overflow-y-auto
      `}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <ShieldCheck className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  PassGuardian
                </span>
                <span className="text-[0.6rem] font-semibold tracking-wider text-slate-400 uppercase">
                  Encrypted Vault
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* User Quick Info */}
          <div className="p-4 mx-3 my-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
            <div className="size-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {displayName}
              </p>
              <p className="text-[0.65rem] text-indigo-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="size-3" /> Encrypted Session
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.href);
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    }
                  `}
                >
                  <Icon className={`size-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Security Badge Footer */}
        <div className="p-4 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-2.5">
            <div className="size-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Lock className="size-3.5" />
            </div>
            <div>
              <p className="text-[0.7rem] font-bold text-indigo-950">Zero-Knowledge</p>
              <p className="text-[0.62rem] text-indigo-700/80">AES-256 Bit Encryption</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
            >
              <Menu className="size-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 text-slate-400 text-xs w-64 border border-slate-200/60">
              <Search className="size-3.5 text-slate-400" />
              <span>Search vault entries...</span>
              <kbd className="ml-auto text-[0.6rem] bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 font-mono">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[0.7rem] font-semibold">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Vault Locked &amp; Syncing
            </div>

            {/* User Avatar + Sign Out */}
            <div className="relative group">
              <button className="size-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm border-2 border-indigo-500/20 shadow-xs hover:scale-105 transition-transform">
                {initials}
              </button>
              {/* Dropdown */}
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

        {/* Dynamic Page Outlet */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
