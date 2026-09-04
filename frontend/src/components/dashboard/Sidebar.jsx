import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  LayoutDashboard,
  KeyRound,
  Wand2,
  User,
  Settings,
  X,
  Lock,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Password Vault", href: "/vault", icon: KeyRound },
  { label: "Generator", href: "/generator", icon: Wand2 },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

/**
 * Sidebar — slidable drawer component for responsive screens, sticky sidebar for desktop.
 * @param {boolean} mobileOpen - whether sidebar drawer is open on mobile
 * @param {Function} onClose - close handler for mobile drawer
 */
export default function Sidebar({ mobileOpen, onClose }) {
  const { displayName, initials, logout } = useAppAuth();
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slidable Left Sidebar Drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] md:w-64 bg-[#FAF8F3]/95 backdrop-blur-xl border-r border-[#E6E0D5]
          flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:sticky md:top-0 md:h-screen overflow-y-auto shrink-0
        `}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-[#E6E0D5] flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3 group" onClick={onClose}>
              <div className="size-10 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-[#8B263E] flex items-center justify-center transition-colors shadow-xs relative">
                <ShieldCheck className="size-5" />
                <span className="absolute -top-1 -right-1 size-2 rounded-full bg-amber-400 ring-2 ring-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-[#1a1a1a]">
                  Lockely
                </span>
                <span className="text-[0.62rem] font-semibold tracking-widest text-[#6B6560] uppercase">
                  Secure Vault
                </span>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-xl text-[#6B6560] hover:text-[#1a1a1a] hover:bg-blush/20 transition-colors"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* User Quick Info */}
          <div className="p-3.5 mx-3 my-4 rounded-2xl bg-white border border-[#E6E0D5] shadow-xs flex items-center gap-3">
            <div className="size-9 rounded-full bg-blush/40 text-[#8B263E] flex items-center justify-center font-bold text-xs shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1a1a1a] truncate">
                {displayName}
              </p>
              <p className="text-[0.65rem] text-amber-800 font-bold flex items-center gap-1 mt-0.5">
                <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                Encrypted Session
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
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
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all
                    ${isActive
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

        {/* Sidebar Footer & Logout */}
        <div className="p-3 space-y-2.5 border-t border-[#E6E0D5]">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center gap-2.5 shadow-xs">
            <div className="size-8 rounded-xl bg-amber-500/20 text-amber-900 border border-amber-400/40 flex items-center justify-center shrink-0">
              <Lock className="size-4" />
            </div>
            <div>
              <p className="text-[0.7rem] font-extrabold text-amber-950 uppercase tracking-wider">AES-256 Verified</p>
              <p className="text-[0.62rem] text-amber-800 font-semibold">Zero-Knowledge Vault</p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="size-3.5" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
