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
    <div className="min-h-screen bg-[#000000] text-[#F8F9FA] flex flex-col md:flex-row relative">
      {/* Mobile Backdrop for Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[#000000]/90 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================================================================ */}
      {/* SIDEBAR — Deep Charcoal #111111 with 1px Harsh Border #222222    */}
      {/* ================================================================ */}
      <aside
        className={`
          fixed md:sticky top-0 bottom-0 left-0 z-50 w-64 bg-[#111111] border-r border-[#222222] flex flex-col justify-between transition-transform duration-200 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          h-screen overflow-y-auto
        `}
      >
        <div>
          {/* Brand Header */}
          <div className="p-4 sm:p-5 border-b border-[#222222] flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="size-10 bg-[#000000] border border-[#222222] group-hover:border-[#00FF66] text-[#00FF66] flex items-center justify-center transition-colors">
                <ShieldCheck className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-[#F8F9FA] tracking-tight leading-none">
                  PASS<span className="text-[#00FF66]">GUARDIAN</span>
                </span>
                <span className="text-[0.6rem] text-[#6B7280] uppercase tracking-widest font-mono-code font-bold mt-1">
                  Zero-Knowledge Vault
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 text-[#6B7280] hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* User Quick Info */}
          <div className="p-3 mx-3 mt-4 bg-[#0c0c0c] border border-[#222222] flex items-center gap-3">
            <div className="size-8 bg-[#222222] text-[#00FF66] flex items-center justify-center text-xs font-bold font-mono-code shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#F8F9FA] truncate uppercase tracking-wide">
                {displayName}
              </p>
              <div className="text-[0.6rem] text-[#00FF66] font-mono-code uppercase font-semibold mt-0.5 flex items-center gap-1.5">
                <span className="size-1.5 bg-[#00FF66]" />
                Zero-Knowledge
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 mt-5 space-y-1">
            <p className="text-[0.6rem] text-[#6B7280] px-3 mb-2 font-mono-code tracking-widest uppercase font-bold">
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
                    flex items-center gap-3 px-3.5 py-2.5 text-xs uppercase tracking-wider font-bold transition-colors border
                    ${
                      isActive
                        ? "bg-[#00FF66] text-[#000000] border-[#00FF66]"
                        : "text-[#6B7280] hover:text-[#F8F9FA] hover:bg-[#161616] border-transparent"
                    }
                  `}
                >
                  <Icon className={`size-4 ${isActive ? "text-[#000000]" : "text-[#6B7280]"}`} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 space-y-2.5 border-t border-[#222222]">
          <button
            onClick={() => {
              setMobileOpen(false);
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#000000] hover:bg-[#1a0006] text-[#FF3366] hover:text-[#FF3366] border border-[#FF3366]/40 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LogOut className="size-3.5 text-[#FF3366]" />
            Log Out
          </button>

          {/* AES Technical Badge */}
          <div className="p-3 bg-[#000000] border border-[#222222]">
            <div className="flex items-center gap-2.5">
              <div className="size-7 bg-[#111111] border border-[#222222] text-[#00FF66] flex items-center justify-center shrink-0">
                <Lock className="size-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#F8F9FA] font-mono-code uppercase tracking-wider">
                  AES-256-GCM
                </p>
                <p className="text-[0.62rem] text-[#6B7280] font-mono-code uppercase">
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 bg-[#000000]">

        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#000000] border-b border-[#222222] px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: Hamburger button for mobile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-[#6B7280] hover:text-[#F8F9FA] border border-[#222222] bg-[#111111] transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="size-4" />
            </button>

            {/* Page breadcrumb label on desktop */}
            <span className="hidden md:block text-xs font-black uppercase tracking-widest text-[#6B7280] font-mono-code">
              / {navItems.find((n) => location.pathname.startsWith(n.href))?.label ?? "DASHBOARD"}
            </span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Vault status pill */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 text-xs font-mono-code font-bold uppercase tracking-wider border ${
              isVaultUnlocked
                ? "bg-[#000000] border-[#00FF66] text-[#00FF66]"
                : "bg-[#000000] border-[#222222] text-[#6B7280]"
            }`}>
              <Zap className="size-3 fill-current" />
              {isVaultUnlocked ? "Vault Unlocked" : "Vault Locked"}
            </div>

            {/* User Avatar + Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 bg-[#111111] border border-[#222222] hover:border-[#00FF66] transition-colors cursor-pointer"
                aria-expanded={userDropdownOpen}
                aria-label="Toggle user profile dropdown"
              >
                <div className="size-6 bg-[#000000] text-[#00FF66] border border-[#222222] flex items-center justify-center text-xs font-bold font-mono-code">
                  {initials}
                </div>
                <span className="text-xs font-bold text-[#F8F9FA] hidden sm:block max-w-[100px] truncate uppercase tracking-wider font-mono-code">
                  {displayName}
                </span>
                <ChevronDown className={`size-3.5 text-[#6B7280] transition-transform duration-150 ${userDropdownOpen ? "rotate-180" : ""}`} />
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
                <div className="absolute right-0 top-12 w-56 bg-[#111111] p-2 z-50 border border-[#222222]">
                  <div className="px-3 py-2 border-b border-[#222222] mb-1.5">
                    <p className="text-xs font-bold text-[#F8F9FA] truncate uppercase">
                      {displayName}
                    </p>
                    <p className="text-[0.65rem] text-[#6B7280] truncate font-mono-code">
                      {user?.email || "Encrypted Account"}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#F8F9FA] hover:bg-[#1a1a1a] transition-colors uppercase tracking-wider font-mono-code"
                  >
                    <User className="size-3.5 text-[#00FF66]" />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#F8F9FA] hover:bg-[#1a1a1a] transition-colors uppercase tracking-wider font-mono-code"
                  >
                    <Settings className="size-3.5 text-[#00FF66]" />
                    Settings &amp; 2FA
                  </Link>

                  <div className="my-1.5 border-t border-[#222222]" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#FF3366] hover:bg-[#1a0006] transition-colors cursor-pointer uppercase tracking-wider font-mono-code"
                  >
                    <LogOut className="size-3.5 text-[#FF3366]" />
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
