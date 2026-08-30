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
  Zap,
  LogOut,
  ChevronDown,
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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, displayName, initials, logout, isVaultUnlocked } = useAppAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen app-bg text-[#fff5f7] flex flex-col md:flex-row relative">
      {/* Dynamic ambient glowing background elements */}
      <div className="aurora-orb-burgundy top-[-100px] left-[-100px] w-[500px] h-[500px]" />
      <div className="aurora-orb-blush bottom-[-100px] right-[-100px] w-[550px] h-[550px]" />
      <div className="aurora-orb-burgundy top-[35%] right-[25%] w-[450px] h-[450px]" />

      {/* Mobile Backdrop for Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[#120307]/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================================================================ */}
      {/* SIDEBAR                                                           */}
      {/* ================================================================ */}
      <aside
        className={`
          fixed md:sticky top-0 bottom-0 left-0 z-50 w-64 glass-panel border-r border-pink-500/15 flex flex-col justify-between transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          h-screen overflow-y-auto
        `}
      >
        <div>
          {/* Brand Header */}
          <div className="p-4 sm:p-5 border-b border-pink-500/15 bg-white/[0.02] flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="size-10 rounded-xl bg-gradient-to-br from-[#7a1534] via-[#be2656] to-[#f43f6e] text-white flex items-center justify-center border border-white/25 shadow-lg shadow-[#be2656]/30 group-hover:scale-105 transition-transform">
                <ShieldCheck className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight leading-none">
                  PASSGUARDIAN
                </span>
                <span className="text-[0.6rem] text-[#fda4b8] uppercase tracking-widest font-mono-code font-semibold mt-1">
                  Zero-Knowledge Vault
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 text-[#fda4b8] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* User Quick Info */}
          <div className="p-3 mx-3 mt-4 glass-card-subtle flex items-center gap-3 border border-pink-500/15">
            <div className="size-9 rounded-lg bg-gradient-to-br from-[#7a1534] to-[#f43f6e] text-white flex items-center justify-center text-xs font-bold shadow-md shadow-pink-900/40 shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#fff5f7] truncate">
                {displayName}
              </p>
              <div className="glass-badge-emerald text-[0.6rem] py-0.5 px-2 mt-1 w-fit">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Zero-Knowledge
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 mt-5 space-y-1">
            <p className="text-[0.6rem] text-[#fda4b8]/60 px-3 mb-2 font-mono-code tracking-widest uppercase font-semibold">
              Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.href);
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#7a1534]/90 via-[#be2656]/80 to-[#f43f6e]/70 text-white font-semibold shadow-lg shadow-[#be2656]/25 border border-pink-400/40"
                        : "text-[#fda4b8]/75 hover:text-white hover:bg-white/[0.06] border border-transparent"
                    }
                  `}
                >
                  <Icon className={`size-4 ${isActive ? "text-white" : "text-[#fda4b8]"}`} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer — Security Badge & Log Out Action */}
        <div className="p-3 space-y-2.5">
          {/* Direct Mobile/Sidebar Logout Button */}
          <button
            onClick={() => {
              setMobileOpen(false);
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#7a1534]/40 hover:bg-[#9f1c44]/60 text-[#ffe4e9] hover:text-white border border-pink-500/25 text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="size-3.5 text-[#fb7193]" />
            Log Out
          </button>

          {/* AES Badge */}
          <div className="p-3 rounded-xl glass-card-subtle border border-pink-500/15">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-gradient-to-br from-[#7a1534] to-[#be2656] text-[#ffe4e9] flex items-center justify-center shrink-0 border border-pink-400/20">
                <Lock className="size-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#fff5f7]">
                  AES-256-GCM
                </p>
                <p className="text-[0.62rem] text-[#fda4b8]/70 font-mono-code">
                  Zero-Knowledge Shield
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ================================================================ */}
      {/* MAIN CONTENT AREA                                                 */}
      {/* ================================================================ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">

        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 glass-panel border-b border-pink-500/15 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: Hamburger button for mobile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-[#fda4b8] hover:text-white rounded-lg glass-card-subtle transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="size-4" />
            </button>

            {/* Page breadcrumb label on desktop */}
            <span className="hidden md:block text-xs font-bold uppercase tracking-wider text-[#fda4b8]/70 font-mono-code">
              {navItems.find((n) => location.pathname.startsWith(n.href))?.label ?? ""}
            </span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Vault status pill */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
              isVaultUnlocked ? "glass-badge-emerald" : "glass-badge-blush"
            }`}>
              <Zap className="size-3 fill-current" />
              {isVaultUnlocked ? "Vault Unlocked" : "Vault Locked"}
            </div>

            {/* User Avatar + Interactive Dropdown for Mobile and Desktop */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl glass-card-subtle hover:border-pink-400/40 transition-all cursor-pointer"
                aria-expanded={userDropdownOpen}
                aria-label="Toggle user profile dropdown"
              >
                <div className="size-7 rounded-lg bg-gradient-to-br from-[#7a1534] to-[#f43f6e] text-white flex items-center justify-center text-xs font-bold">
                  {initials}
                </div>
                <span className="text-xs font-medium text-[#fff5f7] hidden sm:block max-w-[100px] truncate">
                  {displayName}
                </span>
                <ChevronDown className={`size-3.5 text-[#fda4b8] transition-transform duration-150 ${userDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Click-away backdrop */}
              {userDropdownOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserDropdownOpen(false)}
                />
              )}

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-12 w-56 glass-panel rounded-2xl p-2 z-50 border border-pink-500/25 shadow-2xl animate-in fade-in zoom-in-95">
                  {/* User info in dropdown */}
                  <div className="px-3 py-2 border-b border-pink-500/15 mb-1.5">
                    <p className="text-xs font-bold text-[#fff5f7] truncate">
                      {displayName}
                    </p>
                    <p className="text-[0.65rem] text-[#fda4b8]/70 truncate font-mono-code">
                      {user?.email || "Encrypted Account"}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#fda4b8] hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <User className="size-3.5 text-[#f43f6e]" />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#fda4b8] hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <Settings className="size-3.5 text-[#f43f6e]" />
                    Settings &amp; 2FA
                  </Link>

                  <div className="my-1.5 border-t border-pink-500/15" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-300 hover:text-white hover:bg-rose-500/20 transition-colors cursor-pointer"
                  >
                    <LogOut className="size-3.5 text-rose-400" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
