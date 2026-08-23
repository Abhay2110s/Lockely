import { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
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
  Zap,
  LogOut,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "bg-[#fef08a]" },
  { label: "Password Vault", href: "/vault", icon: KeyRound, color: "bg-[#bae6fd]" },
  { label: "Generator", href: "/generator", icon: Wand2, color: "bg-[#bbf7d0]" },
  { label: "Profile", href: "/profile", icon: User, color: "bg-[#fed7aa]" },
  { label: "Settings", href: "/settings", icon: Settings, color: "bg-[#ddd6fe]" },
];

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { displayName, initials, logout, isVaultUnlocked } = useAppAuth();
  const location = useLocation();

  const [navSearch, setNavSearch] = useState("");
  const navigate = useNavigate();

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/vault?q=${encodeURIComponent(navSearch.trim())}`);
    } else {
      navigate("/vault");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6ea] text-slate-900 flex flex-col md:flex-row font-comic">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:sticky top-0 bottom-0 left-0 z-50 w-68 bg-[#fffef7] border-r-3 border-[#18181b] flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        h-screen overflow-y-auto
      `}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b-3 border-[#18181b] bg-[#fef08a] flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="size-11 rounded-2xl bg-[#6366f1] text-white flex items-center justify-center border-2 border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] group-hover:rotate-6 transition-transform">
                <ShieldCheck className="size-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading-comic font-black text-xl tracking-tight text-slate-950 flex items-center gap-1">
                  PassGuardian
                  <Sparkles className="size-3.5 text-amber-500 fill-amber-400" />
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-xl text-slate-900 hover:bg-white border-2 border-slate-900"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* User Quick Info */}
          <div className="p-3.5 mx-3.5 my-4 rounded-2xl bg-[#fff] border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b] flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#bae6fd] border-2 border-[#18181b] text-slate-900 flex items-center justify-center font-heading-comic font-bold text-base shadow-[1.5px_1.5px_0px_#18181b]">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate font-heading-comic">
                {displayName}
              </p>
              <div className="text-[0.68rem] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-900 w-fit flex items-center gap-1 mt-0.5">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Zero-Knowledge
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3.5 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.href);
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-heading-comic font-bold tracking-wide transition-all border-2
                    ${
                      isActive
                        ? `${item.color} text-slate-950 border-[#18181b] shadow-[3px_3px_0px_#18181b] translate-x-1`
                        : "bg-white text-slate-700 border-transparent hover:border-[#18181b] hover:bg-slate-100 hover:shadow-[2px_2px_0px_#18181b]"
                    }
                  `}
                >
                  <div className={`p-1 rounded-lg border border-[#18181b] ${isActive ? "bg-white" : "bg-slate-100"}`}>
                    <Icon className="size-4 text-slate-900" />
                  </div>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Security Badge Footer */}
        <div className="p-4 border-t-2 border-[#18181b] bg-[#fff] m-3 rounded-2xl shadow-[3px_3px_0px_#18181b]">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-[#fde047] border-2 border-[#18181b] text-slate-900 flex items-center justify-center shrink-0">
              <Lock className="size-4" />
            </div>
            <div>
              <p className="text-[0.72rem] font-heading-comic font-extrabold text-slate-900">
                AES-256-GCM
              </p>
              <p className="text-[0.62rem] font-bold text-slate-500">
                Zero-Knowledge Shield
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar Header */}
        <header className="sticky top-0 z-30 bg-[#fffef7]/95 backdrop-blur-md border-b-3 border-[#18181b] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-900 bg-[#fef08a] border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b]"
            >
              <Menu className="size-5" />
            </button>
            <form
              onSubmit={handleNavSearch}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white text-xs w-80 border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b] focus-within:shadow-[4px_4px_0px_#18181b] focus-within:-translate-y-0.5 transition-all"
            >
              <Search className="size-4 text-slate-600 shrink-0" />
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search credentials..."
                className="w-full bg-transparent text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none text-xs"
              />
              <kbd className="text-[0.62rem] bg-[#fde047] text-slate-900 px-2 py-0.5 rounded-md border border-[#18181b] font-heading-comic font-bold shrink-0">
                GO ➔
              </kbd>
            </form>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3.5">
            <div className={`hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-full border-2 border-[#18181b] shadow-[2px_2px_0px_#18181b] text-[0.72rem] font-heading-comic font-bold ${
              isVaultUnlocked ? "bg-[#bbf7d0] text-emerald-950" : "bg-[#fef08a] text-amber-950"
            }`}>
              <Zap className="size-3.5 fill-current" />
              {isVaultUnlocked ? "Vault Unlocked" : "Vault Locked"}
            </div>

            {/* User Avatar + Sign Out Dropdown */}
            <div className="relative group">
              <button className="size-10 rounded-2xl bg-[#6366f1] text-white flex items-center justify-center font-heading-comic font-black text-sm border-2.5 border-[#18181b] shadow-[3px_3px_0px_#18181b] hover:-translate-y-0.5 transition-transform">
                {initials}
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-12 w-48 bg-white border-2.5 border-[#18181b] rounded-2xl shadow-[4px_4px_0px_#18181b] p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-heading-comic font-bold text-slate-800 hover:bg-[#bae6fd] rounded-xl transition-colors"
                >
                  <User className="size-4" />
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-heading-comic font-bold text-slate-800 hover:bg-[#fef08a] rounded-xl transition-colors"
                >
                  <Settings className="size-4" />
                  Settings &amp; 2FA
                </Link>
                <div className="my-1 border-t-2 border-[#18181b]" />
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-heading-comic font-bold text-rose-700 hover:bg-[#fda4af] rounded-xl transition-colors"
                >
                  <LogOut className="size-4" />
                  Log Out
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
