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
    <div className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] flex flex-col md:flex-row relative">
      {/* Mobile Backdrop for Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================================================================ */}
      {/* SIDEBAR — Clean Luxury Cream & Blush with Warm Gray Border       */}
      {/* ================================================================ */}
      <aside
        className={`
          fixed md:sticky top-0 bottom-0 left-0 z-50 w-64 bg-[#FAF8F3]/95 backdrop-blur-xl border-r border-[#E6E0D5] flex flex-col justify-between transition-transform duration-200 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          h-screen overflow-y-auto
        `}
      >
        <div>
          {/* Brand Header */}
          <div className="p-4 sm:p-5 border-b border-[#E6E0D5] flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="size-10 rounded-2xl bg-blush/30 border border-[#E6E0D5] group-hover:border-[#8B263E] text-[#8B263E] flex items-center justify-center transition-colors shadow-xs">
                <ShieldCheck className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-[#1a1a1a] tracking-tight leading-none">
                  PASS<span className="text-[#8B263E]">GUARDIAN</span>
                </span>
                <span className="text-[0.62rem] text-[#6B6560] uppercase tracking-widest font-semibold mt-1">
                  Zero-Knowledge Vault
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-[#6B6560] hover:text-[#1a1a1a] transition-colors"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* User Quick Info */}
          <div className="p-3.5 mx-3 mt-4 rounded-2xl bg-white border border-[#E6E0D5] shadow-xs flex items-center gap-3">
            <div className="size-9 rounded-full bg-blush/40 text-[#8B263E] flex items-center justify-center text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1a1a1a] truncate">
                {displayName}
              </p>
              <div className="text-[0.65rem] text-[#8B263E] font-semibold mt-0.5 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#8B263E]" />
                Zero-Knowledge
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 mt-5 space-y-1">
            <p className="text-[0.62rem] text-[#6B6560] px-3 mb-2 tracking-widest uppercase font-bold">
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
                    flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all
                    ${
                      isActive
                        ? "bg-blush/45 text-[#8B263E] border border-blush/80 shadow-xs font-bold"
                        : "text-[#1a1a1a] hover:text-[#8B263E] hover:bg-blush/20 border border-transparent"
                    }
                  `}
                >
                  <Icon className={`size-4 ${isActive ? "text-[#8B263E]" : "text-[#6B6560]"}`} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 space-y-2.5 border-t border-[#E6E0D5]">
          <button
            onClick={() => {
              setMobileOpen(false);
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="size-3.5" />
            Log Out
          </button>

          {/* AES Technical Badge */}
          <div className="p-3 rounded-2xl bg-white border border-[#E6E0D5] shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-blush/30 border border-[#E6E0D5] text-[#8B263E] flex items-center justify-center shrink-0">
                <Lock className="size-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1a1a1a]">
                  AES-256-GCM
                </p>
                <p className="text-[0.62rem] text-[#6B6560]">
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 bg-[#FDFBF7]">

        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E6E0D5] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Left: Hamburger button for mobile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-[#6B6560] hover:text-[#1a1a1a] border border-[#E6E0D5] bg-white transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="size-4" />
            </button>

            {/* Page breadcrumb label on desktop */}
            <span className="hidden md:block text-xs font-bold uppercase tracking-wider text-[#6B6560]">
              PassGuardian / {navItems.find((n) => location.pathname.startsWith(n.href))?.label ?? "DASHBOARD"}
            </span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Vault status pill */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 text-xs rounded-full font-semibold border ${
              isVaultUnlocked
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-amber-50 border-amber-200 text-amber-700"
            }`}>
              <Zap className="size-3 fill-current" />
              {isVaultUnlocked ? "Vault Unlocked" : "Vault Locked"}
            </div>

            {/* User Avatar + Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white border border-[#E6E0D5] hover:border-[#8B263E] transition-colors cursor-pointer shadow-xs"
                aria-expanded={userDropdownOpen}
                aria-label="Toggle user profile dropdown"
              >
                <div className="size-7 rounded-full bg-blush/40 text-[#8B263E] flex items-center justify-center text-xs font-bold">
                  {initials}
                </div>
                <span className="text-xs font-bold text-[#1a1a1a] hidden sm:block max-w-[110px] truncate">
                  {displayName}
                </span>
                <ChevronDown className={`size-3.5 text-[#6B6560] transition-transform duration-150 ${userDropdownOpen ? "rotate-180" : ""}`} />
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
                <div className="absolute right-0 top-12 w-56 bg-white p-2 z-50 rounded-2xl border border-[#E6E0D5] shadow-xl">
                  <div className="px-3 py-2 border-b border-[#E6E0D5] mb-1.5">
                    <p className="text-xs font-bold text-[#1a1a1a] truncate">
                      {displayName}
                    </p>
                    <p className="text-[0.68rem] text-[#6B6560] truncate font-mono-code">
                      {user?.email || "Encrypted Account"}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1a1a1a] hover:bg-blush/25 hover:text-[#8B263E] transition-colors"
                  >
                    <User className="size-3.5 text-[#8B263E]" />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1a1a1a] hover:bg-blush/25 hover:text-[#8B263E] transition-colors"
                  >
                    <Settings className="size-3.5 text-[#8B263E]" />
                    Settings &amp; 2FA
                  </Link>

                  <div className="my-1.5 border-t border-[#E6E0D5]" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="size-3.5 text-rose-600" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Outlet with Ambient Luxury Glow */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
