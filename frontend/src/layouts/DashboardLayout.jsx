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
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "bg-[#ffe066]" },
  { label: "Password Vault", href: "/vault", icon: KeyRound, color: "bg-[#7dd3fc]" },
  { label: "Generator", href: "/generator", icon: Wand2, color: "bg-[#86efac]" },
  { label: "Profile", href: "/profile", icon: User, color: "bg-[#fed7aa]" },
  { label: "Settings", href: "/settings", icon: Settings, color: "bg-[#c4b5fd]" },
];

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, displayName, initials, logout, isVaultUnlocked } = useAppAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen app-bg text-[#191510] flex flex-col md:flex-row">
      {/* Mobile Backdrop for Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[#191510]/50 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================================================================ */}
      {/* SIDEBAR                                                           */}
      {/* ================================================================ */}
      <aside
        className={`
          fixed md:sticky top-0 bottom-0 left-0 z-50 w-64 bg-[#faf6ea] border-r-[3px] border-[#191510] flex flex-col justify-between transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          h-screen overflow-y-auto
        `}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b-[3px] border-[#191510] bg-[#ffe066] flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="size-10 bg-[#191510] text-[#ffe066] flex items-center justify-center border-2 border-[#191510] shadow-[2px_2px_0px_#191510] group-hover:-rotate-6 transition-transform">
                <ShieldCheck className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="ca-display text-lg text-[#191510] leading-none">
                  PASSGUARDIAN
                </span>
                <span className="ca-mono text-[0.55rem] text-[#191510]/60 tracking-widest uppercase mt-0.5">
                  Zero-Knowledge Vault
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 text-[#191510] hover:bg-[#191510] hover:text-[#ffe066] border-2 border-[#191510] transition-colors"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* User Quick Info */}
          <div className="p-3 mx-3 mt-4 bg-white border-2 border-[#191510] shadow-[3px_3px_0px_#191510] flex items-center gap-3">
            <div className="size-9 bg-[#191510] text-[#ffe066] flex items-center justify-center ca-display text-sm shadow-[1.5px_1.5px_0px_#191510] shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="ca-mono text-[0.65rem] text-[#191510] font-bold truncate">
                {displayName}
              </p>
              <div className="ca-mono text-[0.55rem] text-emerald-700 bg-[#86efac] px-2 py-0.5 border border-emerald-900 w-fit flex items-center gap-1 mt-0.5">
                <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Zero-Knowledge
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 mt-4 space-y-1.5">
            <p className="ca-mono text-[0.55rem] text-[#191510]/40 px-2 mb-2 tracking-widest uppercase">
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
                    flex items-center gap-3 px-3 py-2.5 ca-mono text-[0.68rem] tracking-wide transition-all border-2
                    ${
                      isActive
                        ? `${item.color} text-[#191510] border-[#191510] shadow-[3px_3px_0px_#191510] -translate-y-0.5 font-bold`
                        : "bg-white text-[#191510]/60 border-transparent hover:border-[#191510] hover:text-[#191510] hover:shadow-[2px_2px_0px_#191510]"
                    }
                  `}
                >
                  <div className={`p-1 border border-[#191510] ${isActive ? "bg-white" : "bg-[#faf6ea]"}`}>
                    <Icon className="size-3.5 text-[#191510]" />
                  </div>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer — Security Badge & Log Out Action */}
        <div className="p-3 space-y-2">
          {/* Direct Mobile/Sidebar Logout Button */}
          <button
            onClick={() => {
              setMobileOpen(false);
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#fda4af] text-rose-950 border-2 border-[#191510] shadow-[2px_2px_0px_#191510] ca-mono text-[0.65rem] font-bold hover:-translate-y-0.5 transition-transform"
          >
            <LogOut className="size-3.5 text-rose-950" />
            Log Out
          </button>

          {/* AES Badge */}
          <div className="p-3 border-2 border-[#191510] bg-white shadow-[3px_3px_0px_#191510]">
            <div className="flex items-center gap-2.5">
              <div className="size-8 bg-[#ffe066] border-2 border-[#191510] text-[#191510] flex items-center justify-center shrink-0">
                <Lock className="size-4" />
              </div>
              <div>
                <p className="ca-mono text-[0.65rem] text-[#191510] font-bold">
                  AES-256-GCM
                </p>
                <p className="ca-mono text-[0.55rem] text-[#191510]/50">
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#faf6ea]/95 backdrop-blur-md border-b-[3px] border-[#191510] px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: Hamburger button for mobile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-[#191510] bg-[#ffe066] border-2 border-[#191510] shadow-[2px_2px_0px_#191510] hover:-translate-y-0.5 transition-transform"
              aria-label="Open sidebar"
            >
              <Menu className="size-4" />
            </button>

            {/* Page breadcrumb label on desktop */}
            <span className="hidden md:block ca-display text-sm text-[#191510]/50">
              {navItems.find((n) => location.pathname.startsWith(n.href))?.label ?? ""}
            </span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Vault status pill */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 border-2 border-[#191510] shadow-[2px_2px_0px_#191510] ca-mono text-[0.65rem] ${
              isVaultUnlocked ? "bg-[#86efac] text-emerald-950" : "bg-[#ffe066] text-[#191510]"
            }`}>
              <Zap className="size-3 fill-current" />
              {isVaultUnlocked ? "Vault Unlocked" : "Vault Locked"}
            </div>

            {/* User Avatar + Interactive Dropdown for Mobile and Desktop */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-1 bg-white border-2 border-[#191510] shadow-[3px_3px_0px_#191510] hover:-translate-y-0.5 transition-transform"
                aria-expanded={userDropdownOpen}
                aria-label="Toggle user profile dropdown"
              >
                <div className="size-8 bg-[#191510] text-[#ffe066] flex items-center justify-center ca-display text-xs">
                  {initials}
                </div>
                <ChevronDown className={`size-3.5 text-[#191510] transition-transform duration-150 mr-0.5 ${userDropdownOpen ? "rotate-180" : ""}`} />
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
                <div className="absolute right-0 top-11 w-52 bg-[#faf6ea] border-2 border-[#191510] shadow-[4px_4px_0px_#191510] p-1.5 z-50 animate-in fade-in zoom-in-95">
                  {/* User info in dropdown */}
                  <div className="px-3 py-2 border-b-2 border-[#191510]/15 mb-1 bg-white border border-[#191510]/20">
                    <p className="ca-mono text-[0.68rem] text-[#191510] font-bold truncate">
                      {displayName}
                    </p>
                    <p className="ca-mono text-[0.55rem] text-[#191510]/60 truncate">
                      {user?.email || "Encrypted Account"}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 ca-mono text-[0.65rem] text-[#191510] hover:bg-[#7dd3fc] transition-colors border border-transparent hover:border-[#191510] mb-0.5 font-bold"
                  >
                    <User className="size-3.5 text-[#191510]" />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 ca-mono text-[0.65rem] text-[#191510] hover:bg-[#ffe066] transition-colors border border-transparent hover:border-[#191510] mb-0.5 font-bold"
                  >
                    <Settings className="size-3.5 text-[#191510]" />
                    Settings &amp; 2FA
                  </Link>

                  <div className="my-1 border-t-2 border-[#191510]" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 ca-mono text-[0.65rem] text-rose-800 hover:bg-[#fda4af] transition-colors border border-transparent hover:border-[#191510] font-bold"
                  >
                    <LogOut className="size-3.5 text-rose-800" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
