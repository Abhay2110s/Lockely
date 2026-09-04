import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppAuth } from "@/context/AuthContext";
import DashboardBackground from "@/components/dashboard/DashboardBackground";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  ShieldCheck,
  Menu,
  Zap,
  User,
  Settings,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  KeyRound,
  Wand2,
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

  const currentNav = navItems.find((n) => location.pathname.startsWith(n.href));

  return (
    <div className="min-h-screen bg-cream text-[#1a1a1a] flex flex-col md:flex-row relative overflow-x-clip">
      {/* Ambient Pattern Canvas for Dashboard */}
      <DashboardBackground />

      {/* Slidable Left Sidebar Drawer for Mobile & Sticky for Desktop */}
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative z-10 bg-[#FDFBF7]">

        {/* Top Header Bar */}
        <header className="animate-slide-down sticky top-0 z-30 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E6E0D5] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Left Controls: Hamburger + Brand on Mobile, Breadcrumb on Desktop */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-[#6B6560] hover:text-[#1a1a1a] border border-[#E6E0D5] bg-white transition-colors shadow-xs"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </button>

            {/* Mobile Brand Logo */}
            <Link to="/dashboard" className="flex md:hidden items-center gap-2">
              <div className="size-8 rounded-xl bg-amber-500/15 border border-amber-400/30 text-[#8B263E] flex items-center justify-center shadow-xs">
                <ShieldCheck className="size-4" />
              </div>
              <span className="font-extrabold text-base text-[#1a1a1a] tracking-tight">
                Lockely
              </span>
            </Link>

            {/* Page label on desktop */}
            <span className="hidden md:block text-xs font-bold uppercase tracking-wider text-[#6B6560]">
              {currentNav?.label ?? "DASHBOARD"}
            </span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Vault status pill */}
            <div className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-bold border transition-colors ${
              isVaultUnlocked
                ? "bg-amber-100/70 border-amber-300/80 text-amber-900 shadow-xs"
                : "bg-amber-500/15 border-amber-400/40 text-amber-900 shadow-xs"
            }`}>
              <Zap className="size-3 fill-current text-amber-600" />
              <span className="hidden xs:inline">{isVaultUnlocked ? "Vault Unlocked" : "Vault Locked"}</span>
              <span className="xs:hidden">{isVaultUnlocked ? "Unlocked" : "Locked"}</span>
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
                <div className="animate-scale-in origin-top-right absolute right-0 top-12 w-56 bg-white p-2 z-50 rounded-2xl border border-[#E6E0D5] shadow-xl">
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

        {/* Dynamic Page Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
